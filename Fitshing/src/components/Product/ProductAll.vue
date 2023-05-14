<template>
  <section class="hero" style="">
    <div class="hero-body">
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
          </div>
        </div>
        <div class="columns is-mobile">
          <div class="column is-9">
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
                      <!-- <router-link to="/detail">
                      <button class="button b-detail is-success">detail</button>
                      </router-link> -->
                    </div>
                    <div class="column is-6 has-text-centered">
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
            <div class="column is-3 pt-6 pl-0 cart ml-5 is-mobile">
              <div style="display: flex; justify-content: space-between">
                <span class="is-size-4 mb-4">ตะกร้า ({{ cart.length }})</span>
              </div>

              <!-- Card element start here ------------------------------------------>
              <div v-for="products in cart" class="card mb-1 is-mobile">
                <div class="card-content p-0">
                  <div class="media">
                    <div class="media-left">
                      <figure class="image is-96x96 mt-2">
                        <img :src="imagePath(products.file_path)" alt="Placeholder image" />
                      </figure>
                    </div>
                    <div class="media-content pt-2">
                      <p class="is-5">{{ products.ex_name }}</p>
                      <p class="has-text-grey-light is-6">
                        {{ products.brand }}
                      </p>
                      <div
                        style="display: flex; justify-content: space-between"
                      >
                        <div>
                          <!-- ราคาสินค้า------------------------------------------------ -->
                          <span class="is-6 has-text-danger">{{products.ex_price}}</span>
                          <!-- จำนวนสินค้า----------------------------------------------- -->
                          <span>x{{ products.quantity }}</span>
                        </div>
                        <div>
                          <!-- icon รูปถังขยะ------------------------------------------- -->
                          <span class="icon mr-2">
                            <i class="fa fa-trash" @click="removeFromCart(products)"></i>
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <!--  -->
              <div
                style="display: flex; justify-content: space-between; font-size: 1.25rem; " >
                <span class="has-text-weight-bold">Total</span>
                <!-- รวมราคาสินค้าาาาาาาาาาาาาาาาาาาาาาาา -->
                <span id="totalPrice">{{sumary}}</span>
              </div>

              <!-- ปุ่ม Checkout ------------------------------------------------------------ -->
                <router-link to="/cart">
                <button 
                  v-if="cart.length !=0"
                  class="button is-warning mt-3"
                  style="width: 100%"
                  >Checkout</button>
                  </router-link>
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
        product.quantity = product.quantity+1;
        localStorage.setItem("cart", JSON.stringify(this.cart));
      } else {
        this.cart.push(product);
        product.quantity = 1;
        localStorage.setItem("cart", JSON.stringify(this.cart));
      }
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
// <div class="product">
//               <CardProductVue v-for="item in product" :item="item" />
//           </div>
</script>

<script setup>
import CardProductVue from "../CardProduct.vue";
</script>

<style>

</style>