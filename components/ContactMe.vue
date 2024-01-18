<script setup lang="ts">
const socialsLinks = [
  {
    name: '+55 75 99200-0000',
    link: '',
    icon: 'uil:whatsapp',
  },
  {
    name: 'Github',
    link: '',
    icon: 'uil:github',
  },
  {
    name: 'Linkedin',
    link: '',
    icon: 'uil:linkedin',
  },
];
</script>

<template>
  <div class="container flex justify-center items-center gap-8 pb-16">
    <form
      class="flex flex-col justify-center items-center px-8 py-16 mb-4 gap-4 border-4 rounded-2xl border-muted-foreground w-1/3">
      <h4 class="text-center text-3xl font-bold text-primary mb-4">
        Send me a message
      </h4>
      <Input type="text" placeholder="Name" />
      <Input type="email" placeholder="Email" />
      <Textarea placeholder="Message" class="resize-none" />
      <Button class="py-2 px-6 text-lg" type="submit"> Send </Button>
    </form>

    <div class="flex flex-col px-8 pt-6 pb-8 mb-4 self-start w-1/3">
      <h4 class="text-3xl font-bold text-primary mb-4">Chat with me</h4>
      <p class="text-gray-600 text-base mb-4 leading-relaxed tracking-wide">
        I am always open to talk about technology and new ideas. Feel free to
        contact me.
      </p>
      <div
        v-for="social in socialsLinks"
        :key="social.name"
        class="text-xl my-2 text-start hover:text-primary hover:cursor-pointer">
        <NuxtLink :to="social.link">
          <Icon
            :name="social.icon"
            class="mr-2 flex place-items-center t"
            size="24px" />
          {{ social.name }}
        </NuxtLink>
      </div>
    </div>
  </div>
</template>
