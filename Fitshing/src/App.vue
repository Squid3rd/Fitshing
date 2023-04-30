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
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css" />
  <Header1 />

  <RouterView />
  
  <AdminVue />
  
  <Footer1 />

  

</template>

<script>
  
</script>

<style scoped>
</style>

