import mongoose, { Schema, type Document } from "mongoose"
import bcryptjs from "bcryptjs"

interface IUser extends Document {
    email: string
    password: string
    name: string
    comparePassword(password: string): Promise<boolean>
}

const UserSchema: Schema = new Schema(
    {
        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,
        },
        password: {
            type: String,
            required: true,
            minlength: 6,
        },
        name: {
            type: String,
            required: true,
            trim: true,
        },
    },
    { timestamps: true },
)

// Compare password method
UserSchema.methods.comparePassword = async function (password: string): Promise<boolean> {
    return bcryptjs.compare(password, this.password)
}

export default mongoose.model<IUser>("User", UserSchema)
