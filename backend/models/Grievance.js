import mongoose from "mongoose";

export default mongoose.model("Grievance", new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  title: String,
  description: String,
  category: String,
  status: { type: String, default: "Pending" },
  date: { type: Date, default: Date.now }
}));