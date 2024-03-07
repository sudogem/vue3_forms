<template>
    <section class="columns">
      <div class="column">
        <form novalidate @submit.prevent="onSubmit">
          <fieldset>
            <AddressView :model="shipping">
              <legend><span class="number">1</span>Shipping</legend>
            </AddressView>
          </fieldset>
        </form>
      </div>
	
      <div class="column">
        <form novalidate @submit.prevent="onSubmit">
          <fieldset>
            <AddressView :model="billing" :isDisabled="sameAsShipping">
              <legend><span class="number">2</span>Billing</legend>
              <label for="sameshipping">
                <input type="checkbox" v-model="sameAsShipping" />
                Same as Shipping?
              </label>
            </AddressView>
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
  import AddressView from '@/views/AddressView.vue';
  import CreditCardView from '@/views/CreditCardView.vue';

  import { ref, watch } from 'vue';

  // const error = ref('');
  const emits = defineEmits(["onError"]);

  const shipping = ref({
    fullName: "John Wick"
  });
  const billing = ref({});
  const card = ref({});

  const sameAsShipping = ref(false);

  function onSubmit() {
    // error.value = "Can't save yet no API";
    emits("onError", "Can't save yet no API");
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