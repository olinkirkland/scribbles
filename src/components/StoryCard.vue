<template>
  <div class="story-card">
    <div class="story-card__header">
      <img :src="`@/data/${props.story.slug}/${props.story.slug}.jpg`" />
      <h2>{{ props.story.title }}</h2>
    </div>
    <div class="story-card__content">
      <p>{{ props.story.description }}</p>
      <ul class="tags">
        <li v-for="(tag, index) in props.story.tags" :key="index">
          {{ tag.substring(tag.indexOf(':') + 1) }}
        </li>
      </ul>
    </div>
    <div class="story-card__footer">
      <button>
        <i class="fas fa-download"></i>
        <span>Download</span>
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
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
</script>

<style lang="scss" scoped>
.story-card {
  display: flex;
  height: 100%;
  flex-direction: column;
  border-radius: 5px;
  box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.1);
  overflow: hidden;
  border: 1px solid var(--surface-2);
  transition: all 0.2s;

  &:hover {
    box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.2);
  }
}

.story-card__header {
  width: 100%;
  padding: 1.6rem;
  border-bottom: 1px solid var(--surface-2);
  text-align: center;

  h2 {
    font-size: 2rem;
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
