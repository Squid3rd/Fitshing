<template>
    <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"
      />
  <Header1 />
  <!-- <Footer1/> -->



  <Footer1/>
</template>

<script>
import Header1 from "./Header.vue";
import Footer1 from "./Footer.vue";
export default {
  name: "Home",
  components: {
    Header1,
    Footer1,
  },
};
</script>

<style>
.bor1 {
  padding: 10em;
  background: beige;
}
</style>