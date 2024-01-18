<script setup lang="ts">
import MyText from './Atons/MyText';

interface HeadingProps {
  badge?: string;
  heading: string;
  subheading?: string;
}

defineProps<HeadingProps>();
</script>

<template>
  <div class="text-center my-16">
    <Badge class="mb-4 text-base" v-if="badge">{{ badge }}</Badge>

    <MyText variant="h2" class="mb-5">
      {{ heading }}
    </MyText>

    <MyText class="mb-5" v-if="subheading">
      {{ subheading }}
    </MyText>
  </div>
</template>
