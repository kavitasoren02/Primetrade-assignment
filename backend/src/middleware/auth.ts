import type { Request, Response, NextFunction } from "express"
import jwt from "jsonwebtoken"

export interface AuthRequest extends Request {
    userId?: string
}

export const authMiddleware = (req: AuthRequest, res: Response, next: NextFunction) => {
    const token = req.cookies.token

    if (!token) {
        return res.status(401).json({ error: "No token provided" })
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET || "secret-key-change-this") as { userId: string }
        req.userId = decoded.userId
        next()
    } catch (error) {
        return res.status(401).json({ error: "Invalid token" })
    }
}
