import express from "express"
import cors from "cors"
import contactRoutes from "./routes/contactRoutes.js"

const app = express()

// Allow frontend URL after deployment
app.use(cors({
  origin: [
    "http://localhost:5173",
    "http://localhost:5174",
    "https://your-frontend-url.vercel.app" // You'll add this later
  ]
}))
app.use(express.json())

app.get("/", (req, res) => {
  res.send("SRC Welfare Trust API Running")
})

app.use("/api/contact", contactRoutes)

export default app