import express, { type Response } from "express"
import Note from "../models/Note"
import { authMiddleware, type AuthRequest } from "../middleware/auth"

const router = express.Router()

// Create note
router.post("/", authMiddleware, async (req: AuthRequest, res: Response) => {
    try {
        const { title, content } = req.body

        if (!title || !content) {
            return res.status(400).json({ error: "Title and content required" })
        }

        const note = new Note({
            userId: req.userId,
            title,
            content,
        })

        await note.save()
        res.status(201).json(note)
    } catch (error: any) {
        res.status(500).json({ error: "Failed to create note" })
    }
})

// Get all notes for user
router.get("/", authMiddleware, async (req: AuthRequest, res: Response) => {
    try {
        const notes = await Note.find({ userId: req.userId }).sort({ createdAt: -1 })
        res.json(notes)
    } catch (error: any) {
        res.status(500).json({ error: "Failed to fetch notes" })
    }
})

// Get single note
router.get("/:id", authMiddleware, async (req: AuthRequest, res: Response) => {
    try {
        const note = await Note.findOne({ _id: req.params.id, userId: req.userId })

        if (!note) {
            return res.status(404).json({ error: "Note not found" })
        }

        res.json(note)
    } catch (error: any) {
        res.status(500).json({ error: "Failed to fetch note" })
    }
})

// Update note
router.put("/:id", authMiddleware, async (req: AuthRequest, res: Response) => {
    try {
        const { title, content } = req.body

        if (!title || !content) {
            return res.status(400).json({ error: "Title and content required" })
        }

        const note = await Note.findOneAndUpdate(
            { _id: req.params.id, userId: req.userId },
            { title, content },
            { new: true },
        )

        if (!note) {
            return res.status(404).json({ error: "Note not found" })
        }

        res.json(note)
    } catch (error: any) {
        res.status(500).json({ error: "Failed to update note" })
    }
})

// Delete note
router.delete("/:id", authMiddleware, async (req: AuthRequest, res: Response) => {
    try {
        const note = await Note.findOneAndDelete({ _id: req.params.id, userId: req.userId })

        if (!note) {
            return res.status(404).json({ error: "Note not found" })
        }

        res.json({ message: "Note deleted" })
    } catch (error: any) {
        res.status(500).json({ error: "Failed to delete note" })
    }
})

export default router
