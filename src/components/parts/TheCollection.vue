<template>
  <section>
    <div class="collection-container">
      <ul>
        <li v-for="(item, index) in collection" :key="index">
          <StoryCard :story="item" />
        </li>
      </ul>
    </div>
  </section>
</template>

<script setup lang="ts">
import collection from '@/data/collection.json';
import StoryCard from '../StoryCard.vue';
</script>

<style lang="scss" scoped>
section {
  flex: 1;
  max-width: 96rem;
  margin: 0 auto;
  padding: 2rem;

  > .collection-container {
    width: 100%;
    padding: 1rem;

    > ul {
      width: 100%;
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(30rem, 1fr));
      grid-gap: 2rem;
    }
  }
}
</style>
