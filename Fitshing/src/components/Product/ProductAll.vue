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
              <!-- แต่ละproduct -->
              <div class="column is-3 has-text-centered cart-item" v-for="(item, index) in product" key="item.ex_id">
                <div class="card has-text-centered" style="max-width:300px;height:350px;">
                  <div class="">
                  <figure class="image" >
                    <img :src="imagePath(item.file_path)" style="object-fit: contain; width:300px; height:200px;"  alt="Placeholder image" />
                  </figure>
                  </div>
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
                        class="button b-addcart"
                        disabled
                      >
                      In Cart
                      </button>
                      <button v-else-if="item.amount <= 0"
                        class="button b-addcart"
                        disabled
                      >
                        Sold out
                      </button>
                      <button v-else
                      class="button b-addcart is-warning"  style="width:100px;"
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
          return true
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
      if (this.cart.includes(product,-1)) {
        alert("คุณมีสินค้านี้ในตระก้าแล้ว")
      } else {
        this.cart.push(product);
        product.quantity = 1;

      }
      localStorage.setItem("cart", JSON.stringify(this.cart));
    },
    removeFromCart(product) {
      this.cart.splice(this.cart.indexOf(product), 1)
    localStorage.setItem("cart", JSON.stringify(this.cart));
    },
  },
  computed: {
      sumary() {
        return this.cart[0]==this.cart[1]
      }
    },
};
</script>

<script setup>
import CardProductVue from "../CardProduct.vue";
</script>

<style>

</style>