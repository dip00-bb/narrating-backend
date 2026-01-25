import mongoose from 'mongoose';
import authConfig from '../config/env.config.js';

const connectDB = async () => {
  try {
    await mongoose.connect(authConfig.mongodb_uri);
    console.log('MongoDB connected successfully');
  } catch (err) {
    console.error('MongoDB connection error:', err.message);
    process.exit(1); 
  }
};

export default connectDB;