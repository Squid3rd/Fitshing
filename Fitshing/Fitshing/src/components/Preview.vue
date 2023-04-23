<template>
  <section class="hero is-fullheight">
            <div class="columns hero-body is-centered is-fullheight">
                <div class="container mt-6 mb-6" style="max-width: 60%;"
                    >
                    <section class="is-large has-background-info">
                        <div class="columns">
                            <div class="column is-5">
                                <div class=" card is-relative p-2 " style="left:75px; top:75px; max-width:65%;">
                                    <img src="../assets/image/logo.png" alt="Placeholder image">
                                </div>
                                <div>
                                    <div class="card has-background-white is-relative another-pic1 p-1">
                                        <img src="../assets/image/logo.png" alt="Placeholder image">
                                    </div>
                                    <div class="card has-background-white is-relative another-pic2 p-1">
                                        <img src="../assets/image/logo.png" alt="Placeholder image">
                                    </div>
                                    <div class="card has-background-white is-relative another-pic3 p-1">
                                        <img src="../assets/image/logo.png" alt="Placeholder image">
                                    </div>
                                    <div class="card has-background-white is-relative another-pic4 p-1">
                                        <img src="../assets/image/logo.png" alt="Placeholder image">
                                    </div>
                                </div>
                            </div>
                            <div class="column is-6 is-relative" style="top:100px;">
                                <p class="title is-4 has-text-white">PPPP</p>
                                <p class="title is-4 has-text-white">฿ 555</p>
                                <input type="number" class="input" style="width: 20%;" value="1" min="1" max="5" Disabled>
                                <button class="button has-background-success"
                                    style="position: relative; top:70px; right:20.6%; width:40%; border:0; color:white;"
                                    >Add Order
                                </button>

                            </div>
                        </div>
                        <div class="cloumns is-relative" style="left:42.5%; bottom:150px;">
                            <div class="card column is-5 has-background-white">
                                <table id="order-table" style="width: 100%" class="table is-bordered has-background-grey">
                                    <tr>
                                        <th colspan="6" style="text-align: center" class='has-text-danger is-size-4'>
                                            Description</th>
                                    </tr>
                                    <tr>
                                        <td colspan="6">4444</td>
                                    </tr>
                                </table>
                            </div>
                        </div>
                    </section>
                </div>
            </div>
        </section>
</template>

<script>
export default {
    name: 'preview',
    data (){
        return{

        }
    }
}
</script>

<style>

</style>