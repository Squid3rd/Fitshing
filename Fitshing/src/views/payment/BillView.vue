<template>
  <section class="hero is-info container is-max-desktop mb-6">
    <div class="columns is-mobile is-centered">
      <div class="column is-half">
        <p class="title is-3">วิธีการชำระเงิน</p>
        <div class="control">
          <label class="radio">
            <input
              type="radio"
              name="foobar"
              value="Mobile Baanking"
              v-model="type"
            />
            โอนเงินผ่านธนาคาร
          </label>
          <label class="radio">
            <input
              type="radio"
              name="foobar"
              value="Credit/Debit"
              v-model="type"
            />
            บัตรเครดิต/บัครเดบิต
          </label>
          <label class="radio">
            <input
              type="radio"
              name="foobar"
              value="Cash on Delivery"
              v-model="type"
            />
            ชำระเงินปลายทาง
          </label>
        </div>
        <div class="title is-4">รายการสั่งซื้อ</div>
        <div style="background-color: white; color: black">
          <div class="columns">
            <div class="column is-10">
              <p v-for="(item, index) in cart">{{ item.ex_name }}</p>
            </div>
            <div class="column has-text-right mr-3">
              <p v-for="(item, index) in cart">x {{ item.quantity }}</p>
            </div>
          </div>
          <p class="">รวมเป็นเงินทั้งหมด{{ sumary }}</p>
        </div>
      </div>
    </div>
    <div class="has-text-centered">
      <button
        class="button is-success is-light pl-6 pr-6 last-payment"
        @click="submit"
      >
        ชำระเงิน
      </button>
    </div>
  </section>
</template>

<script>
import axios from '@/plugins/axios';
export default {
  name: "cardproduct",
  props: ['user'],
  data() {
    
    return {
      type: "",
      
      cart: [],
    };
  },
  created() {
    this.cart = JSON.parse(localStorage.cart);
  },
  methods: {
    submit() {
      for (let i = 0; this.cart.length > i; i++) {
        // formData.append("slip_info", this.cart[i].ex_name);
        // formData.append("total_price", this.cart[i].ex_price);
        // formData.append("u_id", this.user.id);
        // formData.append("type", this.type);
        axios
          .post("/payment", {
                slip_info: this.cart[i].ex_name,
                total_price: this.cart[i].ex_price,
                u_id: this.user.id,
                type: this.type,})
          .then((res) => this.$router.push({ name: "home" }))
          .catch((e) => console.log(e.response.data));
      }
      
    },
  },
  computed: {
    sumary() {
      // this.total = this.cart.reduce((num, int) => num + int.price * int.quantity, 0);
      return this.cart.reduce(
        (num, int) => num + int.ex_price * int.quantity,
        0
      );
    },
  },
};
</script>
 
<style>
</style>