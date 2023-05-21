<script setup>
import CardProductVue from "../components/CardProduct.vue";
import CardTrainer from "../components/CardTrainer.vue";
</script>

<template>
  <section id="header">
    <div class="header-inner">
      <h3 style="font-weight: 500">▲ For Fitness ▲</h3>
    </div>
  </section>

  <h1
    class="has-text-danger-dark has-background-info-light is-size-2 has-text-centered has-text-weight-bold"
  >
    New Product
  </h1>
  <div class="bor1">
    <div class="task-container columns px-6 py-6 is-mobile is-multiline">
      <CardProductVue v-for="item in product.slice(-5).reverse()" :item="item" />
      <!-- <CardProductVue v-for="item in productStore.dbproduct?.slice(0,4)" :item="item"/> -->
    </div>
  </div>
  <h1
    class="has-text-danger-dark has-background-info-light is-size-2 has-text-centered has-text-weight-bold"
  >
    Product
  </h1>
  <div class="bor3">
    <div class="task-container columns px-6 py-6 is-mobile is-multiline">
      <CardProductVue v-for="item in product.slice(0, 5)" :item="item" />
      <!-- <CardProductVue v-for="item in productStore.dbproduct?.slice(0,4)" :item="item"/> -->
    </div>
  </div>
  <h1
    class="has-text-danger-dark has-background-info-light is-size-2 has-text-centered has-text-weight-bold"
  >
    Trainer
  </h1>
  <div class="bor4">
    <div class="px-6 py-6 product">
      <CardTrainer v-for="item in trainer.slice(0, 4)" :item="item" />
    </div>
  </div>
</template>

<script>
import axios from "@/plugins/axios";
export default {
  name: "home",
  data() {
    return {
      product: [],
      trainer: [],
      cart:[],
      // numRandom: "",
    };
  },
  mounted() {
    this.getProduct();
    this.getTrainer();
    if (localStorage.getItem("cart") === null) {
        localStorage.setItem("cart", JSON.stringify(this.cart));
    }
  },
  // created(){
  //   this.generateRandomNumber();
  // },
  methods: {
    // generateRandomNumber() {
    //   this.numRandom = Math.floor(Math.random() * 10) + 1;
    // },
    getProduct() {
      axios
        .get("/product")
        .then((response) => {
          this.product = response.data;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    getTrainer() {
      axios
        .get("/trainer")
        .then((response) => {
          this.trainer = response.data;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    imagePath(file_path) {
      if (file_path) {
        return "http://localhost:3000/" + file_path;
      } else {
        return "https://bulma.io/images/placeholders/640x360.png";
      }
    },
    // shortTitle(content) {
    //   if (content.length > 30) {
    //     return content.substring(0, 27) + "...";
    //   }
    //   return content;
    // },
  },
};
</script>
