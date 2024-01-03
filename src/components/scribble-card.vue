<template>
  <div class="scribble-card" @click="openScribbleModal">
    <div class="scribble-card__header">
      <img :src="imageUrl" />
      <div class="scribble-card__header__text">
        <h2>{{ props.scribble.title }}</h2>
        <p>{{ badgeTags }}</p>
      </div>
      <p class="new-badge" v-if="isNew">New!</p>
    </div>
    <div class="scribble-card__content">
      <p>{{ props.scribble.description }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ModalController } from '@/controllers/modal-controller';
import { BASE_URL } from '@/main';
import { computed } from 'vue';
import ScribbleModal from '@/components/modals/scribble-modal.vue';
import { Scribble } from './parts/the-collection.vue';

const props = defineProps({
  scribble: {
    type: Object as () => Scribble,
    required: true
  }
});

const badgeTags = computed(() => {
  const badgeTagKeys = ['type', 'game'];
  return props.scribble.tags
    .filter((tag) => tag.includes(':'))
    .filter((tag) => {
      const tagKey = tag.split(':')[0];
      return badgeTagKeys.includes(tagKey);
    })
    .map((tag) => tag.split(':')[1])
    .join(' ❖ ');
});

const isNew = computed(() => {
  const date = new Date(props.scribble.createdAt);
  const now = new Date();
  const diff = now.getTime() - date.getTime();
  const diffInDays = Math.floor(diff / (1000 * 3600 * 24));
  return diffInDays <= 3;
});

const imageUrl = `${BASE_URL}data/${props.scribble.slug}/${props.scribble.slug}.jpg`;

function openScribbleModal() {
  ModalController.open(ScribbleModal, { scribble: props.scribble });
}
</script>

<style lang="scss" scoped>
.scribble-card {
  display: flex;
  height: 100%;
  flex-direction: column;
  border-radius: 5px;
  box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.05);
  overflow: hidden;
  border: 1px solid var(--surface-2);
  transition: all 0.2s;
  background-color: var(--surface-0);
  cursor: pointer;

  &:hover {
    box-shadow: 0 0 15px 0 rgba(0, 0, 0, 0.15);
  }
}

.scribble-card__header {
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

  > .scribble-card__header__text {
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
    padding: 1.2rem;

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

.scribble-card__content {
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

.scribble-card__footer {
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
