<!DOCTYPE html>
<html lang="en">
<?php include 'action.php' ?>

<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <link rel="stylesheet" href="style.css">
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bulma@0.9.4/css/bulma.min.css">
  <title>Fitshing for fitness</title>
  <link rel="icon" type="images/x-icon" href="assets/logo.png" />
</head>

<body>
  <?php include 'Header.php'; ?>
  <div id='main1'>
    <section id="header">
      <div class="header-inner">
        <!-- <h1>
          Fisthing
        </h1> -->
        <h3 style="font-weight:500">
          ▲ For Fitness ▲
        </h3>
      </div>
    </section>
    <h1 class="has-text-danger-dark has-background-info-light is-size-2 has-text-centered has-text-weight-bold">
      Recommended</h1>
    <div class="bor1 scrollXLeft">
      <?php

      // echo '<div class="product">';
      echo '<div class=""><div class="columns"><div class="column is-narrow" v-for="item in dataex1" v-if="recommend.includes(item.id)">';
      echo '<div class="card product_items">
            <a href="cart.php"><img class="product-img" :src=item.pic alt=""></a>
            <p class="title is-6 m-3">{{item.name}}</p>
            <p class="subtitle is-6 m-3">฿ {{item.price}}</p>
            <div class="buttons is-right">
                <a href=""><button class="button is-success">ดูรายละเอียด</button></a>
                
            </div>
            </div></div></div></div>';
      ?>

    </div>
    <h1 class="has-text-danger-dark has-background-info-light is-size-2 has-text-centered has-text-weight-bold">Product
    </h1>
    <div class="bor3 scrollXLeft">
      <?php

      // echo '<div class="product">';
      echo '<div class=""><div class="columns"><div class="column is-narrow" v-for="item in dataex1" v-if="item.id < 6">';
      echo '<div class="card product_items">
            <a href="cart.php"><img class="product-img" :src=item.pic alt=""></a>
            <p class="title is-6 m-3">{{item.name}}</p>
            <p class="subtitle is-6 m-3">฿ {{item.price}}</p>
            <div class="buttons is-right">
                <a href="PreviewProduct.php"><button class="button is-success">ดูรายละเอียด</button></a>
                
            </div>
            </div></div>
            <div class="card mx-6">
            <a href="product.php"><p class="title is-1 p-6"><i class="fa fa-plus"></i></p></a>
            </div>
            </div></div>';
      ?>
    </div>
    <h1 class="has-text-danger-dark has-background-info-light is-size-2 has-text-centered has-text-weight-bold">Trainer
    </h1>
    <div class="bor4 scrollXLeft">
      <?php

      echo '<div class=""><div class="product" id="productall" >';
      echo '<div class="card product_items" v-for="(item, index) in datatr1" v-if="item.id < 4">
    <a type="button" @click="modal_do_train = !modal_do_train, show1=item.id"><img class="product-img" :src=item.pic alt=""></a>
    <p class="title is-6 m-3 has-text-centered">{{item.name}}</p>
    <p class="subtitle is-6 m-3 has-text-centered">{{item.nickname}}</p></div>
    </div><div class="card mx-6">
    <a href="Trainer.php"><p class="title is-1 p-6" style="text-align: center"><i class="fa fa-plus"></i></p></a>
    </div>
    
';
      ?>


      <div class="modal" v-bind:class="{'is-active':modal_do_train}">
        <div class="modal-background" @click="modal_do_train = !modal_do_train"></div>
        <div class="modal-card" style="max-width: 960px; width: 90%" v-for="(item, index) in datatr1">
          <section class="modal-card-body" v-show="index == show1">
            <img class="product-img" src='./assets/user.png' alt="">
            <!-- <img src="./Table example.png" /> -->
            <hr />
            <table id="order-table" style="width: 100%" class="table is-bordered" class="has-background-grey">
              <!-- ใส่ข้อมูลของ table ไว้ในนี้ -------------------------------------------->
              <tr>
                <th colspan="6" style="text-align: center" class='has-text-danger is-size-4'>Profile</th>
              </tr>
              <tr>
                <td colspan="3">Name : {{item.name}}</td>
                <td colspan="3">Age : {{ item.age }} years old</td>
              </tr>
              <tr>
                <td colspan="3">Nickname : {{item.nickname}}</td>
                <td colspan="3">Gender : {{ item.gender }}</td>
              </tr>
              <!-- <tr>
                    <th colspan="6" style="text-align: center">ข้อมูล</th>
                </tr> -->
              <tr>
                <th colspan="6" style="text-align: center" class='has-text-info is-size-4'>Certificate
                </th>
              </tr>
              <tr v-for='(initem, index) in item.info.certificate'>
                <td colspan="6">- {{initem}}</td>
              </tr>
              <tr>
                <th colspan="6" style="text-align: center" class='has-text-info is-size-4'>Special</th>
              </tr>
              <tr v-for='(initem, index) in item.info.special'>
                <td colspan="6">- {{initem}}</td>
              </tr>
            </table>
            <button class="button is-warning">Add</button>
          </section>
        </div>
      </div>
    </div>
  </div>
  </div>


  <?php include 'Footer.html'; ?>
  <script src="https://cdn.jsdelivr.net/npm/vue@2/dist/vue.js"></script>
  <!-- <script src="./main.js"></script> -->
  <script src="./dataexdum.js"></script>
  <script src="./datatr.js"></script>
  <script>
    var app = new Vue({
      el: "#main1",
      data: {
        dataex1: dataex1,
        datatr1: traindata,
        recommend: [
          3,8,7,15
        ],
        recommendT: [
          0,2,3,4
        ],
        modal_do_train: false,
        show_modal: false,
        show1: null,
        // sortdata: dataex1,
      },
      methods: {
        // rec(numbers){
        //   return numbers.filter(x => x.)
        // }
      },
      computed: {

      },
      watch: {

      }
    });
  </script>
</body>

</html>