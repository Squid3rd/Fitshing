<template>
  <section class="hero is-fullheight">
    <div class="columns hero-body is-centered is-fullheight">
      <div class="column is-half">
        <form class="box p-5 m-5">
          <div class="box has-background-danger has-text-info-light">
            <div class="field is-grouped is-grouped-left">
              <h1 class="is-size-3">Select Sign up</h1>
            </div>
          </div>


          <div class="field is-grouped is-grouped-centered pt-2">
            <a class="button is-medium is-primary is-rounded"><router-link to="/login">Back</router-link></a>
            <span>
              <a class="button is-medium is-danger is-rounded ml-5"><router-link to="/login">For Trainer</router-link></a>
            </span>
            <span>
              <a class="button is-medium is-danger is-rounded ml-5"><router-link to="/login">For User</router-link></a>
            </span>
          </div>
          <!-- <button class="button is-primary">Sign in</button> -->
        </form>
      </div>
    </div>
  </section>
</template>

<script>
export default {
    name: 'selectsign',
    data (){
        return{

        }
    }
}
</script>

<style>

</style>