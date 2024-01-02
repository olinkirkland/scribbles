<template>
  <div v-if="!!currentModal" class="modal-container">
    <div
      class="modal-container__background"
      @click="onClickModalContainerBackground"
    ></div>
    <component :is="currentModal" v-bind="currentModalOptions" />
  </div>
</template>

<script setup lang="ts">
import { ModalController } from '@/controllers/modal-controller';
import { ComponentOptions, shallowRef } from 'vue';

const currentModal = shallowRef<ComponentOptions | null>(null);
const currentModalOptions = shallowRef<Record<string, unknown> | null>(null);

ModalController.getInstance().addEventListener(({ modal, options }) => {
  // Close
  if (!modal) {
    document.body.style.overflow = 'auto';
    return (currentModal.value = null);
  }

  // Open
  document.body.style.overflow = 'hidden';
  currentModal.value = { ...modal };
  currentModalOptions.value = { ...options };
});

function onClickModalContainerBackground() {
  ModalController.close();
}
</script>

<style scoped lang="scss">
.modal-container {
  width: 100%;
  height: 100vh;
  max-height: -webkit-fill-available;
  position: absolute;
  top: 0;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  z-index: 99;

  > .modal-container__background {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: -1;
  }
}
</style>
