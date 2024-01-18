<script setup lang="ts">
const TECH_CARDS = [
  {
    name: 'HTMl & CSS',
    description:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.',
    icon: 'fa-brands:html5',
  },
  {
    name: 'JavaScript',
    description:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.',
    icon: 'fa-brands:js',
  },
  {
    name: 'Vue.js',
    description:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.',
    icon: 'fa-brands:vuejs',
  },

  {
    name: 'Bootstrap',
    description:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.',
    icon: 'fa-brands:bootstrap',
  },
  {
    name: 'Git',
    description:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.',
    icon: 'fa-brands:git',
  },
  {
    name: 'GitHub',
    description:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.',
    icon: 'fa-brands:github',
  },
];
</script>

<template>
  <Hero />

  <Headings
    badge="Looking Forward to Learning Even More!"
    heading="My Tech Stack"
    subheading="The most used and advanced technologies from the industry." />

  <div class="container flex flex-wrap justify-center">
    <TechCard
      v-for="tech in TECH_CARDS"
      :key="tech.name"
      :name="tech.name"
      :description="tech.description"
      :icon="tech.icon" />
  </div>

  <Divider />

  <Headings
    heading="My Projects"
    subheading="A selection of my range of work. Application of the technologies I have learned." />

  <div class="container flex flex-col">
    <ProjectCard />
    <ProjectCard />
  </div>

  <Divider />

  <Headings heading="About Me" />

  <AboutMe />

  <Divider />

  <Headings heading="Get in Touch" />

  <ContactMe />
</template>
