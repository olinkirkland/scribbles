<template>
  <div class="modal">
    <code class="language-javascript">
      {{ JSON.stringify(props.scribble, null, 2) }}
    </code>
  </div>
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

<style type="scss" scoped>
.modal {
  background-color: var(--surface-0);
  color: var(--text);
  padding: 1.6rem;
}
</style>
