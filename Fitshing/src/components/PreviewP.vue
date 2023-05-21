
<template>
  <section class="hero container">
    <div class="hero-body is-fullheight">
      <div class="has-background-success-light mt-6">
        <div class="columns">
          <div
            class="column is-4 is-offset-1 mt-5 p-5"
            v-for="image in images"
            :key="image.ex_id"
          >
            <figure class="image is-1by1">
              <img :src="imagePath(image.file_path)" alt="Placeholder image" />
            </figure>
          </div>
          <div class="column is-5 is-offset-1 mt-6">
            <p class="title is-3">{{ product.ex_name }}</p>
            <p class="title is-5">Type : {{ product.typeofproduct }}</p>
            <textarea class="textarea mt-3" cols="20" rows="7" v-model="product.ex_info" readonly></textarea>


            <p class="subtitle is-4">฿ {{ product.ex_price }}</p>
            <p class="subtitle is-5">จำนวนในคลัง : {{ product.amount }}</p>
            <!-- ซื้อได้หรือไม่ -->
            <div v-if="check(product)">
              <input
                class="input"
                style="width: 20%"
                type="number"
                min="1"
                :max="product.amount"
                v-model="purchase_amount"
              />
              <router-link to="/cart">
                <button
                  class="button ml-2 add-cart"
                  @click="AddCart(product)"
                  type="submit"
                >
                  Add to cart
                </button>
              </router-link>
            </div>
            <div v-else>
              <input
                class="input"
                style="width: 20%"
                type="number"
                min="1"
                :max="product.amount"
                v-model="purchase_amount"
                disabled
              />
              <button class="button ml-2 add-cart" type="submit" disabled>
                Sold out
              </button>
            </div>

            <!-- ซื้อได้หรือไม่ -->
          </div>
        </div>
        <div class="columns">
          <div class="column is-offset-1">
            <p class="title is-4">คุณอาจสนใจ</p>
          </div>
        </div>
        <div>

    <div class="task-container columns px-6 py-6 is-mobile is-multiline is-centered">
      <CardProductVue v-for="item in excerise.slice(random1, random2)" :item="item" style="max-width: 275px;" />
      <!-- <CardProductVue v-for="item in productStore.dbproduct?.slice(0,4)" :item="item"/> -->
    </div>

          
          <!-- <div class="column is-2 is-offset-1">
            <div>
              <img
                class=""
                style="max-width: 300px; width: 100%"
                src="https://img.freepik.com/free-vector/cute-bad-cat-wearing-suit-sunglasses-with-baseball-bat-cartoon-icon-illustration-animal-fashion-icon-concept-isolated-flat-cartoon-style_138676-2170.jpg?w=2000"
                alt="สินค้าแนะนำ"
              />
            </div>
            <div class="has-text-centered">
              <p>Product Name</p>
              <p>Price</p>
            </div>
          </div> -->
        </div>
      </div>
    </div>
  </section>
  <div v-if="user">
    <div v-if="user.role === 'admin'">
      <div id="four">
        <router-link
          :to="{
            name: 'editproduct',
            params: { id: `${this.$route.params.id}` },
          }"
        >
          <button class="button is-size-4 has-background-info">
            Edit Product
          </button>
        </router-link>
      </div>
      <div id="three">
        <button
          class="button is-size-4 has-background-danger"
          @click="deleteproduct"
        >
          Delete Product
        </button>
      </div>
    </div>
  </div>
</template>


<script setup>
  import CardProductVue from './CardProduct.vue';
</script>

<script>
import axios from "@/plugins/axios";

export default {
  name: "preview",
  props: ["user"],
  data() {
    return {
      product: {},
      // product1: [],
      images: [],
      excerise: [],
      type: [],
      cart: [],
      error: null,
      purchase_amount: 1,
      showedit: false,
      imageChange: null,
      ex_nameChange: "",
      amountChange: "",
      ex_priceChange: "",
      ex_infoChange: "",
      type1Change: "",
      random1: "",
      random2: "",
    };
  },
  mounted() {
    this.cart = JSON.parse(localStorage.cart);
    this.getProduct();
    // this.getProduct1();
    this.getDetailProduct(this.$route.params.id);
  },
  created() {
    this.RandomNumber();
    this.random2 = this.random1 + 4
  },
  // created() {
  //   axios
  //     .get(`http://localhost:3000/product/${this.$route.params.id}`)
  //     .then((response) => {
  //       this.ex_nameChange = response.data.product.ex_name;
  //       this.amountChange = response.data.product.amount;
  //       this.ex_priceChange = response.data.product.ex_price;
  //       this.ex_infoChange = response.data.product.ex_info;
  //       this.type1Change = response.data.product.type1;
  //       this.imageChange = response.data.images;
  //     })
  //     .catch((e) => {
  //       console.log(e);
  //     });
  // },
  methods: {
    RandomNumber() {
      this.random1 = Math.floor(Math.random() * 15);
    },
    getProduct() {
      axios
        .get("/product")
        .then((response) => {
          this.excerise = response.data;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    check(product) {
      if (product.amount > 0) {
        return true;
      }
    },
    AddCart(product) {
      if (this.cart.includes(product, -1)) {
        alert("คุณมีสินค้านี้ในตระก้าแล้ว");
      } else {
        this.cart.push(product);
        product.quantity = this.purchase_amount;
      }
      localStorage.setItem("cart", JSON.stringify(this.cart));
    },
    selectImages(event) {
      this.imagesChange = event.target.files;
    },
    showSelectImage(image) {
      return URL.createObjectURL(image);
    },
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
    deleteproduct() {
      const result = confirm(
        `Are you sure you want to delete ${this.product.ex_name}`
      );
      if (result) {
        axios
          .delete(`/product/${this.$route.params.id}`)
          .then((response) => {
            this.$router.go(-1);
            console.log("Delete Complete");
          })
          .catch((error) => {
            alert(error);
          });
      }
    },
    // async updateProduct() {
    //   console.log(this.ex_nameChange);

    //   let formData1 = new FormData();
    //     formData1.append('ex_name', this.ex_nameChange);
    //     formData1.append('ex_info', this.ex_infoChange);
    //     formData1.append('amount', this.amountChange);
    //     formData1.append('ex_price', this.ex_priceChange);
    //     formData1.append('type1', this.type1Change);
    //     formData1.append('images', this.imageChange);

    //   console.log(formData1.get('ex_name'));

    //   // const peter = {
    //   //   ex_name: this.ex_nameChange,
    //   //   ex_info: this.ex_infoChange,
    //   //   amount: this.amountChange,
    //   //   ex_price: this.ex_priceChange,
    //   //   type1: this.type1Change,
    //   // };

    //   console.log(formData1);
    //   axios
    //     .put(`/product/` + this.$route.params.id , formData1, {
    //       headers: {
    //         "Content-Type": "multipart/form-data",
    //       },
    //     })
    //     .then((response) => {
    //       console.log(response.data);
    //     })
    //     .catch((err) => {
    //       console.log(err);
    //     });
    // },
  },
};
</script>

<style>
</style>