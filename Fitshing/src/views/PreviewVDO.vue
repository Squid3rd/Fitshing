<template>
  <section class="hero container">
    <div class="hero-body is-fullheight">
      <div class="has-background-success-light m-6">
        <div class="column">
            <div class="columns is-centered m-6">
          <figure class="image">
            <iframe
              width="640"
              height="360"
              :src="vdorender.link_vdo"
              frameborder="0"
              allowfullscreen
            ></iframe>
          </figure>
        </div>
        <div class="columns is-centered mb-6">
            <div>
                <p class="title is-3 has-text-centered">{{ vdorender.clip_name }}</p>
                <textarea class="textarea mt-3" cols="100" rows="7" v-model="vdorender.info" readonly></textarea>
            </div>
        </div>
        <div class="field is-grouped is-grouped-right m-6">
              <router-link to="/">
                <button class="button is-danger" @click="this.$router.go(-1)">
                  Back
                </button>
              </router-link>
            </div>
        </div>
      </div>
    </div>
  </section>
  <div v-if="user">
    <div v-if="user.role === 'admin'">
      <div id="three">
          <button class="button is-size-4 has-background-danger" @click="deletevdo(this.$route.params.id), this.$router.go(-1)">
            Delete VDO
          </button>
      </div>
      <div id="four">
        <router-link :to="`/editvdo/${this.$route.params.id}`">
            <button class="button is-size-4 has-background-info">
                Update VDO
            </button>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "@/plugins/axios";
export default {
  name: "previewvdo",
  props: ["user"],
  data() {
    return {
      vdorender: {},
    };
  },
  mounted() {
    this.getDetailVDO(this.$route.params.id);
  },
  methods: {
    getDetailVDO(ProductId) {
      axios
        .get(`/vdo/${ProductId}`)
        .then((response) => {
          this.vdorender = response.data.vdo;
        })
        .catch((error) => {
          this.error = error.response;
        });
    },
    deletevdo(vdo1) {
        const result = confirm(
        `Are you sure you want to delete ${this.vdorender.clip_name}`
      );
      if (result) {
        axios
        .delete(`/vdo/${vdo1}`)
        .then((response) => {
            this.$router.go(-1);
            alert('Delete Success')
        })
        .catch((error) => {
          this.error = error.response;
        });
      }
      
    },
    
  },
};
</script>

<style>
</style>