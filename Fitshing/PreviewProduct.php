<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bulma@0.9.4/css/bulma.min.css">
    <style>
        .another-pic1 {
            width: 60px;
            height: 60px;
            top: 102px;
            left: 15%;
        }

        .another-pic2 {
            width: 60px;
            height: 60px;
            top: 42px;
            left: 34%;

        }

        .another-pic3 {
            width: 60px;
            height: 60px;
            top: -19px;
            left: 52%;
        }

        .another-pic4 {
            width: 60px;
            height: 60px;
            top: -79px;
            left: 70%;
        }
    </style>
    <title>Document</title>
</head>

<body>
    <?php include 'Header.php'; ?>
    <div id='pre1'>
        <section class="hero is-fullheight">
            <div class="columns hero-body is-centered is-fullheight">
                <div class="container mt-6 mb-6" style="max-width: 60%;" v-for='(item, index) in dataex1'
                    v-if='item.id == previewid'>
                    <section class="is-large has-background-info">
                        <div class="columns">
                            <div class="column is-5">
                                <div class=" card is-relative p-2 " style="left:75px; top:75px; max-width:65%;">
                                    <img :src=item.pic alt="แก้วน้ำ">
                                </div>
                                <div>
                                    <div class="card has-background-white is-relative another-pic1 p-1">
                                        <img :src=item.pic alt="">
                                    </div>
                                    <div class="card has-background-white is-relative another-pic2 p-1">
                                        <img :src=item.pic alt="">
                                    </div>
                                    <div class="card has-background-white is-relative another-pic3 p-1">
                                        <img :src=item.pic alt="">
                                    </div>
                                    <div class="card has-background-white is-relative another-pic4 p-1">
                                        <img :src=item.pic alt="">
                                    </div>
                                </div>
                            </div>
                            <div class="column is-6 is-relative" style="top:100px;">
                                <p class="title is-4 has-text-white">{{ item.name }}</p>
                                <p class="title is-4 has-text-white">฿ {{item.price}}</p>
                                <input type="number" class="input" style="width: 20%;" value="1" min="1" max="5" Disabled>
                                <button class="button has-background-success"
                                    style="position: relative; top:70px; right:20.6%; width:40%; border:0; color:white;"
                                    @click="addToCart(item)">Add Order
                                </button>

                            </div>
                        </div>
                        <div class="cloumns is-relative" style="left:42.5%; bottom:150px;">
                            <div class="card column is-5 has-background-white">
                                <table id="order-table" style="width: 100%" class="table is-bordered"
                                    class="has-background-grey">
                                    <tr>
                                        <th colspan="6" style="text-align: center" class='has-text-danger is-size-4'>
                                            Description</th>
                                    </tr>
                                    <tr>
                                        <td colspan="6">{{item.info}}</td>
                                    </tr>
                                </table>
                            </div>
                        </div>
                    </section>
                </div>
            </div>
        </section>
    </div>
    <?php include 'Footer.html'; ?>
    <script src="./dataexdum.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/vue@2/dist/vue.js"></script>
    <script>
        var app1 = new Vue({
            el: "#pre1",
            data: {
                dataex1: dataex1,
                previewid: null,
                cart: []

            },
            methods: {
                addToCart(n) {
                    if (this.cart.includes(n)) {
                        this.cart[this.cart.indexOf(n)].quantity++
                    }
                    else {
                        n.quantity = 1
                        this.cart.push(n)

                    }
                    localStorage.setItem("cart", JSON.stringify(this.cart))
                },
            },
            computed: {

            },
            watch: {
                dd() {
                    console.log(previewid)
                }
            },
            created() {
                this.cart = JSON.parse(localStorage.cart)
                this.previewid = localStorage.preview
            }
        });
    </script>
</body>

</html>