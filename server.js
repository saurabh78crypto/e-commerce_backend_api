import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import categoryRoutes from "./routes/categoryRoutes.js";
import subcategoryRoutes from "./routes/subcategoryRoutes.js";
import itemRoutes from "./routes/itemRoutes.js";
import {errorHandler} from "./middleware/errorHandler.js";

// Load environment variables from .env file
dotenv.config();

// Connect to MongoDB database
connectDB();

// Initialize Express application
const app = express(); 

// Middleware to parse JSON bodies in requests
app.use(express.json());

// Define API routes for categories, subcategories, and items
app.use("/api/categories", categoryRoutes);
app.use("/api/subcategories", subcategoryRoutes);
app.use("/api/items", itemRoutes);

// Middleware for centralized error handling
app.use(errorHandler);

// Start the server and listen on the specified port
app.listen(process.env.PORT, () =>
  console.log(`Server running on port ${process.env.PORT}`)
);
