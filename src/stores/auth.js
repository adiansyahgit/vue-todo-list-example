import { defineStore } from "pinia";
import { computed, ref } from "vue";
import { login, logout, register, getUser } from "../http/auth-api";

export const useAuthStore = defineStore('authStore', () => {
    const user = ref(null)

    const isLoggedIn = computed(() => !!user.value)

    const fetchUser = async () => {
        const { data } = await getUser()
        user.value = data
    }

    const handleLogin = async (credentials) => {
        const { data } = await login(credentials)
        user.value = data.user
        localStorage.setItem('token', data.token)
    }

    const handleRegister = async (newUser) => {
        await register(newUser)
        await login({
            email: newUser.email,
            password: newUser.password,
        })
        await fetchUser()
    }

    const handleLogout = async () => {
        await logout()
        user.value = null
    }

    return {
        user,
        isLoggedIn,
        fetchUser,
        handleLogin,
        handleRegister,
        handleLogout,
    }
})
