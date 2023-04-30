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
            </div>

            <div class="field is-horizontal">
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
              <div class="column is-half">
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
            </div>


            <div class="field">
                <label class="label">Profile Image</label>
                <div v-if="images" class="columns is-multiline">
              <div
                v-for="(image, index) in images"
                :key="image.id"
                class="column is-one-quarter"
              >
                <div class="card">
                  <div class="card-image">
                    <figure class="image is-4by3">
                      <img 
                        :src="showSelectImage(image)"
                        alt="Placeholder image"
                        class="is-rounded"
                      />
                    </figure>
                  </div>
                </div>
              </div>
            </div>

            <input
              class="mb-5"
              multiple
              type="file"
              accept="image/png, image/jpeg, image/webp"
              @change="selectImages"
            />
            </div>
            


            <div class="field is-grouped is-grouped-right pt-2">
              <a class="button is-danger">Back</a>
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

function mobile(value) {
  return !helpers.req(value) || !!value.match(/0[0-9]{9}/);
}

function complexPassword(value) {
  if (!(value.match(/[a-z]/) && value.match(/[A-Z]/) && value.match(/[0-9]/))) {
    return false;
  }
  return true;
}

export default {
  name: "register",
  data() {
    return {
        email:"",
      fname: "",
      lname: "",
      username: "",
      password: "",
      con_password: "",
      phone: "",
      gender: "",
      role: "",
      images: null,
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

      let formData = new FormData();
      formData.append("email", this.email);
      formData.append("fname", this.fname);
      formData.append("lname", this.lname);
      formData.append("username", this.username);
      formData.append("password", this.password);
      formData.append("phone", this.phone);
      formData.append("gender", this.gender);
      formData.append("role", this.role);
      formData.append("images", this.images[0]);

    //   this.images.forEach((image) => {
    //     formData.append("images", image);
    //   });

    //   let data = {
    //     email: this.email,
    //     fname: this.fname,
    //     lname: this.lname,
    //     username: this.username,
    //     password: this.password,
    //     con_password: this.con_password,
    //     phone: this.phone,
    //     gender: this.gender,
    //     role: this.role,
    //     // images: this.images
    //   };

      axios
        .post("/register", formData)
        .then((res) => {
          console.log(res.data);
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