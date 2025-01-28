import mongoose from "mongoose";

const connectDB = async () => {
  try {
    // Establish connection to MongoDB using the URI from environment variables
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    // Exit the process with failure code 1 to prevent the app from running without a database connection
    process.exit(1);
  }
};

export default connectDB;
