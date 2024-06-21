# Order Management System (OMS) for E-Commerce App

## Overview

The Order Management System (OMS) is an essential component of our e-commerce mobile application, designed to handle all aspects of order processing and management. This system allows users to add products to their cart, create orders, apply coupons, and retrieve their order history. It ensures a seamless shopping experience by integrating various functionalities such as viewing, updating, and removing items from the cart, as well as managing order status and applying discounts.

## Prerequisites

- Node.js
- npm or yarn
- PostgreSQL

## Setup Instructions

1. **Clone the repository**

   ```sh
   git clone https://github.com/Sara-Gamal1/OMS-for-e-commerce-app
   cd oms
   ```

2. **Install dependencies**

   ```sh
   npm install
   # or
   yarn install
   ```

3. **Set up the database**

   - Create a PostgreSQL database.
   - Create a `.env` file in the root directory and add the following content, replacing the placeholders with your actual database credentials:
     ```dotenv
     # Database connection
     DATABASE_URL=postgresql://<username>:<password>@<host>:<port>/<database>
     ```
     Replace `<username>`, `<password>`, `<host>`, `<port>`, and `<database>` with your actual PostgreSQL database credentials.

4. **Run database migrations**

   ```sh
   npx prisma migrate dev
   ```

5. **Seed the database**

   ```sh
   node .\prisma\seeds.js
   ```

6. **Start the application**
   ```sh
   npm run start
   # or
   yarn start
   ```

## API Endpoints

### Add to Cart

- **Endpoint**: `POST /api/cart/add`
- **Description**: This endpoint allows users to add a product to their cart. If the product is already in the cart, it updates the quantity (increase it by 1).
- **Request Body**:

  - userId: (number, required): The ID of the user .
  - productId(number, required): The ID of the product to add in the cart.

- **Responses**:

  - Success

    Status: 201 Created

    A successful response returns a JSON object indicating the product has been added or the quantity updated.

  - Error

    - Status: 400 Bad Request

      Returned if the request body is missing required fields or if the product ID is invalid.

    - Status: 404 Not Found

      Returned if the user or product does not exist.

    - Status: 409 Conflict

      Returned if the product stock is insufficient.

### View Cart

- **Endpoint**: `GET /api/cart/:userId`
- **Description**: This endpoint retrieves the cart for a specific user.
- **parameters**:

  - `userId` (number): The ID of the user whose cart is to be retrieved.

- **Responses**:

  - Success

    Status: 200 OK

    The cart has been successfully retrieved.

  - Error

    - Status: 400 Bad Request

      Returned if the request body is missing required fields or if the product ID is invalid.

    - Status: 404 Not Found

      Returned if Cart not found for the user.

### Update Cart

- **Endpoint**: `PUT /api/cart/update`
- **Description**: This endpoint updates the quantity of a product in the user's cart.
- **Request Body**:

  - userId: (number, required): The ID of the user .
  - productId(number, required): The ID of the product to update in the cart.
  - quantity (number, required): The new quantity of the product.

- **Responses**:

  - Success

    Status: 200 OK

    The cart has been successfully updated.

  - Error

    - Status: 400 Bad Request

      Returned if the request body is missing required fields or if the product ID is invalid.

    - Status: 404 Not Found

      Returned if Cart or product not found .

    - Status: 409 conflict

      Returned if Product not in stock with required quantity.

### Remove From Cart

- **Endpoint**: `DELETE /api/cart/remove`
- **Description**: This endpoint removes a product from the user's cart (if quantity is 1 product is removed else product quantity decrease bt 1).
- **Request Body**:

  - userId: (number, required): The ID of the user .
  - productId(number, required): The ID of the product to remove from the cart.

- **Responses**:

  - Success

    Status: 200 OK

    Product removed from cart successfully.

  - Error

    - Status: 400 Bad Request

      Returned if the request body is missing required fields or if the product ID is invalid.

    - Status: 404 Not Found

      Returned if the user or product does not exist.

### Create Order

- **Endpoint**: `POST /api/orders`
- **Description**: This endpoint creates a new order for the specified user with the products in their cart. It verifies product availability and quantity before processing the order.
- **Request Body**:

  - userId: (number, required): The ID of the user .
- **Responses**:

  - Success

    Status: 201 CREATED

    The created order successfully.

  - Error

    - Status: 400 Bad Request

      Returned if the request body is missing required fields or contains invalid data.

    - Status: 404 Not Found

      Returned if the user's cart is empty or the specified user ID does not exist.

     - Status: 409 conflict

       Returned if any product in the cart is not in stock or the quantity requested exceeds available stock.

### Get Order 
- **Endpoint**: `GET /api/orders/:orderId`
- **Description**: This endpoint retrieves the details of a specific order by its order ID.
- **Parameters**:

  - `orderID` (number): The ID of the order .
- **Responses**:

  - Success

    Status: 200 OK

    A successful response returns a JSON object with details of the order.

  - Error

    - Status: 404 Not Found

      Returned if the order with the specified orderId does not exist..
### Apply Coupon to Order
- **Endpoint**: `POST /api/orders/apply-coupon`
- **Description**:  Applies a coupon to an order to apply a discount. Each order can have only one coupon applied at a time.
- **Request Body**:

  - orderID: (number, required): The code of the coupon to apply .
  - couponCode: (string, required): The ID of the user .

- **Responses**:

  - Success

    Status: 200 OK

    Returns a JSON object containing the updated order details.

  - Error

    - Status: 404 Not Found

      Returned if the order with the specified orderId does not exist.
    - Status: 400 Bad request

      Returned if the request body is missing the couponCode or orderId fields or  if the order already has a coupon applied or if the provided couponCode is invalid.

### Update Order Status
- **Endpoint**: `PUT /api/orders/:orderId/status`
- **Description**: Updates the status of a specific order identified by orderId.
- **Parameters**:

  - `orderId` (number): The ID of the order .
- **Request Body**:

  - status: (enum, required): The updated status of the order. Possible values are CANCELLED, PROCESSING , DELIVERED .

- **Responses**:

  - Success

    Status: 200 OK

    Returns a JSON object containing the updated order details.

  - Error

    - Status: 404 Not Found

      Returned if the order with the specified orderId does not exist.
    - Status: 400 Bad request

      Returned if the request body is missing the status field or if the provided status value is invalid.

### Get History of orders
- **Endpoint**: `GET /api/users/:userId/orders`
- **Description**: Retrieves a list of orders associated with a specific user identified by userId.
- **Parameters**:

  -`userId` (number): The unique identifier of the user whose orders are to be retrieved.

- **Responses**:

  - Success

    Status: 200 OK

    A successful response returns a JSON array containing details of the user's orders.

  - Error

    - Status: 404 Not Found

      Returned if the user with the specified userId does not exist or if no orders are associated with the user.

