<template>
   <section class="hero container">
    <div class="hero-body">
      <div>
        <div class="columns">
          <div class="field has-addons column is-offset-8">
            <div style="display: flex">
              <div class="control has-icons-left">
                <div class="select">
                  <select v-model="sort1">
                    <option value="">All</option>
                    <option value="1">Exercise bike</option>
                    <option value="2">Rowing machine</option>
                    <option value="3">Weight bench</option>
                    <option value="4">Treadmill</option>
                    <option value="5">Dumbbell</option>
                    <option value="6">Body Weight</option>
                    <option value="7">Rubber bands</option>
                    <option value="8">Jump rope</option>
                    <option value="9">Hula hoop</option>
                    <option value="10">Gloves</option>
                  </select>
                </div>
              </div>
            </div>
            <button class="button ml-4 is-danger is-light" @click="clearCart()">
              Clear Cart
            </button>
          </div>
        </div>

        <div v-if="isLoading" class="has-text-centered py-5">
          <p class="is-size-5">Loading products...</p>
        </div>

        <div v-else-if="filteredProduct.length === 0" class="has-text-centered py-5">
          <p class="is-size-5">No products found.</p>
        </div>

        <div v-else class="is-mobile">
            <div class="columns is-multiline">
              <div
                class="column is-3 cardd"
                v-for="item in filteredProduct"
                :key="item.ex_id"
              >
                <div
                  class="card has-text-centered"
                  style="max-width: 300px; height: 370px"
                >
                  <div class="column">
                    <figure class="image">
                      <img
                        :src="imagePath(item.file_path)"
                        style="object-fit: contain; width: 300px; height: 200px"
                        alt="Product image"
                      />
                    </figure>
                  </div>
                  <p class="title is-6 m-3">{{ item.ex_name }}</p>
                  <p class="subtitle is-6 m-3">&#3647; {{ item.ex_price }}</p>
                  <div class="columns">
                    <div class="column is-6 has-text-centered">
                      <router-link :to="`/product/preview/${item.ex_id}`">
                        <button class="button b-detail is-success">
                          detail
                        </button>
                      </router-link>
                    </div>
                    <div class="column is-6 has-text-centered">
                      <button
                        v-if="isInCart(item)"
                        class="button b-addcart"
                        disabled
                      >
                        In Cart
                      </button>
                      <button
                        v-else-if="item.amount <= 0"
                        class="button b-addcart"
                        disabled
                      >
                        Sold out
                      </button>
                      <button
                        v-else
                        class="button b-addcart is-warning"
                        style="width: 100px"
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
  </section>
</template>

<script>
import axios from "@/plugins/axios";

const API_BASE = "http://localhost:3000/";

export default {
  name: "productall",
  data() {
    return {
      sort1: "",
      product: [],
      cart: [],
      isLoading: false,
    };
  },
  mounted() {
    this.cart = JSON.parse(localStorage.getItem('cart') || '[]');
    this.getProduct();
  },
  methods: {
    isInCart(product) {
      return this.cart.some(item => item.ex_id === product.ex_id);
    },
    async getProduct() {
      this.isLoading = true;
      try {
        const response = await axios.get("/product");
        this.product = response.data;
      } catch (err) {
        console.error(err);
      } finally {
        this.isLoading = false;
      }
    },
    imagePath(file_path) {
      if (file_path) {
        return API_BASE + file_path;
      }
      return "https://bulma.io/images/placeholders/640x360.png";
    },
    clearCart() {
      this.cart = [];
      localStorage.setItem("cart", JSON.stringify(this.cart));
    },
    AddCart(product) {
      if (this.isInCart(product)) {
        return;
      }
      product.quantity = 1;
      this.cart.push(product);
      localStorage.setItem("cart", JSON.stringify(this.cart));
    },
    removeFromCart(product) {
      const index = this.cart.findIndex(item => item.ex_id === product.ex_id);
      if (index > -1) {
        this.cart.splice(index, 1);
        localStorage.setItem("cart", JSON.stringify(this.cart));
      }
    },
  },
  computed: {
    filteredProduct() {
      if (this.sort1 === '') {
        return this.product;
      }
      return this.product.filter(item => item.type1 == this.sort1);
    },
  },
};
</script>

<style>
</style>
