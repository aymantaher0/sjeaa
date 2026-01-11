/**
 * Database Module
 * Demonstrates database operations that need error handling
 */

class Database {
    /**
     * Create a new Database instance
     * @param {string} connectionString - Database connection string
     * @throws {Error} If connectionString is invalid
     */
    constructor(connectionString) {
        // Input validation
        if (!connectionString || typeof connectionString !== 'string') {
            throw new Error('Invalid connection string: must be a non-empty string');
        }

        if (connectionString.trim() === '') {
            throw new Error('Invalid connection string: cannot be empty');
        }

        this.connectionString = connectionString;
        this.connected = false;
    }

    /**
     * Connect to the database
     * @returns {boolean} True if connection successful
     * @throws {Error} If already connected or connection fails
     */
    connect() {
        if (this.connected) {
            throw new Error('Database error: Already connected to the database');
        }

        try {
            // Simulate connection - in real implementation, this would connect to actual database
            this.connected = true;
            return true;
        } catch (error) {
            throw new Error(`Failed to connect to database: ${error.message}`);
        }
    }

    /**
     * Execute a query
     * @param {string} sql - SQL query string
     * @param {Array} params - Query parameters
     * @returns {Object} Query result with rows and rowCount
     * @throws {Error} If not connected, SQL is invalid, or query fails
     */
    query(sql, params = []) {
        // Check connection state
        if (!this.connected) {
            throw new Error('Database error: Not connected to database. Call connect() first.');
        }

        // Input validation
        if (!sql || typeof sql !== 'string') {
            throw new Error('Invalid SQL query: must be a non-empty string');
        }

        if (sql.trim() === '') {
            throw new Error('Invalid SQL query: cannot be empty');
        }

        if (params && !Array.isArray(params)) {
            throw new Error('Invalid query parameters: params must be an array');
        }

        try {
            // Simulate query execution - in real implementation, this would execute actual query
            return {
                rows: [],
                rowCount: 0
            };
        } catch (error) {
            throw new Error(`Query execution failed: ${error.message}`);
        }
    }

    /**
     * Insert a record
     * @param {string} table - Table name
     * @param {Object} data - Data to insert as key-value pairs
     * @returns {Object} Query result
     * @throws {Error} If inputs are invalid or insert fails
     */
    insert(table, data) {
        // Check connection state
        if (!this.connected) {
            throw new Error('Database error: Not connected to database. Call connect() first.');
        }

        // Input validation
        if (!table || typeof table !== 'string') {
            throw new Error('Invalid table name: must be a non-empty string');
        }

        if (table.trim() === '') {
            throw new Error('Invalid table name: cannot be empty');
        }

        // Validate table name to prevent SQL injection
        if (!/^[a-zA-Z_][a-zA-Z0-9_]*$/.test(table)) {
            throw new Error(`Invalid table name: "${table}" contains invalid characters. Use only letters, numbers, and underscores.`);
        }

        if (!data || typeof data !== 'object' || Array.isArray(data)) {
            throw new Error('Invalid data: must be a non-null object');
        }

        const dataKeys = Object.keys(data);
        if (dataKeys.length === 0) {
            throw new Error('Invalid data: cannot insert empty object');
        }

        // Validate column names
        for (const key of dataKeys) {
            if (!/^[a-zA-Z_][a-zA-Z0-9_]*$/.test(key)) {
                throw new Error(`Invalid column name: "${key}" contains invalid characters`);
            }
        }

        try {
            const keys = dataKeys.join(', ');
            const values = Object.values(data);
            const placeholders = values.map((_, i) => `$${i + 1}`).join(', ');

            const sql = `INSERT INTO ${table} (${keys}) VALUES (${placeholders})`;
            return this.query(sql, values);
        } catch (error) {
            // Re-throw with context if it's not already our custom error
            if (error.message.startsWith('Database error') ||
                error.message.startsWith('Invalid')) {
                throw error;
            }
            throw new Error(`Insert operation failed for table "${table}": ${error.message}`);
        }
    }

    /**
     * Update a record
     * @param {string} table - Table name
     * @param {*} id - Record ID
     * @param {Object} data - Data to update as key-value pairs
     * @returns {Object} Query result
     * @throws {Error} If inputs are invalid or update fails
     */
    update(table, id, data) {
        // Check connection state
        if (!this.connected) {
            throw new Error('Database error: Not connected to database. Call connect() first.');
        }

        // Input validation
        if (!table || typeof table !== 'string') {
            throw new Error('Invalid table name: must be a non-empty string');
        }

        if (table.trim() === '') {
            throw new Error('Invalid table name: cannot be empty');
        }

        // Validate table name to prevent SQL injection
        if (!/^[a-zA-Z_][a-zA-Z0-9_]*$/.test(table)) {
            throw new Error(`Invalid table name: "${table}" contains invalid characters. Use only letters, numbers, and underscores.`);
        }

        if (id === null || id === undefined) {
            throw new Error('Invalid ID: cannot be null or undefined');
        }

        if (!data || typeof data !== 'object' || Array.isArray(data)) {
            throw new Error('Invalid data: must be a non-null object');
        }

        const dataKeys = Object.keys(data);
        if (dataKeys.length === 0) {
            throw new Error('Invalid data: cannot update with empty object');
        }

        // Validate column names
        for (const key of dataKeys) {
            if (!/^[a-zA-Z_][a-zA-Z0-9_]*$/.test(key)) {
                throw new Error(`Invalid column name: "${key}" contains invalid characters`);
            }
        }

        // Prevent updating 'id' field
        if ('id' in data) {
            throw new Error('Invalid operation: cannot update the id field');
        }

        try {
            const sets = dataKeys.map((key, i) => `${key} = $${i + 1}`).join(', ');
            const values = Object.values(data);

            const sql = `UPDATE ${table} SET ${sets} WHERE id = $${values.length + 1}`;
            return this.query(sql, [...values, id]);
        } catch (error) {
            // Re-throw with context if it's not already our custom error
            if (error.message.startsWith('Database error') ||
                error.message.startsWith('Invalid')) {
                throw error;
            }
            throw new Error(`Update operation failed for table "${table}" with id ${id}: ${error.message}`);
        }
    }

    /**
     * Delete a record
     * @param {string} table - Table name
     * @param {*} id - Record ID
     * @returns {Object} Query result
     * @throws {Error} If inputs are invalid or delete fails
     */
    delete(table, id) {
        // Check connection state
        if (!this.connected) {
            throw new Error('Database error: Not connected to database. Call connect() first.');
        }

        // Input validation
        if (!table || typeof table !== 'string') {
            throw new Error('Invalid table name: must be a non-empty string');
        }

        if (table.trim() === '') {
            throw new Error('Invalid table name: cannot be empty');
        }

        // Validate table name to prevent SQL injection
        if (!/^[a-zA-Z_][a-zA-Z0-9_]*$/.test(table)) {
            throw new Error(`Invalid table name: "${table}" contains invalid characters. Use only letters, numbers, and underscores.`);
        }

        if (id === null || id === undefined) {
            throw new Error('Invalid ID: cannot be null or undefined');
        }

        try {
            const sql = `DELETE FROM ${table} WHERE id = $1`;
            return this.query(sql, [id]);
        } catch (error) {
            // Re-throw with context if it's not already our custom error
            if (error.message.startsWith('Database error') ||
                error.message.startsWith('Invalid')) {
                throw error;
            }
            throw new Error(`Delete operation failed for table "${table}" with id ${id}: ${error.message}`);
        }
    }

    /**
     * Disconnect from the database
     * @returns {boolean} True if disconnection successful
     * @throws {Error} If not currently connected or disconnection fails
     */
    disconnect() {
        if (!this.connected) {
            throw new Error('Database error: Not connected to database. Cannot disconnect.');
        }

        try {
            // Simulate disconnection - in real implementation, this would close connection
            this.connected = false;
            return true;
        } catch (error) {
            throw new Error(`Failed to disconnect from database: ${error.message}`);
        }
    }
}

module.exports = Database;
