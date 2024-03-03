<script setup lang="ts"></script>

<template>
  <h2>Blog Posts</h2>

  <ContentList part="/posts" v-slot="{ list }">
    <div v-for="(post, index) in list" :key="index">
      <h3>
        <NuxtLink :to="`/blog/${post.slug}`"> {{ post.title }} </NuxtLink>
      </h3>
      <p>{{ post.excerpt }}</p>
    </div>
  </ContentList>
</template>
