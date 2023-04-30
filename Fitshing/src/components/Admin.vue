<template>
  <div id="one">
    <router-link to="/addproduct">
      <button class="button is-size-4 has-background-success">Add Product</button>
    </router-link>
  </div>
</template>

<script>
export default {
  name: "admin1",
  data() {
    return {
      show_edit: false,
      ex_name:"",
      ex_info:"",
      amount:0,
      ex_price:0,
    };
  },
  methods:{
    selectImages(event) {
      this.images = event.target.files;
    },
    showSelectImage(image) {
      // for preview only
      return URL.createObjectURL(image);
    },
  }
};
</script>

<style>
</style>