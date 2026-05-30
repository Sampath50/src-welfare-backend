import mongoose from "mongoose"

const volunteerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  age: { type: Number },
  skills: { type: String },
  availability: { type: String },
  message: { type: String },
  status: { type: String, default: "pending" },
  createdAt: { type: Date, default: Date.now }
})

export default mongoose.model("Volunteer", volunteerSchema)