<template>
  <section class="hero is-fullheight">
    <div class="columns hero-body is-centered is-fullheight">
      <div class="column is-half">
        <form class="box p-5 m-5" @submit.prevent="onSubmit">
          <div class="box has-background-danger has-text-info-light">
            <div class="field is-grouped is-grouped-left">
              <h1 class="is-size-3">LOG IN</h1>
            </div>
          </div>

          <div v-if="errorMessage" class="notification is-danger is-light">
            {{ errorMessage }}
          </div>

          <div class="field">
            <div class="control has-icons-left">
              <span class="icon has-text-info">
                <i class="fa fa-user-circle-o"></i>
              </span>
              <input
                v-model="username"
                class="input"
                required
                type="text"
                placeholder="Username"
              />
            </div>
            <p class="help is-danger" v-if="msg.username">
                {{ msg.username }}
              </p>
          </div>

          <div class="field">
            <div class="control has-icons-left">
              <span class="icon has-text-info">
                <i class="fa fa-lock"></i>
              </span>
              <input
                v-model="password"
                class="input"
                type="password"
                placeholder="Password"
                required
              />
            </div>
            <p class="help is-danger" v-if="msg.password">
                {{ msg.password }}
              </p>
          </div>

          <div class="field is-grouped is-grouped-right pt-2">
            <button
              type="submit"
              class="button is-primary is-rounded ml-5"
              :class="{ 'is-loading': isLoading }"
              :disabled="isLoading"
            >
              Login
            </button>
          </div>
          <div class="field is-grouped is-grouped-right pt-2">
              <p>
          Don't have an account yet? <a href="/register">Sign up</a>
        </p>
            </div>
          <div>
            <hr />
          </div>
        </form>
      </div>
    </div>
  </section>
</template>

<script>
import axios from "@/plugins/axios";
export default {
  name: "logintemplate",
  data() {
    return {
      password: "",
      username: "",
      msg: [],
      errorMessage: "",
      isLoading: false,
    };
  },
  methods: {
    async onSubmit() {
      this.errorMessage = "";
      this.isLoading = true;

      const data = {
         username: this.username,
         password: this.password
       }
       try {
        let res = await axios.post('/login', data)
        const token = res.data.token
        localStorage.setItem('token', token)
        this.$emit('auth-change')
        this.$router.push({ path: '/' })
       } catch (error) {
        if (error.response && error.response.data) {
          this.errorMessage = error.response.data.message || "Incorrect username or password";
        } else {
          this.errorMessage = "Unable to connect to server";
        }
       } finally {
        this.isLoading = false;
       }
    },
    validateusername(value) {
      if (value.length === 0) {
        this.msg["username"] = "Please enter your Username";
      } else {
        this.msg["username"] = "";
      }
    },
    validatepassword(value) {
      if (value.length === 0) {
        this.msg["password"] = "Please Enter Password";
      } else {
        this.msg["password"] = "";
      }
    },
  },
  watch: {
    username(value) {
      this.username = value;
      this.validateusername(value);
    },
    password(value) {
      this.password = value;
      this.validatepassword(value);
    },
  }
};
</script>

<style>
</style>
