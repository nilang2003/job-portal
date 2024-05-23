import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const conn = await mongoose.connect("mongodb://localhost:27017/jobportal");
    console.log(`Connected to mongodb database`);
  } catch (error) {
    console.log(error);
  }
};

export default connectDB;
