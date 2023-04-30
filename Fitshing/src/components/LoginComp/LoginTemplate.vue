<template>
  <section class="hero is-fullheight">
    <div class="columns hero-body is-centered is-fullheight">
      <div class="column is-half">
        <form class="box p-5 m-5" @submit="onSubmit">
          <div class="box has-background-danger has-text-info-light">
            <div class="field is-grouped is-grouped-left">
              <h1 class="is-size-3">SIGN IN</h1>
            </div>
          </div>

          <div class="field">
            <!-- <label class="label">Email</label> -->
            <div class="control has-icons-left">
              <span class="icon has-text-info">
                <i class="fa fa-user-circle-o"></i>
              </span>
              <input
                v-model="username"
                class="input"
                required
                type="email"
                placeholder="Username"
              />
            </div>
          </div>

          <div class="field">
            <div class="control has-icons-left">
              <span class="icon has-text-info">
                <i class="fa fa-lock"></i>
              </span>
              <input
                v-model="password"
                class="input"
                type="password"
                placeholder="Password"
                required
              />

            </div>
          </div>

          <div class="field is-grouped is-grouped-right pt-2">
            <a class="button is-primary is-rounded ml-5">Login</a>
            <span>
              <router-link to="/register">
                <a class="button is-primary is-rounded ml-5">Register</a>
              </router-link>
            </span>
          </div>
          <div>
            <hr />
          </div>
        </form>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: "logintemplate",
  data() {
    return {
      password: "",
      username: "",
      msg: [],
    };
  },
  methods: {
    onSubmit() {

      const data = {
         username: this.username,
         password: this.password
       }

      axios.post('/login', data)
         .then(res => {
           const token = res.data.token                                
           localStorage.setItem('token', token)
           this.$emit('auth-change')
           this.$router.push({path: '/'})
         })
         .catch(error => {
           console.log(error.response.data)
         })
    },
    
  }
};
</script>

<style>
</style>