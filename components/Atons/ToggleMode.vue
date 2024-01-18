<script setup lang="ts">
defineEmits(['toggleTheme']);

const docRef = ref(document.querySelector('html'));
</script>

<template>
  <Button @click="toggleTheme">
    <Icon
      v-if="currentTheme === 'light'"
      name="uil:sun"
      color="yellow"
      size="24px" />
    <Icon v-else name="uil:moon" color="black" size="24px" />
  </Button>
</template>
