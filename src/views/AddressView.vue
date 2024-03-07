<!-- eslint-disable vue/no-mutating-props -->
<template>
  <div>
    <!-- put the contents of <AddressView>this content</AddressView> inside the slot -->
    <slot></slot>
    <label for="fullName">Full Name</label>
    <input type="text" id="fullName" v-model="model.fullName" :disabled="isDisabled" />
    <label for="company">Company</label>
    <input type="text" id="company" v-model="model.company" :disabled="isDisabled" />
    <label for="address1">Address</label>
    <input type="text" id="address1" v-model="model.address.address1" :disabled="isDisabled" />
    <label for="state">State</label>
    <select id="state" v-model="model.address.state" :disabled="isDisabled">
      <option v-for="state in states" :value="state.abbreviation" :key="state.abbreviation">{{ formatState(state) }}</option>
    </select>
    <label for="postalCode">Postal Code</label>
    <input type="text" id="postalCode" v-model="postalCode" :disabled="isDisabled" />
  </div>
</template>

<script setup>
  import { computed } from 'vue';

  import states from "@/lookup/states";
  import { formatState } from "@/formatters";

  const props = defineProps({
    model: {
      type: Object,
      required: true
    },
    isDisabled: {
      type: Boolean,
      default: false
    }
  });

  const postalCode = computed({
    get: () => props.model.address.postalCode,
    set: (newVal) => {
      if (newVal && typeof newVal === 'string') {
        if (newVal.length <= 5 || newVal.indexOf('-') > -1) {
          // eslint-disable-next-line vue/no-mutating-props
          props.model.address.postalCode = newVal;
        } else {
          // eslint-disable-next-line vue/no-mutating-props
          props.model.address.postalCode = `${newVal.substring(0, 5)}-${newVal.substring(5)}`
        }
      } else {
        console.error("Invalid Postal Code");
      }
    }
  })

</script>