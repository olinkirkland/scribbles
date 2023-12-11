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
    </div>
  </section>
</template>

<script setup lang="ts"></script>

<style lang="scss" scoped>
section {
  width: 100%;
  box-shadow: inset 0 3px 15px rgba(0, 0, 0, 0.1),
    inset 0 -3px 15px rgba(0, 0, 0, 0.1);
  > .content {
    display: flex;
    max-width: 96rem;
    padding: 2rem;
    margin: 0 auto;
    color: var(--text-0);
    line-height: 2.4rem;
  }
}
</style>
