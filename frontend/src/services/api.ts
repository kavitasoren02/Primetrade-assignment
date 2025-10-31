import axios from "axios"

const API_URL = "http://localhost:5000/api"

const api = axios.create({
    baseURL: API_URL,
    withCredentials: true,
})

export const authApi = {
    register: (email: string, password: string, name: string) => api.post("/auth/register", { email, password, name }),

    login: (email: string, password: string) => api.post("/auth/login", { email, password }),

    logout: () => api.post("/auth/logout"),

    getMe: () => api.get("/auth/me"),
}

export const notesApi = {
    getAll: () => api.get("/notes"),

    getOne: (id: string) => api.get(`/notes/${id}`),

    create: (title: string, content: string) => api.post("/notes", { title, content }),

    update: (id: string, title: string, content: string) => api.put(`/notes/${id}`, { title, content }),

    delete: (id: string) => api.delete(`/notes/${id}`),
}

export default api
