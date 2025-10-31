import express, { type Request, type Response } from "express"
import User from "../models/User"
import jwt from "jsonwebtoken"
import bcrypt from "bcryptjs"

const router = express.Router()

interface SignupBody {
    email: string
    password: string
    name: string
}

interface LoginBody {
    email: string
    password: string
}

// Register
router.post("/register", async (req: Request, res: Response) => {
    try {
        const { email, password, name } = req.body as SignupBody

        if (!email || !password || !name) {
            return res.status(400).json({ error: "Missing required fields" })
        }

        const existingUser = await User.findOne({ email })
        if (existingUser) {
            return res.status(400).json({ error: "Email already registered" })
        }

        const salt = bcrypt.genSaltSync(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const user = new User({ email, password: hashedPassword, name })
        await user.save()

        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET || "secret-key-change-this", {
            expiresIn: "7d",
        })

        res.cookie("token", token, {
            httpOnly: true,
            secure: true,
            sameSite: "none",
            maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
        })

        res.status(201).json({
            message: "User registered successfully",
            user: { id: user._id, email: user.email, name: user.name },
        })
    } catch (error: any) {
        console.error("Registration error:", error)
        res.status(500).json({ error: "Registration failed" })
    }
})

// Login
router.post("/login", async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body as LoginBody

        if (!email || !password) {
            return res.status(400).json({ error: "Email and password required" })
        }

        const user = await User.findOne({ email })
        if (!user) {
            return res.status(401).json({ error: "Invalid credentials" })
        }

        const isPasswordValid = await user.comparePassword(password)
        if (!isPasswordValid) {
            return res.status(401).json({ error: "Invalid credentials" })
        }

        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET || "secret-key-change-this", {
            expiresIn: "7d",
        })

        res.cookie("token", token, {
            httpOnly: true,
            secure: true,
            sameSite: "none",
            maxAge: 7 * 24 * 60 * 60 * 1000,
        })

        res.json({
            message: "Login successful",
            user: { id: user._id, email: user.email, name: user.name },
        })
    } catch (error: any) {
        console.error("Login error:", error)
        res.status(500).json({ error: "Login failed" })
    }
})

// Get current user
router.get("/me", async (req: Request, res: Response) => {
    try {
        const token = req.cookies.token
        if (!token) {
            return res.status(401).json({ error: "No token" })
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET || "secret-key-change-this") as { userId: string }
        const user = await User.findById(decoded.userId).select("-password")

        if (!user) {
            return res.status(404).json({ error: "User not found" })
        }

        res.json({ user })
    } catch (error) {
        res.status(401).json({ error: "Unauthorized" })
    }
})

// Logout
router.post("/logout", (req: Request, res: Response) => {
    res.clearCookie("token")
    res.json({ message: "Logged out successfully" })
})

export default router
