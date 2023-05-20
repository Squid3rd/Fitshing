<template>
  <section class="hero" style="">
    <div class="hero-body container">
      <div class="p-2">
        <div class="columns">
          <div class="field has-addons column is-offset-8">
            <div style="display: flex" class="">
              <div class="control has-icons-left">
                <div class="select">
                  <select>
                    <option value="">All</option>
                    <option>Abdomen</option>
                    <option>Hand</option>
                    <option>Leg</option>
                  </select>
                </div>
              </div>
            </div>
            <button class="button ml-4 is-danger is-light" @click="clearCart()">
              Clear Cart
            </button>
            <div style="display: flex; justify-content: space-between; font-size: 1.25rem; " >
              <router-link to="/cart">
              <button 
                v-if="cart.length !=0"
                class="button is-warning ml-4"
                style="width: 100%"
                >Cart ({{cart.length}})</button>
                </router-link>
            </div>
          </div>
        </div>
        <div class="columns is-mobile">
          <div class="column is-12">
            <div class="columns is-multiline">
              <div class="column is-3" v-for="(item, index) in product" key="item.ex_id">
                <div class="card">
                <figure class="image is-4by3">
                  <img :src="imagePath(item.file_path)" alt="Placeholder image" />
                </figure>
                  <p class="title is-6 m-3">{{item.ex_name}}</p>
                  <p class="subtitle is-6 m-3">฿ {{ item.ex_price }}</p>
                  <div class="columns">
                    <div class="column is-6 has-text-centered">
                      <router-link :to='`/product/preview/${item.ex_id}`' >
                      <button class="button b-detail is-success">detail</button>
                      </router-link>
                    </div>
                    <div class="column is-6 has-text-centered">
                      <button v-if="check(item)"
                        class="button b-addcart is-warning"
                        @click="AddCart(item)"
                      >
                        Add
                      </button>
                      <button
                        class="button b-addcart is-warning"
                        @click="AddCart(item)"
                      >
                        Add
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          </div>
        </div>
      </div>
  </section>
</template>


<script setup>

</script>

<script>
import axios from "@/plugins/axios";
export default {
  name: "productall",
  data() {
    return {
      product: [],
      cart:[],
      
    };
  },
  mounted() {
    this.cart = JSON.parse(localStorage.cart);
    this.getProduct();
  },
  methods: {
    check(product){
        if(this.cart.includes(product)){
          return false
        }
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
    imagePath(file_path) {
      if (file_path) {
        return "http://localhost:3000/" + file_path;
      } else {
        return "https://bulma.io/images/placeholders/640x360.png";
      }
    },
    shortTitle(content) {
      if (content.length > 15) {
        return content.substring(0, 13) + "...";
      }
      return content;
    },
    clearCart() {
      this.cart = [];
      localStorage.setItem("cart", JSON.stringify(this.cart));
    },
    AddCart(product) {
      if (this.cart.includes(product)) {
        alert("คุณมีสินค้านี้ในตระก้าแล้ว")
        // product.quantity = product.quantity+1;
        // localStorage.setItem("cart", JSON.stringify(this.cart));
      } else {
        this.cart.push(product);
        product.quantity = 1;
        // localStorage.setItem("cart", JSON.stringify(this.cart));
      }
      localStorage.setItem("cart", JSON.stringify(this.cart));
    },
    removeFromCart(product) {
    // if (product.quantity == 1) {
      this.cart.splice(this.cart.indexOf(product), 1)
    // }
    // else {
      // product.quantity -= 1
      // localStorage.setItem("cart", JSON.stringify(this.cart));
    // }
    localStorage.setItem("cart", JSON.stringify(this.cart));
    },
  },
  computed: {
      sumary() {
        return this.cart.reduce((num, int) => num + int.ex_price * int.quantity, 0)
      }
    },
};
</script>

<script setup>
import CardProductVue from "../CardProduct.vue";
</script>

<style>

</style>