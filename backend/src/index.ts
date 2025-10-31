import express, { type Request, type Response } from "express"
import mongoose from "mongoose"
import { ConnectToMongo } from "./config/connectToMongo"
import cors from "cors"
import cookieParser from "cookie-parser"
import dotenv from "dotenv"

dotenv.config()
ConnectToMongo()

const app = express()

// Middleware
app.use(express.json())
app.use(cookieParser())
app.use(
    cors({
        origin: "http://localhost:5173",
        credentials: true,
        methods: ["GET", "POST", "PUT", "DELETE"],
        allowedHeaders: ["Content-Type", "Authorization"],
    }),
)

// Routes
import authRoutes from "./routes/auth.routes"
import notesRoutes from "./routes/notes.routes"
import { ConnectToMongo } from "./config/connectToMongo"

app.use("/api/auth", authRoutes)
app.use("/api/notes", notesRoutes)

// Health check
app.get("/api/health", (req: Request, res: Response) => {
    res.json({ status: "OK", timestamp: new Date().toISOString() })
})

// Start server
const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`)
})
