<template>
    <div class="task-container columns is-multiline px-6 py-6 is-rounded">
       <div class="column is-3 px-5 is-rounded" v-for="item in dataex " >
           <div class="nonebackbutton">
            <figure class="image is-256x256">
                    <img src="../assets/image/logo.png" class="is-rounded">
                   </figure>
           </div>
       </div>
   </div>
</template>
  
  <!-- <script src="../assets/data/dataexdum.js"></script> -->
  <!-- <script src="../assets/data/datatr.js"></script> -->
  
  <script>
// import data1 from "../assets/data/dataexdum.js"
export default {
  name: "cardtrainer",
  data() {
    return {
      dataex: [
        {
          name: "Peter1",
        },
        {
          name: "Peter2",
        },
        {
          name: "Peter3",
        },
        {
          name: "Peter3",
        },
        {
          name: "Peter3",
        },
        {
          name: "Peter3",
        },
      ],
      // datatr: traindata
    };
  },
};
</script>
  
  <style>
</style>