# User-Product Connection Plan

## Overview

Connect users with the e-commerce product functionality by creating user-specific features.

## Current State

- ✅ Authentication system with MongoDB
- ✅ JWT token management
- ✅ Login/Register pages
- ✅ Middleware for route protection
- ❌ User orders/cart system
- ❌ User profile page
- ❌ User dashboard
- ❌ User-specific product pages

## Required Changes

### 1. Database Models

#### 1.1 Order Model

```javascript
{
  _id: ObjectId,
  userId: ObjectId,
  items: [
    {
      productId: ObjectId,
      name: String,
      price: Number,
      quantity: Number
    }
  ],
  totalAmount: Number,
  status: String, // pending, confirmed, shipped, delivered, cancelled
  createdAt: Date,
  updatedAt: Date
}
```

#### 1.2 Cart Model

```javascript
{
  _id: ObjectId,
  userId: ObjectId,
  items: [
    {
      productId: ObjectId,
      name: String,
      price: Number,
      quantity: Number
    }
  ],
  updatedAt: Date
}
```

#### 1.3 User Profile Model (extend existing User)

```javascript
{
  ...existing fields,
  address: String,
  city: String,
  postalCode: String,
  defaultShippingAddress: Boolean
}
```

### 2. API Routes

#### 2.1 User Orders API

- `GET /api/user/orders` - Get user's orders
- `POST /api/user/orders` - Create new order
- `GET /api/user/orders/[id]` - Get specific order details
- `PUT /api/user/orders/[id]/cancel` - Cancel order

#### 2.2 Cart API

- `GET /api/user/cart` - Get user's cart
- `POST /api/user/cart` - Add item to cart
- `PUT /api/user/cart/[productId]` - Update item quantity
- `DELETE /api/user/cart/[productId]` - Remove item from cart
- `DELETE /api/user/cart` - Clear cart

#### 2.3 User Profile API

- `GET /api/user/profile` - Get user profile
- `PUT /api/user/profile` - Update user profile

### 3. Pages

#### 3.1 User Dashboard

- `/dashboard` - Main user dashboard
- `/dashboard/orders` - Order history
- `/dashboard/cart` - Shopping cart
- `/dashboard/profile` - User profile

#### 3.2 User Profile Page

- `/profile` - User profile management

### 4. Middleware Updates

#### 4.1 Protected Routes

- Update middleware to protect dashboard and profile pages
- Add redirect to login if not authenticated

### 5. Components

#### 5.1 Dashboard Components

- `components/DashboardLayout.js` - Dashboard layout
- `components/OrderCard.js` - Order display card
- `components/CartSummary.js` - Cart summary
- `components/ProfileForm.js` - Profile form

#### 5.2 Product Page Updates

- Add "Add to Cart" button for authenticated users
- Add "Buy Now" functionality
- Show user's cart count in navbar

## File Structure After Changes

```
lib/models/
├── Order.js              # Order model
├── Cart.js               # Cart model
└── index.js              # Model exports

app/api/user/
├── orders/
│   └── route.js          # Get user orders
├── orders/
│   └── [id]/
│       └── route.js      # Get specific order
├── cart/
│   └── route.js          # Cart operations
└── profile/
    └── route.js          # Profile operations

app/dashboard/
├── page.js               # Main dashboard
├── orders/
│   └── page.js           # Order history
├── cart/
│   └── page.js           # Shopping cart
└── profile/
    └── page.js           # Profile management

components/
├── DashboardLayout.js    # Dashboard layout
├── OrderCard.js          # Order display
├── CartSummary.js        # Cart summary
└── ProfileForm.js        # Profile form

middleware.js             # Updated with dashboard protection
```

## User Flow

### Shopping Flow

1. User browses products
2. Clicks "Add to Cart" (auth required)
3. Redirects to cart page
4. Reviews items and proceeds to checkout
5. Places order (creates order in MongoDB)
6. Order status updates (pending → confirmed → shipped → delivered)

### Profile Flow

1. User logs in
2. Accesses profile page
3. Updates personal information
4. Saves changes to database

## Next Steps

1. Create Order and Cart models
2. Create user API routes
3. Create dashboard pages
4. Update middleware for dashboard protection
5. Create dashboard components
6. Add cart functionality to product pages
