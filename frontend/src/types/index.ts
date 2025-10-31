export interface User {
    id: string
    email: string
    name: string
}

export interface Note {
    _id: string
    title: string
    content: string
    createdAt: string
    updatedAt: string
}

export interface AuthContextType {
    user: User | null
    loading: boolean
    login: (email: string, password: string) => Promise<void>
    register: (email: string, password: string, name: string) => Promise<void>
    logout: () => Promise<void>
    checkAuth: () => Promise<void>
}
