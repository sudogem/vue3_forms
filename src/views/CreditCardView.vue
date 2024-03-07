<template>
  <div class="error" v-if="creditCardModel.$errors.length > 0">
    <ul>
      <li v-for="e in creditCardModel.$errors" :key="e">{{ e.$property }} - {{ e.$message }}</li>
    </ul>
  </div>
  <label for="cardNumber">Card Number</label>
  <input type="text" id="cardNumber" v-model="creditCardModel.cardNumber.$model" />
  <label for="cardHolder">Card Holder</label>
  <input type="text" id="cardHolder" v-model="creditCardModel.cardHolder.$model" />
  <label for="exMonth">Expiration Month</label>
  <select id="exMonth" v-model="creditCardModel.exMonth.$model">
    <option v-for="month in months" :value="month.number" :key="month.number">{{ month.name }}</option>
  </select>
  <label for="exYear">Expiration Year</label>
  <select id="exYear" v-model="creditCardModel.exYear.$model">
    <option v-for="year in years()" :value="year" :key="year">{{ year }}</option>
  </select>
  <label for="cvv">CVV</label>
  <input type="text" id="cvv" v-model="creditCardModel.cvv.$model" />
</template>

<script setup>
  import months from "@/lookup/months";
  import years from "@/lookup/years";

  const props = defineProps({
    model: {
      type: Object,
      required: true
    }
  });

  import { useVuelidate } from '@vuelidate/core';
  import { required, numeric, minLength, maxLength } from '@vuelidate/validators';

  const creditCardRules = {
    cardNumber: { required, minLength: minLength(16), maxLength: maxLength(16) },
    cardHolder: { required, minLength: minLength(5) },
    exMonth: { required },
    exYear: { required },
    cvv: { required, numeric, minLength: minLength(3), maxLength: maxLength(3) },
  };

  const creditCardModel = useVuelidate(creditCardRules, props.model);

</script>