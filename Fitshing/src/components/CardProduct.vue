<template>
    <div class="column is-multiline px-3 cardd">
      <div class="card">
        <div class="card-image">
            <figure class="image is-4by3">
                <img :src="imagePath(item.file_path)" alt="Placeholder image" loading="lazy" />
            </figure>
        </div>
        <div class="card-content">
          <p class="has-text-centered">{{ shortTitle(item.ex_name) }}</p>
        </div>
        <footer class="card-footer p-1 is-flex justify-content-center">
          <div class="column">
            <router-link :to="`/product/preview/${item.ex_id}`">
              <button class="button is-centered is-info buttom2" >View Detail</button>
            </router-link>
          </div>
        </footer>
      </div>
</div>
</template>

<script setup>
defineProps({
    item: Object
})
</script>

<script>
const API_BASE = "http://localhost:3000/";

export default {
  name: "cardproduct",
  methods:{
    imagePath(file_path) {
      if (file_path) {
        return API_BASE + file_path;
      }
      return "https://bulma.io/images/placeholders/640x360.png";
    },
    shortTitle(content) {
      if (content.length > 19) {
        return content.substring(0, 18) + "...";
      }
      return content;
    },
  }
};
</script>

<style>
</style>
