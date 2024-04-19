<template>
  <header class="hero">
    <h2>Olin's</h2>
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
  z-index: 1;
  background-color: var(--primary-1);
  height: 20rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 2rem;

  color: var(--light-0);

  h1 {
    font-family: var(--title-font-family);
    text-transform: uppercase;
    font-size: 6.4rem;
    letter-spacing: 0.8rem;
  }

  h2 {
    margin-bottom: -0.8rem;
  }

  p {
    font-size: 1.2rem;
    letter-spacing: 2px;
    text-transform: uppercase;
    text-align: center;
    color: var(--light-1);
  }
}

// When screen is less than 768px
@media (max-width: 768px) {
  header.hero {
    h1 {
      font-size: 4rem;
      letter-spacing: 0.6rem;
    }

    h2 {
      margin-bottom: -0.4rem;
    }
  }
}
</style>
