<!DOCTYPE html>
<html lang="en">
<?php include 'action.php' ?>

<head>
  <meta charset="UTF-8" />
  <meta http-equiv="X-UA-Compatible" content="IE=edge" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bulma@0.9.4/css/bulma.min.css" />
  <link rel="stylesheet" href="style.css">
  <title>Success</title>
  <link rel="icon" type="images/x-icon" href="assets/logo.png" />
</head>

<body>
  <?php include 'Header.php'; ?>
  <div id='scu1'>
    <section class="hero is-fullheight">
      <div class="columns hero-body is-centered is-fullheight">
        <div class="
          container
          is-flex is-justify-content-center is-align-items-center
        " v-for='(item,index) in userdata'>
          <div class="
            mt-6
            out
            is-flex is-justify-content-center is-align-items-center
          ">
            <table id="order-table" style="width: 80%" class="table is-bordered">
              <tr>
                <th colspan="4" style="text-align: center">Order Detail</th>
              </tr>
              <tr>
                <td colspan="2">ชื่อ : {{item.fname}} {{item.lname}}</td>
                <td colspan="2">ที่อยู่ : {{item.Address}}</td>
              </tr>
              <tr>
                <th colspan="4" style="text-align: center">รายการสินค้า</th>
              </tr>
              <tr>
                <th>ชื่อสินค้า</th>
                <th>ราคาต่อหน่วย</th>
                <th>จำนวน</th>
                <th>ราคารวม</th>
              </tr>
              <tr v-for="item in cart">
                <td>{{item.name}}</td>
                <td>{{item.price}}</td>
                <td>{{item.quantity}}</td>
                <td>{{item.price*item.quantity}}</td>
              </tr>
              <tr>
                <td colspan="2"></td>
                <th>ราคารวมทั้งหมด</th>
                <th>{{totalPrice}}</th>
              </tr>
            </table>
            <button class="ml-5 button is-warning" @click="delCart">Back</button>
            <p id='te1'>
            </p>
          </div>
        </div>
      </div>
    </section>
  </div>
  <script src="https://cdn.jsdelivr.net/npm/vue@2/dist/vue.js"></script>
  <script src="./user.js">
  </script>
  <script>
    var app = new Vue({
      el: "#scu1",
      data: {
        cart: [],
        userdata: testuser,
      },
      methods: {
        delCart(n) {
          this.cart.splice(0)

          localStorage.setItem("cart", JSON.stringify(this.cart))
          location.href = 'index.php'
        },
      },
      computed: {
        totalPrice() {
          return this.cart.reduce(
            (total, cur) => total + parseInt(cur.price) * cur.quantity,
            0
          );
        },
      },
      watch: {

      },
      created() {
        this.cart = JSON.parse(localStorage.cart);
      },
    });
  </script>
  <script>
    // var time = 10, x = setInterval(function () {
    //   console.log(--time);
    //   document.getElementById('te1').innerHTML = "(" + time + ")";
    //   this.cart.splice(0)
    //   if (time === 0) {
    //     location.href = 'index.php'
    //     clearInterval(x);
    //   }
    // }, 1000);
  </script>
</body>
<?php include 'Footer.html'; ?>

</html>