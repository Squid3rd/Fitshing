<template>
  <section class="hero is-fullheight">
      <div class="columns hero-body is-centered ">
        <div class="container p-5" >
          <div class="field has-addons has-addons-right">
            <form action="">
              <select v-model="sort1" class="button">
                <option value="">All Gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
              </select>
            </form>
          </div>

          <div class="product">
              <CardTrainer v-for="item in filteredTrainer" :item="item" />
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
        trainer: [],
        filteredTrainer: []
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
  computed: {
      sumary() {
        return this.cart[0]==this.cart[1]
      },
      filteredTrainer() {

      if (this.sort1 === '') {
        // Filter by item category
        return this.trainer;
      }
      // Return all items if no filter option is selected
      return this.trainer.filter(item => item.gender === this.sort1);
    },
    },
}
</script>

<style>

</style>