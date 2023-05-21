<template>
  <section class="hero is-fullheight">
    <div class="columns hero-body is-centered is-fullheight">
      <div class="column is-8">
        <div class="box p-5 m-5">
          <div class="box has-background-info has-text-info-light">
            <div class="field is-grouped is-grouped-centered">
              <h1 class="is-size-3 has-text-weight-bold">Edit VDO</h1>
            </div>
          </div>

          <div class="columns is-centered p-5 m-5">
            <div class="column has-text-centered">
              <div class="field">
                <div v-if="imagesC" class="column">
                  <div
                    class="column is-4 is-offset-4 box"
                    v-for="(imagesel, index) in imagesC"
                    :key="imagesel.id"
                  >
                    <div class="card">
                      <div class="card-image">
                        <figure class="image is-1by1">
                          <img :src="showSelectImage(imagesel)" />
                        </figure>
                      </div>
                    </div>
                  </div>
                  <button
                    class="button is-success"
                    :disabled="verifie"
                    @click="changeImage(), (verifie = !verifie)"
                  >
                    Verify Image
                  </button>
                </div>
                <div v-else class="column">
                  <div
                    class="column is-4 is-offset-4 box"
                  >
                    <div class="card">
                      <div class="card-image">
                        <figure class="image is-1by1">
                          <img
                            :src="imagePath(images)"
                            alt="Placeholder image"
                          />
                        </figure>
                      </div>
                    </div>
                  </div>
                  <button class="button is-success" :disabled="verifie">
                    Verify Image
                  </button>
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
              <label class="label">VDO name</label>
              <div class="control">
                <input
                  v-model.trim="clip_name"
                  class="input"
                  type="input"
                  placeholder="name"
                  required
                />
                <p class="help is-danger" v-if="msg.Name">
                  {{ msg.Name }}
                </p>
              </div>
            </div>

            <div class="field">
              <label class="label">Link VDO</label>
              <div class="control">
                <input
                  v-model.trim="link_vdo"
                  class="input"
                  type="input"
                  placeholder="name"
                  required
                />
                <p class="help is-danger" v-if="msg.link">
                  {{ msg.link }}
                </p>
              </div>
            </div>

            <div class="field">
              <label class="label">Info Clip</label>
              <textarea
                class="textarea"
                placeholder="...."
                v-model="info"
                required
              ></textarea>
              <p class="help is-danger" v-if="msg.Info">{{ msg.Info }}</p>
            </div>
          </div>

          <div class="field is-grouped is-grouped-right pt-2">
            <router-link to="/">
              <button class="button is-danger" @click="this.$router.go(-1)">
                Back
              </button>
            </router-link>
            <span>
              <a class="button is-success ml-5" @click="submitVDO()">Submit</a>
            </span>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import axios from "@/plugins/axios";
export default {
  name: "editvdo",
  data() {
    return {
      msg: [],
      vdorender: {},
      clip_name: "",
      info: "",
      link_vdo: "",
      images: null,
      imagesC: null,
      verifie: true,
    };
  },
  created() {
    axios
      .get(`/vdo/${this.$route.params.id}`)
      .then((response) => {
        this.clip_name = response.data.vdo.clip_name;
        this.info = response.data.vdo.info;
        this.link_vdo = response.data.vdo.link_vdo;
        this.images = response.data.vdo.image1;
      })
      .catch((e) => {
        console.log(e);
      });
  },
  mounted() {
    this.getDetailVDO(this.$route.params.id);
  },
  methods: {
    selectImages(event) {
      this.verifie = false;
      this.imagesC = event.target.files;
    },
    showSelectImage(image) {
      return URL.createObjectURL(image);
    },
    imagePath(file_path) {
      return "http://localhost:3000" + file_path;
    },
    async changeImage() {
      let formData = new FormData();
      formData.append("imagesC", this.imagesC[0]);

      console.log("Update image");
      axios
        .put(`/vdo/update/image/${this.$route.params.id}`, formData)
        .then((response) => {
          console.log(response.data);
          // this.$router.go(0);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    submitVDO(){
        axios
            .put(`/vdo/edit/${this.$route.params.id}`, {
                clip_name: this.clip_name,
                info: this.info,
                link_vdo: this.link_vdo,
            })
            .then((response) => {
              console.log(response.data);
              this.$router.go(-1);
            })
            .catch((err) => {
              console.log(err);
              
            });
    },
    getDetailVDO(ProductId) {
      axios
        .get(`/vdo/${ProductId}`)
        .then((response) => {
          this.vdorender = response.data.vdo;
        })
        .catch((error) => {
          this.error = error.response;
        });
    },
    validateInfo(value) {
            if (value.length < 25) {
              this.msg['Info'] = 'Must be 25 characters! or more';
            } else {
              this.msg['Info'] = '';
            }
      },
      validateName(value) {
            if (value.length < 5) {
              this.msg['Name'] = 'Must be 5 characters! or more';
            } else {
              this.msg['Name'] = '';
            }
      },
      validateLink(value) {
            if ((/^https:\/\/(www\.)?[a-z]+\.[a-z]+\/embed\/[a-zA-Z0-9]+$/).test(value)) {
              this.msg['link'] = 'Must be link Embled type!';
            } else {
              this.msg['link'] = '';
            }
      },
  },
  watch:{
    info(value){
        this.info = value;
        this.validateInfo(value);
      },
      link_vdo(value){
        this.link_vdo = value;
        this.validateLink(value);
      },
      clip_name(value){
        this.clip_name = value;
        this.validateName(value);
      },
  }
};
</script>

<style>
</style>