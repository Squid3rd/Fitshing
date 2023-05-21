<template>
  <div id="signuser">
    <section class="hero is-fullheight">
      <div class="columns hero-body is-centered is-fullheight">
        <div class="column is-half">
          <form class="box p-5 m-5">
            <div class="box has-background-danger has-text-info-light">
              <div class="field is-grouped is-grouped-left">
                <h1 class="is-size-3">Register</h1>
              </div>
            </div>

            <div class="field">
              <label class="label">Username</label>
              <div class="control">
                <input
                  v-model="username"
                  class="input"
                  type="input"
                  placeholder="Username"
                />
              </div>
              <p class="help is-danger" v-if="msg.username">
                {{ msg.username }}
              </p>
            </div>

            <div class="field">
              <label class="label">Email</label>
              <div class="control">
                <input
                  v-model="email"
                  class="input"
                  type="input"
                  placeholder="Email"
                />
              </div>
              <p class="help is-danger" v-if="msg.email">{{ msg.email }}</p>
            </div>

            <div class="field">
              <label class="label">Password</label>
              <div class="control">
                <input
                  v-model="password"
                  class="input"
                  type="password"
                  placeholder="Password"
                />
              </div>
              <p class="help is-danger" v-if="msg.password">
                {{ msg.password }}
              </p>
            </div>

            <div class="field">
              <label class="label">Confirm Password</label>
              <div class="control">
                <input
                  v-model="con_password"
                  class="input"
                  type="password"
                  placeholder="Password"
                />
              </div>
              <p class="help is-danger" v-if="msg.conpassword">
                {{ msg.conpassword }}
              </p>
            </div>

            <div class="field">
              <label class="label">Firstname</label>
              <div class="control">
                <input
                  v-model="fname"
                  class="input"
                  type="input"
                  placeholder="Firstname"
                />
              </div>
              <p class="help is-danger" v-if="msg.fname">{{ msg.fname }}</p>
            </div>

            <div class="field">
              <label class="label">Lastname</label>
              <div class="control">
                <input
                  v-model="lname"
                  class="input"
                  type="input"
                  placeholder="Lastname"
                />
              </div>
              <p class="help is-danger" v-if="msg.lname">{{ msg.lname }}</p>
            </div>
            <div class="field is-horizontal">
              <div class="column is-half">
                <label class="label">Weight</label>
                <div class="control">
                  <input v-model='weight' class="input " type="input" placeholder="Weight" />
                </div>
                <p class="help is-danger" v-if="msg.weight">{{ msg.weight }}</p>
              </div>
              <div class="column is-half">
                <label class="label">Height</label>
                <div class="control">
                  <input v-model='height' class="input " type="input" placeholder="Height" />
                </div>
                <p class="help is-danger" v-if="msg.height">{{ msg.height }}</p>
              </div>
            </div>
            <div class="field is-horizontal">
              <div class="column is-half">
                <label class="label">Age</label>
                <div class="control">
                  <input v-model='age' class="input " type="input" placeholder="Age" />
                </div>
                <p class="help is-danger" v-if="msg.age">{{ msg.age }}</p>
              </div>
              <div class="column is-half">
                <label class="label">Gender</label>
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
            <div class="field">
              <div class="column is-4">
                <label class="label">Role</label>
                <div class="control">
                  <label class="radio">
                    <input
                      type="radio"
                      v-model="role"
                      value="user"
                      name="role"
                    />
                    User
                  </label>
                  <span>
                    <label class="radio ml-3">
                      <input
                        type="radio"
                        v-model="role"
                        value="trainer"
                        name="role"
                      />
                      Trainer
                    </label>
                  </span>
                </div>
              </div>
            </div>

            <div class="field">
              <label class="label">Phone number</label>
              <div class="field is-expanded">
                <div class="field has-addons">
                  <p class="control">
                    <a class="button is-static"> +66 </a>
                  </p>
                  <p class="control is-expanded">
                    <input
                      v-model="phone"
                      class="input"
                      type="tel"
                      placeholder="Your phone number"
                    />
                  </p>
                </div>
              </div>
              <p class="help is-danger" v-if="msg.phone">{{ msg.phone }}</p>
            </div>

            <div class="field">
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
                                src="../../assets/image/plus.png"
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
                    <!-- <p class="help is-danger" v-if='msg.image1'>{{ msg.image1 }}</p> -->
                  </div>
                </div>
              </div>
            </div>

            <div class="field is-grouped is-grouped-right pt-2">
              <a class="button is-danger" @click="this.$router.go(-1)">Back</a>
              <span>
                <a class="button is-success ml-5" @click="submit()">Submit</a>
              </span>
            </div>
            <!-- <button class="button is-primary">Sign in</button> -->
          </form>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import axios from "@/plugins/axios";

export default {
  name: "register",
  data() {
    return {
      email: "",
      fname: "",
      lname: "",
      username: "",
      password: "",
      con_password: "",
      phone: "",
      gender: "",
      role: "",
      age: "",
      weight: "",
      height: "",
      images: null,
      msg: [],
    };
  },
  methods: {
    selectImages(event) {
      this.images = event.target.files;
    },
    showSelectImage(image) {
      // for preview only
      return URL.createObjectURL(image);
    },
    submit() {
      // Validate all fields
      if (!this.username || this.username.length < 3) {
        alert("Please fill Username");
      } else if (
        !(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/).test(this.email) || !this.email
      ) {
        alert("Invalid Email");
      } else if ((!(this.password.match(/[a-z]/) && this.password.match(/[A-Z]/) && this.password.match(/[0-9]/))) || !this.password || this.password.length < 8) {
        alert("Invalid Password");
      } else if (!this.con_password || this.con_password != this.password) {
        alert("Invalid Confirm Password");
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
      } else if (!this.gender) {
        alert("Please select Gender");
      } else if (!this.role) {
        alert("Please select Role");
      } else if (this.phone < 8 || !this.phone || isNaN(this.phone)) {
        alert("Invalid Phone Number");
      } else if (!this.images) {
        alert("Please fill Image Profile");
      } else {
        console.log(parseInt(this.age, 10))
        let formData = new FormData();
        formData.append("email", this.email);
        formData.append("fname", this.fname);
        formData.append("lname", this.lname);
        formData.append("username", this.username);
        formData.append("password", this.password);
        formData.append("con_password", this.con_password);
        formData.append("phone", this.phone);
        formData.append("gender", this.gender);
        formData.append("role", this.role);
        formData.append("age", parseInt(this.age, 10));
        formData.append("height", parseInt(this.height, 10));
        formData.append("weight", parseInt(this.weight, 10));
        formData.append("images", this.images[0]);

        axios
          .post("/register", formData)
          .then((res) => {
            console.log(res.data);
            this.$router.push({ name: 'login' });
          })
          .catch((err) => {
            console.log(err);
          });
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
      } else if (value.length < 5) {
        this.msg["username"] = "Must be 5 characters!";
       }
       else {
        this.msg["username"] = "";
      }
    },
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
        this.msg["conpassword"] = "Invalid Confirm Password";
      } else {
        this.msg["conpassword"] = "";
      }
    },
    validatephone(value) {
      if (value.length === 0) {
        this.msg["phone"] = "Please enter your Phone number";
      } else if (!value.match(/0[0-9]{9}/)) {
        this.msg["phone"] = "Number, Start with 0, Must be 9 characters!";
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
    password(value) {
      this.password = value;
      this.validatepassword(value);
    },
    con_password(value) {
      this.con_password = value;
      this.validateConpassword(value);
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