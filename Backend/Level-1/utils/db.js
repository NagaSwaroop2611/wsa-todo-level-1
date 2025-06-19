import mongoose from "mongoose";
import "dotenv/config";

const db = () =>  {mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log("MongoDB connected succesfully... 😊"))
  .catch((err) => console.log("Failed to connect to MongoDB... 😢"))
}

export default db;