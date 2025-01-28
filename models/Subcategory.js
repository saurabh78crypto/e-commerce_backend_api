import mongoose from "mongoose";

// Define the Subcategory schema
const subcategorySchema = new mongoose.Schema({
  // Name of the subcategory, should be unique and required
  name: { 
    type: String, 
    required: true,
    unique: true,
    trim: true // Removes any leading or trailing whitespace from the name 
  },
  // Image of the subcategory, required to store the image URL or path
  image: { 
    type: String, 
    required: true 
  },
  // Description of the subcategory
  description: { 
    type: String 
  },
  // Boolean flag to indicate if tax is applicable for the subcategory
  taxApplicable: { 
    type: Boolean, 
    default: false 
  },
  // The tax rate, default is 0 if not provided
  tax: { 
    type: Number, 
    default: 0 
  },
  // Reference to the category this subcategory belongs to, required to establish a relationship
  categoryId: { 
    type: mongoose.Schema.Types.ObjectId, // ObjectId refers to a Category document
    ref: "Category",  // Refers to the Category model
    required: true 
  },
});

// Create the Subcategory model based on the schema
const Subcategory = mongoose.model("Subcategory", subcategorySchema); 
export default Subcategory;