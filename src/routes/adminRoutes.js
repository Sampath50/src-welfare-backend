import express from "express"
import Volunteer from "../models/Volunteer.js"
import Gallery from "../models/Gallery.js"
import Donation from "../models/Donation.js"
import Message from "../models/Message.js"

const router = express.Router()

// ============ VOLUNTEERS ============
// Get all volunteers
router.get("/volunteers", async (req, res) => {
  try {
    const volunteers = await Volunteer.find().sort({ createdAt: -1 })
    res.json({ success: true, volunteers })
  } catch (error) {
    res.status(500).json({ success: false, message: error.message })
  }
})

// Add volunteer (from public form)
router.post("/volunteers", async (req, res) => {
  try {
    const volunteer = new Volunteer(req.body)
    await volunteer.save()
    res.json({ success: true, message: "Volunteer application submitted" })
  } catch (error) {
    res.status(500).json({ success: false, message: error.message })
  }
})

// Update volunteer status
router.put("/volunteers/:id", async (req, res) => {
  try {
    const { status } = req.body
    const volunteer = await Volunteer.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    )
    res.json({ success: true, volunteer })
  } catch (error) {
    res.status(500).json({ success: false, message: error.message })
  }
})

// Delete volunteer
router.delete("/volunteers/:id", async (req, res) => {
  try {
    await Volunteer.findByIdAndDelete(req.params.id)
    res.json({ success: true, message: "Volunteer deleted" })
  } catch (error) {
    res.status(500).json({ success: false, message: error.message })
  }
})

// ============ GALLERY ============
// Get all gallery images
router.get("/gallery", async (req, res) => {
  try {
    const images = await Gallery.find().sort({ createdAt: -1 })
    res.json({ success: true, images })
  } catch (error) {
    res.status(500).json({ success: false, message: error.message })
  }
})

// Add gallery image
router.post("/gallery", async (req, res) => {
  try {
    const { title, imageUrl, category } = req.body
    const image = new Gallery({ title, imageUrl, category })
    await image.save()
    res.json({ success: true, image })
  } catch (error) {
    res.status(500).json({ success: false, message: error.message })
  }
})

// Delete gallery image
router.delete("/gallery/:id", async (req, res) => {
  try {
    await Gallery.findByIdAndDelete(req.params.id)
    res.json({ success: true, message: "Image deleted" })
  } catch (error) {
    res.status(500).json({ success: false, message: error.message })
  }
})

// ============ DONATIONS ============
// Get all donations
router.get("/donations", async (req, res) => {
  try {
    const donations = await Donation.find().sort({ createdAt: -1 })
    res.json({ success: true, donations })
  } catch (error) {
    res.status(500).json({ success: false, message: error.message })
  }
})

// ============ MESSAGES ============
// Get all messages
router.get("/messages", async (req, res) => {
  try {
    const messages = await Message.find().sort({ createdAt: -1 })
    res.json({ success: true, messages })
  } catch (error) {
    res.status(500).json({ success: false, message: error.message })
  }
})

// Delete message
router.delete("/messages/:id", async (req, res) => {
  try {
    await Message.findByIdAndDelete(req.params.id)
    res.json({ success: true, message: "Message deleted" })
  } catch (error) {
    res.status(500).json({ success: false, message: error.message })
  }
})

export default router