
<template>
  <!-- Add Trainer -->
  <div class="modal" v-bind:class="{ 'is-active': modal_do_request }">
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
                      cols="5"
                      rows="10"
                    ></textarea>
                    <p class="help is-danger" v-if='msg.Request'>{{ msg.Request }}</p>
                  </div>
                </div>
              </article>
            </div>
          </div>
        </div>
        <hr />
        <div class="field is-grouped is-grouped-right pt-2">
          <button class="button is-success mr-3" @click="addRequest(`${this.trainer.id}`, `${this.trainer.amount_t}`), modal_do_request = !modal_do_request, this.$router.go(0);">Submit</button>
          <button
            class="button is-danger"
            @click="modal_do_request = !modal_do_request"
          >
            Back
          </button>
        </div>
      </section>
    </div>
  </div>

  <!-- Preview Section -->
  <section class="hero container" >
    <div class=" has-background-success-light mt-6 mb-6 p-5" style="border-radius: 10px; box-shadow:0.4em 0.4em 0.8em #0004;">
      <div class="columns ">
        <!-- Trainer All Part -->
        <div class="column is-4 is-offset-1 mt-5">
          <div class="card p-3" style="width: 100%">
            <div class="card-image">
              <figure class="image is-1by1">
                <img :src="imagePath(trainer.image)" alt="Placeholder image" />
              </figure>
            </div>
          </div>
        </div>
        <div class="column is-6 is-offset-1 mt-5">
          <p class="title is-4">Name :{{ trainer.fname + " " + trainer.lname }}</p>
          <p class="title is-4">id : {{ trainer.u_id }}</p>
          <p class="title is-4">Member left: 
          {{ trainer.amount_t }}
        </p>
        <label class="subtitle is-4" for="">certificate</label>
        <textarea class="textarea mt-3" cols="20" rows="7" v-model="trainer.certificate" readonly></textarea>
        </div>
        
      </div>
      <div class="columns ">
        <div class="column">
          <label class="subtitle is-4" for="">specialize</label>
          <textarea class="textarea mt-3" cols="20" rows="5" v-model="trainer.specialize" readonly></textarea>
          </div>
          <div class="column">
          <label class="subtitle is-4" for="">info</label>
          <textarea class="textarea mt-3" cols="20" rows="5" v-model="trainer.info" readonly></textarea>
          </div>
      </div>
      <div v-if="user">
          <div v-if="user.role === 'admin'">
            <div id="three">
                <button class="button is-size-4 has-background-danger" @click="deleteTrainer(trainer.id)">Delete Trainer</button>
              </div>
          </div>
            <div v-else-if="(user.role === 'user' && user.status === 2) || (user.role === 'user' && user.status === 3)">
              <button
                class="button ml-2 add-cart is-success"
                disabled
              >
                Subscribe
              </button>
            </div>
            <div v-else-if="user.role === 'user'">
              <button
                class="button ml-2 add-cart is-success"
                @click="modal_do_request = !modal_do_request"
                v-if="trainer.amount_t != 0"
              >
                Subscribe
              </button>
              <button
                class="button ml-2 add-cart is-success"
                @click="modal_do_request = !modal_do_request"
                v-if="trainer.amount_t == 0"
                disabled
              >
                Subscribe
              </button>
            </div>
            <div v-else-if="user.id === trainer.id">
              <div id="two">
                <router-link :to="{ name: 'editTrainer', params: { id: `${trainer.id}` } }">
                  <button class="button is-size-4 has-background-info">Edit Trainer</button>
                </router-link>
              </div>
              <div id="one">
                <button class="button is-size-4 has-background-danger" @click="deleteTrainer(trainer.id)">Delete Trainer</button>
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
  name: "previewT",
  props: ["user"],
  data() {
    return {
      trainer: {},
      modal_do_request: false,
      requestinfo: "",
      msg:[]
    };
  },
  mounted() {
    this.getDetailTrainer(this.$route.params.id);
  },
  methods: {
    imagePath(file_path) {
      return "http://localhost:3000" + file_path;
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
    addRequest(TrainerId, amount){
      if (!this.requestinfo || this.requestinfo.length < 25 || this.requestinfo.length > 150) {
          alert("Invalid Request");
        } 
        else{
          axios
          .post(`/request/${TrainerId}`, {
            requestinfo: this.requestinfo,
            u_id: this.user.id,
            count: amount,
          })
          .then((res) => {
            
            // router.go(-1);
            this.$router.go(-1);
            // console.log(res.data);
            // this.$router.push({ name: 'home' });
          })
          .catch((err) => {
            console.log(err);
          });
        }
    },
    deleteTrainer(){
      const result = confirm(
        `Are you sure you want to delete Trainer id = ${this.trainer.id}`
      );
      if (result) {
        axios
          .put(`/request/deletetrainer/${this.trainer.id}`)
          .then((response) => {
            this.$router.go(-1);
            console.log("Delete Complete");
          })
          .catch((error) => {
            alert(error);
          });
      }
    },
    validateReq(value) {
          if (value.length < 25) {
            this.msg['Request'] = 'Must be 25 characters! or more';
          } 
          else if(value.length > 150) {
            this.msg['Request'] = 'Too much Character!';
          } else {
            this.msg['Request'] = '';
          }
    },
  },
  watch:{
    requestinfo(value){
      this.requestinfo = value;
      this.validateReq(value);
    },
  }
};
</script>
  
  <style>
</style>