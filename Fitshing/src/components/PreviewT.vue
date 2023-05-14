
<template>
  <!-- Add Trainer -->
  <!-- <div class="modal" v-bind:class="{ 'is-active': modal_do_request }">
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
                  <label class="label">Request Info</label>
                  <div class="control">
                    <textarea
                      v-model="requestinfo"
                      class="textarea"
                      cols="20"
                      rows="5"
                    ></textarea>
                  </div>
                </div>
              </article>
            </div>
          </div>
        </div>
        <hr />
        <div class="field is-grouped is-grouped-right pt-2">
          <button class="button is-success mr-3">Submit</button>
          <button
            class="button is-danger"
            @click="modal_do_request = !modal_do_request"
          >
            Back
          </button>
        </div>
      </section>
    </div>
  </div> -->

  <!-- Preview Section -->
  <section class="hero is-fullheight">
    <div class="container is-max-widescreen has-background-success-light mt-6">
      <div class="columns">
        <!-- Trainer All Part -->
        <div class="column is-4 is-offset-1">
          <div class="card p-2" style="max-width: 95%">
            <img :src="imagePath(trainer.image)" alt="Placeholder image" />
          </div>
        </div>
        <div class="column is-5 is-offset-1">
          <p class="title is-3">{{ trainer.fname + " " + trainer.lname }}</p>
          <div
            class="description has-background-white m-2"
            style="border: 1px solid #0004; border-radius: 2px; height: 200px"
          >
            {{ trainer.certificate }}
          </div>
          <div
            class="description has-background-white m-2"
            style="border: 1px solid #0004; border-radius: 2px; height: 200px"
          >
            {{ trainer.specialize }}
          </div>
          <div
            class="description has-background-white m-2"
            style="border: 1px solid #0004; border-radius: 2px; height: 200px"
          >
            {{ trainer.info }}
          </div>
          <div v-if="user">
            <div v-if="user.role === 'user'">
              <button
                class="button ml-2 add-cart is-success"
                @click="modal_do_request = !modal_do_request"
              >
                Subscribe
              </button>
            </div>
            <!-- <div v-else-if="user.role === 'user' && user.status === 2">
              <button
                class="button ml-2 add-cart is-success"
                disabled
              >
                Subscribe
              </button>
            </div> -->
            <div v-else>
              <button class="button ml-2 add-cart is-danger">
                Delete Trainer
              </button>
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
  name: "preview",
  props: ["user"],
  data() {
    return {
      trainer: {},
      modal_do_request: false,
      requestinfo: "",
    };
  },
  mounted() {
    this.getDetailTrainer(this.$route.params.id);
  },
  methods: {
    imagePath(file_path) {
      return "http://localhost:3000/" + file_path;
    },
    getDetailTrainer(TrainerId) {
      axios
        .get(`/trainer/${TrainerId}`)
        .then((response) => {
          this.trainer = response.data.trainer;
        })
        .catch((error) => {
          this.error = error.response.data.message;
        });
    },
  },
};
</script>
  
  <style>
</style>