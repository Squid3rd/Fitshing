<template>
  <div class="modal" v-bind:class="{ 'is-active': editpass }">
    <div class="modal-background"></div>
    <div class="modal-card" style="max-width: 960px; width: 90%">
      <section class="modal-card-body">
        <div class="box has-background-warning has-text-info-black">
          <div class="field is-grouped is-grouped-centered">
            <h1 class="is-size-3 has-text-weight-bold">Edit Password</h1>
          </div>
        </div>
        <div class="columns"></div>
        <div class="tile is-vertical">
          <div class="tile">
            <div class="tile is-parent is-vertical">
              <article class="tile is-child">
                <div class="field box">
                  <label class="label">password</label>
                  <div class="control">
                    <input v-model="password" class="input" type="password" />
                    <p class="help is-danger" v-if="msg.password">
                      {{ msg.password }}
                    </p>
                  </div>
                </div>
              </article>
              <article class="tile is-child">
                <div class="field box">
                  <label class="label">Confirm Password</label>
                  <div class="control">
                    <input v-model="conpass" class="input" type="password" />
                    <p class="help is-danger" v-if="msg.conpass">
                      {{ msg.conpass }}
                    </p>
                  </div>
                </div>
              </article>
            </div>
          </div>
        </div>
        <hr />
        <div class="field is-grouped is-grouped-right pt-2">
          <button
            class="button is-success mr-3"
            @click="EditPassword(), (editpass = !editpass)"
          >
            Submit
          </button>
          <button class="button is-danger" @click="editpass = !editpass">
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
          class="is-large has-background-warning-dark"
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

  <!-- Show Edit Profile -->
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
                <div class="card-image is-centered">
                  <div v-if="imagesC">
                    <figure
                      class="image is-1by1"
                      v-for="(imagesel, index) in imagesC"
                      :key="imagesel.id"
                    >
                      <img
                        :src="showSelectImage(imagesel)"
                        alt="Placeholder image"
                      />
                    </figure>
                  </div>
                  <div v-else-if="images">
                    <figure class="image is-1by1">
                      <img :src="imagePath(images)" alt="Placeholder image" />
                    </figure>
                    <!-- <button class="button is-success" :disabled="verifie">Verify Image</button> -->
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
                <div class="column">
                  <button
                    v-if="imagesC"
                    class="button is-success"
                    :disabled="verifie"
                    @click="changeImage(), (verifie = !verifie)"
                  >
                    Verify Image
                  </button>
                  <button v-else class="button is-success" :disabled="verifie">
                    Verify Image
                  </button>
                </div>
              </div>

              <div class="column is-centered">
                <input
                  id="fileproduct"
                  class="mb-5 has-text-centered"
                  multiple
                  type="file"
                  accept="image/png, image/jpeg, image/webp"
                  @change="selectImages"
                />
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
                    v-model="fname"
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
                      v-model="lname"
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
                    v-model="email"
                  />
                </div>
              </div>
              <div class="columns">
                <div class="column">
                  <label class="label">Username</label>
                  <input
                    class="input title is-6"
                    type="text"
                    v-model="username"
                  />
                </div>
                <div class="column">
                  <span class="label">Phone</span>
                  <div class="control">
                    <input
                      class="input title is-6"
                      type="text"
                      v-model="phone"
                    />
                  </div>
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
                    v-model="age"
                  />
                </div>
                <div class="column">
                  <span class="label">Gender</span>
                  <div class="control">
                    <label class="radio">
                      <input
                        type="radio"
                        v-model="gender"
                        value="Male"
                        name="gender"
                      />
                      Male
                    </label>
                    <span>
                      <label class="radio ml-3">
                        <input
                          type="radio"
                          v-model="gender"
                          value="Female"
                          name="gender"
                        />
                        Female
                      </label>
                    </span>
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
                    v-model="height"
                  />
                  <!-- <p class="help is-danger" v-if="msg.height">{{ msg.height }}</p> -->
                </div>
                <div class="column">
                  <span class="label">Weight</span>
                  <div class="control">
                    <input
                      class="input title is-6"
                      id="Weight"
                      name="Weight"
                      type="text"
                      v-model="weight"
                    />
                  </div>
                </div>
              </div>
              <div class="column">
                <button
                  class="button is-warning ml-3"
                  @click="editpass = !editpass"
                >
                  Change Password
                </button>
                <button class="button is-success ml-3" @click="EditProfile()">Submit</button>
                <!-- <router-link :to="this.$router.go(-1);"> -->
                <button
                  class="button is-danger ml-3"
                  @click="this.$router.go(-1)"
                >
                  Back
                </button>
                <!-- </router-link> -->
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
      // data_user: [this.user],
      reloadKey: 0,
      age: "",
      height: "",
      weight: "",
      gender: "",
      images: "",
      imagesC: null,
      fname: "",
      lname: "",
      email: "",
      phone: "",
      username: "",
      password: "",
      conpass: "",
      msg: [],
      editpass: false,
      modal_do_train: false,
      verifie: true,
      // user: null
    };
  },
  created() {
    axios
      .get(`/user/${this.$route.params.id}`)
      .then((response) => {
        this.username = response.data.userinfo.username;
        this.email = response.data.userinfo.email;
        this.gender = response.data.userinfo.gender;
        this.images = response.data.userinfo.image;
        this.fname = response.data.userinfo.fname;
        this.lname = response.data.userinfo.lname;
        this.weight = response.data.userinfo.weight;
        this.height = response.data.userinfo.height;
        this.age = response.data.userinfo.age;
        this.phone = response.data.userinfo.phone;
      })
      .catch((e) => {
        console.log(e);
      });
  },

  methods: {

    // goBackAndReload() {
    // this.$router.go(-1); // Go back to the previous route
    // this.$nextTick(() => {
    //   window.location.reload(); // Reload the current route
    // });},
    
    // Image Select
    selectImages(event) {
      this.verifie = false;
      this.imagesC = event.target.files;
    },
    showSelectImage(image) {
      return URL.createObjectURL(image);
    },
    imagePath(file_path) {
      return "http://localhost:3000/" + file_path;
    },

    // Image Change
    async changeImage() {
      
      let formData = new FormData();
      formData.append("imagesC", this.imagesC[0]);

      console.log("Update image");
      axios
        .put(`/profile/edit/image/${this.$route.params.id}`, formData)
        .then((response) => {
          // console.log(response.data);
          window.location.reload()
        })
        .catch((err) => {
          console.log(err);
        });
    },

    // Edit info
    async EditProfile() {
      if (!this.username || this.username.length < 3) {
        alert("Please fill Username");
      } else if (
        !(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/).test(this.email) || !this.email
      ) {
        alert("Invalid Email");
      } else if (!this.fname || this.fname.length < 3) {
        alert("Invalid First Name");
      } else if (!this.lname || this.lname.length < 3) {
        alert("Invalid Last Name");
      } else if (!this.weight) {
        alert("Please select Weight");
      } else if (!this.height) {
        alert("Please select Height");
      } else if (!this.age) {
        alert("Please select Age");
      } else if (this.phone < 8 ||  isNaN(this.phone)) {
        alert("Invalid Phone Number");
      } else if (!this.images) {
        alert("Please fill Image Profile");
      } else {
      axios
        .put(`/profile/edit/${this.$route.params.id}`, {
          username : this.username,
          email : this.email,
          gender : this.gender,
          fname : this.fname,
          lname : this.lname,
          weight : this.weight,
          height : this.height,
          age : this.age,
          phone : this.phone,
        })
        .then((response) => {
          console.log(response.data);
          this.$router.go(-1)
          // window.history.back()
          // this.goBackAndReload();
          // location.reload()
        })
        .catch((err) => {
          console.log(err);
        });
      }
    },

    // Change Password
    async EditPassword() {
      if (
        !(
          this.password.match(/[a-z]/) &&
          this.password.match(/[A-Z]/) &&
          this.password.match(/[0-9]/)
        ) ||
        !this.password ||
        this.password.length < 8
      ) {
        alert("Invalid Password");
      } else if (!this.conpass || this.conpass != this.password) {
        alert("Invalid Confirm Password");
      } else {
        axios
          .put(`/profile/edit/password/${this.$route.params.id}`, {
            password: this.password,
            conpass: this.conpass,
          })
          .then((response) => {
            console.log(response.data);
          })
          .catch((err) => {
            console.log(err);
          });
      }
    },

    // Validate
    validatepassword(value) {
      if (value.length < 8) {
        this.msg["password"] = "Must be 8 characters!";
      } else if (
        !(value.match(/[a-z]/) && value.match(/[A-Z]/) && value.match(/[0-9]/))
      ) {
        this.msg["password"] = "Need Password Complex";
      } else {
        this.msg["password"] = "";
      }
    },
    validateConpassword(value) {
      if (this.password !== value) {
        this.msg["conpass"] = "Invalid Confirm Password";
      } else {
        this.msg["conpass"] = "";
      }
    },
    validateemail(value) {
      if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(value)) {
        this.msg["email"] = "";
      } else {
        this.msg["email"] = "Invalid Email Address";
      }
    },
    validatefname(value) {
      if (value.length === 0) {
        this.msg["fname"] = "Please enter your Firstname";
      }
      if (value.length < 3) {
        this.msg["fname"] = "Must be 3 characters!";
      } else {
        this.msg["fname"] = "";
      }
    },
    validatelname(value) {
      if (value.length === 0) {
        this.msg["lname"] = "Please enter your Firstname";
      }
      if (value.length < 3) {
        this.msg["lname"] = "Must be 3 characters!";
      } else {
        this.msg["lname"] = "";
      }
    },
    validateusername(value) {
      if (value.length === 0) {
        this.msg["username"] = "Please enter your Username";
      } else if (value.length < 3) {
        this.msg["username"] = "Must be 3 characters!";
      } else {
        this.msg["username"] = "";
      }
    },
    validatephone(value) {
      if (value.length === 0) {
        this.msg["phone"] = "Please enter your Phone number";
      } else if (!!value.match(/0[0-9]{9}/)) {
        this.msg["phone"] = "Number Only, Start with 0 and 8 characters!";
      } else {
        this.msg["phone"] = "";
      }
    },
    validateage(value){
      if (value.length === 0) {
        this.msg["age"] = "Please enter your Age";
      } else if (isNaN(value)) {
        this.msg["age"] = "Number Only!";
      } else {
        this.msg["age"] = "";
      }
    },
    validateheight(value){
      if (value.length === 0) {
        this.msg["height"] = "Please enter your Height";
      } else if (isNaN(value)) {
        this.msg["height"] = "Number Only!";
      } else {
        this.msg["height"] = "";
      }
    },
    validateweight(value){
      if (value.length === 0) {
        this.msg["weight"] = "Please enter your Weight";
      } else if (isNaN(value)) {
        this.msg["weight"] = "Number Only!";
      } else {
        this.msg["weight"] = "";
      }
    },
  },
  watch: {
    password(value) {
      this.password = value;
      this.validatepassword(value);
    },
    conpass(value) {
      this.conpass = value;
      this.validateConpassword(value);
    },
    email(value) {
      this.email = value;
      this.validateemail(value);
    },
    fname(value) {
      this.fname = value;
      this.validatefname(value);
    },
    lname(value) {
      this.lname = value;
      this.validatelname(value);
    },
    username(value) {
      this.username = value;
      this.validateusername(value);
    },
    phone(value) {
      this.phone = value;
      this.validatephone(value);
    },
    age(value){
      this.age = value;
      this.validateage(value);
    },
    weight(value){
      this.weight = value;
      this.validateweight(value);
    },
    height(value){
      this.height = value;
      this.validateheight(value);
    },
  },
};
</script>

<style>
</style>