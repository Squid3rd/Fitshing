<template>

  <!-- Add Trainer -->
  <div class="modal" v-bind:class="{ 'is-active': modal_do_train }">
    <div class="modal-background"></div>
    <div class="modal-card" style="max-width: 960px; width: 90%">
      <section class="modal-card-body">
        <div class="box has-background-info has-text-info-light">
          <div class="field is-grouped is-grouped-centered">
            <h1 class="is-size-3 has-text-weight-bold">Add Trainer Info</h1>
          </div>
        </div>
        <div class="columns"></div>
        <div class="tile is-vertical">
          <div class="tile">
            <div class="tile is-parent is-vertical">
              <article class="tile is-child">
                <div class="field box">
                  <label class="label">Specialize</label>
                  <div class="control">
                    <textarea
                      v-model="specialize"
                      class="textarea"
                      cols="20"
                      rows="5"
                    ></textarea>
                  </div>
                </div>
              </article>
              <article class="tile is-child">
                <div class="field box">
                  <label class="label">Certificate</label>
                  <div class="control">
                    <textarea
                      v-model="certificate"
                      class="textarea"
                      cols="20"
                      rows="5"
                    ></textarea>
                  </div>
                </div>
              </article>
            </div>
            <div class="tile is-parent">
              <article class="tile is-child">
                <div class="field box">
                  <label class="label">Info</label>
                  <div class="control">
                    <textarea
                      v-model="info"
                      class="textarea"
                      cols="30"
                      rows="15"
                    ></textarea>
                  </div>
                </div>
              </article>
            </div>
          </div>
        </div>
        <hr />
        <!-- <button class="button is-success">Submit</button> -->
        <div class="field is-grouped is-grouped-right pt-2">
          <button class="button is-success mr-3" @click="addTrainer()">Submit</button>
          <button
            class="button is-danger"
            @click="modal_do_train = !modal_do_train"
          >
            Back
          </button>
        </div>
        <!-- <button class="button is-success" @click="modal_do_train = !modal_do_train">Back</button> -->
      </section>
    </div>
  </div>

  <!-- Select Login or Go homepage -->
  <section class="hero is-fullheight" v-if="!user">
    <div class="columns hero-body is-fullheight">
      <div class="container" style="width: 50%">
        <section
          class="is-large has-background-grey-light"
          style="border-radius: 1em"
        >
          <div class="box has-background-warning has-text-info-light">
            <div class="field is-grouped is-grouped-centered">
              <h1 class="is-size-3 has-text-weight-bold has-text-black">
                Need Login
              </h1>
            </div>
            <div class="field is-grouped is-grouped-centered">
              <router-link to="/login">
                <button class="button is-primary mr-4 is-size-5">Log in</button>
              </router-link>
              <router-link to="/">
                <button class="button mr-4 is-size-5">
                  Return to HomePage
                </button>
              </router-link>
            </div>
          </div>
        </section>
      </div>
    </div>
  </section>

<!-- Show Profile -->
  <section class="hero is-fullheight" v-if="user">
    <div class="columns hero-body is-fullheight">
      <div class="container" style="width: 50%">
        <section
          class="is-large has-background-grey-light"
          style="border-radius: 1em"
          
        >
          <div class="columns p-5">
            <div class="column is-3">
              <div class="card">
                <div class="card-image">
                  <div v-if="user.image">
                    <figure class="image is-1by1">
                      <img
                        :src="imagePath(user.image)"
                        alt="Placeholder image"
                      />
                    </figure>
                  </div>
                  <div v-else>
                    <figure class="image is-1by1">
                      <img
                        src="../../assets/image/user.png"
                        alt="Placeholder image"
                      />
                    </figure>
                  </div>
                </div>
              </div>
              <div class="column is-centered">
                <router-link :to="`/profile/edit/${user.id}`">
                  <button class="button is-success">Edit Profile</button>
                </router-link>
              </div>
            </div>
            <div class="column is-8 is-offset-1 name">
              <div class="columns">
                <div class="column">
                  <label class="label">FirstName</label>
                  <input
                    class="input title is-6"
                    id="FirstName"
                    type="text"
                    v-model="user.fname"
                    :readonly="editoff"
                  />
                </div>
                <div class="column">
                  <span class="label" style="position: ; left: 65%; top: 95px"
                    >LastName</span
                  >
                  <div class="control">
                    <input
                      class="input title is-6"
                      id="LastName"
                      type="text"
                      v-model="user.lname"
                      :readonly="editoff"
                    />
                  </div>
                </div>
              </div>
              <div class="columns">
                <div class="column">
                  <label class="label">Email</label>
                  <input
                    class="input title is-6"
                    id="Age"
                    name="Email"
                    type="email"
                    v-model="user.email"
                    :readonly="editoff"
                  />
                </div>
              </div>
              <div class="columns">
                <div class="column">
                  <label class="label">Age</label>
                  <input
                    class="input title is-6"
                    id="Age"
                    name="Age"
                    type="text"
                    v-model="user.age"
                    :readonly="editoff"
                  />
                </div>
                <div class="column">
                  <span class="label">Gender</span>
                  <div class="control">
                    <input
                      class="input title is-6"
                      id="Gender"
                      name="Gender"
                      type="text"
                      v-model="user.gender"
                      :readonly="editoff"
                    />
                  </div>
                </div>
              </div>
              <div class="columns">
                <div class="column">
                  <label class="label">Height</label>
                  <input
                    class="input title is-6"
                    id="Height"
                    name="Height"
                    type="text"
                    v-model="user.height"
                    :readonly="editoff"
                  />
                </div>
                <div class="column">
                  <span class="label">Weight</span>
                  <div class="control">
                    <input
                      class="input title is-6"
                      id="Weight"
                      name="Weight"
                      type="text"
                      v-model="user.weight"
                      :readonly="editoff"
                    />
                  </div>
                </div>
              </div>
              <div v-if="user.role === 'admin'" class="column">
                <button class="button is-danger" disabled>
                  {{ user.role }}
                </button>
              </div>
              <div v-else-if="user.role === 'user'" class="column">
                <button class="button is-success" disabled>
                  {{ user.role }}
                </button>
                <button class="button is-info ml-3">Subscribe</button>
              </div>
              <div v-else-if="user.role === 'trainer'" class="column">
                <button class="button is-info" disabled>{{ user.role }}</button>
                <span v-if="user.status === 0">
                  <button
                  class="button is-warning ml-3"
                  @click="modal_do_train = !modal_do_train"
                >
                  Add Trainer
                </button>
                </span>
                <span v-else>
                  <button
                  class="button is-danger ml-3"
                  disabled
                >
                  Add Trainer
                </button>
                </span>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  </section>
</template>

<script>
import axios from "@/plugins/axios";
export default {
  name: "profileTemp",
  props: ["user"],
  data() {
    return {
      editoff: true,
      data_user: [this.user],
      age: "",
      height: "",
      weight: "",
      gender: "",
      images: "",
      fname: "",
      lname: "",
      email: "",
      info: "",
      specialize: "",
      certificate: "",
      modal_do_train: false,
      modal_do_request: false,
      // user: null
    };
  },
  beforeRouteEnter(to, from, next) {
    if (to.path === '`/profile/${this.params.id}`' && !this.reloadFlag) {
      window.location.reload();
      next(vm => {
        vm.reloadFlag = true;
      });
    } else {
      next();
    }
  },
  methods: {
    imagePath(file_path) {
      return "http://localhost:3000/" + file_path;
    },
    async addTrainer(){
        axios
          .put(`/trainer/${this.$route.params.id}`, {
                specialize: this.specialize,
                certificate: this.certificate,
                info: this.info,
            })
          .then((response) => {
            console.log(response.data);
            location.reload()
          })
          .catch((err) => {
            console.log(err);
            
          });
    },
  },
};
</script>

<style>
</style>