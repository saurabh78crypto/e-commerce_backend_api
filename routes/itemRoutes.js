import express from "express";
import { createItem, getItems, getItemsBySubcategory, getItemsByCategory, editItem, searchItemsByName, 
    getItemByIdOrName } from "../controllers/itemController.js";

// Creating a new Express Router instance
const router = express.Router();

// Route to create a new item (POST request to "/create")
router.post("/create", createItem);

// Route to get all items (GET request to "/")
router.get("/", getItems);

// Route to search items by name (GET request to "/search")
router.get("/search", searchItemsByName);

// Route to get items by subcategory ID (GET request to "/subcategory/:subcategoryId")
router.get("/subcategory/:subcategoryId", getItemsBySubcategory);

// Route to get items by category ID (GET request to "/category/:categoryId")
router.get("/category/:categoryId", getItemsByCategory);

// Route to get an item by its ID (GET request to "/:id")
router.get("/:id", getItemByIdOrName);

// Route to get an item by its name (GET request to "/name/:name")
router.get("/name/:name", getItemByIdOrName);

// Route to edit an existing item (PUT request to "/:id")
router.put("/:id", editItem);

export default router;
