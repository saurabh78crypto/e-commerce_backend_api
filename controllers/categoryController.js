import Category from "../models/Category.js";
import { successResponse, errorResponse } from "../utils/response.js";

// Create a category
export const createCategory = async (req, res) => {
  const { name, image, description, taxApplicable, tax, taxType } = req.body;

  try {
    // Check if category with the same name already exists to prevent duplicates
    const existingCategory = await Category.findOne({ name });
    if(existingCategory) {
      return errorResponse(res, "Category already exists", 400);
    } 

    // Create the new category object with the provided details
    const category = new Category({ 
      name, 
      image, 
      description, 
      taxApplicable, 
      tax, 
      taxType 
    });

    // Save the category to the database
    await category.save();

    return successResponse(res, "Category created successfully!", category);
  } catch (error) {
    return errorResponse(res, "An internal server error occurred", 500);
  }
};

// Get all categories
export const getCategories = async (req, res) => {
  try {
    // Retrieve all categories from the database
    const categories = await Category.find();
    successResponse(res, "Categories retrieved successfully", categories);
  } catch (error) {
    errorResponse(res, error.message);
  }
};

// Get a category by name or ID
export const getCategoryByNameOrId = async (req, res) => {
  const { id, name } = req.params;

  try {
    let category;
    // Fetch the category by ID if provided
    if (id) {
      category = await Category.findById(id);
    } 
    // Fetch the category by name if provided
    else if (name) {
      category = await Category.findOne({ name });
    }

    // If no category is found, return a 404 error response
    if (!category) {
      return errorResponse(res, "Category not found", 404);
    }

    successResponse(res, "Category retrieved successfully", category);
  } catch (error) {
    errorResponse(res, error.message);
  }
};

// Edit a Category
export const editCategory = async (req, res) => {
  try {
    const { name, description } = req.body;

    // Update the category details by ID and return the updated document
    const updatedCategory = await Category.findByIdAndUpdate(
      req.params.id,
      { name, description }, // Update only specified fields
      { new: true, runValidators: true } // Return the updated document and apply validation
    );

    // If no category is found, send a 404 error response
    if (!updatedCategory) {
      return res.status(404).json({ message: "Category not found" });
    }

    successResponse(res, "Category updated successfully", updatedCategory);
  } catch (error) {
    errorResponse(res, "Error updating category");
  }
};
