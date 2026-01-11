# Error Handling Best Practices

A comprehensive demonstration of error handling patterns in JavaScript, showcasing robust input validation, clear error messages, and production-ready error handling across different types of operations.

## Overview

This project contains four modules that demonstrate best practices for error handling in JavaScript:

- **file_operations.js** - File system operations with comprehensive error handling
- **api_client.js** - HTTP client with retry logic and error handling
- **data_processor.js** - Data processing with validation and error handling
- **database.js** - Database operations with SQL injection prevention

## Features

✅ **Comprehensive Input Validation** - All functions validate inputs before processing
✅ **Clear Error Messages** - Specific, actionable error messages that help debugging
✅ **Type Safety** - Type checking for all function parameters
✅ **State Validation** - Ensures operations happen in the correct state
✅ **Security** - SQL injection prevention and input sanitization
✅ **Retry Logic** - Exponential backoff for network operations
✅ **Async Error Handling** - Proper error handling for Promises
✅ **JSDoc Documentation** - Complete documentation with @throws tags

## Modules

### file_operations.js

Handles file system operations with error handling for:
- File existence checks
- Directory validation
- JSON parsing errors
- Path validation
- File/directory type checking

Functions:
- `readJSONFile(filePath)` - Read and parse JSON files
- `writeJSONFile(filePath, data)` - Write JSON data to files
- `copyFile(source, destination)` - Copy files with validation
- `deleteFile(filePath)` - Safely delete files
- `getFileSize(filePath)` - Get file size with validation

### api_client.js

HTTP client with comprehensive error handling:
- URL validation
- HTTP status code handling
- Network error handling
- Timeout support
- JSON parsing errors
- Retry logic with exponential backoff

Functions:
- `fetchData(url, timeout)` - Fetch data from API endpoints
- `postData(url, payload, timeout)` - POST data to API endpoints
- `fetchWithRetry(url, maxRetries, retryDelay, timeout)` - Fetch with automatic retries

### data_processor.js

Data processing with validation:
- Array validation
- Type checking
- Division by zero prevention
- Email validation
- Configuration parsing
- Callback validation

Functions:
- `processUserData(users)` - Process user data with statistics
- `validateEmail(email)` - Email format validation
- `parseConfig(configString)` - Parse and validate JSON config
- `calculatePercentage(part, total)` - Safe percentage calculation
- `extractDomain(email)` - Extract domain from email
- `findUserById(users, id)` - Find user with validation
- `batchProcess(items, batchSize, callback)` - Batch processing with error handling

### database.js

Database operations with security:
- Connection state management
- SQL injection prevention
- Table/column name validation
- Parameterized queries
- Operation-specific validation

Methods:
- `constructor(connectionString)` - Create database instance
- `connect()` - Connect to database
- `query(sql, params)` - Execute parameterized queries
- `insert(table, data)` - Insert with validation
- `update(table, id, data)` - Update with validation
- `delete(table, id)` - Delete with validation
- `disconnect()` - Disconnect from database

## Documentation

See [ERROR_HANDLING_GUIDE.md](./ERROR_HANDLING_GUIDE.md) for:
- Detailed error handling patterns
- Code examples
- Best practices
- Testing guidelines

## Error Handling Patterns Used

1. **Input Validation** - Validate all inputs before processing
2. **Try-Catch with Context** - Add context when catching errors
3. **Specific Error Handling** - Different errors for different scenarios
4. **State Validation** - Check state before operations
5. **Range and Boundary Checks** - Validate numeric ranges
6. **Array Validation** - Check arrays and their contents
7. **Async Error Handling** - Proper Promise error handling
8. **Retry Logic** - Exponential backoff for transient failures
9. **SQL Injection Prevention** - Input sanitization for database operations

## Usage Examples

### File Operations
```javascript
const { readJSONFile } = require('./file_operations');

try {
    const config = readJSONFile('./config.json');
    console.log('Config loaded:', config);
} catch (error) {
    console.error('Failed to load config:', error.message);
}
```

### API Client
```javascript
const { fetchWithRetry } = require('./api_client');

try {
    const data = await fetchWithRetry('https://api.example.com/data', 3);
    console.log('Data:', data);
} catch (error) {
    console.error('API error:', error.message);
}
```

### Data Processing
```javascript
const { calculatePercentage } = require('./data_processor');

try {
    const percent = calculatePercentage(75, 100);
    console.log('Result:', percent + '%');
} catch (error) {
    console.error('Calculation error:', error.message);
}
```

### Database Operations
```javascript
const Database = require('./database');

const db = new Database('postgresql://localhost/mydb');

try {
    db.connect();
    db.insert('users', { name: 'John', email: 'john@example.com' });
    db.disconnect();
} catch (error) {
    console.error('Database error:', error.message);
}
```

## Key Principles

1. **Fail Fast** - Detect errors early and report them immediately
2. **Clear Messages** - Error messages explain what went wrong and how to fix it
3. **Context Matters** - Include relevant information in error messages
4. **Type Safety** - Validate types to prevent runtime errors
5. **Security First** - Prevent injection attacks and validate inputs
6. **User Friendly** - Errors should help users understand and fix issues

## Benefits

- **Easier Debugging** - Clear error messages save time
- **Better Security** - Input validation prevents attacks
- **More Reliable** - Early error detection prevents cascading failures
- **Maintainable** - Explicit error handling makes code easier to understand
- **Production Ready** - Robust error handling for real-world applications

## License

MIT