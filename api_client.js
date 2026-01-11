/**
 * API Client Module
 * Demonstrates HTTP operations that need error handling
 */

const https = require('https');
const { URL } = require('url');

/**
 * Fetch data from an API endpoint
 * @param {string} url - The URL to fetch data from
 * @param {number} timeout - Optional timeout in milliseconds (default: 5000)
 * @returns {Promise} Resolves with parsed JSON data
 * @throws {Error} If URL is invalid, request fails, or response is not valid JSON
 */
function fetchData(url, timeout = 5000) {
    return new Promise((resolve, reject) => {
        // Input validation
        if (!url || typeof url !== 'string') {
            return reject(new Error('Invalid URL: URL must be a non-empty string'));
        }

        // Validate URL format
        let parsedUrl;
        try {
            parsedUrl = new URL(url);
        } catch (error) {
            return reject(new Error(`Invalid URL format: ${url}`));
        }

        // Ensure HTTPS protocol
        if (parsedUrl.protocol !== 'https:') {
            return reject(new Error(`Invalid protocol: Only HTTPS is supported, got ${parsedUrl.protocol}`));
        }

        const req = https.get(url, (res) => {
            const { statusCode } = res;
            const contentType = res.headers['content-type'];

            // Check HTTP status code
            if (statusCode < 200 || statusCode >= 300) {
                let errorData = '';
                res.on('data', (chunk) => {
                    errorData += chunk;
                });
                res.on('end', () => {
                    reject(new Error(`HTTP ${statusCode}: Request failed for ${url}. Response: ${errorData.slice(0, 200)}`));
                });
                return;
            }

            let data = '';

            res.on('data', (chunk) => {
                data += chunk;
            });

            res.on('end', () => {
                // Check if response is empty
                if (!data) {
                    return reject(new Error(`Empty response received from ${url}`));
                }

                // Parse JSON with error handling
                try {
                    const parsed = JSON.parse(data);
                    resolve(parsed);
                } catch (parseError) {
                    reject(new Error(`Failed to parse JSON response from ${url}: ${parseError.message}. Response: ${data.slice(0, 200)}`));
                }
            });

            res.on('error', (error) => {
                reject(new Error(`Response error from ${url}: ${error.message}`));
            });
        });

        // Set timeout
        req.setTimeout(timeout, () => {
            req.destroy();
            reject(new Error(`Request timeout: ${url} did not respond within ${timeout}ms`));
        });

        // Handle request errors
        req.on('error', (error) => {
            reject(new Error(`Network error requesting ${url}: ${error.message}`));
        });
    });
}

/**
 * Post data to an API endpoint
 * @param {string} url - The URL to post data to
 * @param {*} payload - The data to send (will be JSON stringified)
 * @param {number} timeout - Optional timeout in milliseconds (default: 5000)
 * @returns {Promise} Resolves with parsed JSON response
 * @throws {Error} If URL is invalid, payload cannot be serialized, or request fails
 */
function postData(url, payload, timeout = 5000) {
    return new Promise((resolve, reject) => {
        // Input validation
        if (!url || typeof url !== 'string') {
            return reject(new Error('Invalid URL: URL must be a non-empty string'));
        }

        if (payload === undefined) {
            return reject(new Error('Invalid payload: payload cannot be undefined'));
        }

        // Validate URL format
        let parsedUrl;
        try {
            parsedUrl = new URL(url);
        } catch (error) {
            return reject(new Error(`Invalid URL format: ${url}`));
        }

        // Ensure HTTPS protocol
        if (parsedUrl.protocol !== 'https:') {
            return reject(new Error(`Invalid protocol: Only HTTPS is supported, got ${parsedUrl.protocol}`));
        }

        // Serialize payload
        let data;
        try {
            data = JSON.stringify(payload);
        } catch (stringifyError) {
            return reject(new Error(`Failed to serialize payload to JSON: ${stringifyError.message}`));
        }

        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Content-Length': Buffer.byteLength(data)
            }
        };

        const req = https.request(url, options, (res) => {
            const { statusCode } = res;

            // Check HTTP status code
            if (statusCode < 200 || statusCode >= 300) {
                let errorData = '';
                res.on('data', (chunk) => {
                    errorData += chunk;
                });
                res.on('end', () => {
                    reject(new Error(`HTTP ${statusCode}: POST request failed for ${url}. Response: ${errorData.slice(0, 200)}`));
                });
                return;
            }

            let responseData = '';

            res.on('data', (chunk) => {
                responseData += chunk;
            });

            res.on('end', () => {
                // Handle empty response
                if (!responseData) {
                    return resolve(null);
                }

                // Parse JSON with error handling
                try {
                    const parsed = JSON.parse(responseData);
                    resolve(parsed);
                } catch (parseError) {
                    reject(new Error(`Failed to parse JSON response from ${url}: ${parseError.message}. Response: ${responseData.slice(0, 200)}`));
                }
            });

            res.on('error', (error) => {
                reject(new Error(`Response error from ${url}: ${error.message}`));
            });
        });

        // Set timeout
        req.setTimeout(timeout, () => {
            req.destroy();
            reject(new Error(`Request timeout: ${url} did not respond within ${timeout}ms`));
        });

        // Handle request errors
        req.on('error', (error) => {
            reject(new Error(`Network error posting to ${url}: ${error.message}`));
        });

        // Write data and end request
        try {
            req.write(data);
            req.end();
        } catch (writeError) {
            reject(new Error(`Failed to send request to ${url}: ${writeError.message}`));
        }
    });
}

/**
 * Fetch data with retry logic
 * @param {string} url - The URL to fetch data from
 * @param {number} maxRetries - Maximum number of retry attempts (default: 3)
 * @param {number} retryDelay - Delay between retries in milliseconds (default: 1000)
 * @param {number} timeout - Timeout for each request in milliseconds (default: 5000)
 * @returns {Promise} Resolves with parsed JSON data
 * @throws {Error} If all retry attempts fail
 */
async function fetchWithRetry(url, maxRetries = 3, retryDelay = 1000, timeout = 5000) {
    // Input validation
    if (!url || typeof url !== 'string') {
        throw new Error('Invalid URL: URL must be a non-empty string');
    }

    if (typeof maxRetries !== 'number' || maxRetries < 0 || !Number.isInteger(maxRetries)) {
        throw new Error('Invalid maxRetries: must be a non-negative integer');
    }

    if (typeof retryDelay !== 'number' || retryDelay < 0) {
        throw new Error('Invalid retryDelay: must be a non-negative number');
    }

    const errors = [];
    let lastError;

    for (let attempt = 0; attempt <= maxRetries; attempt++) {
        try {
            const result = await fetchData(url, timeout);
            return result;
        } catch (error) {
            lastError = error;
            errors.push(`Attempt ${attempt + 1}: ${error.message}`);

            // Don't wait after the last attempt
            if (attempt < maxRetries) {
                // Exponential backoff: delay increases with each retry
                const currentDelay = retryDelay * Math.pow(2, attempt);
                await new Promise(resolve => setTimeout(resolve, currentDelay));
            }
        }
    }

    // All attempts failed
    const errorMessage = `Failed to fetch ${url} after ${maxRetries + 1} attempts:\n${errors.join('\n')}`;
    throw new Error(errorMessage);
}

module.exports = {
    fetchData,
    postData,
    fetchWithRetry
};
