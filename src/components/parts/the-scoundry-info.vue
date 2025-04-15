<template>
  <section>
    <div class="content">
      <h2>
        <span class="decoration">🙥&nbsp;</span
        ><strong>Scoundry — character keeper</strong>
        <span class="decoration">&nbsp;🙧</span>
      </h2>
      <div class="grid">
        <p>
          Try out my new Blades in the Dark character keeper!
          <a href="https://scoundry.com" class="link" target="_blank"
            >Scoundry.com</a
          >
          is 100% free with no paywalls.
        </p>
        <ul class="list">
          <li>Available in English, German, French, and Spanish.</li>
          <li>
            Walk new players through character creation one step at a time with
            bite-sized lore and choices from the books.
          </li>
          <li>
            Export your character to an image at the end, identical to a
            printable sheet you would otherwise fill out by hand.
          </li>
          <li><strong>New!</strong> Deep Cuts sheets available in English.</li>
          <li>
            Send or save your character as a URL so you can edit it later
            without rewriting everything.
          </li>
          <li>
            <a
              href="https://github.com/olinkirkland/scoundry"
              class="link"
              target="_blank"
              >Open source</a
            >
            and self-hostable.
          </li>
        </ul>
        <a href="https://scoundry.com" class="btn" target="_blank">
          <i class="fas fa-external-link-alt"></i>
          <span>Try it now!</span>
        </a>
      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped>
section {
  position: relative;
  display: flex;
  flex-direction: column;
  width: 100%;
  box-shadow: inset 0 3px 15px rgba(0, 0, 0, 0.1),
    inset 0 -3px 15px rgba(0, 0, 0, 0.1);

  &::after {
    content: '';
    width: 100%;
    position: absolute;
    bottom: 0;
    border-bottom: 0.4rem solid var(--primary-1);
  }

  > .content {
    display: flex;
    flex-direction: column;
    max-width: 96rem;
    margin: 0 auto;
    color: var(--dark-2);
    line-height: 1.6;

    > h2 {
      width: 100%;
      margin-top: 1.6rem;
      color: var(--dark-0);
      text-align: center;
      text-transform: uppercase;
      letter-spacing: 1px;
      font-weight: normal;
    }

    .grid {
      display: grid;
      padding: 2rem;
      padding-top: 0.4rem;
      gap: 1.6rem;
      grid-template-columns: repeat(1, 1fr);
    }

    button {
      margin: 0 auto;
      margin-bottom: 2rem;
    }
  }
}

.content {
  position: relative;
  overflow: hidden;
}

// When screen is less than 768px
@media (max-width: 768px) {
  section > .content {
    max-height: 96rem;
    > .grid {
      grid-template-columns: 1fr;
    }
  }

  .decoration {
    display: none;
  }
}
</style>
