<template>
  <header class="hero books-stripe">
    <h1>Olin's Scribbles</h1>
    <p>
      A&nbsp;collection&nbsp;of&nbsp;adventures
      and&nbsp;one&#x2011;shots&nbsp;for&nbsp;tabletop&nbsp;games
    </p>
    <div class="row button-shelf">
      <button @click="setDrawer('about-me')">
        <span>About</span>
      </button>
      <button @click="setDrawer('attribution')">
        <span>Attribution</span>
      </button>
      <button @click="props.setDrawer('scoundry')">
        <span>Scoundry</span>
      </button>
    </div>
  </header>
</template>

<script setup lang="ts">
import { defineProps } from 'vue';
const props = defineProps<{
  setDrawer: (drawerKey: string) => void;
}>();
</script>

<style lang="scss" scoped>
header.hero {
  position: relative;
  z-index: 1;
  background-color: var(--primary-1);
  height: 20rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 1.2rem;

  color: var(--light-0);

  h1 {
    font-family: var(--title-font-family);
    font-size: 4.8rem;
    letter-spacing: 0.1rem;
    margin-bottom: 0.2rem;
    text-transform: uppercase;
  }

  p {
    font-size: 1.2rem;
    letter-spacing: 2px;
    text-transform: uppercase;
    text-align: center;
    color: var(--light-1);
  }
}

.button-shelf {
  margin-top: 0.8rem;
  gap: 0.4rem;
  padding: 0.4rem;
  border-radius: 5px;
  background-color: rgba(255, 255, 255, 0.05);
  box-shadow: var(--shadow-light);
}

// When screen is less than 768px
@media (max-width: 768px) {
  header.hero {
    height: 16rem;

    h1 {
      font-size: 2.8rem;
    }
  }
}
</style>
