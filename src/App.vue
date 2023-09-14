<script setup>
import { ref } from "vue";
import TheMain from "./components/TheMain.vue";
import TheHeader from "./components/TheHeader.vue";

const navToggle = ref(false);

function toggleNav(preset = undefined) {
  if (preset === false) {
    navToggle.value = false;
  } else {
    navToggle.value = navToggle.value ? false : true;
  }
}
</script>

<template>
  <TheHeader
    @toggle-nav="toggleNav"
    :toggle="navToggle"
  />
  <TheMain :toggle="navToggle" />
</template>

<style lang="scss">
:root {
  /* Theme Colorset */
  --main-primary: #1f2d3b;
  --main-primary-light: #31475c;
  --main-primary-dark: #0d141a;
  --main-secondary: #ff5722;
  --main-secondary-light: #ff8a50;
  --main-secondary-lighter: #ffac83;
  --main-secondary-dark: #c41c00;
  --light-text: #fff;
  --dark-text: #000;
}

html {
  font-size: 16px !important;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  padding-top: 0rem !important;
}

.fullpage-wrapper {
  transition: all 0.5s ease 0.25s;
  &.blurred {
    filter: blur(4px);
    transition: all 0.5s ease;
  }
}
.overlay {
  position: fixed;
  z-index: 0;
  background-color: var(--main-primary-dark);
  top: 0;
  left: 0;
  visibility: hidden;
  opacity: 0;
  height: 100vh;
  width: 100vw;
  transition: all 0.5s ease 0.05s;
  &.active {
    left: 0;
    z-index: 5;
    visibility: visible;
    opacity: 0.5;
    transition: all 0.5s ease;
  }
}

@media (max-width: 1023px) {
  .columns.is-vcentered {
    display: flex;
    flex-direction: column;
    flex-wrap: nowrap;
    justify-content: center;
    align-content: flex-start;
    align-items: center;
  }

  .columns.is-vcentered .column {
    flex: 0 1 auto;
  }

  .columns.is-vcentered.is-desktop .column {
    width: 100%;
  }
}
</style>
