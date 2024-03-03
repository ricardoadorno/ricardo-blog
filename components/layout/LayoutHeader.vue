<script setup lang="ts">
import { Moon, Sun } from 'lucide-vue-next';

const mode = ref('Moon');
</script>

<template>
  <NavigationMenu>
    <NavigationMenuList>
      <NuxtLink to="/blog" class="text-lg font-bold"> Blog </NuxtLink>
    </NavigationMenuList>
    <Toggle>
      <component :is="mode === 'Moon' ? Moon : Sun" />
    </Toggle>
  </NavigationMenu>
</template>
