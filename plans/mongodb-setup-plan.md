# MongoDB Integration Plan

## Overview

Upgrade the Next.js e-commerce project to use MongoDB for authentication and data storage.

## Current State

- Next.js 14 with App Router
- Has `.env.example` with `DATABASE_URL` placeholder
- Has `docker-compose.yml` without MongoDB service
- Has `kavenegar` package for SMS notifications

## Required Changes

### 1. Install Dependencies

```bash
npm install mongodb bcrypt jsonwebtoken
npm install -D @types/bcrypt @types/jsonwebtoken
```

### 2. Update Environment Configuration

- Update `.env.example` with MongoDB connection string format
- Add JWT_SECRET and other auth-related environment variables

### 3. Update Docker Configuration

- Add MongoDB service to `docker-compose.yml`
- Configure MongoDB container with proper ports and volumes

### 4. Create Database Infrastructure

#### 4.1 MongoDB Connection Utility

- Create `lib/db.js` - Singleton pattern for database connection
- Implement connection pooling
- Add error handling and reconnection logic

#### 4.2 Database Models

- Create `lib/models/User.js` - User schema and methods
- Create `lib/models/Otp.js` - OTP schema and methods
- Create `lib/models/index.js` - Export all models

### 5. Update Authentication APIs

#### 5.1 Send OTP API (`app/api/auth/send-otp/route.js`)

- Store OTP in MongoDB with expiry time (5 minutes)
- Generate random 6-digit OTP
- Return success response

#### 5.2 Verify OTP API (`app/api/auth/verify-otp/route.js`)

- Verify OTP against stored value
- Check expiry time
- Return verification result

#### 5.3 Register API (`app/api/auth/register/route.js`)

- Check if user already exists
- Hash password using bcrypt
- Store new user in MongoDB
- Generate JWT token

#### 5.4 Login API (`app/api/auth/login/route.js`)

- Verify credentials against MongoDB
- Generate JWT token on success
- Return user data and token

### 6. Database Setup Script

- Create `lib/db-init.js` - Initialize collections and indexes
- Create `scripts/init-db.js` - Run setup script

## File Structure After Changes

```
lib/
├── db.js                    # MongoDB connection
├── models/
│   ├── User.js             # User model
│   ├── Otp.js              # OTP model
│   └── index.js            # Model exports
└── utils/
    ├── jwt.js              # JWT utilities
    └── password.js         # Password hashing utilities

scripts/
└── init-db.js              # Database initialization

app/api/auth/
├── send-otp/
│   └── route.js            # Updated to use MongoDB
├── verify-otp/
│   └── route.js            # Updated to use MongoDB
├── register/
│   └── route.js            # Updated to use MongoDB
└── login/
    └── route.js            # Updated to use MongoDB
```

## Environment Variables Required

```env
# Database Connection
DATABASE_URL=mongodb://localhost:27017/digikala-clone

# JWT Configuration
JWT_SECRET=your-secret-key-here
JWT_EXPIRES_IN=7d

# MongoDB (for Docker)
MONGO_INITDB_ROOT_USERNAME=admin
MONGO_INITDB_ROOT_PASSWORD=password
```

## Database Schema

### User Collection

```javascript
{
  _id: ObjectId,
  name: String,
  phone: String,
  password: String,  // hashed
  createdAt: Date,
  updatedAt: Date
}
```

### Otp Collection

```javascript
{
  _id: ObjectId,
  phone: String,
  otp: String,
  createdAt: Date,
  expiresAt: Date
}
```

## Next Steps

1. Install required packages
2. Update environment configuration
3. Update Docker configuration
4. Create database infrastructure
5. Update authentication APIs
6. Test the integration
