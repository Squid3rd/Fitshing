// import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { computed, ref, reactive, onMounted } from "vue";
import axios from 'axios';
import { useRouter } from 'vue-router';
export const useproductStore = defineStore('product', () => {

    const dbproduct = ref([])

    const fetchproduct = async () => {
        const fetchingData = await axios.get('http://localhost:3000/product')
        dbproduct.value = fetchingData.data;
      }
    
    const fetchdetailproduct = async (id) => {
      const fetchingData = (await axios.get(`http://localhost:3000/preview/${id}`)).data[0]
      dbproduct.value = fetchingData.data;
    }

    
  return { 
    dbproduct,
    fetchproduct,
    fetchdetailproduct
}
})