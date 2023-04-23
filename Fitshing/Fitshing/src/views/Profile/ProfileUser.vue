<template>
    <section class="hero is-fullheight">
      <div class="columns hero-body is-fullheight">
        <div class="container" style="width: 50%">
          <section
            class="is-large has-background-danger"
            style="border-radius: 1em"
          >
            <div class="columns p-5">
              <div class="column is-3">
                <img
                  src="https://img.freepik.com/free-vector/cute-koala-lay-pillow-cartoon-vector-icon-illustration-animal-nature-icon-concept-isolated_138676-5484.jpg?w=2000"
                  alt=""
                />
                <a
                  class="subtitle is-4 link"
                  @click="modal_do_train = !modal_do_train"
                  ><u>Subscribe</u></a
                >
                <div class="modal" v-bind:class="{ 'is-active': modal_do_train }">
                  <div
                    class="modal-background"
                    @click="modal_do_train = !modal_do_train"
                  ></div>
                  <div
                    class="modal-card"
                    style="max-width: 960px; width: 90%"
                    
                  >
                    <section class="modal-card-body">
                      <img class="product-img" src="./assets/user.png" alt="" />
                      <hr />
                      <table
                        id="order-table"
                        style="width: 100%"
                        class="table is-bordered has-background-grey"
                      >
                        <tr>
                          <th
                            colspan="6"
                            style="text-align: center"
                            class="has-text-danger is-size-4"
                          >
                            Trainer Co-op Profile
                          </th>
                        </tr>
                        <tr>
                          <td colspan="3">Name : Peter Parker</td>
                          <td colspan="3">Age : 191 years old</td>
                        </tr>
                        <tr>
                          <td colspan="3">Gender : Maile </td>
                          <td colspan="3">Phone : 099-9999999</td>
                        </tr>
                      </table>
                      <!-- <button :class="['button', 'is-success']" @click='saveTrain(item)'
                          v-show='already == true'>Accept</button> -->
                      <button
                        :class="['button', 'is-danger']"
                        v-show="already == true"
                        @click="delTrain(item)"
                      >
                        Cancel
                      </button>
                    </section>
                  </div>
                </div>
              </div>
              <div class="column is-9 is-offset-1 name">
                <div class="field">
                  <label class="label">FirstName</label>
                  <span
                    class="label"
                    style="position: absolute; left: 65%; top: 75px"
                    >LastName</span
                  >
                  <div class="control">
                    <input
                      class="input title is-6"
                      id="FirstName"
                      type="text"
                      style="width: 42%"
                      
                      readonly
                    />
                    <input
                      class="input title is-6"
                      id="LastName"
                      type="text"
                      style="width: 42%"
                      
                      readonly
                    />
                  </div>
                  <label class="label">Email</label>
                  <div class="control">
                    <input
                      class="input title is-6 Email"
                      id="Email"
                      type="text"
                      style="width: 84.5%"
                      
                      readonly
                    />
                  </div>
                </div>
                <div class="field">
                  <label class="label">Age</label>
                  <span
                    class="label"
                    style="position: absolute; left: 65%; top: 16.5em"
                    >Gender</span
                  >
                  <div class="control">
                    <input
                      class="input title is-6"
                      id="FirstName"
                      type="text"
                      style="width: 42%"
                      
                      readonly
                    />
                    <input
                      class="input title is-6"
                      id="LastName"
                      type="text"
                      style="width: 42%"
                      
                      readonly
                    />
                  </div>
                </div>
                <div class="field">
                  <label class="label">Height</label>
                  <span
                    class="label"
                    style="position: absolute; left: 65%; top: 23em"
                    >Weight</span
                  >
                  <div class="control">
                    <input
                      class="input title is-6"
                      id="FirstName"
                      type="text"
                      style="width: 42%"
                      
                      readonly
                    />
                    <input
                      class="input title is-6"
                      id="LastName"
                      type="text"
                      style="width: 42%"
                      
                      readonly
                    />
                  </div>
                </div>
                <div class="field">
                  <label class="label">Address</label>
                  <div class="control">
                    <textarea
                      class=""
                      style="border: 0; border-radius: 0.4em"
                      name="Address"
                      id="Address"
                      cols="90"
                      rows="10"
                    >
                      Chonburi</textarea
                    >
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
    name: "userprofile",
    data() {
      return {
        select2: [],
        select3: [],
        modal_do_train: false,
        show_modal: false,
        already: "",
      };
    },
    methods: {
          delTrain(n) {
            this.select2.splice(0)
            this.select3.splice(0)
          },
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