<template>
  <div class="modal">
    <div
      class="modal__image"
      :style="{ backgroundImage: `url(${imageUrl})` }"
    ></div>
    <div class="modal__content">
      <div class="modal__content__header">
        <div>
          <h2>{{ scribble.title }}</h2>
          <div class="badge-tags">
            <p>
              <span class="new-badge" v-if="isNew">New!</span>
              {{ badgeTags }}
            </p>
          </div>
        </div>
        <button class="close" @click="ModalController.close()">
          <i class="fas fa-times"></i>
        </button>
      </div>
      <div class="modal__content__body">
        <p class="description">
          <span class="pages">{{ pageCount }}—</span>
          <span :v-html="scribble.description"></span>
        </p>
        <ul class="tag-list">
          <li v-for="tag in tagList" :key="tag" @click="closeAndSearch(tag)">
            <i class="fas fa-search"></i>
            <span>{{ tag }}</span>
          </li>
        </ul>
        <div class="controls">
          <a :href="pdfUrl" target="_blank" @click="trackDownloadOrView('view')"
            >View PDF</a
          >
          <a
            :href="pdfUrl"
            download
            target="_blank"
            @click="trackDownloadOrView('download')"
          >
            Download ({{ size }})
          </a>
        </div>
        <div class="dates">
          <!-- <p>{{ createdAt }}</p> -->
          <p>{{ lastModified }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { BASE_URL } from '@/main';
import { Scribble } from '../parts/the-collection.vue';
import { ModalController } from '@/controllers/modal-controller';
import { computed } from 'vue';
import mixpanel from 'mixpanel-browser';

const props = defineProps({
  scribble: {
    type: Object as () => Scribble,
    required: true
  }
});

const scribble = computed(() => props.scribble);

// const createdAt = computed(() => {
//   const date = new Date(scribble.value.createdAt);
//   return 'Created: ' + date.toLocaleDateString();
// });

const lastModified = computed(() => {
  const date = new Date(scribble.value.lastModified);
  return 'Last modified: ' + date.toLocaleDateString();
});
const tagList = computed(() => {
  return scribble.value.tags.filter((tag) => !tag.includes(':'));
});

const pageCount = computed(() => {
  return (
    scribble.value.pageCount +
    ' page' +
    (scribble.value.pageCount > 1 ? 's' : '')
  );
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

const size = computed(() => {
  const sizeInKB = Math.floor(props.scribble.size / 1024);
  return sizeInKB + ' KB';
});

function trackDownloadOrView(str: string) {
  mixpanel.track(str, {
    slug: props.scribble.slug
  });
  return true;
}

function closeAndSearch(str: string) {
  ModalController.close();
  window.location.href = `/scribbles/?s=${str}`;
}

const imageUrl = `${BASE_URL}data/${props.scribble.slug}/${props.scribble.slug}.jpg`;
const pdfUrl = `${BASE_URL}data/${props.scribble.slug}/${props.scribble.slug}.pdf`;
</script>

<style lang="scss" scoped>
.modal {
  background-color: var(--surface-0);
  color: var(--text);
  border-radius: 5px;
  display: flex;
  overflow: hidden;
  align-items: flex-start;

  > .modal__image {
    width: 24rem;
    flex-shrink: 0;
    line-height: 0;
    height: 100%;
    background-size: cover;
    background-position: center;
  }

  > .modal__content {
    flex: 1;
    display: flex;
    flex-direction: column;

    > .modal__content__header {
      margin: 1.6rem;
      display: flex;
      justify-content: space-between;
      align-items: flex-start;

      h2 {
        font-size: 3.2rem;
      }

      .badge-tags > p {
        text-transform: capitalize;
      }
    }

    > .modal__content__body {
      margin: 0 1.6rem 1.6rem 1.6rem;

      .dates {
        display: flex;
        gap: 2rem;
        * {
          font-size: 1.2rem;
        }
      }

      .pages {
        font-weight: bold;
        text-transform: uppercase;
      }

      .controls {
        display: flex;
        gap: 0.4rem;
      }

      ul.tag-list {
        display: flex;
        flex-wrap: wrap;
        gap: 0.4rem;
        margin-bottom: 2rem;

        > li {
          display: flex;
          align-items: center;

          width: fit-content;
          text-transform: capitalize;
          background-color: var(--text);
          color: var(--text-inverted);
          border-radius: 99px;
          padding: 0.4rem 1rem;

          cursor: pointer;

          span {
            font-size: 1.2rem;
            text-transform: uppercase;
          }

          i {
            font-size: 1rem;
            // Hidden by default
            opacity: 0;
            width: 0;
            transition: all 0.2s ease-in-out;
            margin-right: 0;
          }

          &:hover {
            > i {
              opacity: 1;
              width: 1.2rem;
              margin-right: 0.4rem;
            }
          }
        }
      }

      > *:not(:last-child) {
        margin-bottom: 0.8rem;
      }
    }
  }
}

// Media query for phones
@media (max-width: 768px) {
  .modal {
    flex-direction: column;
    align-items: center;

    > .modal__content {
      height: 100%;
      .modal__content__header > button.close {
        position: absolute;
        color: var(--text-inverted);
        top: 0;
        right: 0;
        margin: 3.2rem;
        background: none;

        &:hover {
          background: none;
          box-shadow: none;
        }

        i {
          font-size: 2.4rem;
        }
      }

      .modal__content__body {
        display: flex;
        flex-direction: column;
        height: 100%;

        .controls {
          flex: 1;
          display: flex;
          align-items: flex-end;

          // Move the buttons to the bottom
          order: 3;
          margin-bottom: 0;

          a {
            width: 100%;
            text-align: center;
          }
        }
        .dates {
          flex-direction: column;
          gap: 0;
          justify-content: flex-end;
        }
      }
    }
    > .modal__image {
      width: 100%;
      height: 40%;
    }
  }
}

.new-badge {
  font-weight: bold;
  color: var(--primary-0);
}
</style>
