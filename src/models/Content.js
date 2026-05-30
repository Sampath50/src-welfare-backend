import mongoose from "mongoose"

const contentSchema = new mongoose.Schema({
  page: { type: String, required: true }, // home, about, etc.
  section: { type: String, required: true }, // hero, mission, stats
  data: { type: mongoose.Schema.Types.Mixed, required: true },
  updatedAt: { type: Date, default: Date.now }
})

export default mongoose.model("Content", contentSchema)