# Health-Check API

A Go-based health check API that monitors website availability and provides detailed health information including SSL certificate details, response times, and more.

## Project Structure

The project has been organized following Go best practices with separation of concerns:

### File Organization

- **`main.go`** - Application entry point and server setup
- **`models.go`** - Data structures and type definitions
- **`handlers.go`** - HTTP request handlers and routing logic
- **`checker.go`** - Core website health checking functionality
- **`utils.go`** - Utility functions for common operations
- **`config.go`** - Configuration constants and application settings

### Architecture Benefits

- **Separation of Concerns**: Each file has a specific responsibility
- **Maintainability**: Easy to locate and modify specific functionality
- **Testability**: Functions are well-organized and can be tested in isolation
- **Readability**: Clean, focused files that are easy to understand
- **Scalability**: Easy to extend with new features

## API Endpoints

### POST /check
Check the health of a single website.

**Request Body:**
```json
{
  "url": "https://example.com"
}
```

**Response:**
```json
{
  "url": "https://example.com",
  "statusCode": 200,
  "duration": 150000000,
  "durationMs": 150.5,
  "alive": true,
  "responseSize": 1234,
  "headers": {
    "Content-Type": "text/html",
    "Server": "nginx"
  },
  "sslInfo": {
    "valid": true,
    "issuer": "Let's Encrypt",
    "subject": "example.com",
    "expiryDate": "2024-12-31T23:59:59Z",
    "daysLeft": 90
  },
  "contentType": "text/html",
  "server": "nginx",
  "timestamp": "2024-08-24T10:30:00Z"
}
```

### POST /batch
Check the health of multiple websites concurrently.

**Request Body:**
```json
{
  "urls": [
    "https://example.com",
    "https://google.com",
    "https://github.com"
  ]
}
```

**Response:**
```json
{
  "results": [
    {
      "url": "https://example.com",
      "statusCode": 200,
      "alive": true,
      // ... other fields
    }
  ],
  "summary": {
    "total": 3,
    "healthy": 2,
    "down": 1
  }
}
```

## Configuration

The application configuration is centralized in `config.go`:

- **Server Port**: `:8080`
- **Request Timeout**: 10 seconds
- **Max Redirects**: 10
- **Max Batch Size**: 50 URLs

## Running the Application

```bash
go run .
```

Or build and run:

```bash
go build -o health-checker
./health-checker
```

## Features

- ✅ Single and batch website health checking
- ✅ SSL certificate validation and expiry information
- ✅ Response time measurement
- ✅ HTTP header analysis
- ✅ Concurrent processing for batch requests
- ✅ CORS support for web applications
- ✅ Automatic URL normalization
- ✅ Detailed error reporting

## Code Quality

The codebase follows Go best practices:

- Clean architecture with separation of concerns
- Proper error handling
- Concurrent processing where appropriate
- Configuration management
- Utility functions for code reuse
- Clear naming conventions
- Comprehensive documentation
