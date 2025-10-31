import type React from "react"
import { useState, useEffect } from "react"
import type { Note } from "../types"

interface NoteFormProps {
    initialNote?: Note
    onSubmit: (title: string, content: string) => void
    onCancel: () => void
    loading: boolean
    onDelete?: () => void
}

export const NoteForm: React.FC<NoteFormProps> = ({ initialNote, onSubmit, onCancel, loading, onDelete }) => {
    const [title, setTitle] = useState("")
    const [content, setContent] = useState("")
    const [error, setError] = useState("")

    useEffect(() => {
        if (initialNote) {
            setTitle(initialNote.title)
            setContent(initialNote.content)
        }
    }, [initialNote])

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        setError("")

        if (!title.trim()) {
            setError("Title is required")
            return
        }

        if (!content.trim()) {
            setError("Content is required")
            return
        }

        onSubmit(title.trim(), content.trim())
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
                <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
                    <p className="text-red-700 text-sm">{error}</p>
                </div>
            )}

            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Note title"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    disabled={loading}
                />
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Content</label>
                <textarea
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    placeholder="Note content"
                    rows={8}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                    disabled={loading}
                />
            </div>

            <div className="flex gap-2">
                <button
                    type="submit"
                    disabled={loading}
                    className="flex-1 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-medium py-2 px-4 rounded-lg transition-colors"
                >
                    {loading ? "Saving..." : "Save Note"}
                </button>
                <button
                    type="button"
                    onClick={onCancel}
                    disabled={loading}
                    className="flex-1 bg-gray-300 hover:bg-gray-400 disabled:bg-gray-400 text-gray-900 font-medium py-2 px-4 rounded-lg transition-colors"
                >
                    Cancel
                </button>
                {onDelete && (
                    <button
                        type="button"
                        onClick={onDelete}
                        disabled={loading}
                        className="flex-1 bg-red-600 hover:bg-red-700 disabled:bg-gray-400 text-white font-medium py-2 px-4 rounded-lg transition-colors"
                    >
                        Delete
                    </button>
                )}
            </div>
        </form>
    )
}
