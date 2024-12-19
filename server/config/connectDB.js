import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

if (!process.env.MONGODB_URL) {
  throw new Error("Please provide MONGODB_URL in the .env file");
}

async function connectDb() {
  try {
    await mongoose.connect(process.env.MONGODB_URL);
    console.log("Connected Db");
  } catch (err) {
    console.log("Mongodb connect error ", err);
    process.exit(1);
  }
}
export default connectDb;
