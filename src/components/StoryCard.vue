<template>
  <div class="story-card">
    <div class="story-card__header">
      <img :src="imageUrl" />
      <div class="story-card__header__text">
        <h2>{{ props.story.title }}</h2>
        <p>{{ badgeTags }}</p>
      </div>
      <p class="new-badge" v-if="isNew">New</p>
    </div>
    <div class="story-card__content">
      <p>{{ props.story.description }}</p>
      <!-- <p class="last-modified">{{ lastModified }}</p> -->
      <!-- <ul class="tags">
        <li v-for="(tag, index) in storyTags" :key="index">{{ tag }}</li>
      </ul> -->

      <!-- <a :href="pdfUrl" target="_blank">
        <span>Open in new tab</span>
      </a> -->
    </div>
    <div class="story-card__footer">
      <a :href="pdfUrl" download @click="trackDownloadClick">
        <i class="fas fa-download"></i>
        <span>Download PDF ({{ size }})</span>
      </a>
    </div>
  </div>
</template>

<script setup lang="ts">
import { BASE_URL } from '@/main';
import mixpanel from 'mixpanel-browser';
import { computed } from 'vue';

type Story = {
  title: string;
  description: string;
  slug: string;
  tags: string[];
  lastModified: string;
  size: number;
};

function trackDownloadClick() {
  mixpanel.track('download', {
    slug: props.story.slug
  });
  return true;
}

const props = defineProps({
  story: {
    type: Object as () => Story,
    required: true
  }
});

const size = computed(() => {
  const sizeInKB = Math.floor(props.story.size / 1024);
  return sizeInKB + ' KB';
});

const badgeTags = computed(() => {
  const badgeTagKeys = ['type', 'game'];
  return props.story.tags
    .filter((tag) => tag.includes(':'))
    .filter((tag) => {
      const tagKey = tag.split(':')[0];
      return badgeTagKeys.includes(tagKey);
    })
    .map((tag) => tag.split(':')[1])
    .join(' ❖ ');
});

const isNew = computed(() => {
  const date = new Date(props.story.lastModified);
  const now = new Date();
  const diff = now.getTime() - date.getTime();
  const diffInDays = Math.floor(diff / (1000 * 3600 * 24));
  return diffInDays <= 3;
});

const imageUrl = `${BASE_URL}/data/${props.story.slug}/${props.story.slug}.jpg`;
const pdfUrl = `${BASE_URL}/data/${props.story.slug}/${props.story.slug}.pdf`;
</script>

<style lang="scss" scoped>
.story-card {
  display: flex;
  height: 100%;
  flex-direction: column;
  border-radius: 5px;
  box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.05);
  overflow: hidden;
  border: 1px solid var(--surface-2);
  transition: all 0.2s;
  background-color: var(--surface-0);

  &:hover {
    box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.1);
  }
}

.story-card__header {
  width: 100%;
  border-bottom: 1px solid var(--surface-2);
  text-align: center;
  overflow: hidden;
  position: relative;
  height: 16rem;

  > img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center;
    position: absolute;
    top: 0;
    left: 0;
  }

  // Darken
  &::after {
    content: '';
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    background-color: rgba(0, 0, 0, 0.4);
  }

  > .story-card__header__text {
    position: absolute;
    z-index: 1;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    gap: 0.4rem;
    align-items: center;
    justify-content: center;
    color: var(--text-inverted);
    padding: 0.8rem;

    h2 {
      font-size: 2.4rem;
      text-shadow: 0 0 10px rgba(0, 0, 0, 0.8);
    }

    p {
      font-size: 1.2rem;
      text-transform: capitalize;
    }
  }
}

p.new-badge {
  position: absolute;
  top: 0;
  right: 0;
  z-index: 1;
  padding: 0.4rem 0.8rem;
  text-transform: uppercase;
  border-bottom-left-radius: 5px;
  background-color: var(--surface-0);
}
.last-modified {
  font-size: 1.2rem;
  text-align: right;
}

.story-card__content {
  padding: 1.6rem;
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  overflow-y: auto;
  > *:not(:last-child) {
    margin-bottom: 1.2rem;
    line-height: 2.2rem;
  }
  > a {
    margin-left: auto;
  }
}

ul.tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.4rem;
  background-color: rgba(0, 0, 0, 0.05);
  padding: 1.2rem;

  > li {
    font-size: 1.4rem;
    line-height: 2rem;

    &:not(:last-child)::after {
      content: '❖';
      margin-left: 0.4rem;
    }
  }
}

.story-card__footer {
  display: flex;
  > a:first-child {
    flex: 1;
  }

  > a {
    min-width: 8rem;
    display: flex;
    justify-content: center;
    gap: 0.8rem;
    padding: 1.2rem;
    border-top: 1px solid var(--primary-2);
    background-color: var(--primary-1);
    color: var(--text-inverted);
    border-radius: 0;

    &:not(:last-child) {
      border-right: 1px solid var(--primary-2);
    }

    &:hover {
      height: 100%;
      background-color: var(--primary-0);
      border-top: 1px solid var(--primary-1);
      bottom: 0;
      &::after {
        content: none;
      }
    }
  }
}
</style>
