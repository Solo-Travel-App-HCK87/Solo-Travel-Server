# Solo Travel Server API Documentation

**Version:** 1.00  
**Base URL:** `https://solo-travel.harryrismananda.site/`  
**Local URL:** `http://localhost:3000`

## Table of Contents
1. [Overview](#overview)
2. [Authentication](#authentication)
3. [Global Error Handling](#global-error-handling)
4. [User Management](#user-management)
5. [Travel Packages](#travel-packages)
6. [Transactions](#transactions)
7. [Real-time Chat](#real-time-chat)
8. [Status Codes](#status-codes)

## Overview

The Solo Travel Server API provides endpoints for managing travel packages, user authentication, transactions, and real-time chat functionality for travelers. All protected endpoints require JWT authentication.

## Authentication

Authentication is required for most endpoints using Bearer tokens. Include the token in the Authorization header:
```
Authorization: Bearer <your-jwt-token>
```

### Register User
- **URL:** `/register`
- **Method:** `POST`
- **Authentication:** Not required
- **Description:** Register a new user account

#### Request Body
```json
{
  "firstName": "string",
  "lastName": "string", 
  "email": "string",
  "password": "string"
}
```

#### Success Response
- **Status:** `201 Created`
```json
{
  "id": 1,
  "firstName": "John",
  "lastName": "Doe",
  "email": "john@example.com"
}
```

#### Error Responses
- **Status:** `400 Bad Request` - Validation errors
```json
{
  "message": ["Validation error details"]
}
```
- **Status:** `400 Bad Request` - Email already exists
```json
{
  "message": "Email already exists"
}
```

### Login User
- **URL:** `/login`
- **Method:** `POST`
- **Authentication:** Not required
- **Description:** Login user and receive JWT token

#### Request Body
```json
{
  "email": "string",
  "password": "string"
}
```

#### Success Response
- **Status:** `200 OK`
```json
{
  "access_token": "jwt-token-string"
}
```

#### Error Responses
- **Status:** `400 Bad Request` - Email is required
```json
{
  "message": "Email is required"
}
```
- **Status:** `400 Bad Request` - Password is required
```json
{
  "message": "Password is required"
}
```
- **Status:** `401 Unauthorized` - Invalid email or password
```json
{
  "message": "Invalid email or password"
}
```

## Global Error Handling

The API uses consistent error handling across all endpoints. All errors return a JSON response with a `message` field.

### Common Error Types

| Status Code | Error Type | Description |
|-------------|------------|-------------|
| `400 Bad Request` | Bad Request | Invalid request data, validation failed, or business logic error |
| `401 Unauthorized` | Unauthorized | Authentication required, invalid token, or authentication failed |
| `404 Not Found` | Not Found | Requested resource not found |
| `500 Internal Server Error` | Internal Server Error | Unexpected server error |

### Error Response Format
```json
{
  "message": "Error description"
}
```

## User Management

### Get User Profile
- **URL:** `/profile`
- **Method:** `GET`
- **Authentication:** Required
- **Description:** Get current user profile information

#### Success Response
- **Status:** `200 OK`
```json
{
  "id": 1,
  "firstName": "John",
  "lastName": "Doe",
  "email": "john@example.com",
  "ImageUrl": "https://cloudinary.com/image.jpg"
}
```

#### Error Responses
- **Status:** `401 Unauthorized` - Invalid token
```json
{
  "message": "Invalid token error"
}
```

### Update User Profile Image
- **URL:** `/profile/image`
- **Method:** `PATCH`
- **Authentication:** Required
- **Content-Type:** `multipart/form-data`
- **Description:** Upload and update user profile image

#### Request Body
- **Form Data:** `ImageUrl` (file)

#### Success Response
- **Status:** `200 OK`
```json
{
  "message": "User image updated successfully",
  "ImageUrl": "https://cloudinary.com/new-image.jpg"
}
```

#### Error Responses
- **Status:** `400 Bad Request` - Image is required
```json
{
  "message": "Image is required"
}
```
- **Status:** `401 Unauthorized` - User not found
```json
{
  "message": "User not found"
}
```

## Travel Packages

### Get All Packages
- **URL:** `/packages`
- **Method:** `GET`
- **Authentication:** Required
- **Description:** Get list of all travel packages with optional search and sorting

#### Query Parameters
- `search` (optional): Search by destination name or location
- `sort` (optional): Sort by current_price ("ASC" or "DESC")

#### Success Response
- **Status:** `200 OK`
```json
[
  {
    "id": 1,
    "destination_name": "Bali Adventure",
    "location": "Bali, Indonesia",
    "current_price": 1500000,
    "original_price": 2000000,
    "available_slots": 10,
    "departure_date": "2025-12-01",
    "return_date": "2025-12-07",
    "ImageUrl": "https://example.com/bali.jpg",
    "highlight": "Beach and Culture Tour"
  }
]
```

### Get Package by ID
- **URL:** `/packages/:id`
- **Method:** `GET`
- **Authentication:** Required
- **Description:** Get detailed information about a specific travel package including AI-generated preparation recommendations

#### Path Parameters
- `id`: Package ID

#### Success Response
- **Status:** `200 OK`
```json
{
  "id": 1,
  "destination_name": "Bali Adventure",
  "location": "Bali, Indonesia",
  "current_price": 1500000,
  "original_price": 2000000,
  "available_slots": 10,
  "departure_date": "2025-12-01",
  "return_date": "2025-12-07",
  "ImageUrl": "https://example.com/bali.jpg",
  "highlight": "Beach and Culture Tour",
  "preparation_docs": ["Passport", "Visa", "Travel Insurance"],
  "preparation_clothing": ["Light clothes", "Swimwear", "Hat", "Sandals", "Jacket"],
  "preparation_essentials": ["Sunscreen", "Mosquito repellent", "Camera", "Phone charger", "Medications"],
  "preparation_electronics": ["Camera", "Phone", "Charger", "Power bank", "Headphones"],
  "Transactions": [
    {
      "id": 1,
      "UserId": 1,
      "TravelPackageId": 1,
      "OrderId": 1,
      "User": {
        "firstName": "John",
        "lastName": "Doe"
      }
    }
  ]
}
```

#### Error Responses
- **Status:** `404 Not Found` - Package not found
```json
{
  "message": "Package not found"
}
```

### Get My Packages
- **URL:** `/my-packages`
- **Method:** `GET`
- **Authentication:** Required
- **Description:** Get all packages purchased by the current user

#### Success Response
- **Status:** `200 OK`
```json
[
  {
    "id": 1,
    "UserId": 1,
    "TravelPackageId": 1,
    "OrderId": 1,
    "createdAt": "2025-09-24T00:00:00.000Z",
    "updatedAt": "2025-09-24T00:00:00.000Z",
    "TravelPackage": {
      "id": 1,
      "destination_name": "Bali Adventure",
      "location": "Bali, Indonesia",
      "current_price": 1500000,
      "original_price": 2000000,
      "available_slots": 9,
      "departure_date": "2025-12-01",
      "return_date": "2025-12-07",
      "ImageUrl": "https://example.com/bali.jpg"
    }
  }
]
```

## Transactions

### Create Transaction (Buy Package)
- **URL:** `/buys/:packagesId`
- **Method:** `POST`
- **Authentication:** Required
- **Description:** Purchase a travel package

#### Path Parameters
- `packagesId`: Travel package ID to purchase

#### Success Response
- **Status:** `201 Created`
```json
{
  "id": 1,
  "TravelPackageId": 1,
  "UserId": 1,
  "OrderId": 1,
  "createdAt": "2025-09-24T00:00:00.000Z",
  "updatedAt": "2025-09-24T00:00:00.000Z"
}
```

#### Error Responses
- **Status:** `404 Not Found` - Package not found
```json
{
  "message": "Package not found"
}
```
- **Status:** `400 Bad Request` - No available slots
```json
{
  "message": "Stocks book is empty"
}
```
- **Status:** `400 Bad Request` - Package already purchased
```json
{
  "message": "You already buy this package please choose another Travel Package"
}
```

## Real-time Chat

The API includes WebSocket functionality for real-time chat in travel groups.

### Socket.IO Connection
- **URL:** `wss://solo-travel.harryrismananda.site/`
- **Local URL:** `ws://localhost:3000`
- **Authentication:** Required via `access_token` in handshake auth
- **Description:** Real-time messaging for travel groups

#### Connection Parameters
```javascript
{
  auth: {
    access_token: "your-jwt-token",
    roomId: "travel-package-id"
  }
}
```

#### Events

##### Listen for Messages
- **Event:** `travel:{roomId}`
- **Description:** Receive chat messages for a specific travel package

##### Send Message
- **Event:** `chat_message`
- **Payload:**
```json
{
  "message": "Hello everyone!"
}
```

##### Online Users
- **Event:** `users_online:{roomId}`
- **Description:** Get list of currently online users in the chat room

## Status Codes

### Success Codes
- `200 OK` - Request successful
- `201 Created` - Resource created successfully

### Client Error Codes
- `400 Bad Request` - Invalid request data or business logic error
- `401 Unauthorized` - Authentication required or failed
- `404 Not Found` - Resource not found

### Server Error Codes
- `500 Internal Server Error` - Unexpected server error

## Notes

1. All timestamps are in ISO 8601 format
2. Prices are in Indonesian Rupiah (IDR)
3. Image uploads are processed through Cloudinary
4. AI-generated preparation recommendations are created using Google's Gemini AI
5. Each user can only purchase one instance of each travel package
6. Available slots are decremented automatically upon purchase
7. Real-time chat requires WebSocket connection with valid JWT token