import Subcategory from "../models/Subcategory.js";
import Category from "../models/Category.js";
import { successResponse, errorResponse } from "../utils/response.js";

// Create a subcategory under a category
export const createSubcategory = async (req, res) => {
  const { name, image, description, taxApplicable, tax, categoryId } = req.body;

  try {
    // Validate if the parent category exists
    const category = await Category.findById(categoryId);
    if (!category) {
      return errorResponse(res, "Category not found", 404);
    }

    // Create a new subcategory with provided and inherited fields
    const subcategory = new Subcategory({
      name,
      image,
      description,
      taxApplicable: taxApplicable ?? category.taxApplicable, // Use category tax settings if not explicitly provided
      tax: tax ?? category.tax,
      categoryId,
    });

    // Save the subcategory to the database
    await subcategory.save();

    successResponse(res, "Subcategory created successfully", subcategory);
  } catch (error) {
    errorResponse(res, error.message);
  }
};

// Get all subcategories
export const getSubcategories = async (req, res) => {
  try {
    // Fetch all subcategories from the database
    const subcategories = await Subcategory.find();

    successResponse(res, "Subcategories retrieved successfully", subcategories);
  } catch (error) {
    errorResponse(res, error.message);
  }
};

// Get a subcategory by name or ID
export const getSubcategoryByNameOrId = async (req, res) => {
  const { id, name } = req.params;

  try {
    let subcategory;
    // Fetch the subcategory by ID if provided
    if (id) {
      subcategory = await Subcategory.findById(id);
    } 
    // Fetch the subcategory by name if provided
    else if (name) {
      subcategory = await Subcategory.findOne({ name });
    }

    // If the subcategory is not found, return a 404 error
    if (!subcategory) {
      return errorResponse(res, "Subcategory not found", 404);
    }

    successResponse(res, "Subcategory retrieved successfully", subcategory);
  } catch (error) {
    errorResponse(res, error.message);
  }
};

// Get subcategories under a category
export const getSubcategoriesByCategory = async (req, res) => {
  const { categoryId } = req.params;

  try {
    // Fetch all subcategories belonging to the specified category
    const subcategories = await Subcategory.find({ categoryId });

    successResponse(res, "Subcategories retrieved successfully", subcategories);
  } catch (error) {
    errorResponse(res, error.message);
  }
};

// Edit Subcategory
export const editSubcategory = async (req, res) => {
  try {
    const { name, description, parentCategoryId } = req.body;

    // Update the subcategory by ID and return the updated document
    const updatedSubcategory = await Subcategory.findByIdAndUpdate(
      req.params.id,
      { name, description, parentCategoryId }, // Update the provided fields
      { new: true, runValidators: true } // Return the updated document and apply validation
    );

    // If no subcategory is found, return a 404 error
    if (!updatedSubcategory) {
      return res.status(404).json({ message: "Subcategory not found" });
    }

    res.status(200).json({ message: "Subcategory updated successfully", updatedSubcategory });
  } catch (error) {
    res.status(500).json({ message: "Error updating subcategory", error: error.message });
  }
};