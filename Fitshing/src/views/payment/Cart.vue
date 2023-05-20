<template>
  <div class="container">
    <div class="m-6">
      <div class="columns is-gapless">
        <div class="column is-3">
          <p class="subtitle is-3">Cart </p>
          <hr class="" style="background-color: rgb(184, 184, 184)" />
        </div>
        <div class="column is-5 has-text-right">
          <router-link to="/product">
            <button class="button is-info is-light">All Product</button>
          </router-link>
          <button class="button is-danger is-light ml-1" @click="clearCart()">
            ลบทั้งหมด
          </button>
          <hr class="" style="background-color: rgb(184, 184, 184)" />
        </div>
        <div class="column is-4 is-offset-0 has-text-left ml-2">
          <p class="subtitle is-3">รายการคำสั่งซื้อ</p>
          <hr style="background-color: rgb(184, 184, 184)" />
        </div>
      </div>
      <div class="tile is-ancestor">
        <div class="tile is-vertical is-8">
          <!-- สินค้าแต่ละชิ้น loop ตรงนี้-->
          <div class="m-2 cart-product" v-for="(items, index) of cart">
            <div class="tile is-parent columns">
              <div class="column is-3">
                <figure class="image mt-5">
                   <img :src="imagePath(items.file_path)" alt="Placeholder image" />
                      </figure>
              </div>
              <div class="column is-6">
                <p class="title is-4">{{ items.ex_name }}</p>
                <p class="subtitle is-5">${{ items.ex_price }}</p>
                <p>{{ items.ex_info }}</p>
                <!-- <p></p>จำนวนชิ้น -->
                <!-- content -->
              </div>
              <div class="column is-2">
                  <div class="num-block">
                    <div class="num-in">
                      <span  class="minus dis" @click="disFromCart(items)"></span>
                      <input type="text" class="in-num" :value="items.quantity" />
                      <span class="plus" @click="plusFromCart(items)"></span>
                    </div>
                  </div>
              </div>
              <div class="column is-1">
                <div class="has-text-right">
                  <button
                    class="cancel delete"
                    @click="removeFromcart(items)"
                    aria-label="delete"
                  ></button>
                </div>
              </div>
            </div>
          </div>
          <!-- สินค้าแต่ละชิ้น loop ตรงนี้ -->
        </div>
        <div class="tile is-vertical is-4">
          <div class="bill ml-5">
            <article class="tile is-child">
              <div class="content m-5">
                <div class="columns" v-for="(items, index) in cart">
                  <div class="column is-10">
                    <p class="">{{ items.ex_name }}</p>
                  </div>
                  <div class="column">
                    <p class="">
                      x <span>{{ items.quantity }}</span>
                    </p>
                  </div>
                </div>
                <div class="columns">
                  <div class="column is-8"><p class="">ราคารวม</p></div>
                  <div class="column has-text-right">
                    <p class="">{{sumary}} บาท</p>
                  </div>
                </div>
                <div class="columns">
                  <div class="column has-text-centered" v-if="user">
                    <router-link to="/bill">
                      <button class="button is-success is-light is-fullwidth">
                        ชำระเงิน
                      </button>
                    </router-link>
                  </div>
                  <div class="column has-text-centered" v-else>
                    <router-link to="/login">
                      <button class="button is-danger is-light is-fullwidth">
                        Login First!!
                      </button>
                    </router-link>
                  </div>
                </div>
              </div>
            </article>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "@/plugins/axios";
export default {
  props: ['user'],
  data() {
    
    return {
      cart: [],


    };
  },
  created() {
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
        this.cart = JSON.parse(localStorage.cart);
    },
    imagePath(file_path) {
      if (file_path) {
        return "http://localhost:3000/" + file_path;
      } else {
        return "https://bulma.io/images/placeholders/640x360.png";
      }
    },
    plusFromCart(product) {
      if (this.cart.includes(product) && product.quantity  < product.amount) {
        product.quantity = product.quantity + 1;
        localStorage.setItem("cart", JSON.stringify(this.cart));
      }
    },
    disFromCart(product) {
      if(product.quantity > 1){
      product.quantity -= 1;
      localStorage.setItem("cart", JSON.stringify(this.cart));
      }
      
    },
    removeFromcart(product){
      this.cart.splice(this.cart.indexOf(product), 1);
      localStorage.setItem("cart", JSON.stringify(this.cart));
    },
    clearCart() {
      this.cart = [];
      localStorage.setItem("cart", JSON.stringify(this.cart));
    },
  },
  computed: {
    sumary() {
      return this.cart.reduce((num, int) => num + int.ex_price * int.quantity, 0);
    },
  },
};
</script>

<style>
</style>