<!-- eslint-disable vue/no-mutating-props -->
<template>
  <div>
    <!-- put the contents of <AddressView>this content</AddressView> inside the slot -->
    <slot></slot>
    <!-- <pre>length={{ addressModel.$errors.length }}</pre> -->
    <!-- To display all addressModel errors use this -->
    <!-- <div class="error" v-if="addressModel.$errors.length > 0">
      <ul>
        <li v-for="e in addressModel.$errors" :key="e">{{ e.$property }} - {{ e.$message }}</li>
      </ul>
    </div> -->
    <label for="fullName">Full Name</label>
    <input type="text" id="fullName" v-model="addressModel.fullName.$model" :disabled="isDisabled" />
    <ValidationMessage :model="addressModel.fullName"></ValidationMessage>

    <label for="company">Company</label>
    <input type="text" id="company" v-model="addressModel.company.$model" :disabled="isDisabled" />
    <ValidationMessage :model="addressModel.company"></ValidationMessage>

    <label for="address1">Address</label>
    <input type="text" id="address1" v-model="addressModel.address.address1.$model" :disabled="isDisabled" />
    <ValidationMessage :model="addressModel.address.address1"></ValidationMessage>

    <label for="state">State</label>
    <select id="state" v-model="addressModel.address.state.$model" :disabled="isDisabled">
      <option v-for="state in states" :value="state.abbreviation" :key="state.abbreviation">{{ formatState(state) }}</option>
    </select>
    <ValidationMessage :model="addressModel.address.state"></ValidationMessage>

    <label for="postalCode">Postal Code</label>
    <input type="text" id="postalCode" v-model="addressModel.address.postalCode.$model" :disabled="isDisabled" />
    <ValidationMessage :model="addressModel.address.postalCode"></ValidationMessage>

  </div>
</template>

<script setup>
  import { watch, computed } from 'vue';

  import states from "@/lookup/states";
  import { formatState } from "@/formatters";

  import { useVuelidate } from '@vuelidate/core';
  import { required, minLength } from '@vuelidate/validators';

  import ValidationMessage from '@/components/ValidationMessage.vue';

  const addressRules = {
    fullName: { required },
    company: { required },
    address: {
      address1: { required, minLength: minLength(10) },
      state: { required },
      postalCode: { required },
    },
  };

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

  const addressModel = useVuelidate(addressRules, props.model);

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