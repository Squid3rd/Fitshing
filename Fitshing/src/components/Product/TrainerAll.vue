<template>
  <section class="hero is-fullheight">
      <div class="columns hero-body is-centered is-fullheight">
        <div class="container has-background-black p-5" >
          <div class="field has-addons has-addons-right">
            <form action="">
              <select name="sort1" id="sort1" class="button">
                <option value="">All Gender</option>
                    <option value="1">Male</option>
                    <option value="2">Female</option>
              </select>
            </form>
          </div>

          <div class="product">
              <CardTrainer v-for="item in trainer" :item="item" />
          </div>
        </div>
      </div>
    </section>
</template>

<script setup>
import CardTrainer from "../CardTrainer.vue";
</script>

<script>
import axios from "@/plugins/axios";
export default {
    name: 'trainerall',
    data(){
      return{
        sort1: '',
       trainer: []
      }
    },
    mounted() {
    this.getTrainer();
  },
  methods: {
    getTrainer() {
      axios
        .get("/trainer")
        .then((response) => {
          this.trainer = response.data;
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
}
</script>

<style>

</style>