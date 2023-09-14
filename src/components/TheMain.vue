<script setup>
import TheSlide from "./TheSlide.vue";
defineProps({
  toggle: Boolean,
});

const options = {
  licenseKey: "gplv3-license",
  css3: true,
  scrollBar: false,
  menu: "#nav",
  anchors: ["Home", "About", "Work", "Contact"],
  paddingTop: "5.25rem",
  easingcss3: "cubic-bezier(0.55, 0.085, 0.68, 0.53)",
  scrollingSpeed: "500",
  slidesNavigation: true,
  controlArrows: true,
  scrollOverflow: false,
  lazyLoading: true,
  credits: {
    enabled: false,
  },
};
</script>

<template>
  <div
    class="fullpage-wrapper"
    :class="toggle ? 'blurred' : ''"
  >
    <full-page
      ref="fullpage"
      :options="options"
      id="fullpage"
    >
      <TheSlide component="Home" />
      <TheSlide
        component="About"
        :isDesktop="true"
        :isFooter="false"
      />
      <TheSlide
        component="Work"
        :isDesktop="true"
        :isFooter="false"
        class="work"
      />
      <TheSlide
        component="Contact"
        :isDesktop="true"
        :isFooter="true"
      />
    </full-page>
  </div>
</template>

<style>
.fp-watermark {
  display: none;
}
.fp-table {
  flex-direction: row;
}
div.section .container,
div.section .columns {
  height: 100% !important;
}

div.section div.columns > div,
div.section .fp-slidesNav,
div.section .fp-controlArrow,
div.slide > div {
  transform: matrix3d(0.85, 0, 0, 0, 0, 0.85, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);
  opacity: 0;
  transition: opacity 0.5s cubic-bezier(0.5, 0, 0, 1) 0s,
    transform 0.5s cubic-bezier(0.5, 0, 0, 1) 0s;
}

div.section.active.fp-completely div.columns > div,
div.section.active.fp-completely .fp-slidesNav,
div.section.active.fp-completely .fp-controlArrow,
div.slide.active > div {
  transform: matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);
  opacity: 1;
}

div.section {
  position: relative;
  padding: 3rem 1.5rem;
}
</style>
