<template>
    <div class="task-container columns is-multiline px-6 py-6">
       <div class="column is-3 px-3" v-for="item in dataex " >
           <div class="card color-background-purple-2" style="border-radius: 30px;">
               <div class="card-image ">
                   <figure class="image is-4by5">
                       <img src="../assets/image/logo.png" alt="Placeholder image">
                   </figure>
               </div>
               <div class="card-content">
                   <div class="media">
                       <div class="media-content">
                           <p class="is-size-6 has-text-centered">{{item.name}}</p>
                           <p class="text_img_center pt-5">
                       </p>
                       </div>
                   </div>
               </div>
           </div>
       </div>
   </div>
</template>

<!-- <script src="../assets/data/dataexdum.js"></script> -->
<!-- <script src="../assets/data/datatr.js"></script> -->

<script>
// import data1 from "../assets/data/dataexdum.js"
export default {
    name: 'cardproduct',
    data(){
        return{
            dataex: [
                {
                    name: 'Peter1'
                },
                {
                    name: 'Peter2'
                },
                {
                    name: 'Peter3'
                }
            ]
            // datatr: traindata
        }
    }
}
</script>

<style>

</style>