<!DOCTYPE html>
<html lang="en">
<?php include 'action.php' ?>

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bulma@0.9.4/css/bulma.min.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css" />
    <link rel="stylesheet" href="style.css">
    <title>Product</title>
    <link rel="icon" type="images/x-icon" href="assets/logo.png" />
</head>

<body>
    <!-- ไิอลิงค์เชื่อมนี่เชื่อมไว้ก่อนเฉยๆ -->
    <?php include 'Header.php'; ?>
    <div id="app">
        <section class="hero is-fullheight">
            <div class="columns hero-body is-centered is-fullheight">

                <div class="container has-background-black p-5" style="max-width: 60%;">
                    <div class='field has-addons has-addons-right'>
                        <form action="">
                            <select name="sort1" id="sort1" class="button" v-model='sel'>
                                <option value="">All product</option>
                                <option>Abdomen</option>
                                <option>Hand</option>
                                <option>Leg</option>
                            </select>
                        </form>
                        <span>
                            <form action="">
                                <select name="sort2" id="sort2" class="button ml-3">
                                    <option class="has-text-centered">Default</option>
                                    <option class="has-text-centered">Price</option>
                                    <option class="has-text-centered">Name</option>
                                </select>
                            </form>
                        </span>
                    </div>


                    <?php

                    echo '<div class="product">';
                    echo '<div class="card product_items" v-for="(item, index) in sortdata">
                        <a href="cart.php"><img class="product-img" :src=item.pic alt=""></a>
                        <p class="title is-6 m-3">{{item.name}}</p>
                        <p class="subtitle is-6 m-3">฿ {{item.price}}</p>
                        <div class="buttons is-right">
                            <a href="PreviewProduct.php"><button class="button is-success">ดูรายละเอียด</button></a>
                            <span>
                                <button class="button is-warning" @click="addToCart(item)">Add in Cart</button>
                            </span></div>
                        </div>
                    </div>';
                    ?>

                </div>

            </div>
        </section>
    </div>
    <?php include 'Footer.html'; ?>
    <script src="https://cdn.jsdelivr.net/npm/vue@2/dist/vue.js"></script>
    <!-- <script src="./dataex.js"></script> -->
    <script src="./dataexdum.js"></script>
    <!-- <script src="./test.js"></script> -->
    <script>
        var app = new Vue({
            el: "#app",
            data: {
                sel: '',
                dataex: dataex1,
                sortdata: dataex1,
                cart: [],
            },
            methods: {
                addToCart(n){
                    if(this.cart.includes(n)){
                        this.cart[this.cart.indexOf(n)].quantity++
                    }
                    else{
                        n.quantity = 1
                        this.cart.push(n)
                        
                    }
                    localStorage.setItem("cart", JSON.stringify(this.cart))
                },
                removeFromCart(n){
                    console.log(n.quantity)
                    if(n.quantity > 1){
                        n.quantity--
                    }
                    else{
                        this.cart.splice(this.cart.indexOf(n), 1)
                    }
                    localStorage.setItem("cart", JSON.stringify(this.cart))
                },
                // goCheckout(){
                //     localStorage.setItem("cart", JSON.stringify(this.cart))
                //     window.location.href = "./cart.php";
                // }
            },
            computed: {
                type1() {
                    this.sortdata = []
                    return this.sortdata = this.dataex.filter(x => x.type.includes(this.sel))
                },
            },
            watch: {
                sel(newSel){
                    this.type1
                }
            },
            created(){
                this.cart = JSON.parse(localStorage.cart)
                
            },
        });
    </script>
</body>

</html>