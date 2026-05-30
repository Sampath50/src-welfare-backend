import express from "express"
import multer from "multer"
import { v2 as cloudinary } from "cloudinary"
import Gallery from "../models/Gallery.js"

const router = express.Router()

// Configure Cloudinary using environment variables
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
})

// Configure multer for memory storage
const storage = multer.memoryStorage()
const upload = multer({ storage })

// Upload image to Cloudinary
router.post("/upload", upload.single("image"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ success: false, message: "No file uploaded" })
    }

    // Upload to Cloudinary
    const result = await new Promise((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        { folder: "src-welfare-gallery" },
        (error, result) => {
          if (error) reject(error)
          else resolve(result)
        }
      )
      stream.end(req.file.buffer)
    })

    // Save to database
    const newImage = new Gallery({
      title: req.body.title,
      imageUrl: result.secure_url,
      category: req.body.category || "General"
    })
    await newImage.save()

    res.json({ success: true, image: newImage, url: result.secure_url })
  } catch (error) {
    console.error("Upload error:", error)
    res.status(500).json({ success: false, message: error.message })
  }
})

export default router