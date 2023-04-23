<template>
  <section class="hero is-fullheight">
      <div class="columns hero-body is-fullheight">
        <div class="container" style=" width: 50%; ">
          <section class=" is-large has-background-success" style="border-radius: 1em;">
            <div class="columns p-5" >
              <div class="column is-3">
                <img class="is-rounded"
                  src="https://img.freepik.com/free-vector/cute-monster-kid-cartoon-vector-icon-illustration-monster-holiday-icon-concept-isolated-premium-vector-flat-cartoon-style_138676-3995.jpg?w=2000"
                  alt="">
                <a class="subtitle is-4 link" @click="modal_do_train = !modal_do_train"><u>Subscribe</u></a>
                <div class="modal" v-bind:class="{'is-active':modal_do_train}">
                  <div class="modal-background" @click="modal_do_train = !modal_do_train"></div>
                  <div class="modal-card" style="max-width: 960px; width: 90%">
                    <section class="modal-card-body">
                      <img class="product-img" src='./assets/user.png' alt="">
                      <hr />
                      <table id="order-table" style="width: 100%" class="table is-bordered has-background-grey">
                        <tr>
                          <th colspan="6" style="text-align: center" class='has-text-danger is-size-4'>
                            User Co-op Profile</th>
                        </tr>
                        <tr>
                          <td colspan="3">Name : EIEI EIEI</td>
                          <td colspan="3">Age : EIEI years old</td>
                        </tr>
                        <tr>
                          <td colspan="3">Gender : EIEI</td>
                        </tr>
                      </table>
                      <button :class="['button', 'is-success']" @click='saveTrain(item)'
                        v-show='already == true'>Accept</button>
                      <button :class="['button', 'is-danger']" v-show='already == true'
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
                    <input class="input  title is-6" id="FirstName" type="text" style="width: 42%;"
                      readonly>
                    <input class="input title is-6" id="LastName" type="text" style="width: 42%;"
                      readonly>
                  </div>

                </div>
                <div class="field">
                  <label class="label">Age</label>
                  <span class="label" style="position: absolute; left: 65%; top: 16.5em;">Gender</span>
                  <div class="control">
                    <input class="input  title is-6" id="FirstName" type="text" style="width: 42%;"
                      readonly>
                    <input class="input title is-6" id="LastName" type="text" style="width: 42%;" 
                      readonly>
                  </div>
                </div>

                <div class="field">
                  <label class="label">Certificate</label>
                  <div class="control">
                    <textarea class="" style="border: 0; border-radius: 0.4em;" name="Address" id="Address" cols="90"
                      rows="5">
                      EIEI      
                    </textarea>
                  </div>
                </div>
                <div class="field">
                  <label class="label">Special</label>
                  <div class="control">
                    <textarea class="" style="border: 0; border-radius: 0.4em;" name="Address" id="Address" cols="90"
                      rows="5">
                    EIEI</textarea>
                  </div>
                </div>

              </div>
            </div>
          </section>
        </div>
      </div>
    </section>
</template>

<script>
export default {
  name: "trainerprofile",
  data() {
    return {
        already: '',
        select1: [],
        select2: [],
        modal_do_train: false,
        show_modal: false,
      // sortdata: dataex1,
    };
  },
  methods: {
    saveTrain(n) {
          this.select2.splice(0)
          this.select2.push(n)
          this.select1.splice(0)

        },
        delTrain(n) {
          this.select1.splice(0)
        },
  },
  computed: {
    
  },
  watch: {
    select1() {
          if (this.select1.length != 0) {
            this.already = true
          }
          else {
            this.already = false
          }
        }
  },
};
</script>

<style scoped>
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