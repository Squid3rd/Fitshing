<template>
  <section class="hero is-info is-medium m-5">
    <div class="hero-body">
      <div class="columns is-mobile is-centered">
      <div class="column is-half">
        <p class="title is-3">วิธีการชำระเงิน</p>
        <div class="control">
          <label class="radio">
            <input
              type="radio"
              name="paymentType"
              value="Mobile Banking"
              v-model="type"
            />
            โอนเงินผ่านธนาคาร
          </label>
          <label class="radio">
            <input
              type="radio"
              name="paymentType"
              value="Credit/Debit"
              v-model="type"
            />
            บัตรเครดิต/บัตรเดบิต
          </label>
          <label class="radio">
            <input
              type="radio"
              name="paymentType"
              value="Cash on Delivery"
              v-model="type"
            />
            ชำระเงินปลายทาง
          </label>
        </div>

        <div v-if="errorMessage" class="notification is-danger is-light mt-3">
          {{ errorMessage }}
        </div>

        <div class="title is-4 mt-4">รายการสั่งซื้อ</div>
        <div style="background-color: white; color: black" class="p-5">
          <div class="columns" v-for="(item, index) in cart" :key="index">
            <div class="column is-10">
              <p>{{ item.ex_name }}</p>
            </div>
            <div class="column has-text-right mr-3">
              <p>x {{ item.quantity }}</p>
            </div>
          </div>
          <hr />
          <p>รวมเป็นเงินทั้งหมด {{ summary }} บาท</p>
        </div>
      </div>
    </div>
    <div class="has-text-centered mt-4">
      <button
        class="button is-success is-light pl-6 pr-6 last-payment"
        :class="{ 'is-loading': isSubmitting }"
        :disabled="isSubmitting"
        @click="submit"
      >
        ชำระเงิน
      </button>
    </div>
    </div>
  </section>
</template>

<script>
import axios from "@/plugins/axios";
export default {
  name: "billview",
  props: ["user"],
  data() {
    return {
      type: "",
      cart: [],
      errorMessage: "",
      isSubmitting: false,
    };
  },
  created() {
    this.cart = JSON.parse(localStorage.getItem('cart') || '[]');
    if (this.cart.length === 0) {
      this.$router.push({ name: 'cart' });
    }
  },
  methods: {
    async submit() {
      this.errorMessage = "";

      if (!this.type) {
        this.errorMessage = "กรุณาเลือกวิธีการชำระเงิน";
        return;
      }

      if (!this.user) {
        this.errorMessage = "กรุณาเข้าสู่ระบบก่อน";
        return;
      }

      this.isSubmitting = true;

      try {
        for (const item of this.cart) {
          await axios.post("/payment", {
            ex_id: item.ex_id,
            slip_info: item.ex_name,
            total_price: item.ex_price * item.quantity,
            u_id: this.user.id,
            quantity: item.quantity,
            type: this.type,
          });
        }

        this.cart = [];
        localStorage.setItem("cart", JSON.stringify(this.cart));
        this.$router.push({ name: "home" });
      } catch (e) {
        this.errorMessage = e.response?.data?.message || "เกิดข้อผิดพลาดในการชำระเงิน";
      } finally {
        this.isSubmitting = false;
      }
    },
  },
  computed: {
    summary() {
      return this.cart.reduce(
        (total, item) => total + item.ex_price * item.quantity,
        0
      );
    },
  },
};
</script>

<style>
</style>
