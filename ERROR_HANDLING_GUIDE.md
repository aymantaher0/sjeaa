# Error Handling Guide

This project demonstrates comprehensive error handling patterns in JavaScript. Each module showcases best practices for handling different types of errors with clear, actionable error messages.

## Table of Contents

1. [Error Handling Principles](#error-handling-principles)
2. [Module Overview](#module-overview)
3. [Error Handling Patterns](#error-handling-patterns)
4. [Examples](#examples)

## Error Handling Principles

### 1. Input Validation
- **Always validate inputs** before processing
- Check for null, undefined, and type correctness
- Validate data ranges and formats
- Provide specific error messages about what's wrong

### 2. Clear Error Messages
- Include the **what, where, and why** of errors
- Specify the expected vs. actual values
- Provide actionable guidance for fixing the issue
- Include relevant context (file paths, URLs, etc.)

### 3. Fail Fast
- Detect and report errors as early as possible
- Don't let invalid data propagate through the system
- Validate at system boundaries (user input, API calls, file I/O)

### 4. Specific Error Types
- Use descriptive error messages that identify the problem
- Distinguish between different error scenarios
- Preserve the error context when re-throwing

### 5. Error Propagation
- Re-throw errors with additional context when needed
- Don't swallow errors silently
- Let errors bubble up with meaningful information

## Module Overview

### file_operations.js
Handles file system operations with robust error handling for:
- File not found scenarios
- Invalid file paths
- JSON parsing errors
- Directory validation
- Permission issues

### api_client.js
Manages HTTP requests with error handling for:
- Invalid URLs
- Network failures
- HTTP status codes
- Timeouts
- JSON parsing failures
- Retry logic with exponential backoff

### data_processor.js
Processes data with validation for:
- Empty or invalid arrays
- Type mismatches
- Division by zero
- Missing required fields
- Invalid email formats
- Callback validation

### database.js
Database operations with error handling for:
- Connection state validation
- SQL injection prevention
- Invalid table/column names
- Required field validation
- Operation-specific errors

## Error Handling Patterns

### Pattern 1: Input Validation

```javascript
function processData(input) {
    // Check for null/undefined
    if (!input) {
        throw new Error('Invalid input: input cannot be null or undefined');
    }

    // Check type
    if (typeof input !== 'string') {
        throw new Error(`Invalid input: expected string, got ${typeof input}`);
    }

    // Check format/content
    if (input.trim() === '') {
        throw new Error('Invalid input: cannot be empty');
    }

    // Continue with processing...
}
```

### Pattern 2: Try-Catch with Context

```javascript
function readFile(filePath) {
    try {
        const data = fs.readFileSync(filePath, 'utf8');
        return data;
    } catch (error) {
        throw new Error(`Failed to read file ${filePath}: ${error.message}`);
    }
}
```

### Pattern 3: Specific Error Handling

```javascript
function parseJSON(jsonString) {
    // Validate input first
    if (!jsonString || typeof jsonString !== 'string') {
        throw new Error('Invalid input: must provide a non-empty string');
    }

    // Parse with specific error handling
    try {
        return JSON.parse(jsonString);
    } catch (parseError) {
        throw new Error(`Failed to parse JSON: ${parseError.message}`);
    }
}
```

### Pattern 4: State Validation

```javascript
class Connection {
    query(sql) {
        // Validate state before operation
        if (!this.connected) {
            throw new Error('Not connected: call connect() first');
        }

        // Continue with operation...
    }
}
```

### Pattern 5: Range and Boundary Checks

```javascript
function calculatePercentage(part, total) {
    // Type validation
    if (typeof part !== 'number' || typeof total !== 'number') {
        throw new Error('Invalid input: part and total must be numbers');
    }

    // Division by zero check
    if (total === 0) {
        throw new Error('Invalid input: total cannot be zero');
    }

    // Infinity check
    if (!isFinite(part) || !isFinite(total)) {
        throw new Error('Invalid input: values must be finite numbers');
    }

    return (part / total) * 100;
}
```

### Pattern 6: Array Validation

```javascript
function processUsers(users) {
    // Check if array
    if (!Array.isArray(users)) {
        throw new Error('Invalid input: users must be an array');
    }

    // Check if empty
    if (users.length === 0) {
        throw new Error('Invalid input: users array cannot be empty');
    }

    // Validate each element
    for (let i = 0; i < users.length; i++) {
        if (!users[i] || typeof users[i] !== 'object') {
            throw new Error(`Invalid user at index ${i}: must be an object`);
        }
    }

    // Continue processing...
}
```

### Pattern 7: Async Error Handling

```javascript
async function fetchData(url) {
    return new Promise((resolve, reject) => {
        // Input validation
        if (!url || typeof url !== 'string') {
            return reject(new Error('Invalid URL'));
        }

        const req = https.get(url, (res) => {
            // Check status code
            if (res.statusCode !== 200) {
                return reject(new Error(`HTTP ${res.statusCode}: Request failed`));
            }

            // Handle response...
            res.on('error', (error) => {
                reject(new Error(`Response error: ${error.message}`));
            });
        });

        // Handle request errors
        req.on('error', (error) => {
            reject(new Error(`Network error: ${error.message}`));
        });
    });
}
```

### Pattern 8: Retry Logic with Exponential Backoff

```javascript
async function fetchWithRetry(url, maxRetries = 3) {
    const errors = [];

    for (let attempt = 0; attempt <= maxRetries; attempt++) {
        try {
            return await fetchData(url);
        } catch (error) {
            errors.push(`Attempt ${attempt + 1}: ${error.message}`);

            if (attempt < maxRetries) {
                // Exponential backoff: 1s, 2s, 4s...
                const delay = 1000 * Math.pow(2, attempt);
                await new Promise(resolve => setTimeout(resolve, delay));
            }
        }
    }

    throw new Error(`Failed after ${maxRetries + 1} attempts:\n${errors.join('\n')}`);
}
```

### Pattern 9: SQL Injection Prevention

```javascript
function insert(table, data) {
    // Validate table name with regex
    if (!/^[a-zA-Z_][a-zA-Z0-9_]*$/.test(table)) {
        throw new Error(`Invalid table name: contains invalid characters`);
    }

    // Validate column names
    for (const key of Object.keys(data)) {
        if (!/^[a-zA-Z_][a-zA-Z0-9_]*$/.test(key)) {
            throw new Error(`Invalid column name: "${key}"`);
        }
    }

    // Use parameterized queries
    const sql = `INSERT INTO ${table} (${keys}) VALUES (${placeholders})`;
    return this.query(sql, values);
}
```

## Examples

### Example 1: File Operations
```javascript
const { readJSONFile } = require('./file_operations');

try {
    const data = readJSONFile('/path/to/config.json');
    console.log('Config loaded:', data);
} catch (error) {
    console.error('Failed to load config:', error.message);
    // Error message will be clear: "File not found: /path/to/config.json"
    // or "Failed to parse JSON from /path/to/config.json: Unexpected token..."
}
```

### Example 2: API Client
```javascript
const { fetchData } = require('./api_client');

try {
    const data = await fetchData('https://api.example.com/data');
    console.log('Data received:', data);
} catch (error) {
    console.error('API request failed:', error.message);
    // Error message will indicate: network error, timeout, HTTP error, or JSON parse error
}
```

### Example 3: Data Processing
```javascript
const { calculatePercentage } = require('./data_processor');

try {
    const percentage = calculatePercentage(75, 100);
    console.log('Percentage:', percentage); // 75
} catch (error) {
    console.error('Calculation failed:', error.message);
}

// This will throw with clear message
try {
    calculatePercentage(50, 0); // Division by zero
} catch (error) {
    console.error(error.message);
    // "Invalid input: total cannot be zero (division by zero)"
}
```

### Example 4: Database Operations
```javascript
const Database = require('./database');

const db = new Database('postgresql://localhost/mydb');

try {
    db.connect();

    // Insert with validation
    db.insert('users', {
        name: 'John Doe',
        email: 'john@example.com'
    });

    // This will fail with clear error
    db.insert('users; DROP TABLE users;--', { name: 'Hacker' });
    // Error: "Invalid table name: contains invalid characters"

    db.disconnect();
} catch (error) {
    console.error('Database error:', error.message);
}
```

## Best Practices Summary

1. **Validate Early**: Check inputs at function boundaries
2. **Be Specific**: Provide detailed, actionable error messages
3. **Preserve Context**: Include relevant information in error messages
4. **Fail Loudly**: Don't hide errors; let them surface with clear messages
5. **Use Types**: Leverage JSDoc comments to document expected types
6. **Test Error Paths**: Write tests that verify error handling works correctly
7. **Log Appropriately**: Log errors with sufficient context for debugging
8. **Handle Async Errors**: Use proper error handling for promises and async/await
9. **Prevent Security Issues**: Validate and sanitize inputs to prevent injection attacks
10. **Document Errors**: Use @throws tags in JSDoc to document possible errors

## Testing Error Handling

When testing these functions, verify:
- ✅ Functions reject null/undefined inputs
- ✅ Functions reject wrong types
- ✅ Functions reject invalid formats
- ✅ Functions reject out-of-range values
- ✅ Error messages are clear and actionable
- ✅ Error messages include context
- ✅ Errors don't expose sensitive information

## Conclusion

Good error handling makes your code:
- **More reliable**: Catches issues early
- **Easier to debug**: Clear messages point to the problem
- **More secure**: Validates inputs and prevents injection
- **More maintainable**: Explicit about what can go wrong
- **User-friendly**: Provides actionable feedback

Remember: **A good error message is worth a thousand debugging sessions!**
