import { defineStore } from "pinia";
import { computed, ref } from "vue";
import { login, logout, register, getUser } from "../http/auth-api";

export const useAuthStore = defineStore('authStore', () => {
    const user = ref(null)
    const errors = ref({})

    const isLoggedIn = computed(() => !!user.value)

    const fetchUser = async () => {
        try {
            const { data } = await getUser()
            user.value = data
        } catch (error) {
            user.value = null
        }
    }

    const handleLogin = async (credentials) => {
        try {
            const { data } = await login(credentials)
            user.value = data.user
            localStorage.setItem('token', data.token)
            errors.value = {}
        } catch (error) {
            if (error.response && error.response.status === 422) {
                errors.value = error.response.data.errors
            }
        }
    }

    const handleRegister = async (newUser) => {
        const { data } = await register(newUser)
        user.value = data.user
        localStorage.setItem('token', data.token)
    }

    const handleLogout = async () => {
        await logout()
        user.value = null
        localStorage.removeItem('token')
    }

    return {
        user,
        errors,
        isLoggedIn,
        fetchUser,
        handleLogin,
        handleRegister,
        handleLogout,
    }
})
