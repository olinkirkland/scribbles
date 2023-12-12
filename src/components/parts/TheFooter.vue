<template>
  <footer>
    <div class="content">
      <p>
        Images are from
        <a href="https://unsplash.com/" target="_blank">Unsplash.com</a>
        and belong to their respective owners on the site.
      </p>
      <p>
        Site by <a href="https://olinkirk.land/" target="_blank">Olin Kirkland</a>
      </p>
    </div>
  </footer>
</template>

<script setup lang="ts"></script>

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
