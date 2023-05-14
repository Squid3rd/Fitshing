<script setup>
import { RouterLink, RouterView } from "vue-router";
import Header1 from "./components/HeadFoot/Header.vue";
import Footer1 from "./components/HeadFoot/Footer.vue";
import AdminVue from "./components/Admin.vue";
</script>

<template>
  <link
    rel="stylesheet"
    href="https://cdn.jsdelivr.net/npm/bulma@0.9.4/css/bulma.min.css"
  />
  <link
    rel="stylesheet"
    href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"
  />

  <!-- Header -->
  <div
    class="columns p-3"
    style="background-image: linear-gradient(to left, #567189, #7b8fa1)"
  >
    <div class="column is-1 is-offset-1">
      <router-link to="/">
        <div class="mt-2">
          <img
            src="../src/assets/image/logo.png"
            alt=""
            class="image is-64x64 has-text-centered logoes"
          />
        </div>
      </router-link>
    </div>
    <div class="column is-2 mt-2">
      <p class="is-size-2 has-text-left has-text-weight-semibold application">
        <span class="has-background-light p-1 is has-text-link">F</span>ishing
      </p>
    </div>

    <div class="column is-2 mt-2">
      <p class="is-size-2 has-text-left has-text-weight-semibold application">
        <router-link to="/product"
          ><button class="button">All Product</button></router-link
        >
        <router-link to="/trainer"
          ><button class="button">All Trainer</button></router-link
        >
      </p>
    </div>

    <div class="column is-1 is-offset-3">
      <router-link to="/Cart">
        <p class="icon has-text-info mt-5">
          <i class="fa fa-shopping-cart is-size-1 has-text-light"></i>
        </p>
      </router-link>
    </div>
    <div class="navbar-end">
      <div class="navbar-item has-dropdown is-hoverable has-text-centered">
        <div class="navbar-link">
          <div v-if="token">
            <div v-if="user">
            <span class="pl-3">{{ user.fname }} {{ user.lname }}</span>
          </div>
          </div>
          <!-- <span class="pl-3">{{ user.fname }} {{ user.lname }}</span> -->
          <i
            v-bind:class="{
              'fa fa-user is-size-1': true,
              'has-text-success': user,
            }"
          ></i>
        </div>
        <div class="navbar-dropdown">
          <div v-if="!user" class="navbar-item">
            <router-link to="/login">
              <strong>Login</strong>
            </router-link>
          </div>

          <div v-if="user" class="navbar-item">
            <router-link :to="{ name: 'profile', params: { id: user.id } }">
              <a>Profile</a>
            </router-link>
          </div>
          <div v-if="user" class="navbar-item">
            <a @click="logout()">Log out</a>
          </div>
        </div>
      </div>
    </div>
    <div class="column is-1"></div>
  </div>

  <RouterView @auth-change="onAuthChange" :user="user" />

  <div v-if="user">
    <div v-if="user.role === 'admin'">
      <AdminVue />
    </div>
  </div>

  <Footer1 />
</template>

<script>
import axios from "@/plugins/axios";
export default {
  data() {
    return {
      user: null,
    };
  },
  created() {
    this.onAuthChange();
  },
  methods: {
    onAuthChange() {
      const token = localStorage.getItem("token");
      if (token) {
        this.getUser();
      }
    },
    getUser() {
      axios
        .get("/user/me")
        .then((res) => {
          this.user = res.data;
        })
        .catch((e) => console.log(e.response.data));
    },
    async logout() {
      // this.$router.go({ name: '/home' });
      location.reload()
      localStorage.setItem("token", null);
      // this.$router.push("/login");
    },
  },
};
</script>

<style scoped>
</style>

