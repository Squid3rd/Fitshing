<template>
  <div class="column px-3 cardd" >
    <div class="card">
      <div class="card-image">
        <figure class="image is-4by3">
          <img :src="imagePath(item.image)" alt="Placeholder image" />
        </figure>
      </div>
      <div class="card-content">
        <p class="has-text-centered">
          {{ shortTitle(item.fname + " " + item.lname) }}
        </p>
      </div>
      <footer class="card-footer p-1 is-flex justify-content-center">
        <div class="column">
          <router-link :to="`/trainer/preview/${item.t_id}`">
            <button class="button is-centered is-info buttom2">View Detail</button>
          </router-link>
        </div>
      </footer>
    </div>
  </div>
</template>

  <script setup>
defineProps({
  item: Object,
});
</script>

  <script>
export default {
  name: "cardtrainer",
  data() {
    return {

    };
  },
  methods:{
    imagePath(file_path) {
      if (file_path) {
        return "http://localhost:3000/" + file_path;
      } else {
        return "https://bulma.io/images/placeholders/640x360.png";
      }
    },
    shortTitle(content) {
      if (content.length > 25) {
        return content.substring(0, 23) + "...";
      }
      return content;
    },
  }
};
</script>
