<template>
  <footer>
    <div class="content">
      <p>
        Images are from
        <a class="link" href="https://unsplash.com/" target="_blank"
          >Unsplash.com</a
        >
        and belong to their respective owners on the site.
      </p>
      <p>
        These works are based on
        <a class="link" href="http://www.bladesinthedark.com" target="_blank"
          >Blades in the Dark</a
        >
        — a product of One Seven Design, developed and authored by John Harper,
        and licensed for our use under the Creative Commons Attribution 3.0
        <a
          href="http://creativecommons.org/licenses/by/3.0"
          class="link"
          target="_blank"
          >license</a
        >
      </p>
      <p>
        Site by
        <a class="link" href="https://olinkirk.land/" target="_blank"
          >Olin Kirkland</a
        >
        ❖ Download the template and write your own:
        <a
          class="link"
          :href="templateUrl"
          download
          @click="trackTemplateDownloadClick"
          >scenario-template.docx</a
        >
      </p>
    </div>
  </footer>
</template>

<script setup lang="ts">
import { BASE_URL } from '@/main';
import mixpanel from 'mixpanel-browser';

const templateUrl = `${BASE_URL}data/_work-in-progress/scenario-template.docx`;

function trackTemplateDownloadClick() {
  mixpanel.track('download', {
    slug: 'template'
  });
  return true;
}
</script>

<style lang="scss" scoped>
footer {
  width: 100%;
  border-top: 1px solid var(--surface-2);
  background-color: rgba(0, 0, 0, 0.05);
  > .content {
    display: flex;
    flex-direction: column;
    gap: 0.8rem;
    max-width: 96rem;
    padding: 2rem;
    margin: 0 auto;

    > p {
      width: 100%;
    }
  }
}
</style>
