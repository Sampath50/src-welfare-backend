import express from "express"
import Content from "../models/Content.js"

const router = express.Router()

// Test endpoint
router.get("/test", (req, res) => {
  res.json({ success: true, message: "Content API is working!" })
})

// GET endpoint for easy initialization
router.get("/init", async (req, res) => {
  try {
    const defaultContent = [
      { page: "home", section: "hero", data: { title: "SRC Welfare Trust", subtitle: "Together we can support education, healthcare, food drives, and social welfare programs." } },
      { page: "home", section: "stats", data: [{ number: "500+", label: "Families Helped" }, { number: "1200+", label: "Students Supported" }, { number: "50+", label: "Medical Camps" }, { number: "100+", label: "Volunteers" }] },
      { page: "home", section: "mission", data: { title: "Our Mission", text: "To empower underserved communities through education, healthcare, and social welfare programs." } }
    ]
    
    for (const content of defaultContent) {
      await Content.findOneAndUpdate(
        { page: content.page, section: content.section },
        content,
        { upsert: true }
      )
    }
    res.json({ success: true, message: "Default content initialized" })
  } catch (error) {
    res.status(500).json({ success: false, message: error.message })
  }
})

// Get all homepage content
router.get("/home/all", async (req, res) => {
  try {
    const contents = await Content.find({ page: "home" })
    res.json({ success: true, contents })
  } catch (error) {
    res.status(500).json({ success: false, message: error.message })
  }
})

// Get content by page and section
router.get("/:page/:section", async (req, res) => {
  try {
    const content = await Content.findOne({ page: req.params.page, section: req.params.section })
    res.json({ success: true, content: content || null })
  } catch (error) {
    res.status(500).json({ success: false, message: error.message })
  }
})

// Save or update content (POST)
router.post("/save", async (req, res) => {
  try {
    const { page, section, data } = req.body
    const content = await Content.findOneAndUpdate(
      { page, section },
      { page, section, data, updatedAt: Date.now() },
      { upsert: true, new: true }
    )
    res.json({ success: true, content })
  } catch (error) {
    res.status(500).json({ success: false, message: error.message })
  }
})

// POST init (alternative)
router.post("/init", async (req, res) => {
  try {
    const defaultContent = [
      { page: "home", section: "hero", data: { title: "SRC Welfare Trust", subtitle: "Together we can support education, healthcare, food drives, and social welfare programs." } },
      { page: "home", section: "stats", data: [{ number: "500+", label: "Families Helped" }, { number: "1200+", label: "Students Supported" }, { number: "50+", label: "Medical Camps" }, { number: "100+", label: "Volunteers" }] },
      { page: "home", section: "mission", data: { title: "Our Mission", text: "To empower underserved communities through education, healthcare, and social welfare programs." } }
    ]
    
    for (const content of defaultContent) {
      await Content.findOneAndUpdate(
        { page: content.page, section: content.section },
        content,
        { upsert: true }
      )
    }
    res.json({ success: true, message: "Default content initialized" })
  } catch (error) {
    res.status(500).json({ success: false, message: error.message })
  }
})

export default router