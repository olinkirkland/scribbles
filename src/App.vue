<template>
  <TheHero :setDrawer="setDrawer" />
  <Transition name="drawer-transition" mode="out-in">
    <component v-if="currentDrawer" :is="currentDrawer" />
  </Transition>
  <TheCollection />
  <TheFooter />
  <ModalContainer />
</template>

<script setup lang="ts">
import { computed, ref, Transition } from 'vue';
import ModalContainer from './components/modals/modal-container.vue';
import TheAboutMe from './components/parts/the-about-me.vue';
import TheAttribution from './components/parts/the-attribution.vue';
import TheScoundryInfo from './components/parts/the-scoundry-info.vue';
import TheCollection from './components/parts/the-collection.vue';
import TheFooter from './components/parts/the-footer.vue';
import TheHero from './components/parts/the-hero.vue';

const currentDrawerKey = ref<string | null>(null);
const currentDrawer = computed(() => {
  switch (currentDrawerKey.value) {
    case 'about-me':
      return TheAboutMe;
    case 'attribution':
      return TheAttribution;
    case 'scoundry':
      return TheScoundryInfo;
    default:
      return null;
  }
});

function setDrawer(drawerKey: string) {
  currentDrawerKey.value =
    drawerKey === currentDrawerKey.value ? null : drawerKey;
}
</script>

<style lang="scss" scoped>
// Transition
.drawer-transition-enter-active,
.drawer-transition-leave-active {
  transition: all 0.2s ease;
  top: 0;
  max-height: 100rem;
  opacity: 1;
}

.drawer-transition-enter-from,
.drawer-transition-leave-to {
  top: -2rem;
  max-height: 0;
  opacity: 0;
}
</style>
