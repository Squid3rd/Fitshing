<template>
  <Header1 />
  <!DOCTYPE html>
  <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <meta http-equiv="X-UA-Compatible" content="IE=edge" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <link
        rel="stylesheet"
        href="https://cdn.jsdelivr.net/npm/bulma@0.9.4/css/bulma.min.css"
      />
      <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"
      />

      <title>SignIn</title>
    </head>
    <body>
      <section class="hero is-fullheight">
        <div class="columns hero-body is-centered is-fullheight">
          <div class="column is-half">
            <form class="box p-5 m-5">
              <div class="box has-background-danger has-text-info-light">
                <div class="field is-grouped is-grouped-left">
                  <h1 class="is-size-3">SIGN IN</h1>
                </div>
              </div>
              <div class="field">
                <!-- <label class="label">Username</label> -->
                <div class="control has-icons-left">
                  <span class="icon has-text-info">
                    <i class="fa fa-user-circle-o"></i>
                  </span>
                  <input
                    class="input is-rounded"
                    type="input"
                    placeholder="Username"
                  />

                </div>
              </div>

              <div class="field">
                <!-- <label class="label">Password</label> -->
                <div class="control has-icons-left">
                  <span class="icon has-text-info">
                    <i class="fa fa-lock"></i>
                  </span>
                  <input
                    class="input is-rounded"
                    type="input"
                    placeholder="Password"
                  />
                </div>
              </div>

              <div class="field is-grouped is-grouped-right pt-2">
                <button class="button is-primary is-rounded">Sign Up</button>
                <span>
                  <RouterLink to="/signup">
                    <button class="button is-danger is-rounded ml-5">Sign in</button>
                  </RouterLink>
                </span>
              </div>
              <div>
                <hr />
              </div>
              <!-- <button class="button is-primary">Sign in</button> -->
            </form>
          </div>
        </div>
      </section>
      <Footer1/>
    </body>
  </html>
</template>

<script>
import Header1 from "./Header.vue";
import Footer1 from "./Footer.vue";
export default {
  name: "Login",
  components: {
    Header1,
    Footer1,
  },
};
</script>