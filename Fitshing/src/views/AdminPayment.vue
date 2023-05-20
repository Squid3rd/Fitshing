<template>
  <section class="hero is-fullheight">
    <div class="columns hero-body is-centered is-fullheight">
      <div class="container has-background-black p-5">
        <div class="columns is-centered">
          <div class="box">
            <div class="table">
              <thead>
                <tr>
                  <th>User id</th>
                  <th>Product</th>
                  <th>Amount</th>
                  <th>Price</th>
                  <th>Type</th>
                  <th>Date</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="items in payment" v-if="payment">
                  <td>{{ items.u_id }}</td>
                  <td>{{ items.slip_info }}</td>
                  <td>{{ items.amount }}</td>
                  <td>{{ items.total_price }}</td>
                  <td>{{ items.type }}</td>
                  <td>{{ items.date }}</td>
                </tr>
              </tbody>
            </div>
          
        </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import axios from "@/plugins/axios";
export default {
  data() {
    return {
      payment: [],
    };
  },
  mounted() {
    this.getPayment();
  },
  methods: {
    getPayment() {
      axios
        .get("/payment")
        .then((response) => {
          this.payment = response.data;
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
</script>

<style>
</style>