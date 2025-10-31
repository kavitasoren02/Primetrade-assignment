import mongoose, { Schema, type Document } from "mongoose"

interface INote extends Document {
    userId: mongoose.Types.ObjectId
    title: string
    content: string
    createdAt: Date
    updatedAt: Date
}

const NoteSchema: Schema = new Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        title: {
            type: String,
            required: true,
            trim: true,
        },
        content: {
            type: String,
            required: true,
        },
    },
    { timestamps: true },
)

export default mongoose.model<INote>("Note", NoteSchema)
