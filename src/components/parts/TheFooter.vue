<template>
  <footer>
    <div class="content">
      <p>
        Copyright will go here in the future. Download and use and share as much
        as you want :)
      </p>
    </div>
  </footer>
</template>

<script setup lang="ts"></script>

<style lang="scss" scoped>
footer {
  width: 100%;
  background-color: var(--surface-3);
  > .content {
    display: flex;
    max-width: 96rem;
    padding: 2rem;
    margin: 0 auto;
    line-height: 2.8rem;

    > p {
      width: 100%;
      text-align: center;
      color: var(--text-inverted);
    }
  }
}
</style>
