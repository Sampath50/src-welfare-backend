import mongoose from "mongoose"

const donationSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  amount: { type: Number, required: true },
  paymentId: { type: String },
  status: { type: String, default: "completed" },
  createdAt: { type: Date, default: Date.now }
})

export default mongoose.model("Donation", donationSchema)