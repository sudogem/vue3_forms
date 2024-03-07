<template>
    <section class="columns">
      <Error :msg="error" />
      <div class="column">
        <form novalidate @submit.prevent="onSubmit">
          <fieldset>
            <legend><span class="number">1</span>Shipping</legend>
            <label for="fullName">Full Name</label>
            <input type="text" id="fullName" v-model="shipping.fullName" />
            <label for="company">Company</label>
            <input type="text" id="company" v-model="shipping.company" />
            <label for="address1">Address</label>
            <input type="text" id="address1" v-model="shipping.address1" />
            <label for="state">State</label>
            <select id="state" v-model="shipping.state">
              <option v-for="state in states" :value="state.abbreviation" :key="state.abbreviation">{{ formatState(state) }}</option>
            </select>
            <label for="postalCode">Postal Code</label>
            <input type="text" id="postalCode" v-model="shippingZip" />
          </fieldset>
        </form>
      </div>
	
      <div class="column">
        <form novalidate @submit.prevent="onSubmit">
          <fieldset>
            <legend><span class="number">2</span>Billing</legend>
            <label for="sameshipping">
              <input type="checkbox" v-model="sameAsShipping" />
              Same as Shipping?
            </label>

            <label for="fullName">Full Name</label>
            <input type="text" id="fullName" v-model="billing.fullName" :disabled="sameAsShipping" />
            <label for="company">Company</label>
            <input type="text" id="company" v-model="billing.company" :disabled="sameAsShipping" />
            <label for="address1">Address</label>
            <input type="text" id="address1" v-model="billing.address1" :disabled="sameAsShipping" />
            <label for="state">State</label>
            <select id="state" v-model="billing.state" :disabled="sameAsShipping">
              <option v-for="state in states" :value="state.abbreviation" :key="state.abbreviation">{{ formatState(state) }}</option>
            </select>
            <label for="postalCode">Postal Code</label>
            <input type="text" id="postalCode" v-model="billingZip" :disabled="sameAsShipping"/>
          </fieldset>
        </form>
      </div>
    </section>

    <section class="columns">
      <div class="column">
        <form novalidate @submit.prevent="onSubmit">
          <fieldset>
            <legend><span class="number">3</span>Credit Card</legend>
            <label for="cardNumber">Card Number</label>
            <input type="text" id="cardNumber" v-model="card.cardNumber" />
            <label for="cardHolder">Card Holder</label>
            <input type="text" id="cardHolder" v-model="card.cardHolder" />
            <label for="exMonth">Expiration Month</label>
            <select id="exMonth" v-model="card.exMonth">
              <option v-for="month in months" :value="month.number" :key="month.number">{{ month.name }}</option>
            </select>
            <label for="exYear">Expiration Year</label>
            <select id="exYear" v-model="card.exYear">
              <option v-for="year in years()" :value="year" :key="year">{{ year }}</option>
            </select>
            <label for="ccv">CCV</label>
            <input type="text" id="ccv" v-model="card.ccv" />

            <button type="submit">Next</button>
          </fieldset>
        </form>
      </div>
      <div class="column"></div>
    </section>

    <pre>{{ shipping }}</pre>
    <pre>{{ billing }}</pre>
    <pre>{{ card }}</pre>

</template>

<script setup>
  import Error from '@/components/Error.vue'

  import states from "@/lookup/states";
  import months from "@/lookup/months";
  import years from "@/lookup/years";

  import { formatState } from "@/formatters";

  import { ref, computed, watch } from 'vue';

  const error = ref('');

  const shipping = ref({
    fullName: "John Wick"
  });
  const billing = ref({});
  const card = ref({});

  const sameAsShipping = ref(false);

  function onSubmit() {
    error.value = "Can't save yet no API";
  }

  const shippingZip = computed({
    get: () => shipping.value.postalCode,
    set: (newVal) => {
      if (newVal && typeof newVal === 'string') {
        if (newVal.length <= 5 || newVal.indexOf('-') > -1) {
          shipping.value.postalCode = newVal;
        } else {
          shipping.value.postalCode = `${newVal.substring(0, 5)}-${newVal.substring(5)}`
        }
      } else {
        console.error("Invalid Postal Code");
      }
    }
  })

  const billingZip = computed({
    get: () => billing.value.postalCode,
    set: (newVal) => {
      if (newVal && typeof newVal === 'string') {
        if (newVal.length <= 5 || newVal.indexOf('-') > -1) {
          billing.value.postalCode = newVal;
        } else {
          billing.value.postalCode = `${newVal.substring(0, 5)}-${newVal.substring(5)}`
        }
      } else {
        console.error("Invalid Postal Code");
      }
    }
  })
      
  watch(
    () => sameAsShipping.value,
    () => {
      if (sameAsShipping.value) {
        billing.value.fullName = shipping.value.fullName;
        billing.value.company = shipping.value.company;
        billing.value.address1 = shipping.value.address1;
        billing.value.state = shipping.value.state;
        billing.value.postalCode = shipping.value.postalCode;
      }
    }
  );

</script>