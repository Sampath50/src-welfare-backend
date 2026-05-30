import express from "express"
import cors from "cors"
import contactRoutes from "./routes/contactRoutes.js"
import adminRoutes from "./routes/adminRoutes.js"

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

export default app