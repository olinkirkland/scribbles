<template>
  <section>
    <div class="content" :class="{ hide }">
      <h2>
        <span class="decoration">🙥&nbsp;</span><strong>About Me</strong>
        <span class="decoration">&nbsp;🙧</span>
      </h2>
      <div class="grid">
        <div>
          <div class="row social-buttons">
            <!-- Bluesky -->
            <a
              class="link social"
              href="https://bsky.app/profile/olins-scribbles.bsky.social"
              target="_blank"
            >
              <span>Bluesky</span>
            </a>
            <!-- Instagram -->
            <a
              class="link social"
              href="https://www.instagram.com/olins.scribbles/"
              target="_blank"
            >
              <i class="fab fa-instagram"></i>
              <span>Instagram</span>
            </a>
            <!-- Facebook -->
            <a
              class="link social"
              href="https://www.facebook.com/profile.php?id=61568981033804"
              target="_blank"
            >
              <i class="fab fa-facebook"></i>
              <span>Facebook</span>
            </a>
          </div>
        </div>

        <p>
          My TTRPG writing is free to download, edit, and share under the
          Creative Commons Attribution 4.0
          <a
            class="link"
            href="https://creativecommons.org/licenses/by/4.0/"
            target="_blank"
            rel="noopener noreferrer"
            >license</a
          >
          as long as you give me and the original work attribution. You can also
          download
          <a
            class="link"
            :href="templateUrl"
            download
            @click="trackTemplateDownloadClick"
            >scenario-template.docx</a
          >
          from the footer to use this layout for your own work.
        </p>
      </div>
      <!-- <button class="collapse" @click="onClickClose"></button> -->
    </div>
  </section>
</template>

<script setup lang="ts">
import { BASE_URL } from '@/main';
import mixpanel from 'mixpanel-browser';

const templateUrl = `${BASE_URL}data/scenario-template.docx`;
defineProps<{
  hide: boolean;
  onClickClose: () => void;
}>();

function trackTemplateDownloadClick() {
  mixpanel.track('download', {
    slug: 'template'
  });
  return true;
}
</script>

<style lang="scss" scoped>
section {
  position: relative;
  display: flex;
  flex-direction: column;
  width: 100%;
  box-shadow: inset 0 3px 15px rgba(0, 0, 0, 0.1),
    inset 0 -3px 15px rgba(0, 0, 0, 0.1);

  &::after {
    content: '';
    width: 100%;
    position: absolute;
    bottom: 0;
    border-bottom: 0.4rem solid var(--primary-1);
  }

  > .content {
    display: flex;
    flex-direction: column;
    max-width: 96rem;
    margin: 0 auto;
    color: var(--dark-2);
    line-height: 1.6;

    > h2 {
      width: 100%;
      margin-top: 1.6rem;
      color: var(--dark-0);
      text-align: center;
      text-transform: uppercase;
      letter-spacing: 1px;
      font-weight: normal;
    }

    .grid {
      display: grid;
      padding: 2rem;
      padding-top: 0.4rem;
      gap: 0.8rem;
      grid-template-columns: repeat(1, 1fr);
    }

    button {
      margin: 0 auto;
      margin-bottom: 2rem;
    }
  }
}

.content {
  position: relative;
  overflow: hidden;

  &.hide {
    max-height: 0;
  }

  button.collapse {
    position: absolute;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%) translateY(2.6rem) rotate(45deg);
    margin: 0;
    padding: 1rem;
    height: 3.2rem;
    width: 3.2rem;
    text-align: center;
    color: var(--light-0);
    background-color: var(--primary-1);
  }
}

button.show-about-me {
  position: absolute;
  z-index: 1;
  background: none;
  color: var(--light-1);
  top: -3.6rem;
  left: 50%;
  transform: translateX(-50%);
  cursor: pointer;
  transition: opacity 0.4s ease-out;

  &.zero-opacity {
    opacity: 0;
    pointer-events: none;
  }

  &:hover {
    bottom: unset;
  }
}

.social-buttons {
  gap: 0.4rem;
  width: fit-content;
  margin: 0 auto;
  background: var(--light-1);
  border-radius: 5px;

  > a {
    padding: 0.2rem 0.8rem;
    background: none;
    cursor: pointer;
    color: var(--dark-0);
  }
}

// When screen is less than 768px
@media (max-width: 768px) {
  section > .content > button.hide-about-me {
    width: calc(100% - 4rem);
    margin: 2rem;
    margin-top: 0;
  }

  section > .content {
    max-height: 96rem;
    > .grid {
      grid-template-columns: 1fr;
    }
  }

  .decoration {
    display: none;
  }
}
</style>
