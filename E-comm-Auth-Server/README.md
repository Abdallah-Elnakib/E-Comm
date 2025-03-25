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

API Endpoints
Authentication
Method	Endpoint	Description
POST	/login	User login
POST	/signup	User registration
GET	/logout	User logout
GET	/check-user-auth	Check authentication status
Password Management
Method	Endpoint	Description
POST	/forgot-password	Request password reset
POST	/reset-password	Reset user password
User Management
Method	Endpoint	Description
GET	/user/:id	Get user by ID
Address Management
Method	Endpoint	Description
GET	/address/get-all/:user_id	Get all user addresses
DELETE	/address/delete/:user_id	Delete an address
POST	/address/add-address/:user_id	Add new address
PUT	/address/update-address/:user_id	Update address
OTP Operations
Method	Endpoint	Description
POST	/send-otp	Send OTP
POST	/resend-otp	Resend OTP
POST	/verify-otp	Verify OTP
Security Notes
Always use strong secrets (minimum 32 characters)

Never commit .env to version control

In production:

Set NODE_ENV=production

Use HTTPS

Implement rate limiting

Dependencies
Express.js

MongoDB

RabbitMQ

Nodemailer (for email services)

JWT (for token management)


This Markdown version includes:
- Proper headers and sections
- Code blocks for environment variables
- Tables for API endpoints
- Clear formatting for better readability
- Security recommendations
- Dependency information

You can save this as `README.md` in your project root.