import type React from "react"
import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { useAuth } from "../context/AuthContext"
import { notesApi } from "../services/api"
import type { Note } from "../types"
import { NoteList } from "../components/NoteList"
import { NoteForm } from "../components/NoteForm"

export const Dashboard: React.FC = () => {
    const [notes, setNotes] = useState<Note[]>([])
    const [selectedNote, setSelectedNote] = useState<Note | null>(null)
    const [isCreating, setIsCreating] = useState(false)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState("")
    const [searchTerm, setSearchTerm] = useState("")
    const navigate = useNavigate()
    const { user, logout } = useAuth()

    useEffect(() => {
        if (!user) {
            navigate("/login")
            return
        }
        fetchNotes()
    }, [user, navigate])

    const fetchNotes = async () => {
        try {
            setLoading(true)
            const response = await notesApi.getAll()
            setNotes(response.data)
            setError("")
        } catch (err: any) {
            setError("Failed to fetch notes")
            console.error(err)
        } finally {
            setLoading(false)
        }
    }

    const handleCreateNote = async (title: string, content: string) => {
        try {
            setLoading(true)
            await notesApi.create(title, content)
            await fetchNotes()
            setIsCreating(false)
            setError("")
        } catch (err: any) {
            setError("Failed to create note")
            console.error(err)
        } finally {
            setLoading(false)
        }
    }

    const handleUpdateNote = async (id: string, title: string, content: string) => {
        try {
            setLoading(true)
            await notesApi.update(id, title, content)
            await fetchNotes()
            setSelectedNote(null)
            setError("")
        } catch (err: any) {
            setError("Failed to update note")
            console.error(err)
        } finally {
            setLoading(false)
        }
    }

    const handleDeleteNote = async (id: string) => {
        if (!window.confirm("Are you sure you want to delete this note?")) return

        try {
            setLoading(true)
            await notesApi.delete(id)
            await fetchNotes()
            setSelectedNote(null)
            setError("")
        } catch (err: any) {
            setError("Failed to delete note")
            console.error(err)
        } finally {
            setLoading(false)
        }
    }

    const handleLogout = async () => {
        await logout()
        navigate("/login")
    }

    const filteredNotes = notes.filter(
        (note) =>
            note.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            note.content.toLowerCase().includes(searchTerm.toLowerCase()),
    )

    return (
        <div className="min-h-screen bg-gray-50">
            <header className="bg-white shadow">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900">My Notes</h1>
                        <p className="text-gray-600 text-sm mt-1">Welcome, {user?.name}</p>
                    </div>
                    <button
                        onClick={handleLogout}
                        className="bg-red-600 hover:bg-red-700 text-white font-medium py-2 px-4 rounded-lg transition-colors"
                    >
                        Logout
                    </button>
                </div>
            </header>

            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {error && (
                    <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg">
                        <p className="text-red-700 text-sm">{error}</p>
                    </div>
                )}

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-2">
                        <div className="bg-white rounded-lg shadow-md p-6">
                            <h2 className="text-xl font-bold text-gray-900 mb-4">Notes</h2>

                            <div className="mb-4">
                                <input
                                    type="text"
                                    placeholder="Search notes..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>

                            {loading && <p className="text-gray-600 text-center py-8">Loading...</p>}
                            {filteredNotes.length === 0 && !loading && (
                                <p className="text-gray-600 text-center py-8">No notes yet. Create one to get started!</p>
                            )}

                            <NoteList notes={filteredNotes} selectedId={selectedNote?._id} onSelect={setSelectedNote} />
                        </div>
                    </div>

                    <div>
                        {isCreating || selectedNote ? (
                            <div className="bg-white rounded-lg shadow-md p-6">
                                <h2 className="text-xl font-bold text-gray-900 mb-4">{isCreating ? "New Note" : "Edit Note"}</h2>
                                <NoteForm
                                    initialNote={selectedNote || undefined}
                                    onSubmit={
                                        selectedNote
                                            ? (title, content) => handleUpdateNote(selectedNote._id, title, content)
                                            : handleCreateNote
                                    }
                                    onCancel={() => {
                                        setIsCreating(false)
                                        setSelectedNote(null)
                                    }}
                                    loading={loading}
                                    onDelete={selectedNote ? () => handleDeleteNote(selectedNote._id) : undefined}
                                />
                            </div>
                        ) : (
                            <button
                                onClick={() => setIsCreating(true)}
                                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-lg transition-colors mb-4"
                            >
                                Create New Note
                            </button>
                        )}
                    </div>
                </div>
            </main>
        </div>
    )
}
