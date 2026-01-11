/**
 * Data Processing Module
 * Demonstrates data operations that need error handling
 */

/**
 * Process user data and calculate statistics
 * @param {Array} users - Array of user objects with age property
 * @returns {Object} Statistics including count, averageAge, and oldestUser
 * @throws {Error} If users is invalid or contains invalid data
 */
function processUserData(users) {
    // Input validation
    if (!users) {
        throw new Error('Invalid input: users cannot be null or undefined');
    }

    if (!Array.isArray(users)) {
        throw new Error('Invalid input: users must be an array');
    }

    if (users.length === 0) {
        throw new Error('Invalid input: users array cannot be empty');
    }

    // Validate user objects
    for (let i = 0; i < users.length; i++) {
        const user = users[i];

        if (!user || typeof user !== 'object') {
            throw new Error(`Invalid user at index ${i}: user must be an object`);
        }

        if (user.age === undefined || user.age === null) {
            throw new Error(`Invalid user at index ${i}: user.age is required`);
        }

        if (typeof user.age !== 'number' || isNaN(user.age)) {
            throw new Error(`Invalid user at index ${i}: user.age must be a valid number, got ${typeof user.age}`);
        }

        if (user.age < 0) {
            throw new Error(`Invalid user at index ${i}: user.age cannot be negative`);
        }
    }

    try {
        const totalAge = users.reduce((sum, user) => sum + user.age, 0);
        const averageAge = totalAge / users.length;

        const oldestUser = users.reduce((oldest, user) =>
            user.age > oldest.age ? user : oldest
        );

        return {
            count: users.length,
            averageAge: averageAge,
            oldestUser: oldestUser
        };
    } catch (error) {
        throw new Error(`Error processing user data: ${error.message}`);
    }
}

/**
 * Validate email address
 * @param {string} email - The email address to validate
 * @returns {boolean} True if email is valid, false otherwise
 * @throws {Error} If email is not a string
 */
function validateEmail(email) {
    // Input validation
    if (email === null || email === undefined) {
        throw new Error('Invalid input: email cannot be null or undefined');
    }

    if (typeof email !== 'string') {
        throw new Error(`Invalid input: email must be a string, got ${typeof email}`);
    }

    if (email.trim() === '') {
        return false;
    }

    try {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    } catch (error) {
        throw new Error(`Error validating email: ${error.message}`);
    }
}

/**
 * Parse and validate configuration object
 * @param {string} configString - JSON string containing configuration
 * @returns {Object} Parsed and validated configuration object
 * @throws {Error} If configString is invalid or missing required fields
 */
function parseConfig(configString) {
    // Input validation
    if (configString === null || configString === undefined) {
        throw new Error('Invalid input: configString cannot be null or undefined');
    }

    if (typeof configString !== 'string') {
        throw new Error(`Invalid input: configString must be a string, got ${typeof configString}`);
    }

    if (configString.trim() === '') {
        throw new Error('Invalid input: configString cannot be empty');
    }

    // Parse JSON
    let config;
    try {
        config = JSON.parse(configString);
    } catch (parseError) {
        throw new Error(`Failed to parse configuration JSON: ${parseError.message}`);
    }

    // Validate parsed config is an object
    if (!config || typeof config !== 'object' || Array.isArray(config)) {
        throw new Error('Invalid configuration: parsed result must be an object');
    }

    // Validate required fields
    const requiredFields = ['apiKey', 'endpoint', 'timeout'];
    const missingFields = [];

    requiredFields.forEach(field => {
        if (!config[field]) {
            missingFields.push(field);
        }
    });

    if (missingFields.length > 0) {
        throw new Error(`Missing required configuration fields: ${missingFields.join(', ')}`);
    }

    // Validate field types
    if (typeof config.apiKey !== 'string') {
        throw new Error('Invalid configuration: apiKey must be a string');
    }

    if (typeof config.endpoint !== 'string') {
        throw new Error('Invalid configuration: endpoint must be a string');
    }

    if (typeof config.timeout !== 'number' || config.timeout <= 0) {
        throw new Error('Invalid configuration: timeout must be a positive number');
    }

    return config;
}

/**
 * Calculate percentage with division
 * @param {number} part - The part value
 * @param {number} total - The total value
 * @returns {number} The percentage
 * @throws {Error} If inputs are invalid or total is zero
 */
function calculatePercentage(part, total) {
    // Input validation
    if (part === null || part === undefined) {
        throw new Error('Invalid input: part cannot be null or undefined');
    }

    if (total === null || total === undefined) {
        throw new Error('Invalid input: total cannot be null or undefined');
    }

    if (typeof part !== 'number' || isNaN(part)) {
        throw new Error(`Invalid input: part must be a valid number, got ${typeof part}`);
    }

    if (typeof total !== 'number' || isNaN(total)) {
        throw new Error(`Invalid input: total must be a valid number, got ${typeof total}`);
    }

    if (total === 0) {
        throw new Error('Invalid input: total cannot be zero (division by zero)');
    }

    if (!isFinite(part) || !isFinite(total)) {
        throw new Error('Invalid input: part and total must be finite numbers');
    }

    return (part / total) * 100;
}

/**
 * Extract domain from email
 * @param {string} email - The email address
 * @returns {string} The domain part of the email
 * @throws {Error} If email is invalid or doesn't contain a domain
 */
function extractDomain(email) {
    // Input validation
    if (email === null || email === undefined) {
        throw new Error('Invalid input: email cannot be null or undefined');
    }

    if (typeof email !== 'string') {
        throw new Error(`Invalid input: email must be a string, got ${typeof email}`);
    }

    if (email.trim() === '') {
        throw new Error('Invalid input: email cannot be empty');
    }

    // Check if email contains @ symbol
    if (!email.includes('@')) {
        throw new Error(`Invalid email format: email must contain @ symbol`);
    }

    const parts = email.split('@');

    // Check if there's a domain part
    if (parts.length < 2 || !parts[1]) {
        throw new Error(`Invalid email format: email must have a domain after @ symbol`);
    }

    // Check for multiple @ symbols
    if (parts.length > 2) {
        throw new Error(`Invalid email format: email contains multiple @ symbols`);
    }

    const domain = parts[1].trim();

    if (domain === '') {
        throw new Error(`Invalid email format: domain cannot be empty`);
    }

    return domain;
}

/**
 * Find user by ID
 * @param {Array} users - Array of user objects
 * @param {*} id - The ID to search for
 * @returns {Object|undefined} The user object if found, undefined otherwise
 * @throws {Error} If inputs are invalid
 */
function findUserById(users, id) {
    // Input validation
    if (!users) {
        throw new Error('Invalid input: users cannot be null or undefined');
    }

    if (!Array.isArray(users)) {
        throw new Error('Invalid input: users must be an array');
    }

    if (id === null || id === undefined) {
        throw new Error('Invalid input: id cannot be null or undefined');
    }

    // Validate user objects have id property
    try {
        const user = users.find(user => {
            if (!user || typeof user !== 'object') {
                return false;
            }
            return user.id === id;
        });

        return user;
    } catch (error) {
        throw new Error(`Error finding user by ID: ${error.message}`);
    }
}

/**
 * Batch process items with a callback
 * @param {Array} items - Array of items to process
 * @param {number} batchSize - Size of each batch
 * @param {Function} callback - Function to call for each batch
 * @returns {Array} Array of results from each batch
 * @throws {Error} If inputs are invalid or callback throws
 */
function batchProcess(items, batchSize, callback) {
    // Input validation
    if (!items) {
        throw new Error('Invalid input: items cannot be null or undefined');
    }

    if (!Array.isArray(items)) {
        throw new Error('Invalid input: items must be an array');
    }

    if (batchSize === null || batchSize === undefined) {
        throw new Error('Invalid input: batchSize cannot be null or undefined');
    }

    if (typeof batchSize !== 'number' || isNaN(batchSize)) {
        throw new Error(`Invalid input: batchSize must be a valid number, got ${typeof batchSize}`);
    }

    if (!Number.isInteger(batchSize) || batchSize <= 0) {
        throw new Error('Invalid input: batchSize must be a positive integer');
    }

    if (!callback) {
        throw new Error('Invalid input: callback cannot be null or undefined');
    }

    if (typeof callback !== 'function') {
        throw new Error(`Invalid input: callback must be a function, got ${typeof callback}`);
    }

    const results = [];

    try {
        for (let i = 0; i < items.length; i += batchSize) {
            const batch = items.slice(i, i + batchSize);

            try {
                const result = callback(batch);
                results.push(result);
            } catch (callbackError) {
                throw new Error(`Callback error at batch starting at index ${i}: ${callbackError.message}`);
            }
        }

        return results;
    } catch (error) {
        // Re-throw with context if it's not already our custom error
        if (error.message.startsWith('Callback error')) {
            throw error;
        }
        throw new Error(`Error during batch processing: ${error.message}`);
    }
}

module.exports = {
    processUserData,
    validateEmail,
    parseConfig,
    calculatePercentage,
    extractDomain,
    findUserById,
    batchProcess
};
