<template>
  <div class="scribble-card" @click="openScribbleModal">
    <div class="scribble-card__header">
      <img :src="imageUrl" />
      <div class="scribble-card__header__text">
        <h2>{{ props.scribble.title }}</h2>
        <p>{{ badgeTags }}</p>
      </div>
      <p class="new-badge" v-if="isNew">New</p>
    </div>
    <div class="scribble-card__content">
      <p>{{ props.scribble.description }}</p>
      <p class="tags">{{ nonBadgeTags.join(', ') }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import ScribbleModal from '@/components/modals/scribble-modal.vue';
import { ModalController } from '@/controllers/modal-controller';
import { BASE_URL } from '@/main';
import { computed } from 'vue';
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

const nonBadgeTags = computed(() => {
  return props.scribble.tags.filter((tag) => !tag.includes(':'));
});

const isNew = computed(() => {
  const date = new Date(props.scribble.createdAt);
  const now = new Date();
  const diff = now.getTime() - date.getTime();
  const diffInDays = Math.floor(diff / (1000 * 3600 * 24));
  return diffInDays <= 7;
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
  // border-radius: 5px;
  box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.05);
  overflow: hidden;
  border: 1px solid var(--light-2);
  transition: all 0.2s;
  cursor: pointer;

  &:hover {
    box-shadow: 0 0 15px 0 rgba(0, 0, 0, 0.15);
  }
}

.scribble-card__header {
  width: 100%;
  border-bottom: 1px solid var(--light-2);
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
    padding: 1.2rem;

    h2 {
      font-size: 2.4rem;
      text-shadow: 0 0 10px rgba(0, 0, 0, 0.8);
      color: var(--light-0);
    }

    p {
      font-size: 1.2rem;
      text-transform: capitalize;
      color: var(--light-0);
    }
  }
}

p.new-badge {
  position: absolute;
  z-index: 1;
  top: 0.8rem;
  right: -4rem;
  width: 12rem;
  transform: rotate(45deg);
  display: flex;
  align-items: flex-end;
  justify-content: center;
  padding: 0.4rem 0.8rem;
  font-size: 1.2rem;
  letter-spacing: 1px;
  text-transform: uppercase;
  font-weight: bold;
  background-color: var(--primary-0);
  color: var(--light-0);
}

.scribble-card__content {
  padding: 1.6rem;
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow-y: auto;

  > *:not(:last-child) {
    margin-bottom: 1.2rem;
    line-height: 2.2rem;
  }
  > a {
    margin-left: auto;
  }
}

p.tags {
  text-transform: capitalize;
  font-style: italic;
  color: var(--dark-0);
}
</style>
