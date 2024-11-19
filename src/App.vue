<template>
  <TheHero
    :onClickToggleAttribution="toggleAttribution"
    :onClickToggleAboutMe="toggleAboutMe"
  />
  <TheAttribution
    :hide="isAttributionHidden"
    :onClickClose="toggleAttribution"
  />
  <TheAboutMe :hide="isAboutMeHidden" :onClickClose="toggleAboutMe" />
  <TheCollection />
  <TheFooter />
  <ModalContainer />
</template>

<script setup lang="ts">
import ModalContainer from './components/modals/modal-container.vue';
import TheAttribution from './components/parts/the-attribution.vue';
import TheAboutMe from './components/parts/the-about-me.vue';
import TheCollection from './components/parts/the-collection.vue';
import TheFooter from './components/parts/the-footer.vue';
import TheHero from './components/parts/the-hero.vue';

import { ref } from 'vue';
const isAttributionHidden = ref(true);
const isAboutMeHidden = ref(true);

function toggleAttribution() {
  isAboutMeHidden.value = true;
  isAttributionHidden.value = !isAttributionHidden.value;
}

function toggleAboutMe() {
  isAttributionHidden.value = true;
  isAboutMeHidden.value = !isAboutMeHidden.value;
}
</script>
