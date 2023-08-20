<script setup>
import { defineProps, defineAsyncComponent } from "vue";
import TheFooter from "./TheFooter.vue";
const props = defineProps(["component", "isDesktop", "isFooter"]);

const Slide = defineAsyncComponent(() =>
  import(`./slides/${props.component}.vue`)
);

const Footer = props.isFooter
  ? defineAsyncComponent(() => import("./TheFooter.vue"))
  : "";
</script>

<template>
  <div class="section">
    <div class="container">
      <div
        :class="isDesktop ? 'is-desktop' : ''"
        class="columns is-vcentered"
      >
        <Slide />
      </div>
      <Footer />
    </div>
  </div>
</template>

<style scoped></style>
