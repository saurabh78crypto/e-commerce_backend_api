import mongoose from "mongoose";

// Define the Category schema
const categorySchema = new mongoose.Schema({
  // Name of the category, should be unique and required
  name: { 
    type: String, 
    required: true,
    unique: true,
    trim: true // Removes any leading or trailing whitespace from the name 
  },
  // Image of the category, required to store the image URL or path
  image: { 
    type: String, 
    required: true 
  },
  // Description of the category
  description: { 
    type: String 
  },
  // Boolean flag to indicate if tax is applicable for the category
  taxApplicable: { 
    type: Boolean, 
    required: true 
  },
  // The tax rate, default is 0 if not provided
  tax: { 
    type: Number, 
    default: 0 
  },
  // Tax type, either "percentage" or "fixed", required to specify the type of tax
  taxType: { 
    type: String, 
    enum: ["percentage", "fixed"], 
    required: true 
  },
});

// Create the Category model based on the schema
const Category = mongoose.model("Category", categorySchema);
export default Category;
