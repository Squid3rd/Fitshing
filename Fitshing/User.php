<!DOCTYPE html>
<html lang="en">
<?php include 'action.php' ?>

<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bulma@0.9.4/css/bulma.min.css">
  <link rel="icon" type="images/x-icon" href="assets/logo.png" />
  <title>User</title>
  <link rel="stylesheet" href="style.css">
  <style>
    img {
      margin: 2em;
      width: 100%;
      border-radius: 100%;
    }

    .name {
      margin: 60px;
    }

    .link {
      position: relative;
      left: 40%;
      bottom: 30px;
      color: gold;
    }
  </style>
</head>

<body>
  <?php include 'Header.php'; ?>
  <div id="user1">
    <section class="hero is-fullheight">
      <div class="columns hero-body is-fullheight">
        <div class="container" style="width: 50%;">
          <section class=" is-large has-background-danger" style="border-radius: 1em;">
            <div class="columns p-5" v-for='(item, index) in userdata'>
              <div class="column is-3">
                <img
                  src="https://img.freepik.com/free-vector/cute-koala-lay-pillow-cartoon-vector-icon-illustration-animal-nature-icon-concept-isolated_138676-5484.jpg?w=2000"
                  alt="">
                <a class="subtitle is-4 link" @click="modal_do_train = !modal_do_train"><u>Subscribe</u></a>
                <div class="modal" v-bind:class="{'is-active':modal_do_train}">
                  <div class="modal-background" @click="modal_do_train = !modal_do_train"></div>
                  <div class="modal-card" style="max-width: 960px; width: 90%" v-for="(item1, index) in select2">
                    <section class="modal-card-body">
                      <img class="product-img" src='./assets/user.png' alt="">
                      <hr />
                      <table id="order-table" style="width: 100%" class="table is-bordered" class="has-background-grey">
                        <tr>
                          <th colspan="6" style="text-align: center" class='has-text-danger is-size-4'>
                          Trainer Co-op Profile</th>
                        </tr>
                        <tr>
                          <td colspan="3">Name : {{item1.fname}} {{item1.lname}}</td>
                          <td colspan="3">Age : {{ item1.age }} years old</td>
                        </tr>
                        <tr>
                          <td colspan="3">Gender : {{ item1.gender }}</td>
                          <td colspan="3">Phone : 099-9999999</td>
                        </tr>
                      </table>
                      <button :class="['button', 'is-success']" @click='saveTrain(item)'
                        v-show='already == true'>Accept</button>
                      <button :class="['button', 'is-danger']" v-show='already == false'
                        @click='delTrain(item)'>Cancel</button>
                    </section>
                  </div>


                </div>
              </div>
              <div class="column is-9 is-offset-1 name">
                <div class="field">
                  <label class="label">FirstName</label>
                  <span class="label" style="position: absolute; left: 65%; top: 75px;">LastName</span>
                  <div class="control">
                    <input class="input  title is-6" id="FirstName" type="text" style="width: 42%;" :value=item.fname
                      readonly>
                    <input class="input title is-6" id="LastName" type="text" style="width: 42%;" :value=item.lname
                      readonly>
                  </div>
                  <label class="label">Email</label>
                  <div class="control">
                    <input class="input title is-6 Email" id="Email" type="text" style="width: 84.5%;" :value=item.email
                      readonly>
                  </div>
                </div>
                <div class="field">
                  <label class="label">Age</label>
                  <span class="label" style="position: absolute; left: 65%; top: 16.5em;">Gender</span>
                  <div class="control">
                    <input class="input  title is-6" id="FirstName" type="text" style="width: 42%;" :value=item.Age
                      readonly>
                    <input class="input title is-6" id="LastName" type="text" style="width: 42%;" :value=item.gender
                      readonly>
                  </div>
                </div>
                <div class="field">
                  <label class="label">Height</label>
                  <span class="label" style="position: absolute; left: 65%; top: 23em;">Weight</span>
                  <div class="control">
                    <input class="input  title is-6" id="FirstName" type="text" style="width: 42%;" :value=item.height
                      readonly>
                    <input class="input title is-6" id="LastName" type="text" style="width: 42%;" :value=item.weight
                      readonly>
                  </div>
                </div>
                <div class="field">
                  <label class="label">Address</label>
                  <div class="control">
                    <textarea class="" style="border: 0; border-radius: 0.4em;" name="Address" id="Address" cols="90"
                      rows="10">
                    {{ item.Address }}</textarea>
                  </div>
                </div>
                <!-- <div class="field">
                <label class="label">Co_op</label>
                <div class="control">
                  <textarea class="" style="border: 0; border-radius: 0.4em;" name="Address" id="Address" cols="90"
                    rows="5"></textarea>
                </div>
              </div> -->
              </div>
            </div>
          </section>
        </div>
      </div>
    </section>
  </div>

  <?php include 'Footer.html'; ?>
  <script src="https://cdn.jsdelivr.net/npm/vue@2/dist/vue.js"></script>
  <script src="./user.js">
  </script>
  <script>
    var app = new Vue({
      el: "#user1",
      data: {
        userdata: testuser,
        select2: [],
        select3: [],
        modal_do_train: false,
        show_modal: false,
        already:''
      },
      methods: {

      },
      computed: {

      },
      watch: {
        select2() {
          if (this.select2.length != 0) {
            this.already = true
          }
          else {
            this.already = false
          }
        }
      },
      created() {
        this.select2 = JSON.parse(localStorage.selectsave2)
        this.select3 = JSON.parse(localStorage.selectsave2)
      }

    });
  </script>
</body>

</html>