import express from "express"
import Message from "../models/Message.js"

const router = express.Router()

// Send message (Save to database)
router.post("/", async (req, res) => {

  try {
    const { name, email, message } = req.body

    // Validate
    if (!name || !email || !message) {
      return res.status(400).json({
        success: false,
        message: "Please provide all fields"
      })
    }

    // Save to database
    const newMessage = new Message({
      name,
      email,
      message
    })

    await newMessage.save()

    console.log("Message saved to database:", { name, email, message })

    res.json({
      success: true,
      message: "Message received and saved successfully"
    })

  } catch (error) {
    console.error("Error:", error)
    res.status(500).json({
      success: false,
      message: "Server Error"
    })
  }

})

// Get all messages (Optional - for admin)
router.get("/", async (req, res) => {
  try {
    const messages = await Message.find().sort({ createdAt: -1 })
    res.json({
      success: true,
      messages
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server Error"
    })
  }
})

export default router