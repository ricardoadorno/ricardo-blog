<script setup lang="ts">
import { Primitive, type PrimitiveProps } from 'radix-vue';
import type { HTMLAttributes } from 'vue';
import { typographyVariants, type TypographyVariants } from '.';
import { cn } from '@/utils/cn';

interface Props extends PrimitiveProps {
  variant: TypographyVariants['variant'];
  as?: string;
  affects?: TypographyVariants['affects'];
  class?: HTMLAttributes['class'];
}

const props = withDefaults(defineProps<Props>(), {
  as: 'p',
});
</script>

<template>
  <Primitive
    :as="as"
    :as-child="asChild"
    :class="cn(typographyVariants({ variant, affects }), props.class)">
    <slot />
  </Primitive>
</template>
