<template>
    <div class="column is-multiline px-3 cardd">
      <div class="card">
        <div class="card-image">
            <figure class="image is-4by3">
                <img :src="imagePath(item.file_path)" alt="Placeholder image" />
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
          <!-- <a href="#" class="card-footer-item">Save</a> -->
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
export default {
  name: "cardproduct",
  data() {
    return {
      
    };
  },
  methods:{
    async reloadPage() {
    window.location.reload();
  },
    imagePath(file_path) {
      if (file_path) {
        return "http://localhost:3000/" + file_path;
      } else {
        return "https://bulma.io/images/placeholders/640x360.png";
      }
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