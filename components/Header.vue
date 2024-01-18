<script setup lang="ts">
import MyText from './Atons/MyText';
import ToggleMode from './Atons/ToggleMode.vue';

const toggleTheme = () => {
  const html = document.querySelector('html');
  html!.classList.toggle('dark');
  localStorage.setItem(
    'theme',
    html!.classList.contains('dark') ? 'dark' : 'light'
  );
};

const NAV_MENU = [
  {
    name: 'Projects',
    href: '#',
  },
  {
    name: 'Tech',
    href: '#',
  },
  {
    name: 'About Me',
    href: '#',
  },
  {
    name: 'Contact Me',
    href: '#',
  },
  {
    name: 'Blog',
    href: '/blog',
  },
];
</script>

<template>
  <header class="bg-background p-5">
    <div class="container flex justify-between h-14 items-center">
      <MyText variant="h4">
        <NuxtLink to="/"> Ricardo Dev. </NuxtLink>
      </MyText>
      <div class="mr-4 hidden md:flex">
        <nav class="flex items-center space-x-6 text-sm font-medium">
          <NuxtLink
            v-for="item in NAV_MENU"
            :key="item.name"
            :href="item.href"
            class="text-primary text-xl link-animation relative"
            >{{ item.name }}</NuxtLink
          >
        </nav>
      </div>
      <div @click="toggleTheme" class="flex items-center gap-x-1">
        <ToggleMode />
      </div>
    </div>
  </header>
</template>

<style scoped>
.link-animation::before {
  content: '';
  position: absolute;
  bottom: -0.3rem;
  left: 50%;
  width: 0;
  height: 2px;
  background-color: hsl(var(--primary));
  transition: width 0.3s ease-out, left 0.3s ease-out;
}

.link-animation:hover:before {
  width: 100%;
  left: 0;
}
</style>
