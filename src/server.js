import dotenv from "dotenv"
import mongoose from "mongoose"
import app from "./app.js"

dotenv.config()

const PORT = process.env.PORT || 5000

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("MongoDB Connected")
    app.listen(PORT, '0.0.0.0', () => {
      console.log(`Server running on port ${PORT}`)
    })
  })
  .catch((error) => {
    console.log("MongoDB connection error:", error)
  })