# E-commerce Backend API

This is a backend API for an e-commerce platform that includes categories, subcategories, and items management. The application is built using Node.js, Express, and MongoDB. It provides endpoints for managing categories, subcategories, and items, including CRUD operations.

## Table of Contents

1. [Prerequisites](#prerequisites)
2. [Installation](#installation)
3. [Environment Variables](#environment-variables)
4. [Running the Application](#running-the-application)
5. [API Endpoints](#api-endpoints)

### Prerequisites

To run the application locally, you will need:

- Node.js (v16 or higher)
- npm (v8 or higher)
- MongoDB (either locally or a cloud instance like MongoDB Atlas)
- Postman or any other API testing tool

### Installation

1. Clone the repository:
```bash
git clone https://github.com/saurabh78crypto/e-commerce_backend_api.git
cd e-commerce_backend_api
```

2. Install dependencies:
```bash
npm install
```

### Environment Variables

Create a `.env` file in the root of the project with the following environment variables:
```js
PORT=5000
MONGO_URI=mongodb://localhost:27017/your-database-name
```

- PORT: The port the server will run on (default is 5000).
- MONGO_URI: MongoDB connection string (change your-database-name to your actual database name).

If you're using MongoDB Atlas, you can get the connection string from your MongoDB Atlas account.

### Running the Application

To run the application locally:

1. Start the application:
```bash
npm start
```
This will start the server on the specified PORT (default 5000).

### API Endpoints

### Categories

- POST /api/categories/create: Create a new category.
- GET /api/categories: Get all categories.
- GET /api/categories/:id: Get a category by ID.
- GET /api/categories/name/:name: Get a category by name.
- PUT /api/categories/:id: Edit an existing category.

### Subcategories

- POST /api/subcategories/create: Create a new subcategory.
- GET /api/subcategories: Get all subcategories.
- GET /api/subcategories/category/:categoryId: Get subcategories by category.
- GET /api/subcategories/:id: Get a subcategory by ID.
- GET /api/subcategories/name/:name: Get a subcategory by name.
- PUT /api/subcategories/:id: Edit an existing subcategory.

### Items

- POST /api/items/create: Create a new item.
- GET /api/items: Get all items.
- GET /api/items/subcategory/:subcategoryId: Get items by subcategory.
- GET /api/items/category/:categoryId: Get items by category.
- GET /api/items/:id: Get an item by ID.
- GET /api/items/name/:name: Get an item by name.
- GET /api/items/search: Search items by name.
- PUT /api/items/:id: Edit an existing item.

