import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(
      "mongodb+srv://newuserr:21vasudeva03@cluster0.vq1ndqp.mongodb.net/ecom"
    );
    console.log("Chall gyaaa ");
  } catch (error) {
    console.log(" trouble " + error);
  }
};

export default connectDB;
