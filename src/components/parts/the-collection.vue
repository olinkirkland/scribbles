<template>
  <section>
    <div class="collection-container">
      <p class="bundle">
        Want the whole collection?
        <a class="link" :href="archiveUrl" download @click="trackDownloadClick"
          >Download ZIP ({{ archiveSize }})</a
        >
      </p>

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
      <h2 class="search-results">
        {{ filteredItems.length }} results
        {{
          searchInput
            ? `match
        "${searchInput}"`
            : ''
        }}
      </h2>

      <!-- Tags -->
      <!-- <ul class="tags">
        <li v-for="(tag, index) in tags" :key="index">
          <button @click="search(tag)">{{ tag }}</button>
        </li>
      </ul> -->

      <!-- Collection -->
      <ul class="collection">
        <li v-for="item in filteredItems" :key="item.slug">
          <ScribbleCard :scribble="item" />
        </li>
      </ul>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ModalController } from '@/controllers/modal-controller';
import collection from '@/data/collection.json';
import { BASE_URL } from '@/main';
import mixpanel from 'mixpanel-browser';
import { computed, ref } from 'vue';
import ScribbleModal from '../modals/scribble-modal.vue';
import ScribbleCard from '../scribble-card.vue';

const archiveSize = (collection.archive.size / 1024 / 1024).toFixed(2) + ' MB';
const archiveUrl = `${BASE_URL}data/scribbles-collection.zip`;

export type Scribble = {
  title: string;
  description: string;
  slug: string;
  tags: string[];
  createdAt: string;
  lastModified: string;
  pageCount: number;
  size: number;
  downloads?: { name: string; path: string; size: number }[];
};
const searchInput = ref('');

// Direct link to a specific modal?
const directLink = new URLSearchParams(window.location.search).get('d');
if (directLink) {
  console.log('directLink', directLink);
  const slug = decodeURIComponent(directLink);
  const scribble = collection.scribbles.find((s) => s.slug === slug);
  if (scribble)
    requestAnimationFrame(() => {
      ModalController.open(ScribbleModal, { scribble });
    });
  else window.location.href = BASE_URL;
}

// Initial search?
const initialSearch = new URLSearchParams(window.location.search).get('s');
if (initialSearch) search(decodeURIComponent(initialSearch));

function search(str: string) {
  searchInput.value = str;
}

const reversedCollection = collection.scribbles.reverse().sort((a, b) => {
  return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
});

function trackDownloadClick() {
  mixpanel.track('download', {
    slug: 'scribbles-collection'
  });
  return true;
}

// const tags = computed(() => {
//   return reversedCollection
//     .reduce((acc: any, curr: any) => {
//       // Unique tags
//       const uniqueTags = curr.tags.filter((tag: string) => {
//         return !acc.includes(tag);
//       });
//       return [...acc, ...uniqueTags];
//     }, [])
//     .sort()
//     .filter((tag: string) => {
//       if (tag === 'game:blades in the dark') return false;
//       return tag.includes(':');
//     });
// });

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
      max-width: 40rem;
      margin: 0 auto;
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
        background-color: var(--light-2);
        padding: 0;

        display: flex;
        justify-content: center;
        align-items: center;

        > i {
          font-size: 1.2rem;
          margin-right: 0;
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
      font-size: 1.6rem;
      text-transform: uppercase;
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
      grid-gap: 0.8rem;
    }
  }
}

@media screen and (max-width: 960px) {
  section > .collection-container > ul.collection {
    grid-template-columns: repeat(2, 1fr);
  }
}

.bundle {
  text-align: center;
  line-height: 1.6;
  margin-bottom: 1.2rem;

  a {
    white-space: nowrap;
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
