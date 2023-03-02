<!DOCTYPE html>
<html lang="en">
<?php include 'action.php' ?>

<head>
  <meta charset="UTF-8" />
  <meta http-equiv="X-UA-Compatible" content="IE=edge" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <script src="https://cdn.jsdelivr.net/npm/axios@1.1.2/dist/axios.min.js"></script>
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bulma@0.9.4/css/bulma.min.css" />
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css" />
  <link rel="stylesheet" href="style.css">
  <title>SignIn</title>
  <link rel="icon" type="images/x-icon" href="assets/logo.png" />
</head>

<body>
  <?php include 'Header.php'; ?>
  <div id='login1'>
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
                <input v-model='email' class="input" required type="email" placeholder="Enter your Email">
                <p class="help is-danger" v-if='msg.email'>{{ msg.email }}</p>
                <!-- <p v-bind:class="['help', 'is-danger', {'is-active' : enpass}]">Email Incorrect</p> -->
              </div>
            </div>

            <div class="field">
              <!-- <label class="label">Password</label> -->
              <div class="control has-icons-left">
                <span class="icon has-text-info">
                  <i class="fa fa-lock"></i>
                </span>
                <input v-model='password' class="input" type="input" placeholder="Password" required />
                <p class="help is-danger" v-if='msg.password'>{{ msg.password }}</p>
                <!-- <p v-show='' class="help is-danger">Password Incorrect</p> -->
              </div>
            </div>

            <div class="field">
              <!-- <label class="label">Login AS</label> -->
              <div class="control">
                <label class="radio">
                  <input type="radio" v-model='logtype' value="User.php" name="logtype">
                  User
                </label>
                <span>
                  <label class="radio ml-3">
                    <input type="radio" v-model='logtype' value="Trainerlog.php" name="logtype">
                    Trainer
                  </label>
                </span>
              </div>
            </div>

            <div class="field is-grouped is-grouped-right pt-2">
              <!-- <button @click='submitLog' class="button is-primary is-rounded ml-5">LOG</button> -->
              <a class="button is-primary is-rounded ml-5" :href=logtype>Login</a>
              <span>
                <a v-bind:class="['button', 'is-danger', 'is-rounded', 'ml-5']" href='selsign.php'>Sign in</a>
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
  </div>
  <?php include 'Footer.html'; ?>
  <script src="https://cdn.jsdelivr.net/npm/vue@2/dist/vue.js"></script>
  <!-- <script src="./log.js"> -->
  </script>
  <script>
    var loginu = new Vue({
      el: "#login1",
      data: {
        password: null,
        email: null,
        msg: [],
        logtype: null
      },

      methods: {
        onSubmit(event) {
          event.preventDefault()
          console.log(event)
        },
        validateEmail(value) {
          if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(value)) {
            this.msg['email'] = '';
          } else {
            this.msg['email'] = 'Invalid Email Address';
          }
        },
        validatePassword(value) {
          let difference = 8 - value.length;
          if (value.length < 8) {
            this.msg['password'] = 'Must be 8 characters! ' + difference + ' characters left';
          } else {
            this.msg['password'] = '';
          }
        }
      },
      computed: {

      },
      watch: {
        email(value) {
          this.email = value;
          this.validateEmail(value);
        },
        password(value) {
          this.password = value;
          this.validatePassword(value);
        }
      }
    });

  </script>
</body>

</html>