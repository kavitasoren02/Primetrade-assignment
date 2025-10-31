import type React from "react"
import type { Note } from "../types"

interface NoteListProps {
    notes: Note[]
    selectedId?: string
    onSelect: (note: Note) => void
}

export const NoteList: React.FC<NoteListProps> = ({ notes, selectedId, onSelect }) => {
    return (
        <div className="space-y-2">
            {notes.map((note) => (
                <button
                    key={note._id}
                    onClick={() => onSelect(note)}
                    className={`w-full text-left p-4 rounded-lg border-2 transition-colors ${selectedId === note._id ? "border-blue-500 bg-blue-50" : "border-gray-200 hover:border-gray-300 bg-white"
                        }`}
                >
                    <h3 className="font-semibold text-gray-900 truncate">{note.title}</h3>
                    <p className="text-gray-600 text-sm truncate mt-1">{note.content}</p>
                    <p className="text-gray-400 text-xs mt-2">{new Date(note.updatedAt).toLocaleDateString()}</p>
                </button>
            ))}
        </div>
    )
}
