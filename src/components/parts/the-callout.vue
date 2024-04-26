<template>
  <section>
    <div class="content" :class="{ hide: isCalloutHidden }">
      <h2>
        <span class="decoration">🙥&nbsp;</span><strong>Attribution</strong>
        <span class="decoration">&nbsp;🙧</span>
      </h2>
      <div class="grid">
        <p>
          These works are based on
          <a class="link" href="http://www.bladesinthedark.com" target="_blank"
            >Blades in the Dark</a
          >
          — a product of One Seven Design, developed and authored by John
          Harper, and licensed for my use under the Creative Commons Attribution
          3.0
          <a
            href="http://creativecommons.org/licenses/by/3.0"
            class="link"
            target="_blank"
            >license</a
          >.
        </p>
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
      <button @click="hideCalloutAndSave" class="hide-attribution">
        <span>OK, hide this message</span>
      </button>
    </div>
    <button
      class="show-attribution link"
      @click="isCalloutHidden = false"
      :class="{ 'zero-opacity': !isCalloutHidden }"
    >
      <span>Attribution</span>
    </button>
  </section>
</template>

<script setup lang="ts">
import { BASE_URL } from '@/main';
import mixpanel from 'mixpanel-browser';
import { ref } from 'vue';

const templateUrl = `${BASE_URL}data/scenario-template.docx`;

function trackTemplateDownloadClick() {
  mixpanel.track('download', {
    slug: 'template'
  });
  return true;
}

const isCalloutHidden = ref(localStorage.getItem('hide-callout') || false);

function hideCalloutAndSave() {
  isCalloutHidden.value = true;
  localStorage.setItem('hide-callout', 'true');
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

  > .content {
    display: flex;
    flex-direction: column;
    max-width: 96rem;
    margin: 0 auto;
    color: var(--dark-2);
    line-height: 1.6;

    > h2 {
      width: 100%;
      margin-top: 1.2rem;
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
      gap: 1.6rem;
      grid-template-columns: repeat(2, 1fr);
    }

    button {
      margin: 0 auto;
      margin-bottom: 2rem;
    }
  }
}

.content {
  transition: max-height 0.4s ease-out;
  overflow: hidden;
  max-height: 64rem;
  &.hide {
    max-height: 0;
  }
}

button.show-attribution {
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

// When screen is less than 768px
@media (max-width: 768px) {
  section > .content > button.hide-attribution {
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
