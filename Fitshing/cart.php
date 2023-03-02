<!DOCTYPE html>
<html lang="en">
<?php include 'action.php' ?>

<head>
  <meta charset="UTF-8" />
  <meta http-equiv="X-UA-Compatible" content="IE=edge" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bulma@0.9.4/css/bulma.min.css" />
  <link rel="stylesheet" href="style.css">
  <title>Cart</title>
  <link rel="icon" type="images/x-icon" href="assets/logo.png" />
</head>

<body>
  <?php include 'Header.php'; ?>
  <div id='checkcart'>
    <section class="hero is-fullheight">
      <div class="columns hero-body is-fullheight is-centered">
        <!-- <div class="box"> -->
        <div class="container p-4">
          <div class= "has-text-right ">
            
            <a href="product.php"><button @click="clear()" class="button" >กลับไปหน้าเลือกสินค้า</button></a>
            <button @click="cart = []" class="button has-background-danger">clear</button>
          </div>
          <h1 class="subtitle is-3">รายการสินค้า</h1>

          <hr />
          <div style="" class="column is-3 is-offset-9 has-background-light p-5 has-round">
            <p class="subtitle is-5">สรุปบิล</p>
            <!-- <div class="columns">
              <p class="column is-8">
                {{ cart.name }}
              </p>
              <p class="column is-1 is-offset-2">X {{ cart.quantity }}</p>
            </div> -->
            <div class="columns">
              <p class="column is-7">ราคารวม</p>
              <p class="column is-4 is-offset-2">{{ totalPrice }} บาท</p>
            </div>
            <a class="button is-success is-fullwidth" href='payment.php'>ซื้อ</a>
          </div>
          <div class="columns mt-5" v-for='(item,index) in cart'>
            <div class="column is-2 has-background-light">
              <img :src=item.pic style="width: 150px; margin: 1em" alt="" />
            </div>
            <div class="column is-5 has-background-light">
              <p class="subtitle is-5">
                {{ item.name }}
              </p>
              <p>{{ item.price }} x {{ item.quantity }}</p>
            </div>
            <div class="column is-1">
              <button @click.prevent='removeFrom(item)' id="delete-button" class="delete" style="left: 110%; bottom: 21.5px" key="false"></button>
            </div>
          </div>

          <hr width="70%" />
        </div>
      </div>
      <!-- </div> -->
    </section>
  </div>
  <?php include 'Footer.html'; ?>
  <script src="https://cdn.jsdelivr.net/npm/vue@2/dist/vue.js"></script>
  <script src="./main.js">
  </script>
  <script>
    var app = new Vue({
      el: "#checkcart",
      data: {
        cart: [],
        modal_confirm_order: false,
        show_modal: false,
        order_detail: {},
      },
      methods: {
        removeFrom(n) {
          if (n.quantity > 1) {
            n.quantity--
          } else {
            this.cart.splice(this.cart.indexOf(n), 1)
          }
          localStorage.setItem("cart", JSON.stringify(this.cart))
        },
        clear(){
          localStorage.removeItem("cart");
        }
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
</body>

</html>