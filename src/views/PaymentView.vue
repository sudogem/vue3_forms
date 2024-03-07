<template>
    <section class="columns">
      <Error :msg="error" />
      <div class="column">
        <form novalidate @submit.prevent="onSubmit">
          <fieldset>
            <legend><span class="number">1</span>Shipping</legend>
            <AddressView :model="shipping" />
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
            <AddressView :model="billing" :isDisabled="sameAsShipping" />
          </fieldset>
        </form>
      </div>
    </section>

    <section class="columns">
      <div class="column">
        <form novalidate @submit.prevent="onSubmit">
          <fieldset>
            <CreditCardView :model="card"></CreditCardView>
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
  import Error from '@/components/Error.vue';
  import AddressView from '@/views/AddressView.vue';
  import CreditCardView from '@/views/CreditCardView.vue';

  import { ref, watch } from 'vue';

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