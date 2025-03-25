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