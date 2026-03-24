<template>
  <div class="column px-3 cardd" >
    <div class="card">
        <router-link :to="`/preview/vdo/${item.id}`">
            <div class="card-image">
        <figure class="image is-4by3">
          <img :src="imagePath(item.image1)" alt="Placeholder image" loading="lazy" />
        </figure>
      </div>
        </router-link>
      <div class="card-content">
        <p class="has-text-centered">
          {{ shortTitle(item.clip_name) }}
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  item: Object,
});
</script>

<script>
const API_BASE = "http://localhost:3000/";

export default {
name: 'cardVDO',
methods:{
    imagePath(file_path) {
      if (file_path) {
        return API_BASE + file_path;
      }
      return "https://bulma.io/images/placeholders/640x360.png";
    },
    shortTitle(content) {
      if (content.length > 25) {
        return content.substring(0, 23) + "...";
      }
      return content;
    },
}
}
</script>

<style>
</style>
