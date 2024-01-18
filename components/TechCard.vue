<script setup lang="ts">
interface TechCardProps {
  name: string;
  description: string;
  icon: string;
}

defineProps<TechCardProps>();
</script>

<template>
  <div class="flex flex-col items-center justify-center w-80 h-96 p-4 m-4">
    <div
      class="flex items-center justify-center w-24 h-24 mx-auto rounded-full bg-primary">
      <Icon class="text-white" :name="icon" size="66%" />
    </div>
    <h4
      class="mt-4 text-xl font-semibold text-center text-gray-800 dark:text-gray-100">
      {{ name }}
    </h4>
    <h5
      class="mt-2 text-base font-bold text-center text-gray-600 dark:text-gray-400">
      {{ description }}
    </h5>
  </div>
</template>
