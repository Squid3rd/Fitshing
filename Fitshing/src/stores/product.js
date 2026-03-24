import { defineStore } from 'pinia'
import { ref } from "vue";
import axios from '@/plugins/axios';

export const useProductStore = defineStore('product', () => {
    const products = ref([])
    const isLoading = ref(false)

    const fetchProducts = async () => {
        isLoading.value = true
        try {
            const res = await axios.get('/product')
            products.value = res.data
        } catch (err) {
            console.error('Failed to fetch products:', err)
        } finally {
            isLoading.value = false
        }
    }

    const fetchProductDetail = async (id) => {
        try {
            const res = await axios.get(`/product/${id}`)
            return res.data
        } catch (err) {
            console.error('Failed to fetch product detail:', err)
            return null
        }
    }

    return {
        products,
        isLoading,
        fetchProducts,
        fetchProductDetail,
    }
})
