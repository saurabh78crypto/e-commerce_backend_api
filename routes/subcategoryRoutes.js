import express from "express";
import { createSubcategory, editSubcategory, getSubcategories, getSubcategoriesByCategory, getSubcategoryByNameOrId } from "../controllers/subcategoryController.js";

// Creating a new Express Router instance
const router = express.Router();

// Route to create a new subcategory (POST request to "/create")
router.post("/create", createSubcategory);

// Route to get all subcategories (GET request to "/")
router.get("/", getSubcategories);

// Route to get subcategories by category ID (GET request to "/category/:categoryId")
router.get("/category/:categoryId", getSubcategoriesByCategory);

// Route to get a subcategory by its ID (GET request to "/:id")
router.get("/:id", getSubcategoryByNameOrId);

// Route to get a subcategory by its name (GET request to "/name/:name")
router.get("/name/:name", getSubcategoryByNameOrId);

// Route to edit an existing subcategory (PUT request to "/:id")
router.put("/:id", editSubcategory);

export default router;
