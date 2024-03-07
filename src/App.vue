<script setup>
import Header from '@/components/Header.vue'
import Footer from '@/components/Footer.vue'
import PaymentView from '@/views/PaymentView.vue'
import Error from '@/components/Error.vue';
import state from '@/state';

// import { ref } from 'vue';

// const error = ref('');

function setError(msg) {
  state.error.value = msg;
}
</script>

<template>
  <div class="wrapper">
    <Header />
    <Error :msg="state.error" />
    <PaymentView @onError="setError"/>
    <Footer />
  </div>
</template>
