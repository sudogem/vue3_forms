<!-- eslint-disable vue/no-mutating-props -->
<template>
  <div>
    <!-- put the contents of <AddressView>this content</AddressView> inside the slot -->
    <slot></slot>
    <!-- <pre>length={{ addressModel.$errors.length }}</pre> -->
    <!-- To display all addressModel errors use this -->
    <!-- <div class="error" v-if="model.$errors.length > 0">
      <ul>
        <li v-for="e in addressModel.$errors" :key="e">{{ e.$property }} - {{ e.$message }}</li>
      </ul>
    </div> -->
    <label for="fullName">Full Name</label>
    <input type="text" id="fullName" v-model="model.fullName.$model" :disabled="isDisabled" />
    <ValidationMessage :model="model.fullName"></ValidationMessage>

    <label for="company">Company</label>
    <input type="text" id="company" v-model="model.company.$model" :disabled="isDisabled" />
    <ValidationMessage :model="model.company"></ValidationMessage>

    <label for="address1">Address</label>
    <input type="text" id="address1" v-model="model.address.address1.$model" :disabled="isDisabled" />
    <ValidationMessage :model="model.address.address1"></ValidationMessage>

    <label for="state">State</label>
    <select id="state" v-model="model.address.state.$model" :disabled="isDisabled">
      <option v-for="state in states" :value="state.abbreviation" :key="state.abbreviation">{{ formatState(state) }}</option>
    </select>
    <ValidationMessage :model="model.address.state"></ValidationMessage>

    <label for="postalCode">Postal Code</label>
    <input type="text" id="postalCode" v-model="model.address.postalCode.$model" :disabled="isDisabled" />
    <ValidationMessage :model="model.address.postalCode"></ValidationMessage>

  </div>
</template>

<script setup>
  import { watch } from 'vue';

  import states from "@/lookup/states";
  import { formatState } from "@/formatters";

  import ValidationMessage from '@/components/ValidationMessage.vue';

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

  // const postalCode = computed({
  //   get: () => props.model.address.postalCode,
  //   set: (newVal) => {
  //     if (newVal && typeof newVal === 'string') {
  //       if (newVal.length <= 5 || newVal.indexOf('-') > -1) {
  //         // eslint-disable-next-line vue/no-mutating-props
  //         props.model.address.postalCode = newVal;
  //       } else {
  //         // eslint-disable-next-line vue/no-mutating-props
  //         props.model.address.postalCode = `${newVal.substring(0, 5)}-${newVal.substring(5)}`
  //       }
  //     } else {
  //       console.error("Invalid Postal Code");
  //     }
  //   }
  // })

  watch(
    () => props.model.address.postalCode,
    (newVal) => {
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
  );

</script>