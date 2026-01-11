/**
 * File Operations Module
 * Demonstrates common file operations that need error handling
 */

const fs = require('fs');
const path = require('path');

/**
 * Read a JSON file and parse its contents
 * @throws {Error} If filePath is invalid, file doesn't exist, or JSON is malformed
 */
function readJSONFile(filePath) {
    // Input validation
    if (!filePath || typeof filePath !== 'string') {
        throw new Error('Invalid file path: filePath must be a non-empty string');
    }

    try {
        // Check if file exists
        if (!fs.existsSync(filePath)) {
            throw new Error(`File not found: ${filePath}`);
        }

        // Check if it's a file (not a directory)
        const stats = fs.statSync(filePath);
        if (!stats.isFile()) {
            throw new Error(`Path is not a file: ${filePath}`);
        }

        // Read file content
        const data = fs.readFileSync(filePath, 'utf8');

        // Parse JSON with specific error handling
        try {
            return JSON.parse(data);
        } catch (parseError) {
            throw new Error(`Failed to parse JSON from ${filePath}: ${parseError.message}`);
        }
    } catch (error) {
        // Re-throw with context if it's not already our custom error
        if (error.message.startsWith('Invalid file path') ||
            error.message.startsWith('File not found') ||
            error.message.startsWith('Path is not a file') ||
            error.message.startsWith('Failed to parse JSON')) {
            throw error;
        }
        throw new Error(`Error reading JSON file ${filePath}: ${error.message}`);
    }
}

/**
 * Write data to a JSON file
 * @throws {Error} If filePath is invalid, data cannot be serialized, or write fails
 */
function writeJSONFile(filePath, data) {
    // Input validation
    if (!filePath || typeof filePath !== 'string') {
        throw new Error('Invalid file path: filePath must be a non-empty string');
    }

    if (data === undefined) {
        throw new Error('Invalid data: data cannot be undefined');
    }

    try {
        // Ensure directory exists
        const directory = path.dirname(filePath);
        if (!fs.existsSync(directory)) {
            throw new Error(`Directory does not exist: ${directory}`);
        }

        // Serialize data to JSON
        let jsonString;
        try {
            jsonString = JSON.stringify(data, null, 2);
        } catch (stringifyError) {
            throw new Error(`Failed to serialize data to JSON: ${stringifyError.message}`);
        }

        // Write to file
        fs.writeFileSync(filePath, jsonString, 'utf8');
        return true;
    } catch (error) {
        // Re-throw with context if it's not already our custom error
        if (error.message.startsWith('Invalid file path') ||
            error.message.startsWith('Invalid data') ||
            error.message.startsWith('Directory does not exist') ||
            error.message.startsWith('Failed to serialize')) {
            throw error;
        }
        throw new Error(`Error writing JSON file ${filePath}: ${error.message}`);
    }
}

/**
 * Copy a file from source to destination
 * @throws {Error} If paths are invalid, source doesn't exist, or copy fails
 */
function copyFile(source, destination) {
    // Input validation
    if (!source || typeof source !== 'string') {
        throw new Error('Invalid source path: source must be a non-empty string');
    }

    if (!destination || typeof destination !== 'string') {
        throw new Error('Invalid destination path: destination must be a non-empty string');
    }

    if (source === destination) {
        throw new Error('Source and destination cannot be the same');
    }

    try {
        // Check if source file exists
        if (!fs.existsSync(source)) {
            throw new Error(`Source file not found: ${source}`);
        }

        // Check if source is a file
        const sourceStats = fs.statSync(source);
        if (!sourceStats.isFile()) {
            throw new Error(`Source is not a file: ${source}`);
        }

        // Ensure destination directory exists
        const destDirectory = path.dirname(destination);
        if (!fs.existsSync(destDirectory)) {
            throw new Error(`Destination directory does not exist: ${destDirectory}`);
        }

        // Check if destination already exists and warn
        if (fs.existsSync(destination)) {
            const destStats = fs.statSync(destination);
            if (destStats.isDirectory()) {
                throw new Error(`Destination is a directory: ${destination}`);
            }
            // File will be overwritten - this is expected behavior for copyFile
        }

        // Perform the copy
        const data = fs.readFileSync(source);
        fs.writeFileSync(destination, data);
        return destination;
    } catch (error) {
        // Re-throw with context if it's not already our custom error
        if (error.message.startsWith('Invalid source path') ||
            error.message.startsWith('Invalid destination path') ||
            error.message.startsWith('Source and destination') ||
            error.message.startsWith('Source file not found') ||
            error.message.startsWith('Source is not a file') ||
            error.message.startsWith('Destination directory') ||
            error.message.startsWith('Destination is a directory')) {
            throw error;
        }
        throw new Error(`Error copying file from ${source} to ${destination}: ${error.message}`);
    }
}

/**
 * Delete a file
 * @throws {Error} If filePath is invalid, file doesn't exist, or deletion fails
 */
function deleteFile(filePath) {
    // Input validation
    if (!filePath || typeof filePath !== 'string') {
        throw new Error('Invalid file path: filePath must be a non-empty string');
    }

    try {
        // Check if file exists
        if (!fs.existsSync(filePath)) {
            throw new Error(`File not found: ${filePath}`);
        }

        // Check if it's a file (not a directory)
        const stats = fs.statSync(filePath);
        if (!stats.isFile()) {
            throw new Error(`Path is not a file: ${filePath}. Use a directory removal function instead.`);
        }

        // Delete the file
        fs.unlinkSync(filePath);
        return true;
    } catch (error) {
        // Re-throw with context if it's not already our custom error
        if (error.message.startsWith('Invalid file path') ||
            error.message.startsWith('File not found') ||
            error.message.startsWith('Path is not a file')) {
            throw error;
        }
        throw new Error(`Error deleting file ${filePath}: ${error.message}`);
    }
}

/**
 * Get file size in bytes
 * @throws {Error} If filePath is invalid or file doesn't exist
 */
function getFileSize(filePath) {
    // Input validation
    if (!filePath || typeof filePath !== 'string') {
        throw new Error('Invalid file path: filePath must be a non-empty string');
    }

    try {
        // Check if file exists
        if (!fs.existsSync(filePath)) {
            throw new Error(`File not found: ${filePath}`);
        }

        // Get file stats
        const stats = fs.statSync(filePath);

        // Check if it's a file
        if (!stats.isFile()) {
            throw new Error(`Path is not a file: ${filePath}`);
        }

        return stats.size;
    } catch (error) {
        // Re-throw with context if it's not already our custom error
        if (error.message.startsWith('Invalid file path') ||
            error.message.startsWith('File not found') ||
            error.message.startsWith('Path is not a file')) {
            throw error;
        }
        throw new Error(`Error getting file size for ${filePath}: ${error.message}`);
    }
}

module.exports = {
    readJSONFile,
    writeJSONFile,
    copyFile,
    deleteFile,
    getFileSize
};
