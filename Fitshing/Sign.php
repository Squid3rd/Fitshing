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
  <title>SignUp (User)</title>
  <link rel="icon" type="images/x-icon" href="assets/logo.png" />
  <link rel="stylesheet" href="style.css">
</head>

<body>
  <?php include 'Header.php'; ?>
  <div id='signuser'>
    <section class="hero is-fullheight">
      <div class="columns hero-body is-centered is-fullheight">
        <div class="column is-half">
          <form @submit='onSubmit' class="box p-5 m-5">
            <div class="box has-background-danger has-text-info-light">
              <div class="field is-grouped is-grouped-left">
                <h1 class="is-size-3">SIGN UP (USER)</h1>
              </div>
            </div>
            <!-- <div class="field">
            <label class="label">Username</label>
            <div class="control">
              <input v-model='username' class="input " type="input" placeholder="Username" />
            </div>
          </div> -->

            <div class="field">
              <label class="label">Email</label>
              <div class="control">
                <input v-model='email' class="input " type="input" placeholder="Email" />
                <p class="help is-danger" v-if='msg.email'>{{ msg.email }}</p>
              </div>
            </div>

            <div class="field">
              <label class="label">Password</label>
              <div class="control">
                <input v-model='password' class="input " type="input" placeholder="Password" />
                <p class="help is-danger" v-if='msg.password'>{{ msg.password }}</p>
              </div>
            </div>

            <div class="field">
              <label class="label">Firstname</label>
              <div class="control">
                <input v-model='fname' class="input " type="input" placeholder="Firstname" />
                <p class="help is-danger" v-if='msg.fname'>{{ msg.fname }}</p>
              </div>
            </div>

            <div class="field">
              <label class="label">Lastname</label>
              <div class="control">
                <input v-model='lname' class="input " type="input" placeholder="Lastname" />
                <p class="help is-danger" v-if='msg.lname'>{{ msg.lname }}</p>
              </div>
            </div>

            <div class="field is-horizontal">
              <div class="column is-half">
                <label class="label">Gender</label>
                <div class="control">
                  <label class="radio">
                    <input type="radio" v-model='gender' value="Male" name="gender">
                    Male
                  </label>
                  <span>
                    <label class="radio ml-3">
                      <input type="radio" v-model='gender' value="Female" name="gender">
                      Female
                    </label>
                  </span>
                </div>
              </div>
              <div class="column is-half">
                <label class="label">Age</label>
                <div class="control">
                  <input v-model='age' class="input " type="input" placeholder="Age" />
                </div>
              </div>
            </div>
            <div class='field'>
              <p class="help is-danger" v-if='msg.age'>{{ msg.age }}</p>
            </div>

            <div class="field">
              <label class='label'>Phone number</label>
              <div class="field is-expanded">
                <div class="field has-addons">
                  <p class="control">
                    <a class="button is-static">
                      +66
                    </a>
                  </p>
                  <p class="control is-expanded">
                    <input v-model='phone' class="input" type="tel" placeholder="Your phone number">
                  </p>
                </div>
              </div>
              <p class="help is-danger" v-if='msg.phone'>{{ msg.phone }}</p>
            </div>

            <div class="field is-horizontal">
              <div class="column is-half">
                <label class="label">Weight</label>
                <div class="control">
                  <input v-model='weight1' class="input " type="input" placeholder="Weight" />
                </div>
              </div>
              <div class="column is-half">
                <label class="label">Height</label>
                <div class="control">
                  <input v-model='height1' class="input " type="input" placeholder="Height" />
                </div>
              </div>
            </div>
            <div class='field'>
              <p class="help is-danger" v-if='msg.weight1'>{{ msg.weight1 }}</p>
              <span class="help is-danger" v-if='msg.height1'>{{ msg.height1 }}</span>
            </div>


            <div class="field">
              <label class="label">Address</label>
              <div class="control">
                <textarea v-model='address' class="textarea " placeholder="Adress"></textarea>
              </div>
              <p class="help is-danger" v-if='msg.address'>{{ msg.address }}</p>
            </div>

            <div class="field is-grouped is-grouped-right pt-2">
              <a class="button is-danger " href='selsign.php'>Back</a>
              <span>
                <a href='thank.php' class="button is-success  ml-5">Submit</a>
              </span>
            </div>
            <!-- <button class="button is-primary">Sign in</button> -->
          </form>
        </div>
      </div>
    </section>
  </div>
  <?php include 'Footer.html'; ?>
  <script src="https://cdn.jsdelivr.net/npm/vue@2/dist/vue.js"></script>
  </script>
  <script>
    var loginu = new Vue({
      el: "#signuser",
      data: {
        fname: null,
        lname: null,
        // username: null,
        password: null,
        email: null,
        gender: null,
        phone: null,
        weight1: null,
        height1: null,
        address: null,
        age: null,
        msg: [],
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
          if (value.length < 8) {
            this.msg['password'] = 'Must be 8 characters!';
          } else {
            this.msg['password'] = '';
          }
        },
        validatefname(value) {
          if (value.length < 1) {
            this.msg['fname'] = 'Please enter your Firstname';
          } else {
            this.msg['fname'] = '';
          }
        },
        validatelname(value) {
          if (value.length < 1) {
            this.msg['lname'] = 'Please enter your Lastname';
          } else {
            this.msg['lname'] = '';
          }
        },
        validategender(value) {
          if (value != 'Male' || value != 'Female') {
            this.msg['gender'] = 'Check your gender';
          } else {
            this.msg['gender'] = '';
          }
        },
        validatephone(value) {
          if (value.length < 9) {
            this.msg['phone'] = 'Please enter your phone number';
          } else {
            this.msg['phone'] = '';
          }
        },
        validateweight1(value) {
          if (value.length < 1) {
            this.msg['weight1'] = '*weight';
          } else {
            this.msg['weight1'] = '';
          }
        },
        validateheight1(value) {
          if (value.length < 1) {
            this.msg['height1'] = '*height';
          } else {
            this.msg['height1'] = '';
          }
        },
        validateaddress(value) {
          if (value.length < 40) {
            this.msg['address'] = 'Must be 40 characters at least! ';
          } else {
            this.msg['address'] = '';
          }
        },
        validateage(value) {
          if (value.length < 1) {
            this.msg['age'] = 'Please enter your age';
          } else {
            this.msg['age'] = '';
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
        },
        fname(value) {
          this.fname = value;
          this.validatefname(value);
        },
        lname(value) {
          this.lname = value;
          this.validatelname(value);
        },
        gender(value) {
          this.gender = value;
          this.validategender(value);
        },
        phone(value) {
          this.phone = value;
          this.validatephone(value);
        },
        weight1(value) {
          this.weight1 = value;
          this.validateweight1(value);
        },
        height1(value) {
          this.height1 = value;
          this.validateheight1(value);
        },
        address(value) {
          this.address = value;
          this.validateaddress(value);
        },
        age(value) {
          this.age = value;
          this.validateage(value);
        }

      }
    });

  </script>
</body>

</html>