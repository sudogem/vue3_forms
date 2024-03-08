<template>
    <section class="columns">
      <div class="column">
        <form novalidate @submit.prevent="onSubmit">
          <fieldset>
            <AddressView :model="model.shipping">
              <legend><span class="number">1</span>Shipping</legend>
            </AddressView>
          </fieldset>
        </form>
      </div>
	
      <div class="column">
        <form novalidate @submit.prevent="onSubmit">
          <fieldset>
            <AddressView :model="model.billing" :isDisabled="state.billing.sameAsShipping">
              <legend><span class="number">2</span>Billing</legend>
              <label for="sameshipping">
                <input type="checkbox" v-model="state.billing.sameAsShipping" />
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
            <CreditCardView :model="model.creditCard"></CreditCardView>
            <button class="button" type="submit">Next</button>
          </fieldset>
        </form>
      </div>
      <div class="column"></div>
    </section>

    <pre>{{ state }}</pre>

</template>

<script setup>
  import AddressView from '@/views/AddressView.vue';
  import CreditCardView from '@/views/CreditCardView.vue';
  import state from '@/state';

  import { watch } from 'vue';

  const model = state.toModel();

  // const error = ref('');
  // const emits = defineEmits(["onError"]);

  // const shipping = ref({
  //   fullName: "John Wick"
  // });
  // const billing = ref({});
  // const card = ref({});

  // const sameAsShipping = ref(false);

  async function onSubmit() {
    if (!await model.value.$validate()) return;
    // error.value = "Can't save yet no API";
    state.error = "Can't save yet no API";
  }

  watch(
    () => state.billing.sameAsShipping,
    () => {
      if (state.billing.sameAsShipping) {
        state.billing.fullName = state.shipping.fullName;
        state.billing.company = state.shipping.company;
        state.billing.address.address1 = state.shipping.address.address1;
        state.billing.address.state = state.shipping.address.state;
        state.billing.address.postalCode = state.shipping.address.postalCode;
      }
    }
  );

</script>