import type React from "react"
import { Link } from "react-router-dom"
import { useAuth } from "../context/AuthContext"

export const Home: React.FC = () => {
    const { user } = useAuth()

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
            <nav className="bg-white shadow-md">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
                    <h1 className="text-2xl font-bold text-gray-900">Notes App</h1>
                    <div className="space-x-4">
                        {user ? (
                            <>
                                <span className="text-gray-700">Welcome, {user.name}</span>
                                <Link to="/dashboard" className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
                                    Dashboard
                                </Link>
                            </>
                        ) : (
                            <>
                                <Link to="/login" className="text-gray-700 hover:text-gray-900">
                                    Login
                                </Link>
                                <Link to="/register" className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
                                    Sign Up
                                </Link>
                            </>
                        )}
                    </div>
                </div>
            </nav>

            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
                <h2 className="text-4xl font-bold text-gray-900 mb-4">Organize Your Thoughts</h2>
                <p className="text-xl text-gray-700 mb-8">Create, edit, and manage your notes securely</p>

                {!user && (
                    <div className="space-x-4">
                        <Link
                            to="/register"
                            className="inline-block bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 font-medium"
                        >
                            Get Started
                        </Link>
                        <Link
                            to="/login"
                            className="inline-block bg-white text-gray-900 px-8 py-3 rounded-lg hover:bg-gray-100 font-medium border border-gray-300"
                        >
                            Login
                        </Link>
                    </div>
                )}
            </main>
        </div>
    )
}
