<template>
    <section class="hero is-fullheight">
      <div class="columns hero-body is-centered is-fullheight">
        <div class="container has-background-black p-5" style="max-width: 60%">
          <div class="field has-addons has-addons-right">
            <form action="">
              <select name="sort1" id="sort1" class="button" v-model="sel">
                <option value="">All product</option>
                <option>Abdomen</option>
                <option>Hand</option>
                <option>Leg</option>
              </select>
            </form>
          </div>

          <div class="product">
            <div class="card product_items" v-for="(item, index) in sortdata">
              <a href="cart.php"
                ><img class="product-img"  alt=""
              /></a>
              <p class="title is-6 m-3">{{ item.name }}</p>
              <p class="subtitle is-6 m-3">฿ {{ item.price }}</p>
              <div class="buttons is-right">
                <a 
                  ><button class="button is-success">ดูรายละเอียด</button></a
                >
                <span>
                  <button class="button is-warning">
                    Add in Cart
                  </button>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
</template>

<script>
export default {
    name: 'productall',
    data(){
      return{
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