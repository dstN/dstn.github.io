<script setup>
const socials = [
  {
    platform: "github",
    icon: "fab fa-github",
    name: "Github",
    link: "https://github.com/dstN",
  },
  {
    platform: "twitter",
    icon: "fab fa-twitter",
    name: "Twitter",
    link: "https://twitter.com/dstNjs",
  },
];
</script>

<template>
  <div
    class="column is-full-mobile is-three-fifths-desktop is-one-third-widescreen"
  >
    <h2 class="subtitle is-size-4-mobile is-size-2-desktop is-1">
      Let's have a talk!
    </h2>
    <h3 class="title is-size-5-mobile is-size-3-desktop is-2">
      Contact me here:
    </h3>
  </div>
  <div class="column is-offset-one-quarter-widescreen is-full-mobile">
    <div class="socialWrap">
      <div class="field is-grouped is-grouped-multiline">
        <div
          class="control"
          v-for="item in socials"
          v-bind:key="item.name"
        >
          <a
            target="_blank"
            rel="noreferrer"
            :title="item.name"
            :href="item.link"
          >
            <div class="tags has-addons">
              <span
                class="tag is-primary is-size-3-mobile is-size-3-tablet is-size-5-desktop is-size-3-widescreen is-size-3-fullhd"
              >
                <span class="icon is-large">
                  <i :class="`fa-lg ${item.icon}`"></i>
                  <!-- Computed values from Main.vue -->
                </span>
              </span>
              <span
                class="tag is-dark is-size-3-mobile is-size-3-tablet is-size-5-desktop is-size-3-widescreen is-size-3-fullhd"
              >
                {{ item.name }}
              </span>
            </div>
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
@import "@node_modules/@fortawesome/fontawesome-free/css/fontawesome.min.css";
@import "@node_modules/@fortawesome/fontawesome-free/css/brands.css";
</style>
