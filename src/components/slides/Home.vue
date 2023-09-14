<script setup>
import profilePic from "@assets/dustin_tramm_resized.png";
const heading = "Hey! I'm Dustin.";
const subHeading = "Front End Developer from Hamburg, Germany. I build things.";
const altText =
  "Picture from Dustin Tramm, Front End Developer from Hamburg, Germany.";
</script>

<template>
  <div class="column is-8">
    <h1 class="title">{{ heading }}</h1>
    <!-- Call data given from attributes -->
    <h2 class="subtitle">{{ subHeading }}</h2>
    <!-- Call data given from attributes -->
  </div>
  <div
    class="column is-one-third-desktop is-full-mobile is-three-fifths-tablet"
  >
    <figure class="image is-1by1">
      <picture>
        <source
          srcset="../../assets/dustin_tramm_resized.webp"
          media="(max-width: 1023px)"
        />
        <img
          :alt="altText"
          class="is-rounded"
          :src="profilePic"
          loading="lazy"
        />
      </picture>
    </figure>
  </div>
</template>

<style lang="scss" scoped>
figure {
  padding-top: 0 !important;
  img {
    position: static !important;
  }
}
img {
  background: linear-gradient(
    -45deg,
    var(--main-secondary-lighter),
    var(--main-secondary-light),
    var(--main-secondary)
  );
  background-size: 500% 500%;
  opacity: 0.75;
  animation: gradient 4s ease-in-out infinite;
  transition: ease-in-out 0.3s;
  border: 2px solid transparent;
  filter: grayscale(25%);
  max-width: 440px !important;
  max-height: 440px !important;
  text-align: center;
  margin: auto;
}
img:hover,
img:focus {
  opacity: 1;
  filter: none;
}
@keyframes gradient {
  0% {
    background-position: 0% 50%;
    border-color: transparent;
  }
  50% {
    background-position: 100% 50%;
    border-color: var(--main-primary);
  }
  100% {
    background-position: 0% 50%;
    border-color: transparent;
  }
}
</style>
