<template>
  <section>
    <div class="content" v-if="!isCalloutHidden">
      <p><strong>Before you continue!</strong></p>
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
      <button v-if="!isCalloutHidden" @click="hideCalloutAndSave">
        <span>OK, hide this message</span>
      </button>
    </div>
    <button
      class="show-attribution link"
      @click="isCalloutHidden = false"
      v-if="isCalloutHidden"
    >
      <span>Show attribution</span>
    </button>
  </section>
</template>

<script setup lang="ts">
import { ref } from 'vue';

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
    gap: 2rem;
    max-width: 96rem;
    padding: 2rem;
    margin: 0 auto;
    color: var(--text-0);
    line-height: 1.6;
  }
}

button.show-attribution {
  position: absolute;
  background: none;
  color: var(--text-inverted);
  top: -4rem;
  left: 50%;
  transform: translateX(-50%);
  cursor: pointer;

  &:hover {
    bottom: unset;
  }
}
</style>
