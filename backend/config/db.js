import mongoose from "mongoose";
import "dotenv/config";
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URL);
    console.log("Chall gyaaa ");
  } catch (error) {
    console.log(" trouble " + error);
  }
};

export default connectDB;
