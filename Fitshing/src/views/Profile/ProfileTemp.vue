<template>
  <!-- Add Trainer -->
  <div class="modal" v-bind:class="{ 'is-active': modal_do_train }" v-if="user">
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
                    <p class="help is-danger" v-if='msg.Specialize'>{{ msg.Specialize }}</p>
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
                    <p class="help is-danger" v-if='msg.Certificate'>{{ msg.Certificate }}</p>
                  </div>
                </div>
              </article>
              <article class="tile is-child">
                <div class="field box">
                  <label class="label">Number of Member</label>
                  <div class="control">
                    <div class="select">
                      <select name="amount_t" v-model="amount_t">
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                      </select>
                    </div>
                    <p class="help is-danger" v-if='msg.Amount'>{{ msg.Amount }}</p>
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
                    <p class="help is-danger" v-if='msg.Info'>{{ msg.Info }}</p>
                  </div>
                </div>
              </article>
            </div>
          </div>
        </div>
        <hr />
        <div class="field is-grouped is-grouped-right pt-2">
          <button class="button is-success mr-3" @click="addTrainer()">
            Submit
          </button>
          <button
            class="button is-danger"
            @click="modal_do_train = !modal_do_train"
          >
            Back
          </button>
        </div>
      </section>
    </div>
  </div>

  <!-- View Trainer get Request -->
  <div class="modal" v-bind:class="{ 'is-active': modal_do_req }" v-if="user">
    <div class="modal-background"></div>
    <div class="modal-card" style="max-width: 960px; width: 90%">
      <section class="modal-card-body">
        <div class="box has-background-info has-text-info-light">
          <div class="field is-grouped is-grouped-centered">
            <h1 class="is-size-3 has-text-weight-bold">Request Info</h1>
          </div>
        </div>
        <div class="columns"></div>
        <div
          class="tile is-vertical"
          v-for="items in request"
          :key="items.r_id"
        >
          <div class="tile">
            <div class="tile is-parent is-vertical">
              <article class="tile is-child">
                <div
                  :class="
                    items.status_r === 1
                      ? 'field box has-background-success'
                      : 'field box has-background-grey'
                  "
                >
                  <div class="columns is-centered px-3">
                    <div class="column is-3">
                      <div class="columns is-centered m-3">


                              <img
                                class="is-rounded locked-image"
                                :src="imagePath(items.image)"
                                alt="Placeholder image"
                              />

                  
                      </div>
                      <div class="columns is-centered m-3">
                        <p class="title">
                          {{ items.fname + " " + items.lname }}
                        </p>
                      </div>

                      <!-- <p>Peter {{ items.r_id }}</p> -->
                    </div>
                    <div class="column is-7 box">
                      <div class="column" v-if="items.status_r === 1">
                        <div class="label">Phone</div>
                        <input
                          class="input title is-6"
                          id="phone"
                          type="text"
                          v-model="items.phone"
                          :readonly="editoff"
                        />
                      </div>
                      <div class="column">
                        <div class="label">Request</div>
                        <textarea
                          class="input title is-6"
                          v-model="items.request_info"
                          :readonly="editoff"
                        ></textarea>
                      </div>
                    </div>
                    <div class="column is-1">
                      <button
                        class="button is-success is-pulled-right"
                        v-if="items.status_r === 0"
                        @click="acceptRequest(items.u_id)"
                      >
                        <i class="fa fa-check" aria-hidden="true"></i>
                      </button>
                    </div>
                    <div class="column is-1">
                      <button
                        class="button is-danger is-pulled-right"
                        @click="
                          rejectRequestTrainer(items.u_id), this.$router.go(0)
                        "
                      >
                        <i class="fa fa-times" aria-hidden="true"></i>
                      </button>
                    </div>
                  </div>
                </div>
              </article>
            </div>
          </div>
        </div>
        <hr />
        <div class="field is-grouped is-grouped-right pt-2">
          <button
            class="button is-danger"
            @click="modal_do_req = !modal_do_req"
          >
            Back
          </button>
        </div>
      </section>
    </div>
  </div>

  <!-- View Trainer Subscribe -->
  <div class="modal" v-bind:class="{ 'is-active': modal_do_sub }" v-if="user">
    <div class="modal-background"></div>
    <div class="modal-card" style="max-width: 960px; width: 90%">
      <section class="modal-card-body">
        <div class="box has-background-info has-text-info-light">
          <div class="field is-grouped is-grouped-centered">
            <h1 class="is-size-3 has-text-weight-bold">Trainer Info</h1>
          </div>
        </div>
        <div class="columns"></div>
        <div
          class="tile is-vertical"
          v-for="items in userreq"
          :key="items.t_id"
        >
          <div class="tile">
            <div class="tile is-parent is-vertical">
              <article class="tile is-child">
                <div
                  :class="
                    items.status_r === 1
                      ? 'field box has-background-success'
                      : 'field box has-background-grey'
                  "
                >
                  <div class="columns is-centered px-3">
                    <div class="column is-3">
                      <div class="columns is-centered m-3">
  
                              <img
                                class="is-rounded locked-image"
                                :src="imagePath(items.image)"
                                alt="Placeholder image"
                              />

                      </div>
                      <div class="columns is-centered m-3">
                        <p class="subtitle is-5">
                          {{ items.fname + " " + items.lname }}
                        </p>
                      </div>

                      <!-- <p>Peter {{ items.r_id }}</p> -->
                    </div>
                    <div class="column is-7 box">
                      <div class="column" v-if="items.status_r === 1">
                        <div class="label">Phone</div>
                        <input
                          class="input title is-6"
                          id="phone"
                          type="text"
                          v-model="items.phone"
                          :readonly="editoff"
                        />
                      </div>
                      <div v-else>
                        <p class="title">Wait for Trainer Accept</p>
                      </div>
                    </div>
                    <div class="column is-2">
                      <button
                        class="button is-danger is-pulled-right"
                        @click="
                          rejectRequestUser(items.t_id), this.$router.go(0)
                        "
                      >
                        <i class="fa fa-times" aria-hidden="true"></i>
                      </button>
                    </div>
                  </div>
                </div>
              </article>
            </div>
          </div>
        </div>
        <hr />
        <div class="field is-grouped is-grouped-right pt-2">
          <button
            class="button is-danger"
            @click="modal_do_sub = !modal_do_sub"
          >
            Back
          </button>
        </div>
      </section>
    </div>
  </div>

  <!-- Payment Show -->
  <div class="modal" v-bind:class="{ 'is-active': modal_do_pay }" v-if="user">
    <div class="modal-background"></div>
    <div class="modal-card" style="max-width: 960px; width: 90%">
      <section class="modal-card-body has-background-black">
        <div class="box has-background-info has-text-info-light">
          <div class="field is-grouped is-grouped-centered">
            <h1 class="is-size-3 has-text-weight-bold">Payment Bill</h1>
          </div>
        </div>
        <div class="columns is-centered" v-if="payment.length > 0">
          <div class="box">
            <div class="table">
              <thead>
                <tr>
                  <th>Product id</th>
                  <th>Product</th>
                  <th>Amount</th>
                  <th>Price</th>
                  <th>Type</th>
                  <th>Date</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="items in payment" v-if="payment.length > 0">
                  <td>{{ items.p_id }}</td>
                  <td>{{ items.slip_info }}</td>
                  <td>{{ items.amount }}</td>
                  <td>{{ items.total_price }}</td>
                  <td>{{ items.type }}</td>
                  <td>{{ items.date }}</td>
                </tr>
              </tbody>
            </div>
          </div>
          
        </div>
        <div class="columns is-centered" v-else>
          <div class="box">
            <div>Youn don't have any payment?</div>
          </div>
        </div>
        <hr />
        <div class="field is-grouped is-grouped-right pt-2">
          <button
            class="button is-danger"
            @click="modal_do_pay = !modal_do_pay"
          >
            Back
          </button>
        </div>
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
          class="is-large"
          style="border-radius: 1em; background-color:#ffe7cc;"
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
                <button
                  class="button is-info ml-3"
                  @click="modal_do_sub = !modal_do_sub"
                >
                  Subscribe
                </button>
                <button
                  class="button is-warning ml-3"
                  @click="modal_do_pay = !modal_do_pay"
                >
                  Payment
                </button>
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
                  <button class="button is-danger ml-3" disabled>
                    Add Trainer
                  </button>
                  <button
                    class="button ml-3"
                    @click="modal_do_req = !modal_do_req"
                  >
                    Check
                  </button>
                </span>
                <button
                  class="button is-warning ml-3"
                  @click="modal_do_pay = !modal_do_pay"
                >
                  Payment
                </button>
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
      // data_user: [this.user],
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
      amount_t: 0,
      modal_do_train: false,
      modal_do_sub: false,
      modal_do_req: false,
      modal_do_pay: false,
      request: [],
      userreq: [],
      payment: [],
      msg:[]
      // user: null
    };
  },
  // beforeRouteEnter(to, from, next) {
  //   if (to.path === "`/profile/${this.params.id}`" && !this.reloadFlag) {
  //     window.location.reload();
  //     next((vm) => {
  //       vm.reloadFlag = true;
  //     });
  //   } else {
  //     next();
  //   }
  // },
  mounted() {
    this.getRequest(this.$route.params.id);
    this.getAccept(this.$route.params.id);
    this.getPayment(this.$route.params.id);
  },
  methods: {
    getRequest(rid) {
      axios
        .get(`/request/${rid}`)
        .then((response) => {
          this.request = response.data.request;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    getAccept() {
      axios
        .get(`/request/gotit/${this.$route.params.id}`)
        .then((response) => {
          this.userreq = response.data.userreq;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    getPayment() {
      axios
        .get(`/payment/${this.$route.params.id}`)
        .then((response) => {
          this.payment = response.data.payment;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    imagePath(file_path) {
      return "http://localhost:3000/" + file_path;
    },
    async addTrainer() {
      if(!this.certificate || this.certificate.length < 25){
        alert("Invalid Certificate input!")
      }
      else if(!this.specialize || this.specialize.length < 25){
        alert("Invalid Specialize input!")
      }
      else if(!this.info || this.info.length < 25){
        alert("Invalid Info input!")
      }
      else if(this.amount_t === 0){
        alert("Invalid Amount of Member!")
      }
      else{
        axios
        .put(`/trainer/${this.$route.params.id}`, {
          specialize: this.specialize,
          certificate: this.certificate,
          info: this.info,
          amount_t: this.amount_t,
        })
        .then((response) => {
          console.log(response.data);
          location.reload();
        })
        .catch((err) => {
          console.log(err);
        });
      }
      
    },
    async acceptRequest(u_id) {
      axios
        .put(`/request/accept/${this.$route.params.id}`, { t_id: u_id })
        .then((response) => {
          console.log(response.data);
          location.reload();
        })
        .catch((err) => {
          console.log(err);
        });
    },
    async rejectRequestUser(u_id) {
      const result = confirm(`Are you sure you want to delete Request`);
      if (result) {
        axios
          .delete(`/request/delete/user/${this.$route.params.id}`)
          .then((response) => {
            console.log("Delete Request Complete");
            return axios.put(`/request/delete/${this.$route.params.id}`, {
              another: `${u_id}`,
            });
          })
          .catch((error) => {
            alert(error);
          });
      }
    },
    async rejectRequestTrainer(u_id) {
      const result = confirm(`Are you sure you want to delete Request`);
      if (result) {
        axios
          .delete(`/request/delete/trainer/${u_id}`)
          .then((response) => {
            console.log("Delete Request Complete");
            return axios.put(`/request/delete/${u_id}`, {
              another: `${this.$route.params.id}`,
            });
          })
          .catch((error) => {
            alert(error);
          });
      }
    },
    validateInfo(value) {
          if (value.length < 25) {
            this.msg['Info'] = 'Must be 25 characters! or more';
          } else {
            this.msg['Info'] = '';
          }
    },
    validateSpecialize(value) {
          if (value.length < 25) {
            this.msg['Specialize'] = 'Must be 25 characters! or more';
          } else {
            this.msg['Specialize'] = '';
          }
    },
    validateCertificate(value) {
          if (value.length < 25) {
            this.msg['Certificate'] = 'Must be 25 characters! or more';
          } else {
            this.msg['Certificate'] = '';
          }
    },
    validateAmount(value) {
          if (value === 0) {
            this.msg['Amount'] = 'Please Select Amount of Member';
          } else {
            this.msg['Amount'] = '';
          }
    },
    
  },
  watch:{
    info(value){
      this.info = value;
      this.validateInfo(value);
    },
    specialize(value){
      this.specialize = value;
      this.validateSpecialize(value);
    },
    amount_t(value){
      this.amount_t = value;
      this.validateAmount(value);
    },
    certificate(value){
      this.certificate = value;
      this.validateCertificate(value);
    },

  }
};
</script>

<style>
</style>