<!DOCTYPE html>
<html lang="en">
<?php include 'action.php' ?>

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bulma@0.9.4/css/bulma.min.css">
    <link rel="stylesheet" href="style.css">
    <title>Trainer</title>
    <link rel="icon" type="images/x-icon" href="assets/logo.png" />
</head>

<body>
    <!-- ไิอลิงค์เชื่อมนี่เชื่อมไว้ก่อนเฉยๆ -->
    <?php include 'Header.php'; ?>
    <div id="train">
        <section class="hero is-fullheight">
            <div class="columns hero-body is-centered is-fullheight">

                <div class="container has-background-dark p-5" style="max-width: 60%;">
                    <div class='field has-addons has-addons-right'>
                        <form action="">
                            <select name="sort" id="sort" class="button" v-model='sel1'>
                                <option value=''>All</option>
                                <option>Male</option>
                                <option>Female</option>
                            </select>
                        </form>
                    </div>

                    <?php

                    echo '<div class="product" id="productall">';
                    echo '<div class="card product_items" v-for="(item, index) in sortdata">
                        <a type="button" @click="modal_do_train = !modal_do_train, show1=item.id"><img class="product-img" :src=item.pic alt=""></a>
                        <p class="title is-6 m-3 has-text-centered">{{item.name}}</p>
                        <p class="subtitle is-6 m-3 has-text-centered">{{item.nickname}}</p></div>
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
    </section>
    </div>

    <?php include 'Footer.html'; ?>
    <script src="https://cdn.jsdelivr.net/npm/vue@2/dist/vue.js"></script>
    <script src="./datatr.js"></script>
    <script>
        var app = new Vue({
            el: "#train",
            data: {
                sel1: '',
                datatr1: traindata,
                sortdata: traindata,
                modal_do_train: false,
                show_modal: false,
                show1: null,
                selecttrain: [
                    
                ]
                // sortdata: dataex1,
            },
            methods: {

            },
            computed: {
                type1() {
                    this.sortdata = []
                    return this.sortdata = this.datatr1.filter(x => x.gender.includes(this.sel1))
                }
            },
            watch: {
                sel1(newSel) {
                    // if(this.sel == "All product"){
                    this.type1
                    // }
                }
            }
        });
    </script>
</body>

</html>