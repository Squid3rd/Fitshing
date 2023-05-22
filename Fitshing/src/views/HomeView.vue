<script setup>
import CardProductVue from "../components/CardProduct.vue";
import CardTrainer from "../components/CardTrainer.vue";
</script>

<template>
  <section id="header">
    <div class="header-inner">
      <h3 style="font-weight: 500" @click="change = !change">▲ For Fitness ▲</h3>
    </div>
    <div class="mr-2 script" style="position:absolute; left:90%; top:20px;" v-if="change">
      <p class="subtitle is-5 " style="color:rgb(236, 189, 131);">
        Fitshing เป็นที่ที่คุณสามารถหา connection ในการหาความรู้ในด้านการออกกำลังกาย หา Trainer
        ในการช่วยคุณออกกำลังกาย โดยเว็บไซต์นี้ทำมาเพื่อรวบรวมเหล่า Trainer มากมายเพื่อเป็นแหล่งในการช่วยคุณให้ติดต่อกับ Trainer ได้ง่ายขึ้น โดยการรวบรวมเหล่า Trainer มาไว้แล้วให้คุณหา คนที่เหมาะกับคุณเอง แล้วยังมีบริการขายของออนไลน์สำหรับผู้ที่อาจอยากแค่หาความรู้จาก เหล่าTrainer แล้วออกด้วยตัวเอง ทางเราก็มีบริการการซื้อของออนไลน์ให้ และนี่ก็คือทั้งหมดของ Fitshing ครับ
        </p>
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
      <CardProductVue v-for="item in product.slice(random1, random2)" :item="item" />
    </div>
  </div>
  <!-- <CardProductVue v-for="item in productStore.dbproduct?.slice(0,4)" :item="item"/> -->
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
      random1: "",
      random2: "",
      change:false,
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
  created(){
    this.RandomNumber();
    this.random2 = this.random1 + 5
  },
  methods: {
    RandomNumber() {
      this.random1 = Math.floor(Math.random() * 15);
    },
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
    shortTitle(content) {
      if (content.length > 30) {
        return content.substring(0, 27) + "...";
      }
      return content;
    },
  },
};
</script>
