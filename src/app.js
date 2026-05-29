import express from "express"
import cors from "cors"
import contactRoutes from "./routes/contactRoutes.js"

const app = express()

// Allow all origins for now (fix CORS)
app.use(cors({
  origin: "*",
  credentials: true
}))

app.use(express.json())

app.get("/", (req, res) => {
  res.send("SRC Welfare Trust API Running")
})

app.use("/api/contact", contactRoutes)

export default app