import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import axios from '@/plugins/axios'

export const useUserStore = defineStore('user', () => {
    const user = ref(null)
    const isLoading = ref(false)

    const isLoggedIn = computed(() => {
        const token = localStorage.getItem('token')
        return !!token && token !== 'null'
    })

    const isAdmin = computed(() => user.value?.role === 'admin')
    const isTrainer = computed(() => user.value?.role === 'trainer')

    const fetchUser = async () => {
        if (!isLoggedIn.value) {
            user.value = null
            return
        }
        isLoading.value = true
        try {
            const res = await axios.get('/user/me')
            user.value = res.data
        } catch (err) {
            localStorage.removeItem('token')
            user.value = null
        } finally {
            isLoading.value = false
        }
    }

    const logout = async () => {
        try {
            await axios.post('/logout')
        } catch (e) {
            // Continue logout even if API fails
        }
        localStorage.removeItem('token')
        localStorage.setItem('cart', JSON.stringify([]))
        user.value = null
    }

    return {
        user,
        isLoading,
        isLoggedIn,
        isAdmin,
        isTrainer,
        fetchUser,
        logout,
    }
})
