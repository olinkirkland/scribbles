<template>
  <card-container class="modal">
    <template #content>
      <div>
        <code class="language-javascript">
          {{ props }}
        </code>
      </div>
    </template>
  </card-container>
</template>

<script setup lang="ts">
import { Scribble } from '../parts/the-collection.vue';

const props = defineProps({
  scribble: {
    type: Object as () => Scribble,
    required: true
  }
});
</script>

<style type="scss" scoped></style>
