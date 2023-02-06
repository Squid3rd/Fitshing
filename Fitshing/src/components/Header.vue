<template>
  <header class="header">
    <div class="columns">
      <div class="column is-1"></div>
      <div class="column is-1">
        <RouterLink to="/">
          <img
            src="../assets/logo.png"
            alt=""
            class="image is-96x96 has-text-centered m-3"
          />
        </RouterLink>
        <!-- <img src="../assets/logo.png" alt="" class="image is-96x96"> -->
      </div>
      <div class="column is-2">
        <p class="is-size-1 has-text-left has-text-weight-semibold my-5">
          <span class="has-background-light p-1 is has-text-link">F</span>ishing
        </p>
      </div>
      <div class="column is-5"></div>
      <div class="column is-1">
        <section class="column">
          <div
            class="navbar-item is-hoverable has-text-centered mt-3"
          >
              <button
                class="
                  navbar-link
                  is-arrowless
                  has-background-danger
                  navbar-burger
                "
              >
                <span aria-hidden="true"></span>
                <span aria-hidden="true"></span>
                <span aria-hidden="true"></span>
              </button>

            <div class="navbar-dropdown has-background-danger">
              <p class="navbar-item has-text-weight-medium is-size-4">
                <RouterLink to="/">Home</RouterLink>
              </p>
              <p class="navbar-item has-text-weight-medium is-size-4">
                <RouterLink to="/about">About</RouterLink>
              </p>
              <p class="navbar-item has-text-weight-medium is-size-4">
                <RouterLink to="/">Home</RouterLink>
              </p>
              <hr class="navbar-divider" />
            </div>
          </div>
        </section>
      </div>
      <div class="column is-1">
        <span class="">
                <RouterLink to="/login">
                  <span class="icon has-text-info has-text-centered mt-6">
                    <i class="fa fa-user is-size-1 has-text-danger"></i>
                  </span>
                </RouterLink>
          </span>
      </div>
      <div class="column is-1"></div>
    </div>
  </header>
</template>

<script>
export default {
  name: "Header",
};
</script>

<style scoped>
@import "https://cdn.jsdelivr.net/npm/bulma@0.9.4/css/bulma.min.css";
div {
  background: #dddd;
}
</style>