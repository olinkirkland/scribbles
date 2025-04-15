<template>
  <section>
    <div class="content">
      <h2>
        <span class="decoration">🙥&nbsp;</span><strong>About Me</strong>
        <span class="decoration">&nbsp;🙧</span>
      </h2>
      <div class="grid">
        <div>
          <div class="row social-buttons">
            <!-- Olin personal page -->
            <a
              class="link social"
              href="https://olinkirk.land/"
              target="_blank"
            >
              <span>www.olinkirk.land</span>
            </a>
            <!-- Scribbles on itch.io -->
            <a
              class="link social"
              href="https://olinkirkland.itch.io/"
              target="_blank"
            >
              <span>Olin on itch.io</span>
            </a>
            <!-- Olin on Bluesky -->
            <a
              class="link social"
              href="https://bsky.app/profile/olinkirkland.bsky.social"
              target="_blank"
            >
              <span>Olin on Bluesky</span>
            </a>
            <!-- Bluesky -->
            <a
              class="link social"
              href="https://bsky.app/profile/olins-scribbles.bsky.social"
              target="_blank"
            >
              <span>Scribbles on Bluesky</span>
            </a>
            <!-- Instagram -->
            <a
              class="link social"
              href="https://www.instagram.com/olins.scribbles/"
              target="_blank"
            >
              <span>Scribbles on Instagram</span>
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
    </div>
  </section>
</template>

<script setup lang="ts">
import { BASE_URL } from '@/main';
import mixpanel from 'mixpanel-browser';

const templateUrl = `${BASE_URL}data/scenario-template.docx`;
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
}

.social-buttons {
  gap: 0.4rem;
  padding: 1.2rem;
  width: fit-content;
  margin: 0 auto;
  background: var(--light-1);
  border-radius: 5px;
  display: flex;
  flex-wrap: wrap;

  > a {
    padding: 0.2rem 0.8rem;
    background: none;
    cursor: pointer;
    color: var(--dark-0);
  }
}

// When screen is less than 768px
@media (max-width: 768px) {
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
