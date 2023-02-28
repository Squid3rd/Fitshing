<!DOCTYPE html>
<html lang="en">
<?php include 'action.php' ?>
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bulma@0.9.4/css/bulma.min.css">
    <link rel="stylesheet" href="main.css">
    <title>Trainer</title>
    <link rel="icon" type="images/x-icon" href="assets/logo.png" />
</head>

<body>
    <!-- ไิอลิงค์เชื่อมนี่เชื่อมไว้ก่อนเฉยๆ -->
    <?php include 'Header.php'; ?>
    <section class="hero is-fullheight">
        <div class="columns hero-body is-centered is-fullheight">

            <div class="container" style="max-width: 60%;">
                <div class='field has-addons has-addons-right'>
                    <form action="">
                        <select name="sort" id="sort" class="button">
                            <option value="01">บลา1</option>
                            <option value="02">บลา2</option>
                            <option value="03">บลา3</option>
                        </select>
                    </form>
                </div>

                <?php

                echo '<div class="product" id="productall">';
                echo '<div class="card product_items" v-for="(item, index) in productex">
                        <a href="cart.php"><img class="product-img" :src=item.pic alt=""></a>
                        <p class="title is-6 m-3">{{item.name}}</p>
                        <p class="subtitle is-6 m-3">{{item.price}}</p>
                        <div class="buttons is-centered">
                            <a href="cart.php"><button class="button is-success">ซื้อ</button></a>
                        </div>
                    </div>';
                ?>

            </div>

        </div>
    </section>
    <?php include 'Footer.html'; ?>
    <script src="https://cdn.jsdelivr.net/npm/vue@2/dist/vue.js"></script>
    <script src="./dataex.js">
    </script>
</body>

</html>