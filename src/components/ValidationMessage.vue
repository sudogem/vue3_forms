<template>
  <div>
    <ul class="field-error">
      <li v-for="e in model.$errors" :key="e">{{ e.$property }} - {{ e.$message }}</li>
    </ul>
  </div>
</template>

<script setup>
  defineProps({
    model: {
      type: Object,
      required: true
    }
  });
</script>