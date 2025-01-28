import Item from "../models/Item.js";
import Subcategory from "../models/Subcategory.js";
import Category from "../models/Category.js";
import { successResponse, errorResponse } from "../utils/response.js";

// Create an item under a subcategory or category
export const createItem = async (req, res) => {
  const { name, image, description, taxApplicable, tax, baseAmount, discount, subcategoryId, categoryId } = req.body;

  try {
    let parent;

    // Check if subcategory exists when subcategoryId is provided
    if (subcategoryId) {
      parent = await Subcategory.findById(subcategoryId);
      if (!parent) return errorResponse(res, "Subcategory not found", 404);
    } 
    // Check if category exists when categoryId is provided
    else if (categoryId) {
      parent = await Category.findById(categoryId);
      if (!parent) return errorResponse(res, "Category not found", 404);
    } 
    // Validate if either categoryId or subcategoryId is provided
    else {
      return errorResponse(res, "Either categoryId or subcategoryId is required", 400);
    }

    // Calculate total amount
    const totalAmount = baseAmount - discount;

    // Create a new item
    const item = await Item.create({
      name,
      image,
      description,
      taxApplicable: taxApplicable ?? parent.taxApplicable, // Inherit tax settings from parent if not provided
      tax: tax ?? parent.tax,
      baseAmount,
      discount,
      totalAmount,
      subcategoryId,
      categoryId,
    });

    successResponse(res, "Item created successfully", item);
  } catch (error) {
    errorResponse(res, error.message);
  }
};

// Get all items
export const getItems = async (req, res) => {
  try {
    // Retrieve all items from the database
    const items = await Item.find();
    successResponse(res, "Items retrieved successfully", items);
  } catch (error) {
    errorResponse(res, error.message);
  }
};

// Get an item by ID or name
export const getItemByIdOrName = async (req, res) => {
  const { id, name } = req.params;

  try {
    let item;
    if (id) {
      // Fetch item by ID
      item = await Item.findById(id);
    } else if (name) {
      // Fetch item by name
      item = await Item.findOne({ name });
    }

    // If no item is found, return a 404 error response
    if (!item) {
      return errorResponse(res, "Item not found", 404);
    }

    successResponse(res, "Item retrieved successfully", item);
  } catch (error) {
    errorResponse(res, error.message);
  }
};

// Get items by subcategory
export const getItemsBySubcategory = async (req, res) => {
  const { subcategoryId } = req.params;

  try {
    const items = await Item.find({ subcategoryId });
    successResponse(res, "Items retrieved successfully", items);
  } catch (error) {
    errorResponse(res, error.message);
  }
};

// Get items by category
export const getItemsByCategory = async (req, res) => {
  const { categoryId } = req.params;

  try {
    const items = await Item.find({ categoryId });
    successResponse(res, "Items retrieved successfully", items);
  } catch (error) {
    errorResponse(res, error.message);
  }
};

// Edit Item
export const editItem = async (req, res) => {
  try {
    const { name, description, price, subcategoryId } = req.body;

    // Update the item by ID
    const updatedItem = await Item.findByIdAndUpdate(
      req.params.id,
      { name, description, price, subcategoryId }, // Update only specified fields
      { new: true, runValidators: true } // Return the updated document and enforce validations
    );

    if (!updatedItem) {
      return res.status(404).json({ message: "Item not found" });
    }

    res.status(200).json({ message: "Item updated successfully", updatedItem });
  } catch (error) {
    res.status(500).json({ message: "Error updating item", error: error.message });
  }
};

// Search items by name
export const searchItemsByName = async (req, res) => {
  const { name } = req.query;

  try {
    if (!name) {
      return errorResponse(res, "Name query parameter is required", 400);
    }

    // Perform case-insensitive search for items with the given name
    const items = await Item.find({ name: { $regex: name, $options: "i" } }); 

    if (items.length === 0) {
      return errorResponse(res, "No items found with the given name", 404);
    }

    successResponse(res, "Items retrieved successfully", items);
  } catch (error) {
    console.error("Error:", error);
    errorResponse(res, error.message);
  }
};
