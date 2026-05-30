import express from "express"
import cors from "cors"
import contactRoutes from "./routes/contactRoutes.js"
import adminRoutes from "./routes/adminRoutes.js"
import uploadRoutes from "./routes/uploadRoutes.js"
import contentRoutes from "./routes/contentRoutes.js"

const app = express()

app.use(cors({
  origin: "*",
  credentials: true
}))

app.use(express.json())

app.get("/", (req, res) => {
  res.send("SRC Welfare Trust API Running")
})

app.use("/api/contact", contactRoutes)
app.use("/api/admin", adminRoutes)
app.use("/api/upload", uploadRoutes)
app.use("/api/content", contentRoutes)

export default app