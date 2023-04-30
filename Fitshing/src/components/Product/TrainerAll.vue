<template>
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

<div class="product" id="productall">
<div class="card product_items" v-for="(item, index) in sortdata">
                        <a type="button" @click="modal_do_train = !modal_do_train, show1=item.id"><img class="product-img" :src=item.pic alt=""></a>
                        <p class="title is-6 m-3 has-text-centered">{{item.name}}</p>
                        <p class="subtitle is-6 m-3 has-text-centered">{{item.nickname}}</p></div>
                        </div>
                        


                    <div class="modal" v-bind:class="{'is-active':modal_do_train}">
                        <div class="modal-background" @click="modal_do_train = !modal_do_train"></div>
                        <div class="modal-card" style="max-width: 960px; width: 90%" v-for="(item, index) in datatr1">
                            <section class="modal-card-body" v-show="index == show1">
                                <img class="product-img" src='./assets/user.png' alt="">
                                <!-- <img src="./Table example.png" /> -->
                                <hr />
                                <table id="order-table" style="width: 100%" class="table is-bordered has-background-grey">
                                    <tr>
                                        <th colspan="6" style="text-align: center" class='has-text-danger is-size-4'>
                                            Profile</th>
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
                                        <th colspan="6" style="text-align: center" class='has-text-info is-size-4'>
                                            Certificate
                                        </th>
                                    </tr>
                                    <tr v-for='(initem, index) in item.info.certificate'>
                                        <td colspan="6">- {{initem}}</td>
                                    </tr>
                                    <tr>
                                        <th colspan="6" style="text-align: center" class='has-text-info is-size-4'>
                                            Special</th>
                                    </tr>
                                    <tr v-for='(initem, index) in item.info.special'>
                                        <td colspan="6">- {{initem}}</td>
                                    </tr>
                                </table>
                                <button :class="['button', 'is-success']" @click='addTrain(item)'
                                    v-show='already == true'>Add</button>
                                <button :class="['button', 'is-warning']" v-show='already == false'>Already have
                                    Trainer</button>
                                <button :class="['button', 'is-danger']" v-show='already == false'
                                    @click='delTrain(item)'>Cancel Trainer</button>
                            </section>
                        </div>


                    </div>
                </div>
            </div>
    </section>
    </div>
</template>

<script>
export default {
    name: 'productall',
    data(){
      return{
        sel1: '',
        sortdata: [
          {
            name: "Peter1",
            price: 500,
          },
          {
            name: "Peter2",
            price: 500,
          },
          {
            name: "Peter3",
            price: 500,
          },
          {
            name: "Peter4",
            price: 500,
          }
          
        ]
      }
    },
}
</script>

<style>

</style>