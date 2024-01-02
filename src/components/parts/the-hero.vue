<template>
  <header class="hero">
    <h1>Scribbles</h1>
    <p>
      A&nbsp;collection&nbsp;of&nbsp;adventures
      and&nbsp;one&#x2011;shots&nbsp;for&nbsp;tabletop&nbsp;games
    </p>
  </header>
</template>

<script setup lang="ts"></script>

<style lang="scss" scoped>
header.hero {
  background-color: var(--primary-1);
  height: 20rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 2rem;

  color: var(--text-inverted);

  h1 {
    font-size: 4rem;
    letter-spacing: 1px;
  }

  p {
    font-size: 1.2rem;
    letter-spacing: 2px;
    text-transform: uppercase;
    text-align: center;
  }
}
</style>
