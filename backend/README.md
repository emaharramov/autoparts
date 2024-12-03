# Auto Parts Store API Documentation

## Table of Contents
- [Authentication](#authentication)
- [Products](#products)
- [Manufacturers](#manufacturers)
- [Error Handling](#error-handling)

## Authentication

### Register User
```http
POST /api/auth/register
```

Request Body:
```json
{
    "name": "John Doe",
    "email": "john@example.com",
    "password": "Test123!"
}
```

Success Response (200):
```json
{
    "message": "User registered successfully",
    "user": {
        "id": "uuid",
        "name": "John Doe",
        "email": "john@example.com",
        "role": "USER"
    }
}
```

### Login
```http
POST /api/auth/login
```

Request Body:
```json
{
    "email": "john@example.com",
    "password": "Test123!"
}
```

Success Response (200):
```json
{
    "message": "Login successful",
    "token": "jwt_token_here",
    "user": {
        "id": "uuid",
        "name": "John Doe",
        "email": "john@example.com",
        "role": "USER"
    }
}
```

## Products

### Get All Products
```http
GET /api/products?page=1&limit=10&search=toyota&manufacturerId=uuid&minPrice=100&maxPrice=1000&inStock=true
```

Success Response (200):
```json
{
    "products": [
        {
            "id": "uuid",
            "name": "Toyota Brake Pad",
            "description": "Original brake pad for Toyota Camry",
            "oemNumber": "04465-33471",
            "price": 150.00,
            "priceWithKDV": 177.00,
            "stockQuantity": 50,
            "manufacturer": {
                "id": "uuid",
                "name": "Toyota"
            }
        }
    ],
    "pagination": {
        "total": 100,
        "page": 1,
        "limit": 10,
        "totalPages": 10
    }
}
```

### Get Product by ID
```http
GET /api/products/:id
```

Success Response (200):
```json
{
    "id": "uuid",
    "name": "Toyota Brake Pad",
    "description": "Original brake pad for Toyota Camry",
    "oemNumber": "04465-33471",
    "price": 150.00,
    "priceWithKDV": 177.00,
    "stockQuantity": 50,
    "manufacturer": {
        "id": "uuid",
        "name": "Toyota"
    }
}
```

### Create Product (Admin Only)
```http
POST /api/products
```

Request Body:
```json
{
    "name": "Toyota Brake Pad",
    "description": "Original brake pad for Toyota Camry",
    "oemNumber": "04465-33471",
    "price": 150.00,
    "priceWithKDV": 177.00,
    "stockQuantity": 50,
    "manufacturerId": "uuid"
}
```

Success Response (201):
```json
{
    "message": "Product created successfully",
    "product": {
        "id": "uuid",
        "name": "Toyota Brake Pad",
        "description": "Original brake pad for Toyota Camry",
        "oemNumber": "04465-33471",
        "price": 150.00,
        "priceWithKDV": 177.00,
        "stockQuantity": 50,
        "manufacturerId": "uuid"
    }
}
```

### Update Product (Admin Only)
```http
PUT /api/products/:id
```

Request Body:
```json
{
    "price": 160.00,
    "priceWithKDV": 188.80,
    "stockQuantity": 45
}
```

Success Response (200):
```json
{
    "message": "Product updated successfully",
    "product": {
        "id": "uuid",
        "name": "Toyota Brake Pad",
        "price": 160.00,
        "priceWithKDV": 188.80,
        "stockQuantity": 45
    }
}
```

### Delete Product (Admin Only)
```http
DELETE /api/products/:id
```

Success Response (200):
```json
{
    "message": "Product deleted successfully"
}
```

## Manufacturers

### Get All Manufacturers
```http
GET /api/manufacturers
```

Success Response (200):
```json
{
    "manufacturers": [
        {
            "id": "uuid",
            "name": "Toyota",
            "productCount": 150
        }
    ]
}
```

### Get Manufacturer by ID
```http
GET /api/manufacturers/:id
```

Success Response (200):
```json
{
    "id": "uuid",
    "name": "Toyota",
    "productCount": 150,
    "products": [
        {
            "id": "uuid",
            "name": "Toyota Brake Pad",
            "oemNumber": "04465-33471"
        }
    ]
}
```

### Create Manufacturer (Admin Only)
```http
POST /api/manufacturers
```

Request Body:
```json
{
    "name": "Toyota"
}
```

Success Response (201):
```json
{
    "message": "Manufacturer created successfully",
    "manufacturer": {
        "id": "uuid",
        "name": "Toyota"
    }
}
```

### Update Manufacturer (Admin Only)
```http
PUT /api/manufacturers/:id
```

Request Body:
```json
{
    "name": "Toyota Motors"
}
```

Success Response (200):
```json
{
    "message": "Manufacturer updated successfully",
    "manufacturer": {
        "id": "uuid",
        "name": "Toyota Motors"
    }
}
```

### Delete Manufacturer (Admin Only)
```http
DELETE /api/manufacturers/:id
```

Success Response (200):
```json
{
    "message": "Manufacturer deleted successfully"
}
```

## Error Handling

### Validation Errors (400)
```json
{
    "errors": [
        {
            "field": "email",
            "message": "Invalid email address"
        },
        {
            "field": "password",
            "message": "Password must contain at least one uppercase letter, one lowercase letter, and one number"
        }
    ]
}
```

### Authentication Errors (401)
```json
{
    "error": "Unauthorized",
    "message": "Invalid credentials"
}
```

### Authorization Errors (403)
```json
{
    "error": "Forbidden",
    "message": "Admin access required"
}
```

### Not Found Errors (404)
```json
{
    "error": "Not Found",
    "message": "Product not found"
}
```

### Server Errors (500)
```json
{
    "error": "Internal Server Error",
    "message": "Something went wrong"
}
```
