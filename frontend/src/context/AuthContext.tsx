import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"
import type { User, AuthContextType } from "../types"
import { authApi } from "../services/api"

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null)
    const [loading, setLoading] = useState(true)

    const checkAuth = async () => {
        try {
            const response = await authApi.getMe()
            setUser(response.data.user)
        } catch (error) {
            setUser(null)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        checkAuth()
    }, [])

    const register = async (email: string, password: string, name: string) => {
        try {
            const response = await authApi.register(email, password, name)
            setUser(response.data.user)
        } catch (error: any) {
            throw new Error(error.response?.data?.error || "Registration failed")
        }
    }

    const login = async (email: string, password: string) => {
        try {
            const response = await authApi.login(email, password)
            setUser(response.data.user)
        } catch (error: any) {
            throw new Error(error.response?.data?.error || "Login failed")
        }
    }

    const logout = async () => {
        try {
            await authApi.logout()
            setUser(null)
        } catch (error) {
            console.error("Logout failed:", error)
        }
    }

    return (
        <AuthContext.Provider value={{ user, loading, login, register, logout, checkAuth }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => {
    const context = useContext(AuthContext)
    if (!context) {
        throw new Error("useAuth must be used within AuthProvider")
    }
    return context
}
