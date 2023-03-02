<!DOCTYPE html>
<html lang="en">
<?php include 'action.php' ?>

<head>
  <meta charset="UTF-8" />
  <meta http-equiv="X-UA-Compatible" content="IE=edge" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bulma@0.9.4/css/bulma.min.css" />
  <link rel="stylesheet" href="style.css">
  <title>Payment</title>
  <link rel="icon" type="images/x-icon" href="assets/logo.png" />
</head>

<body>
  <?php include 'Header.php' ?>
  <div class='pay'>
    <section class="hero is-fullheight">
      <div class="columns hero-body is-fullheight">
        <div class="container is-flex is-justify-content-center is-align-items-center">
          <div class="mt-5 out is-centered">
            <div class="is-rounded inner">
              <form action="">
                <div class="information-user mt-5">
                  <label for="Name" class="label">Name</label>
                  <input type="text" class="input" style="width: 70%" disabled value="dhd" />
                </div>
                <div class="information-user">
                  <label for="Phone" class="label">Phone</label>
                  <input type="text" class="input" style="width: 70%" disabled value="segs" />
                </div>
                <div class="information-user">
                  <label for="Address" class="label">Address</label>
                  <textarea type="text" class="input" disabled></textarea>
                </div>
                <div class="information-user">
                  <label for="Type of purchase" class="label">Type of purchase</label>
                  <input type="text" class="input" style="width: 70%" />
                </div>
                <div class="buttons is-right mt-6">
                  <a class="button button-payment" href='success.php'
                    @click="confirm_order = !confirm_order">ชำระเงิน</a>
                </div>
              </form>
            </div>
          </div>
          <!-- <div class="modal" v-bind:class="{'is-active':confirm_order}">
          <div
            class="modal-background"
            @click="confirm_order = !confirm_order"
          ></div>
          <div class="modal-card" style="max-width: 960px; width: 90%">
            <section class="modal-card-body">
              ตัวอย่าง order
              <img src="./Table example.png" />
              <hr />
              Order Table ของนักศึกษา
              <table
                id="order-table"
                style="width: 100%"
                class="table is-bordered"
              >
                <tr>
                  <th colspan="4" style="text-align: center">Order Detail</th>
                </tr>
                <tr>
                  <td colspan="2">ชื่อ : {{fname}} {{lname}}</td>
                  <td colspan="2">ที่อยู่ : {{ad1}} {{ad2}} {{ad3}}</td>
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
                  <td>{{item.title}}</td>
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
            </section>
          </div>
        </div> -->
        </div>
      </div>
  </div>
  </section>
  </div>
  <?php include 'Footer.html' ?>
  <script src="https://cdn.jsdelivr.net/npm/vue@2/dist/vue.js"></script>
  <script src="./main.js">
  </script>
</body>
<script>
  var app = new Vue({
    el: "#pay",
    data: {
      confirm_order: false,
      
    },
    methods: {

    },
    computed: {

    },
    watch: {

    }
  });
</script>

</html>