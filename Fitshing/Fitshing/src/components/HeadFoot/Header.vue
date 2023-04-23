<template>

      <div class="columns has-background-danger">
        <div class="column is-1"></div>
        <div class="column is-1">
          <router-link to="/">
            <img src="../../assets/image/logo.png" alt="" class="image is-96x96 has-text-centered m-3" />
          </router-link>
        </div>
        <div class="column is-2">
          <p class="is-size-1 has-text-left has-text-weight-semibold my-5">
            <span class="has-background-light p-1 is has-text-link">F</span>ishing
          </p>
        </div>
        <div class="column is-5"></div>
        <div class="column is-1">
          <!-- <a href="cart.php"> -->
            <p class="icon has-text-info mt-6">
              <i class="fa fa-shopping-cart is-size-1 has-text-light"></i>
            </p>
          <!-- </a> -->
          <span>
            <p></p>
          </span>
        </div>
        <div class="column is-1">
          <div class="columns mt-3">
            <div class="column is-7">
              <div class="navbar-item is-hoverable mt-3">
                <div class="navbar-item has-dropdown is-hoverable">
                  <a class="navbar-link">- - -</a>

                  <div class="navbar-dropdown">
                    <a class="navbar-item" href=""> <router-link to="/product"> All Product </router-link> </a>
                    <a class="navbar-item" href=""> Trainer </a>
                    <a class="navbar-item"> <router-link to="/login">Login</router-link> </a>
                    <a class="navbar-item"> <router-link to="/preview">Preview</router-link> </a>
                    <hr class="navbar-divider" />
                    <a class="navbar-item"> Thank you </a>
                  </div>
                </div>
              </div>
            </div>
            <div class="column is-1"></div>
          </div>
        </div>
        <div class="column is-1">
          <router-link to="/login">
            <span class="icon has-text-info mt-6">
              <i class="fa fa-user is-size-1 has-text-info"></i>
            </span>
          </router-link>
        </div>
      </div>


</template>

<script>
export default {

}
</script>

<style>

</style>