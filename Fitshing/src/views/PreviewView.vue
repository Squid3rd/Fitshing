<template>
  <PreviewVue />

  <EProductVue />

</template>

<script setup>
import EProductVue from '../components/EProduct.vue';
import PreviewVue from '../components/Preview.vue';

</script>

<script>
export default {
  name: "previewview",
  data(){
    return{
      // product: [],
    }
  },
  mounted(){
    // this.getProduct();
  },
  methods: {
    // getProduct() {
    //   axios
    //     .get(`/product/${this.$route.params.id}`)
    //     .then((response) => {
    //       this.product = response.data;
    //     })
    //     .catch((err) => {
    //       console.log(err);
    //     });
    // },
  }
}
</script>

<style>

</style>