import express from "express";
import { createCategory, editCategory, getCategories, getCategoryByNameOrId } from "../controllers/categoryController.js";

// Creating a new Express Router instance
const router = express.Router();

// Route to create a new category (POST request to "/create")
router.post("/create", createCategory);

// Route to get all categories (GET request to "/")
router.get("/", getCategories);

// Route to get a category by its ID (GET request to "/:id")
router.get("/:id", getCategoryByNameOrId);

// Route to get a category by its name (GET request to "/name/:name")
router.get("/name/:name", getCategoryByNameOrId);

// Route to edit an existing category (PUT request to "/:id")
router.put("/:id", editCategory);

export default router;
