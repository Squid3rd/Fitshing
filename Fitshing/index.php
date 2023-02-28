<!DOCTYPE html>
<html lang="en">
<?php include 'action.php' ?>

<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <link rel="stylesheet" href="main.css">
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bulma@0.9.4/css/bulma.min.css">
  <title>Fitshing for fitness</title>
  <link rel="icon" type="images/x-icon" href="assets/logo.png" />
</head>

<body>
  <?php include 'Header.php'; ?>
  <!-- <div class='bor1'> -->
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
  </div>
  <!-- <div class="bor2"> -->
    <?php
    echo '<div class="column">';
    echo '<div class="column is-narrow">';
    echo '<div class="" id="productall"><span>';
    echo '<div class="card proobj p-3 m-3" v-for="(item, index) in productex">
            <a href="cart.php"><img class="product-img" :src=item.pic alt=""></a>
            <p class="title is-6 m-3">{{item.name}}</p>
            <p class="subtitle is-6 m-3">{{item.price}}</p>
          </div></span>
          </div></div></div>';
    ?>
  </div>
  <div class="bor3"></div>
  <div class="bor4"></div>

  <?php include 'Footer.html'; ?>
  <script src="https://cdn.jsdelivr.net/npm/vue@2/dist/vue.js"></script>
  <script src="./dataex.js">
  </script>
  <script src="./main.js">
  </script>
</body>

</html>

<script>

</script>