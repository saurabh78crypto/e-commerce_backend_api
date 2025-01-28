import mongoose from "mongoose";

// Define the Item schema
const itemSchema = new mongoose.Schema({
  // Name of the item, required, unique, and whitespace is trimmed
  name: { 
    type: String, 
    required: true,
    unique: true,
    trim: true 
  },
  // Image of the item, required to store the image URL or path
  image: { 
    type: String, 
    required: true 
  },
  // Description for the item
  description: { 
    type: String 
  },
  // Flag to indicate if tax is applicable for the item
  taxApplicable: { 
    type: Boolean, 
    required: true 
  },
  // The tax rate for the item, default is 0 if not provided
  tax: { 
    type: Number, 
    default: 0 
  },
  // The base price of the item, required
  baseAmount: { 
    type: Number, 
    required: true 
  },
  // Discount on the item, default is 0 if not provided
  discount: { 
    type: Number, 
    default: 0 
  },
  // Total amount for the item after applying tax and discount (to be calculated)
  totalAmount: { 
    type: Number 
  },
  // Reference to the category this item belongs to
  categoryId: { 
    type: mongoose.Schema.Types.ObjectId, // ObjectId refers to a Category document
    ref: "Category", // Refers to the Category model
    required: false 
  },
  // Reference to the subcategory this item belongs to
  subcategoryId: { 
    type: mongoose.Schema.Types.ObjectId, // ObjectId refers to a Subcategory document
    ref: "Subcategory", // Refers to the Subcategory model
    required: false 
 },
});

// Create the Item model based on the schema
const Item = mongoose.model("Item", itemSchema);
export default Item;