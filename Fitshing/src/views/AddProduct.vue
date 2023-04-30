<template>
  <section class="hero is-fullheight">
    <div class="columns hero-body is-centered is-fullheight">
      <div class="column is-8">
        <div class="box p-5 m-5">
          <div class="box has-background-danger has-text-info-light">
            <div class="field is-grouped is-grouped-centered">
              <h1 class="is-size-3 has-text-weight-bold">Add Product</h1>
            </div>
          </div>

          <div class="columns is-centered p-5 m-5">
            <div class="column has-text-centered">
              <div class="field">
                <div v-if="images" class="columns">
                  <div
                    v-for="(image, index) in images"
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
                </div>
                <div v-else class="column">
                  <div class="column is-4 is-offset-4 box">
                    <div class="card">
                      <div class="card-image">
                        <figure class="image is-1by1">
                          <img
                            src="../assets/image/plus.png"
                            alt="Placeholder image"
                          />
                        </figure>
                      </div>
                    </div>
                  </div>
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
              </div>
            </div>
          </div>

          <div class="column is-half is-offset-3">
            <div class="field">
              <label class="label">Product name</label>
              <div class="control">
                <input
                  v-model="ex_name"
                  class="input"
                  type="input"
                  placeholder="name"
                />
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
                    placeholder="Password"
                  />
                </div>
              </div>
              <div class="column is-half">
                <label class="label">Price</label>
                <div class="control">
                  <input
                    v-model="ex_price"
                    class="input"
                    type="number"
                    placeholder="Password"
                  />
                </div>
              </div>
            </div>


            <div class="field">
                <label class="label">Type</label>
                <div class="select">
                  <select v-model="type1">
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
            </div>

            <div class="field">
              <label class="label">Description</label>
              <textarea class="textarea" placeholder="...." v-model="ex_info"></textarea>
            </div>
          </div>

          <div class="field is-grouped is-grouped-right pt-2">
            <router-link to="/">
              <button class="button is-danger">Back</button>
            </router-link>
            <span>
              <a class="button is-success ml-5" @click="submitProduct()"
                >Submit</a
              >
            </span>
          </div>
          <!-- <button class="button is-primary">Sign in</button> -->
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import axios from "@/plugins/axios";

export default {
  name: "addproduct",
  data() {
    return {
      ex_name: "",
      ex_info: "",
      amount: 0,
      ex_price: 0,
      images: null,
      type1: "",
    };
  },
  methods: {
    selectImages(event) {
      this.images = event.target.files;
    },
    showSelectImage(image) {
      return URL.createObjectURL(image);
    },
    submitProduct(){
        let formData = new FormData();
      formData.append("ex_name", this.ex_name);
      formData.append("ex_info", this.ex_info);
      formData.append("amount", this.amount);
      formData.append("ex_price", this.ex_price);
      formData.append("type1", this.type1);
      formData.append("images", this.images[0]);

        console.log(this.images[0])
        console.log(formData)
      axios
        .post("/product", formData)
        .then((res) => {
          console.log(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  },
};
</script>

<style>
</style>