<template>
    <section class="hero is-fullheight">
      <div class="columns hero-body is-centered is-fullheight">
        <div class="container has-background-black p-5" >
          <div class="field has-addons has-addons-right">
            <form action="">
              <select name="sort1" id="sort1" class="button">
                <option value="">All product</option>
                    <option value="1">Exercise bike</option>
                    <option value="2">Rowing machine</option>
                    <option value="3">Weight bench</option>
                    <option value="4">Treadmill</option>
                    <option value="5">Dumbbell</option>
                    <option value="6">Body Weight</option>
                    <option value="7">Rubber bands</option>
                    <option value="8">Jump rope</option>
                    <option value="9">Hula hoop</option>
                    <option value="10">Gloves</option>
              </select>
            </form>
          </div>

          <div class="product">
              <CardProductVue v-for="item in product" :item="item" />
          </div>
        </div>
      </div>
    </section>
</template>

<script setup>

</script>

<script>
import axios from "@/plugins/axios";
export default {
  name: "productall",
  data() {
    return {
      product: [],
    };
  },
  mounted() {
    this.getProduct();
  },
  methods: {
    getProduct() {
      axios
        .get("/")
        .then((response) => {
          this.product = response.data;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    imagePath(file_path) {
      if (file_path) {
        return "http://localhost:3000/" + file_path;
      } else {
        return "https://bulma.io/images/placeholders/640x360.png";
      }
    },
    shortTitle(content) {
      if (content.length > 15) {
        return content.substring(0, 13) + "...";
      }
      return content;
    },
  },
};
</script>

<script setup>
import CardProductVue from "../CardProduct.vue";
</script>

<style>

</style>