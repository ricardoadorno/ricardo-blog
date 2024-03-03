<script lang="ts" setup>
import { useRoute } from 'vue-router';

const { slug } = useRoute().params;
</script>

<template>
  <article class="bg-white rounded-2xl">
    <ContentDoc :path="`/posts/${slug}`" v-slot="{ doc }">
      <!-- Header  -->
      <header>
        <div class="text-center p-5">
          <h1 class="text-4xl font-bold lg:w-2/3 mx-auto">{{ doc.title }}</h1>
          <p class="text-gray-500 text-sm mt-2">{{ doc.date }}</p>
        </div>
        <img
          v-if="doc.thumbnail"
          :src="doc.thumbnail"
          :alt="doc.title"
          class="w-full" />
      </header>
      <!-- ./ Header  -->

      <!-- Content -->
      <div class="mt-4 content p-5">
        <!-- Content  -->
        <ContentRenderer :value="doc" />
        <!-- ./ Content  -->
      </div>
      <!-- ./ Content  -->
    </ContentDoc>
  </article>
</template>
