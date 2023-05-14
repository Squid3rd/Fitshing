<template>
  <div class="columns p-3" style="background-image: linear-gradient(to left,#567189,#7B8FA1);">
        <div class="column is-1 is-offset-1">
          <router-link to="/">
            <div class="mt-2">
              <img src="../../assets/image/logo.png" alt="" class="image is-64x64 has-text-centered logoes" />
            </div>
          </router-link>
        </div>
        <div class="column is-2 mt-2">
          <p class="is-size-2 has-text-left has-text-weight-semibold application">
            <span class="has-background-light p-1 is has-text-link">F</span>ishing
          </p>
        </div>

        <div class="column is-2 mt-2">
          <p class="is-size-2 has-text-left has-text-weight-semibold application">
            <router-link to="/product"><button>All Product</button></router-link>
          </p>
        </div>

        <div class="column is-1 is-offset-3">
          <router-link to="/Cart">
            <p class="icon has-text-info mt-5">
              <i class="fa fa-shopping-cart is-size-1 has-text-light"></i>
            </p>
          </router-link>
        </div>
        <div class="navbar-end">
      <div class="navbar-item has-dropdown is-hoverable has-text-centered">
        <div class="navbar-link">
          <i class="fa fa-user is-size-1 has-text-info"></i>
        </div>
        <div class="navbar-dropdown">
          <router-link to="/login">
            <div class="navbar-item">
              <strong>Login</strong>
            </div>
          </router-link>

          <router-link to="/">
            <div class="navbar-item">
              <strong>Sign in</strong>
            </div>
          </router-link>
          
        </div>
      </div>
    </div>
        <div class="column is-1">
        </div>
      </div>


</template>

<script>
export default {};
</script>

<style>
</style>