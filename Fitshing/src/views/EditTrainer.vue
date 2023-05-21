<template>
  <div class="columns is-centered m-5">
    <div class="column is-6">
      <div class="box has-background-info has-text-info-light">
        <div class="field is-grouped is-grouped-centered">
          <h1 class="is-size-3 has-text-weight-bold">Edite Trainer Info</h1>
        </div>
      </div>
      <div class="columns"></div>
      <div class="tile is-vertical">
        <div class="tile">
          <div class="tile is-parent is-vertical">
            <article class="tile is-child">
              <div class="field box">
                <label class="label">Specialize</label>
                <div class="control">
                  <textarea
                    v-model="specialize"
                    class="textarea"
                    cols="20"
                    rows="5"
                  ></textarea>
                  <p class="help is-danger" v-if="msg.Specialize">
                    {{ msg.Specialize }}
                  </p>
                </div>
              </div>
            </article>
            <article class="tile is-child">
              <div class="field box">
                <label class="label">Certificate</label>
                <div class="control">
                  <textarea
                    v-model="certificate"
                    class="textarea"
                    cols="20"
                    rows="5"
                  ></textarea>
                  <p class="help is-danger" v-if="msg.Certificate">
                    {{ msg.Certificate }}
                  </p>
                </div>
              </div>
            </article>
            <article class="tile is-child">
              <div class="field box">
                <label class="label">Number of Member</label>
                <div class="control">
                  <div class="select">
                    <select name="amount_t" v-model="amount_t">
                      <option value="1">1</option>
                      <option value="2">2</option>
                      <option value="3">3</option>
                    </select>
                  </div>
                  <p class="help is-danger" v-if="msg.Amount">
                    {{ msg.Amount }}
                  </p>
                </div>
              </div>
            </article>
          </div>
          <div class="tile is-parent">
            <article class="tile is-child">
              <div class="field box">
                <label class="label">Info</label>
                <div class="control">
                  <textarea
                    v-model="info"
                    class="textarea"
                    cols="30"
                    rows="15"
                  ></textarea>
                  <p class="help is-danger" v-if="msg.Info">{{ msg.Info }}</p>
                </div>
              </div>
            </article>
          </div>
        </div>
      </div>
      <div class="field is-grouped is-grouped-right pt-2">
        <span>
          <a class="button is-success ml-5" @click="submitTrainer()">Submit</a>
        </span>
        <!-- <router-link to="/"> -->
        <button class="button is-danger ml-5" @click="this.$router.go(-1)">
          Back
        </button>
        <!-- </router-link> -->
      </div>
    </div>
  </div>
</template>

<script>
import axios from "@/plugins/axios";
export default {
  name: "editTrainer",
  data() {
    return {
      info: "",
      certificate: "",
      specialize: "",
      amount_t: 0,
      msg: [],
    };
  },
  created() {
    axios
      .get(`/trainer/edit/${this.$route.params.id}`)
      .then((response) => {
        this.info = response.data.trainer.info;
        this.certificate = response.data.trainer.certificate;
        this.specialize = response.data.trainer.specialize;
        this.amount_t = response.data.trainer.amount_t;
      })
      .catch((e) => {
        console.log(e);
      });
  },
  methods: {
    submitTrainer() {
        if(!this.certificate || this.certificate.length < 25){
        alert("Invalid Certificate input!")
      }
      else if(!this.specialize || this.specialize.length < 25){
        alert("Invalid Specialize input!")
      }
      else if(!this.info || this.info.length < 25){
        alert("Invalid Info input!")
      }
      else if(this.amount_t === 0){
        alert("Invalid Amount of Member!")
      }
      else{
        axios
        .put(`/trainer/edit/${this.$route.params.id}`, {
          specialize: this.specialize,
          certificate: this.certificate,
          info: this.info,
          amount_t: this.amount_t,
        })
        .then((response) => {
          console.log(response.data);
          this.$router.go(-1);
        })
        .catch((err) => {
          console.log(err);
        });
      }
    },
    validateInfo(value) {
      if (value.length < 25) {
        this.msg["Info"] = "Must be 25 characters! or more";
      } else {
        this.msg["Info"] = "";
      }
    },
    validateSpecialize(value) {
      if (value.length < 25) {
        this.msg["Specialize"] = "Must be 25 characters! or more";
      } else {
        this.msg["Specialize"] = "";
      }
    },
    validateCertificate(value) {
      if (value.length < 25) {
        this.msg["Certificate"] = "Must be 25 characters! or more";
      } else {
        this.msg["Certificate"] = "";
      }
    },
    validateAmount(value) {
      if (value === 0) {
        this.msg["Amount"] = "Please Select Amount of Member";
      } else {
        this.msg["Amount"] = "";
      }
    },
  },
  watch: {
    info(value) {
      this.info = value;
      this.validateInfo(value);
    },
    specialize(value) {
      this.specialize = value;
      this.validateSpecialize(value);
    },
    amount_t(value) {
      this.amount_t = value;
      this.validateAmount(value);
    },
    certificate(value) {
      this.certificate = value;
      this.validateCertificate(value);
    },
  },
};
</script>

<style>
</style>