<script setup>
import CardVDO from "../components/CardVDO.vue";
</script>

<template>
  <section class="hero is-fullheight">
    <div class="columns hero-body is-centered is-fullheight">
      <div class="container has-background-black p-5">
        <div class="field has-addons has-addons-right"></div>

        <div class="product">
          <CardVDO v-for="item in allvdo" :item="item" />
        </div>
      </div>
    </div>
  </section>

  <div v-if="user">
    <div v-if="user.role === 'admin'">
      <div id="three">
        <router-link to="/addvdo">
          <button class="button is-size-4 has-background-success">
            Add VDO
          </button>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "@/plugins/axios";
export default {
  name: "vdoall",
  props: ["user"],
  data() {
    return {
      allvdo: [],
      link_vdo: "",
      info: "",
      clip_name: "",
      images: "",
    };
  },
  mounted() {
    this.getVDO();
  },
  methods: {
    getVDO() {
      axios
        .get("/vdo")
        .then((response) => {
          this.allvdo = response.data;
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