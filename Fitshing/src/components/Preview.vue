
<template>
    <section class="hero is-fullheight">
    <div class=" container is-max-widescreen has-background-success-light mt-6">
      <div class="columns">
          <div class="column is-4 is-offset-1" v-for="image in images" :key="image.ex_id">
              <div class=" card p-2 " style="max-width:95%;">
                  <img :src="imagePath(image.file_path)" alt="Placeholder image">
              </div>
          </div>
          <div class="column is-5 is-offset-1" v-for="prod in product" :key="prod.ex_id">
              <p class="title is-3">{{ prod.ex_name }}</p>
              <div class="description has-background-white m-2" style="border:1px solid #0004; border-radius:2px; height:200px;">
                {{ prod.ex_info }}
              </div>
              
              <p class="subtitle is-4">฿ {{ prod.ex_price }}</p>
              <input class="input" style="width: 20%;" type="number" min="1" :max="prod.amount" v-model="purchase_amount" />
              <button class="button ml-2 add-cart" type="submit">Add to cart</button>
          </div>
      </div>
      <div class="columns">
          <div class="column is-offset-1">
              <p class="title is-4">คุณอาจสนใจ</p>
          </div>
      </div>
      <div class="columns scroll">
          <div class="column is-2 is-offset-1 " v-for="index in 5">
              <div>
                  <img class="" style="max-width:300px; width:100%;" src="https://img.freepik.com/free-vector/cute-bad-cat-wearing-suit-sunglasses-with-baseball-bat-cartoon-icon-illustration-animal-fashion-icon-concept-isolated-flat-cartoon-style_138676-2170.jpg?w=2000" alt="สินค้าแนะนำ">
              </div>
              <div class="has-text-centered">
                  <p>Product Name</p>
                  <p>Price</p>
              </div>
          </div>
          
      </div>
    </div>
</section>
  </template>


<script setup>
</script>

<script>
import axios from '@/plugins/axios'
export default {
    name: 'preview',
    data (){
        return{
            product: {},
            images: [],
            error: null,
            purchase_amount: 0
        }
    },
    mounted() {
    this.getDetailProduct(this.$route.params.id);
    },
    methods:{
    imagePath(file_path) {
      if (file_path) {
        return "http://localhost:3000/" + file_path;
      } else {
        return "https://bulma.io/images/placeholders/640x360.png";
      }
    },
    getDetailProduct(ProductId) {
      axios
        .get(`/product/${ProductId}`)
        .then((response) => {
          this.product = response.data.product;
          this.images = response.data.images;
        })
        .catch((error) => {
          this.error = error.response.data.message;
        });
    },
  }
}
</script>

<style>

</style>