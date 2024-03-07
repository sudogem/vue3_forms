<template>
  <label for="cardNumber">Card Number</label>
  <input type="text" id="cardNumber" v-model="model.cardNumber" />
  <label for="cardHolder">Card Holder</label>
  <input type="text" id="cardHolder" v-model="model.cardHolder" />
  <label for="exMonth">Expiration Month</label>
  <select id="exMonth" v-model="model.exMonth">
    <option v-for="month in months" :value="month.number" :key="month.number">{{ month.name }}</option>
  </select>
  <label for="exYear">Expiration Year</label>
  <select id="exYear" v-model="model.exYear">
    <option v-for="year in years()" :value="year" :key="year">{{ year }}</option>
  </select>
  <label for="ccv">CCV</label>
  <input type="text" id="ccv" v-model="model.ccv" />
</template>

<script setup>
  import months from "@/lookup/months";
  import years from "@/lookup/years";

  defineProps({
    model: {
      type: Object,
      required: true
    }
  });
</script>