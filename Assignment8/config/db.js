const mongoose = require('mongoose');
require('dotenv').config();

// MongoDB connection configuration
const connectDB = async () => {
  try {
    const uri = process.env.MONGODB_URI || "mongodb+srv://arbaazkhan:arbaaz1711@mycluster.egx9e.mongodb.net/ToDoList?retryWrites=true&w=majority&appName=myCluster";
    
    
    if (!uri) {
      throw new Error('MongoDB URI is not defined in environment variables');
    }

    const conn = await mongoose.connect(uri);

    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error('Error connecting to MongoDB:', error.message);
    process.exit(1);
  }
};

module.exports = connectDB;
