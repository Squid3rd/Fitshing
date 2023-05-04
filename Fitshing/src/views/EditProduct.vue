<template>
    <section class="hero is-fullheight">
      <div class="columns hero-body is-centered is-fullheight">
        <div class="column is-8">
          <div class="box p-5 m-5">
            <div class="box has-background-success has-text-info-light">
              <div class="field is-grouped is-grouped-centered">
                <h1 class="is-size-3 has-text-weight-bold">Edit Product</h1>
              </div>
            </div>
  
            <div class="columns is-centered p-5 m-5">
              <div class="column has-text-centered">
                <div class="field">
                  <div v-if="imagesC" class="column">
                    <div class="column is-4 is-offset-4 box" v-for="(imagesel, index) in imagesC"
                            :key="imagesel.id">
                      <div class="card">
                        <div class="card-image">
                          <figure class="image is-1by1">
                            <img
                            :src="showSelectImage(imagesel)"
                          />
                          </figure>
                        </div>
                      </div>
                    </div>
                    <button class="button is-success" :disabled="verifie" @click="changeImage(), verifie = !verifie">Verify Image</button>
                  </div>
                  <div v-else class="column">
                    <div
                      v-for="(image, index) in images"
                      :key="image.id"
                      class="column is-4 is-offset-4 box"
                    >
                      <div class="card">
                        <div class="card-image">
                          <figure class="image is-1by1">
                            <img
                            :src="imagePath(image.file_path)"
                              alt="Placeholder image"
                            />
                          </figure>
                        </div>
                      </div>
                    </div>
                    <button class="button is-success" :disabled="verifie">Verify Image</button>
                  </div>
  
                  <input
                    id="fileproduct"
                    class="mb-5 has-text-centered"
                    multiple
                    type="file"
                    accept="image/png, image/jpeg, image/webp"
                    @change="selectImages"
                  />
                  <label for="upload"> </label>
                  
                  <!-- <p class="help is-danger" v-if='msg.image1'>{{ msg.image1 }}</p> -->
                </div>
              </div>
            </div>
  
            <div class="column is-half is-offset-3">
              <div class="field">
                <label class="label">Product name</label>
                <div class="control">
                  <input
                    v-model.trim="ex_name"
                    class="input"
                    type="input"
                    placeholder="name"
                    required
                  />
                  <p class="help is-danger" v-if='msg.Product'>{{ msg.Product }}</p>
                </div>
              </div>
  
              <div class="columns">
                <div class="column is-half">
                  <label class="label">Amount</label>
                  <div class="control">
                    <input
                      v-model="amount"
                      class="input"
                      type="number"
                      placeholder="amount"
                      required
                    />
                    <p class="help is-danger" v-if='msg.Amount'>{{ msg.Amount }}</p>
                  </div>
                </div>
                <div class="column is-half">
                  <label class="label">Price</label>
                  <div class="control">
                    <input
                      v-model="ex_price"
                      class="input"
                      type="number"
                      placeholder="price"
                      required
                    />
                    <p class="help is-danger" v-if='msg.Price'>{{ msg.Price }}</p>
                  </div>
                </div>
              </div>
  
              <div class="field">
                <label class="label">Type</label>
                <div class="select">
                  <select v-model="type1" required>
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
                <p class="help is-danger" v-if='msg.Type'>{{ msg.Type }}</p>
              </div>
  
              <div class="field">
                <label class="label">Description</label>
                <textarea
                  class="textarea"
                  placeholder="...."
                  v-model="ex_info"
                  required
                ></textarea>
                <p class="help is-danger" v-if='msg.Info'>{{ msg.Info }}</p>
              </div>
            </div>
  
            <div class="field is-grouped is-grouped-right pt-2">
              <router-link to="/">
                <button class="button is-danger" @click="this.$router.go(-1)">Back</button>
              </router-link>
              <span>
                <a class="button is-success ml-5" @click="submitProduct()"
                  >Submit</a
                >
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
    <div id="two">
        <router-link :to="{ name: 'editproduct', params: { id: `${this.$route.params.id}` } }">
      <button class="button is-size-4 has-background-info">Edit Product</button>
    </router-link>
  </div>
  </template>
  
  <script>
  import axios from "@/plugins/axios";
  
  export default {
    name: "editproduct",
  
    data() {
      return {
        ex_name: "",
        ex_info: "",
        amount: 0,
        ex_price: 0,
        images: [],
        type1: "",
        error: null,
        msg:[],
        imagesC: null,
        verifie: true
      };
    },
    created() {
    axios
      .get(`/product/${this.$route.params.id}`)
      .then((response) => {
        this.ex_name = response.data.product.ex_name;
        this.amount = response.data.product.amount;
        this.ex_price = response.data.product.ex_price;
        this.ex_info = response.data.product.ex_info;
        this.type1 = response.data.product.type1;
        this.images = response.data.images;
      })
      .catch((e) => {
        console.log(e);
      });
  },
    methods: {
      selectImages(event) {
        this.verifie = false
        this.imagesC = event.target.files;
      },
      showSelectImage(image) {
        return URL.createObjectURL(image);
      },
      imagePath(file_path) {
      return "http://localhost:3000/" + file_path;
    },
      async changeImage(){
        // if (!this.images) {
        //   alert("please fill Image");
        // } 
        // else{
          
        // }
        let formData = new FormData();
        formData.append("imagesC", this.imagesC[0]);

        console.log("Update image")
        axios
            .put(`/product/update/image/${this.$route.params.id}`, formData)
            .then((response) => {
              console.log(response.data);
              // this.$router.go(0);
            })
            .catch((err) => {
              console.log(err);
            });
      },
      async submitProduct() {
        // if (!this.images) {
        //   alert("please fill Image");
        // } 
        if (!this.ex_name || this.ex_name.length < 5) {
          alert("please fill Product Name");
        } 
        else if (!this.amount || this.amount <= 0) {
          alert("invalid Amount");
        } 
        else if (!this.ex_price) {
          alert("invalid Price");
        } 
        else if (!this.type1) {
          alert("please select product type");
        }
        else if (!this.ex_info || this.ex_info.length < 30) {
          alert("invalid info");
        }
        else {
          axios
            .put(`/product/${this.$route.params.id}`, {
                ex_name: this.ex_name,
                ex_info: this.ex_info,
                amount: this.amount,
                ex_price: this.ex_price,
                type1: this.type1,
            })
            .then((response) => {
              console.log(response.data);
              this.$router.go(-1);
            })
            .catch((err) => {
              console.log(err);
              
            });
        }
      },
      validateProduct(value) {
            if (value.length < 5) {
              this.msg['Product'] = 'Must be 5 characters! or more';
            } else {
              this.msg['Product'] = '';
            }
      },
      validateAmount(value) {
            if (isNaN(value)) {
              this.msg['Amount'] = 'Number only';
            } else {
              this.msg['Amount'] = '';
            }
      },
      validatePrice(value) {
            if (isNaN(value)) {
              this.msg['Price'] = 'Number only';
            } else {
              this.msg['Price'] = '';
            }
      },
      validateType(value) {
            if (value.length <= 0) {
              this.msg['Type'] = 'Must be Select';
            } else {
              this.msg['Type'] = '';
            }
      },
      validateInfo(value) {
            if (value.length < 30) {
              this.msg['Info'] = 'Must be 30 characters! or more';
            } else {
              this.msg['Info'] = '';
            }
      },
    },
    watch:{
      ex_name(value){
        this.ex_name = value;
        this.validateProduct(value);
      },
      ex_price(value){
        this.ex_price = value;
        this.validatePrice(value);
      },
      amount(value){
        this.amount = value;
        this.validateAmount(value);
      },
      type1(value){
        this.type1 = value;
        this.validateType(value);
      },
      ex_info(value){
        this.ex_info = value;
        this.validateInfo(value);
      }
    }
  };
  </script>
  
  <style>
  </style>