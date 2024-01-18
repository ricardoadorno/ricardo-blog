<script setup lang="ts">
interface BlogCardProps {
  title: string;
  description: string;
  image: string;
  category: string;
  link: string;
}

defineProps<BlogCardProps>();
</script>

<template>
  <div class="flex items-center justify-center">
    <div
      class="relative flex w-full max-w-[48rem] flex-row rounded-xl bg-white bg-clip-border text-black shadow-md">
      <div
        class="relative m-0 w-2/5 shrink-0 overflow-hidden rounded-xl rounded-r-none bg-white bg-clip-border text-black">
        <img :src="image" alt="image" class="h-full w-full object-cover" />
      </div>
      <div class="p-6">
        <h6
          class="mb-4 block font-sans text-base font-semibold uppercase leading-relaxed tracking-normal text-primary antialiased">
          {{ category }}
        </h6>
        <h4
          class="mb-2 block font-sans text-2xl font-semibold leading-snug tracking-normal text-blue-gray-900 antialiased">
          {{ title }}
        </h4>
        <p
          class="mb-8 block font-sans text-base font-normal leading-relaxed text-gray-700 antialiased">
          {{ description }}
        </p>
        <a class="inline-block" href="#">
          <Button variant="link" class="text-primary">
            <NuxtLink :to="link">
              Learn More <Icon name="uil:arrow-right" class="w-4 h-4" />
            </NuxtLink>
          </Button>
        </a>
      </div>
    </div>
  </div>
</template>
