<template>
  <section>
    <div class="collection-container">
      <!-- Search -->
      <div class="search">
        <input type="text" placeholder="Search" v-model="searchInput" />
        <button
          class="clear"
          @click="search('')"
          :class="{ hidden: !searchInput }"
        >
          <i class="fas fa-times"></i>
        </button>
      </div>
      <h2 v-if="searchInput">
        {{ filteredItems.length }} scribbles match "{{ searchInput }}"
      </h2>
      <h2 v-else>{{ filteredItems.length }} scribbles</h2>

      <!-- Tags -->
      <ul class="tags">
        <li v-for="(tag, index) in tags" :key="index">
          <button @click="search(tag)">{{ tag }}</button>
        </li>
      </ul>

      <!-- Collection -->
      <ul class="collection">
        <li v-for="(item, index) in filteredItems" :key="index">
          <StoryCard :story="item" />
        </li>
      </ul>
    </div>
  </section>
</template>

<script setup lang="ts">
import collection from '@/data/collection.json';
import { computed, ref } from 'vue';
import StoryCard from '../StoryCard.vue';

const initialSearch = new URLSearchParams(window.location.search).get('s');
const searchInput = ref(initialSearch ? decodeURIComponent(initialSearch) : '');

function search(str: string) {
  searchInput.value = str;
}

const reversedCollection = collection.scribbles.reverse().sort((a, b) => {
  return (
    new Date(b.lastModified).getTime() - new Date(a.lastModified).getTime()
  );
});

const tags = computed(() => {
  return reversedCollection
    .reduce((acc: any, curr: any) => {
      // Unique tags
      const uniqueTags = curr.tags.filter((tag: string) => {
        return !acc.includes(tag);
      });
      return [...acc, ...uniqueTags];
    }, [])
    .sort()
    .filter((tag: string) => {
      if (tag === 'game:blades in the dark') return false;
      return tag.includes(':');
    });
});

const filteredItems = computed(() => {
  if (!searchInput.value) return reversedCollection;
  const searchStr = searchInput.value.toLowerCase();
  return reversedCollection.filter((item: any) => {
    return (
      item.title.toLowerCase().includes(searchStr) ||
      item.slug.toLowerCase().includes(searchStr) ||
      item.tags.some((tag: string) => {
        return tag.toLowerCase().includes(searchStr);
      })
    );
  });
});
</script>

<style lang="scss" scoped>
section {
  flex: 1;
  width: 100%;
  max-width: 96rem;
  margin: 0 auto;
  padding: 2rem;

  > .collection-container {
    display: flex;
    flex-direction: column;
    width: 100%;

    > .search {
      position: relative;
      width: 100%;
      margin-bottom: 1.2rem;

      > input {
        width: 100%;
      }
      > button.clear {
        position: absolute;
        right: 1.2rem;
        top: 50%;
        border-radius: 50%;
        height: 2rem;
        width: 2rem;
        transform: translateY(-50%);
        cursor: pointer;
        background-color: var(--surface-2);

        display: flex;
        justify-content: center;
        align-items: center;

        > i {
          font-size: 1.2rem;
        }

        &:hover {
          background-color: var(--surface-3);
          &::before {
            content: none;
          }
        }
      }
    }

    > h2 {
      text-align: center;
      font-size: 2rem;
      margin-bottom: 1.2rem;
    }

    > ul.tags {
      margin-bottom: 1.2rem;
      display: flex;
      justify-content: center;
      flex-wrap: wrap;
      gap: 0.4rem;
    }

    > ul.collection {
      width: 100%;
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      grid-gap: 2rem;
    }
  }
}

@media screen and (max-width: 960px) {
  section > .collection-container > ul.collection {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media screen and (max-width: 576px) {
  section > .collection-container {
    > ul.tags {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      > li > button {
        width: 100%;
      }
    }
    > ul.collection {
      grid-template-columns: repeat(1, 1fr);
    }
  }
}
</style>
