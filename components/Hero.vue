<script setup lang="ts">
import MyText from './Atons/MyText';
</script>

<template>
  <div
    class="flex flex-wrap items-center justify-center min-h-screen py-2 gap-5">
    <div class="flex flex-col justify-center w-1/3 gap-7">
      <MyText variant="h1">
        FullStack Dev always ready to learn and ship code
      </MyText>

      <MyText>
        Passionate developer, looking for new challenges and opportunities to
        learn and improve my skills.
      </MyText>
      <div class="flex gap-x-4">
        <Button>
          <MyText>My Projects</MyText>
        </Button>
        <Button class="text-primary" variant="outline">
          <MyText>Get in touch</MyText>
        </Button>
      </div>
    </div>
    <div>
      <img src="https://placehold.it/500x500" alt="profile" />
    </div>
  </div>
</template>
