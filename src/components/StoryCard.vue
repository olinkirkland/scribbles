<template>
  <div class="story-card">
    <div class="story-card__header">
      <img :src="`/scribbles/${props.story.slug}/${props.story.slug}.jpg`" />
      <h2>{{ props.story.title }}</h2>
      <ul>
        <li v-for="(tag, index) in badgeTags" :key="index">{{ tag }}</li>
      </ul>
    </div>
    <div class="story-card__content">
      <p>{{ props.story.description }}</p>
      <ul class="tags">
        <li v-for="(tag, index) in storyTags" :key="index">{{ tag }}</li>
      </ul>
    </div>
    <div class="story-card__footer">
      <button>
        <i class="fas fa-download"></i>
        <span>Download PDF</span>
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';

type Story = {
  title: string;
  description: string;
  slug: string;
  tags: string[];
};

const props = defineProps({
  story: {
    type: Object as () => Story,
    required: true
  }
});

const storyTags = computed(() => {
  return props.story.tags.filter((tag) => !tag.includes(':'));
});

const badgeTags = computed(() => {
  return props.story.tags
    .filter((tag) => tag.includes(':'))
    .map((tag) => tag.substring(tag.indexOf(':') + 1));
});
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
  height: 10rem;

  > img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center;
    position: absolute;
    top: 0;
    left: 0;
  }

  h2 {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 1.6rem;
    font-size: 2rem;
    color: var(--text-inverted);
    position: absolute;
  }

  ul {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    display: flex;

    > li {
    }
  }
}

.story-card__content {
  padding: 1.6rem;
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  overflow-y: auto;
  > p {
    margin-bottom: 1.2rem;
    line-height: 2.2rem;
  }
}

ul.tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.4rem;
  border: 1px dashed var(--surface-2);
  padding: 1.2rem;

  > li {
    font-size: 1.4rem;
    line-height: 2rem;

    &::before {
      content: '❖';
      margin-right: 0.4rem;
    }
  }
}

.story-card__footer {
  display: flex;
  > button {
    width: 100%;
    display: flex;
    justify-content: center;
    gap: 0.8rem;
    padding: 1.2rem;
    border-top: 1px solid var(--primary-2);
    background-color: var(--primary-1);
    color: var(--text-inverted);
    cursor: pointer;

    &:not(:last-child) {
      border-right: 1px solid var(--surface-2);
    }

    &:hover {
      background-color: var(--primary-2);
    }
  }
}
</style>
