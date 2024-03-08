<!-- eslint-disable vue/no-mutating-props -->
<template>
  <!-- To display all addressModel errors use this -->
  <!-- <div class="error" v-if="model.$errors.length > 0">
    <ul>
      <li v-for="e in model.$errors" :key="e">{{ e.$property }} - {{ e.$message }}</li>
    </ul>
  </div> -->
  <label for="cardNumber">Card Number</label>
  <input type="text" id="cardNumber" v-model="model.cardNumber.$model" />
  <span class="sample-data">e.g. 5555555555554444</span>
  <ValidationMessage :model="model.cardNumber"></ValidationMessage>

  <label for="cardHolder">Card Holder</label>
  <input type="text" id="cardHolder" v-model="model.cardHolder.$model" />
  <ValidationMessage :model="model.cardHolder"></ValidationMessage>

  <label for="exMonth">Expiration Month</label>
  <select id="exMonth" v-model="model.exMonth.$model">
    <option v-for="month in months" :value="month.number" :key="month.number">{{ month.name }}</option>
  </select>
  <ValidationMessage :model="model.exMonth"></ValidationMessage>

  <label for="exYear">Expiration Year</label>
  <select id="exYear" v-model="model.exYear.$model">
    <option v-for="year in years()" :value="year" :key="year">{{ year }}</option>
  </select>
  <ValidationMessage :model="model.exYear"></ValidationMessage>

  <label for="cvv">CVV</label>
  <input type="text" id="cvv" v-model="model.cvv.$model" />
  <ValidationMessage :model="model.cvv"></ValidationMessage>

</template>

<script setup>
  import months from "@/lookup/months";
  import years from "@/lookup/years";
  import ValidationMessage from '@/components/ValidationMessage.vue';

  defineProps({
    model: {
      type: Object,
      required: true
    }
  });

</script>