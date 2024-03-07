<template>
  <div v-if="msg" class="error">{{ msg }}</div>
</template>

<script setup>
  defineProps({
    msg: String,
  });
</script>