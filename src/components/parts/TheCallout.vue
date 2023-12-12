<template>
  <section>
    <div class="content">
      <p>
        These works are based on
        <a href="http://www.bladesinthedark.com" target="_blank"
          >Blades in the Dark</a
        >
        — a product of One Seven Design, developed and authored by John Harper,
        and licensed for our use under the Creative Commons Attribution 3.0
        <a href="http://creativecommons.org/licenses/by/3.0" target="_blank"
          >license</a
        >.
      </p>
      <p>
        Want to download the whole collection in a single ZIP file?
        <a :href="archiveUrl" download>Download ZIP ({{ archiveSize }})</a>
      </p>
    </div>
  </section>
</template>

<script setup lang="ts">
import collection from '@/data/collection.json';

const archiveSize = (collection.archive.size / 1024 / 1024).toFixed(2) + ' MB';
const archiveUrl = './scribbles/data/scribbles-collection.zip';
</script>

<style lang="scss" scoped>
section {
  width: 100%;
  box-shadow: inset 0 3px 15px rgba(0, 0, 0, 0.1),
    inset 0 -3px 15px rgba(0, 0, 0, 0.1);
  > .content {
    display: flex;
    flex-direction: column;
    gap: 2rem;
    max-width: 96rem;
    padding: 2rem;
    margin: 0 auto;
    color: var(--text-0);
    line-height: 2.4rem;
  }
}
</style>
