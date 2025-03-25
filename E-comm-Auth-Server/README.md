# Authentication Service API

## Overview
This service handles user authentication, authorization, and profile management including address operations.

## Setup

### Prerequisites
- Node.js (v14+)
- MongoDB
- RabbitMQ
- npm/yarn

### Installation
1. Clone the repository
2. Install dependencies:
   ```bash
   npm install

   ```
# Database
MONGO_URI="mongodb+srv://<username>:<password>@cluster0.0fhiu.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"

# Security
ACCESS_TOKEN_SECRET="your_access_token_secret"
REFRESH_TOKEN_SECRET="your_refresh_token_secret"
RESET_PASSWORD_SECRET="your_reset_password_secret"
SESSION_SECRET="your_session_secret"

# Email
VALIDATION_EMAIL_API_KEY="https://emailvalidation.abstractapi.com/v1/?api_key=your_api_key&email="
EMAIL_USER="your_email@gmail.com"
EMAIL_PASS="your_email_app_password"

# Service Configuration
ENDPOINTAUTH="http://auth-service:3000"
PORT=3000
NODE_ENV="development"

# RabbitMQ
RABBITMQ_URL="amqp://<username>:<password>@rabbitmq:5672/"

# Basic Auth
CHECK_REQUEST_AUTHENTICATION_USERNAME="basic_auth_username"
CHECK_REQUEST_AUTHENTICATION_PASSWORD="basic_auth_password"

# Authentication Service API Endpoints

## Base URL
`http://localhost:3000/api/auth`

---

## Authentication Endpoints

### Login
**POST** `/login`

**Request:**
```json
{
  "email": "user@example.com",
  "password": "securePassword123"
}
```
**Success Response:**

```json

{
  "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "5f8d0d55b54764421b7166f3",
    "email": "user@example.com"
  }
}
```
**Error Response:**

```json

{
  "error": "Invalid credentials",
  "statusCode": 401
}
```

# Add New Address Endpoint

## `POST /address/add-address/:user_id`

Adds a new address to a user's profile.

---

## Request

### URL Parameters
| Parameter | Type   | Required | Description          |
|-----------|--------|----------|----------------------|
| user_id   | string | Yes      | The ID of the user   |


### Request Body
```json
{
  "address": {
    "street": "123 Main St",
    "city": "New York",
    "state": "NY",
    "zip": "10001"
  }
}
```

### Response
```json
{
  "Address": [
    {
      "street": "123 Main St",
      "city": "New York",
      "state": "NY",
      "zip": "10001"
    },
    ...other_addresses
  ]
}
```

### Error Responses

### Invalid User ID (401 Unauthorized)

```json

{
  "message": "Invalid User ID"
}
```

### Missing Fields (400 Bad Request)

```json

{
  "message": "All address fields are required"
}
```

### Server Error (500 Internal Server Error)

```json

{
  "message": "Internal server error"
}
```

# Check User Authentication Endpoint

## `GET /check-user-auth`

Verifies a user's authentication status by validating their refresh token.

---

## Request


### Session Requirements
- Must have a valid `refreshToken` stored in session

---

## Responses

### Success (200 OK)
```json
{
  "message": {
    "userInfo": {
      "userId": "5f8d0d55b54764421b7166f3",
      "email": "user@example.com",
      "roles": ["user"]
    }
  }
}
```

### Missing Token (401 Unauthorized)
```json
{
  "message": "Unauthorized"
}
```

### Invalid Token (401 Unauthorized)
```json
{
  "message": "Unauthorized"
}
```
### Server Error (500 Internal Server Error)
```json
{
  "message": "Internal server error"
}
```

# Delete Address by ID Endpoint

## `DELETE /address/delete/:user_id`

Deletes a specific address from a user's address list by its index number.

---

## Request

### URL Parameters
| Parameter | Type   | Required | Description          |
|-----------|--------|----------|----------------------|
| user_id   | string | Yes      | The ID of the user   |

### Request Body
```json
{
  "addressNumber": 1
}
```

### Success (200 OK)

```json

{
  "message": "Address deleted successfully"
}
```

### Error Responses
Invalid User ID (401 Unauthorized)

```json

{
  "message": "Invalid User ID"
}
```

### Missing Address Number (400 Bad Request)

```json

{
  "message": "Address Number is required"
}
```
### Invalid Address Number (401 Unauthorized)

```json
{
  "message": "Invalid Address Number"
}
```
### Last Address Protection (401 Unauthorized)

```json
{
  "message": "The address cannot be deleted before adding another address."
}
```
### Server Error (500 Internal Server Error)

```json

{
  "message": "Internal server error"
}
```

