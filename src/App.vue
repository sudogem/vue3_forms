<script setup>
import Header from './components/Header.vue'
import Footer from './components/Footer.vue'
import states from "@/lookup/states";
import { formatState } from "@/formatters";

import { ref } from 'vue';

const shipping = ref({});

function onSubmit() {
  alert("submit...")
}
</script>

<template>
  <div class="wrapper">
    <Header></Header>
    <section class="columns">
      <div class="column">
        <form novalidate @submit.prevent="onSubmit">
          <fieldset>
            <legend><span class="number">1</span>Enter Your Details</legend>
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
            <input type="text" id="postalCode" v-model="shipping.postalCode" />
            <button type="submit">Next</button>
          </fieldset>
        </form>
      </div>
	
      <div class="column">
        <pre>{{ shipping }}</pre>
        <!-- <h2>1st Content Area</h2>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Sequi ratione 
          architecto necessitatibus cum praesentium dolor totam voluptatibus recusandae?</p> -->
      </div>
    </section>

    <Footer />
  </div>
</template>
