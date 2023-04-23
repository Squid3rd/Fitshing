<script setup>
import CardProductVue from "../components/CardProduct.vue";
import CardTrainer from "../components/CardTrainer.vue";
</script>

<template>
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

  <h1
    class="has-text-danger-dark has-background-info-light is-size-2 has-text-centered has-text-weight-bold"
  >
    Recommended
  </h1>
  <div class="bor1 scrollXLeft">
    <CardProductVue />
  </div>
  <h1
    class="has-text-danger-dark has-background-info-light is-size-2 has-text-centered has-text-weight-bold"
  >
    Product
  </h1>
  <div class="bor3 scrollXLeft">
    <CardTrainer />
  </div>
  <h1
    class="has-text-danger-dark has-background-info-light is-size-2 has-text-centered has-text-weight-bold"
  >
    Trainer
  </h1>
  <div class="bor4 scrollXLeft">
    <CardTrainer />
  </div>
  
</template>
