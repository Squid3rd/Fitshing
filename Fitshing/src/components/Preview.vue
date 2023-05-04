
<template>
  <section class="hero is-fullheight">
    <div class="container is-max-widescreen has-background-success-light mt-6">
      <div class="columns">
        <!-- Admin Part -->
        <div>
          <!-- <button class="button is-danger" @click="deleteproduct">
            Delete
          </button> -->
        </div>
        <div>
          <button class="button is-info" @click="showedit = !showedit">
            Edit
          </button>
        </div>

        <div class="modal" v-bind:class="{ 'is-active': showedit }">
          <div class="modal-background"></div>
          <div class="modal-card1">
            <div class="modal-content box">
              <div
                class="columns"
                style="
                  background-color: transparent;
                  border-bottom: 3px solid white;
                "
              >
                <div>
                  <p class="title">Edit Product</p>
                </div>
              </div>
              <div class="columns p-6">
                <div class="column has-text-centered">
                  <div class="container">
                    <!-- <section class="section" v-if="error">
                      <div class="container is-widescreen">
                        <div class="notification is-danger">
                          {{ error }}
                        </div>
                      </div>
                    </section> -->

                    <section class="px-6">
                      <div class="field">
                        <div v-if="imagesChange" class="columnn">
                          <div
                            v-for="(image, index) in imagesChange"
                            :key="image.id"
                            class="column is-4 is-offset-4 box"
                          >
                            <div class="card">
                              <div class="card-image">
                                <figure class="image is-1by1">
                                  <img
                                    :src="showSelectImage(image)"
                                    alt="Placeholder image"
                                  />
                                </figure>
                              </div>
                            </div>
                          </div>
                          <button
                            class="button is-success"
                            @click="updateImage(image.id)"
                          >
                            Change
                          </button>
                        </div>
                        <div v-else class="column">
                          <div class="column is-4 is-offset-4 box">
                            <div
                              class="card"
                              v-for="imagedefault in images"
                              :key="imagedefault.id"
                            >
                              <div class="card-image">
                                <figure class="image is-1by1">
                                  <img
                                    :src="imagePath(imagedefault.file_path)"
                                    alt="Placeholder image"
                                  />
                                </figure>
                              </div>
                            </div>
                          </div>
                          <button class="button is-success" disabled>
                            Change
                          </button>
                        </div>

                        <input
                          class="mb-5 has-text-centered"
                          multiple
                          type="file"
                          accept="image/png, image/jpeg, image/webp"
                          @change="selectImages"
                        />
                      </div>

                      <div class="field">
                        <label class="label">Product name</label>
                        <div class="control">
                          <input
                            v-model="ex_nameChange"
                            class="input"
                            type="input"
                            placeholder="name"
                            required
                          />
                          <!-- <p class="help is-danger" v-if='msg.Product'>{{ msg.Product }}</p> -->
                        </div>
                      </div>

                      <div class="columns">
                        <div class="column is-half">
                          <label class="label">Amount</label>
                          <div class="control">
                            <input
                              v-model="amountChange"
                              class="input"
                              type="number"
                              placeholder="amount"
                              required
                            />
                            <!-- <p class="help is-danger" v-if='msg.Amount'>{{ msg.Amount }}</p> -->
                          </div>
                        </div>
                        <div class="column is-half">
                          <label class="label">Price</label>
                          <div class="control">
                            <input
                              v-model="ex_priceChange"
                              class="input"
                              type="number"
                              placeholder="price"
                              required
                            />
                            <!-- <p class="help is-danger" v-if='msg.Price'>{{ msg.Price }}</p> -->
                          </div>
                        </div>
                      </div>

                      <div class="field">
                        <label class="label">Type</label>
                        <div class="select">
                          <select v-model="type1Change" required>
                            <option value="">Select</option>
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
                        <!-- <p class="help is-danger" v-if='msg.Type'>{{ msg.Type }}</p> -->
                      </div>

                      <div class="field">
                        <label class="label">Description</label>
                        <textarea
                          class="textarea"
                          placeholder="...."
                          v-model="ex_infoChange"
                          required
                        ></textarea>
                        <!-- <p class="help is-danger" v-if='msg.Info'>{{ msg.Info }}</p> -->
                      </div>

                      <div class="field is-centered">
                        <div class="control">
                          <button
                            @click="updateProduct"
                            class="button is-link m-5"
                          >
                            Submit
                          </button>
                          <button
                            @click="showedit = !showedit"
                            class="button is-link m-5 is-light"
                          >
                            Cancel
                          </button>
                        </div>
                      </div>
                    </section>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- User Part -->
        <div
          class="column is-4 is-offset-1"
          v-for="image in images"
          :key="image.ex_id"
        >
          <div class="card p-2" style="max-width: 95%">
            <img :src="imagePath(image.file_path)" alt="Placeholder image" />
          </div>
        </div>
        <div class="column is-5 is-offset-1">
          <p class="title is-3">{{ product.ex_name }}</p>
          <p class="title is-5">Type : {{ product.typeofproduct }}</p>
          <div
            class="description has-background-white m-2"
            style="border: 1px solid #0004; border-radius: 2px; height: 200px"
          >
            {{ product.ex_info }}
          </div>

          <p class="subtitle is-4">฿ {{ product.ex_price }}</p>
          <input
            class="input"
            style="width: 20%"
            type="number"
            min="1"
            :max="product.amount"
            v-model="purchase_amount"
          />
          <button class="button ml-2 add-cart" type="submit">
            Add to cart
          </button>
        </div>
      </div>
      <div class="columns">
        <div class="column is-offset-1">
          <p class="title is-4">คุณอาจสนใจ</p>
        </div>
      </div>
      <div class="columns scroll">
        <div class="column is-2 is-offset-1" v-for="index in 5">
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
        </div>
      </div>
    </div>
  </section>
  <div id="three">
        <router-link :to="{ name: 'editproduct', params: { id: `${this.$route.params.id}` } }">
      <button class="button is-size-4 has-background-info">Edit Product</button>
    </router-link>
  </div>
    <div id="two">
      <button class="button is-size-4 has-background-danger" @click="deleteproduct">Delete Product</button>
  </div>
</template>


<script setup>
</script>

<script>
import axios from "@/plugins/axios";
export default {
  name: "preview",
  data() {
    return {
      product: {},
      images: [],
      error: null,
      purchase_amount: 1,
      showedit: false,
      imageChange: null,
      ex_nameChange: "",
      amountChange: "",
      ex_priceChange: "",
      ex_infoChange: "",
      type1Change: "",
    };
  },
  mounted() {
    this.getDetailProduct(this.$route.params.id);
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
    selectImages(event) {
      this.imagesChange = event.target.files;
    },
    showSelectImage(image) {
      return URL.createObjectURL(image);
    },
    imagePath(file_path) {
      return "http://localhost:3000/" + file_path;
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