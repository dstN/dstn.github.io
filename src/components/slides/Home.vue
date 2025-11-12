<script setup></script>

<template>
  <div class="column is-8">
    <h1 class="title">Hey! I'm Dustin.</h1>
    <h2 class="subtitle">
      Front End Developer from Hamburg, Germany. I build things.
    </h2>
  </div>
  <div
    class="column is-one-third-desktop is-full-mobile is-three-fifths-tablet"
  >
    <figure class="image is-1by1">
      <picture>
        <source
          srcset="/dustin_tramm.webp"
          type="image/webp"
        />
        <source
          srcset="/dustin_tramm.png"
          type="image/png"
        />
        <img
          alt="Picture from Dustin Tramm, Front End Developer from Hamburg, Germany."
          class="is-rounded"
          src="/dustin_tramm.png"
          width="364"
          height="364"
        />
      </picture>
    </figure>
  </div>
</template>

<style lang="scss" scoped>
figure {
  padding-top: 100% !important;
  background-color: transparent;
  overflow: visible;
  position: relative;
  border-radius: 50%;

  &::before {
    content: "";
    position: absolute;
    top: -2px;
    left: -2px;
    right: -2px;
    bottom: -2px;
    border-radius: 50%;
    background: linear-gradient(
      -45deg,
      var(--main-secondary-lighter),
      var(--main-secondary-light),
      var(--main-secondary)
    );
    background-size: 500% 500%;
    opacity: 0.75;
    animation: gradient 4s ease-in-out infinite;
    transition: ease-in-out 0.2s;
    z-index: 0;
    pointer-events: none;
  }

  &::after {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    border-radius: 50%;
    background-color: #000;
    z-index: 1;
  }

  &:hover::before {
    opacity: 1;
  }

  picture {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    border-radius: 50%;
    overflow: hidden;
    z-index: 2;
  }

  img {
    position: absolute !important;
    top: 50%;
    left: 50%;
    transform: translate(-1%, 5%);
    object-fit: cover;
    min-width: 100%;
    min-height: 100%;
    width: 110%;
    height: 110%;
    filter: grayscale(25%);
    transition: filter 0.2s ease-in-out;
  }

  &:hover img,
  &:focus-within img {
    filter: none;
  }
}

@keyframes gradient {
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
}
</style>
