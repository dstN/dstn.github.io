<script setup>
const props = defineProps(["reference"]);
</script>

<template>
  <div class="column is-full-mobile is-two-thirds">
    <figure class="image is-16by9">
      <img
        :alt="'Picture of different viewports from ' + props.reference.name"
        :data-src="`@/assets/references/${props.reference.img}`"
      />
    </figure>
  </div>
  <div class="column is-full-mobile is-one-third">
    <div class="box">
      <h2
        class="title is-3 is-size-5-mobile is-size-4-desktop is-size-3-widescreen"
      >
        {{ props.reference.name }}
      </h2>
      <h3 class="subtitle is-size-6-mobile">Work done:</h3>
      <ul class="reflist">
        <li
          v-for="item in props.reference.description"
          v-bind:key="item.listitem"
        >
          <span>{{ item.listitem }}</span>
        </li>
      </ul>
      <h4 class="subtitle is-size-6-mobile">Worked for:</h4>
      <a
        :href="props.reference.employerLink"
        target="_blank"
        rel="nofollow noreferrer"
        >{{ props.reference.employer }}</a
      >
    </div>
  </div>
</template>

<style lang="scss" scoped>
.reflist {
  list-style-type: square;
  padding-left: 1.05rem;
  li {
    color: var(--main-secondary);
    span {
      color: #dee5ed;
    }
  }
}
.box {
  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    @media (max-width: 1023px) {
      margin-bottom: 1rem;
    }
  }
  h3.subtitle {
    margin-top: 0;
    margin-bottom: 0;
  }
  h4 {
    &:last-of-type {
      margin-top: 1.5rem;
      margin-bottom: 0;
      @media (max-width: 1023px) {
        margin-top: 1rem;
      }
    }
  }
}
// Parent:
.fp-slides {
  z-index: 1;
  height: 100%;
  overflow: hidden;
  position: relative;
}
.fp-slidesContainer {
  float: left;
  position: relative;
  height: 100%;
}
.fp-slide {
  display: table;
  table-layout: fixed;
  width: 100%;
  float: left;
  height: 100%;
}
.fp-controlArrow {
  position: absolute;
  z-index: 4;
  top: 50%;
  cursor: pointer;
  width: 0;
  height: 0;
  border-style: solid;
  margin-top: -18px;
  transform: translate3d(0, 0, 0);
  @media (max-width: 1023px) {
    display: none;
  }
  &.fp-prev {
    left: 10px;
    @media (min-width: 1280px) {
      left: 20px;
    }
    width: 0;
    border-width: 18px 16px 18px 0;
    border-color: transparent var(--main-secondary) transparent transparent;
  }
  &.fp-next {
    right: 10px;
    @media (min-width: 1280px) {
      right: 20px;
    }
    width: 0;
    border-width: 18px 0 18px 16px;
    border-color: transparent transparent transparent var(--main-secondary);
  }
}
.fp-slidesNav {
  width: 360px;
  position: absolute;
  z-index: 4;
  transform: translate3d(0, 0, 0);
  left: 0 !important;
  right: 0;
  margin: 0 auto !important;
  bottom: 0.25rem;
  @media (min-width: 1024px) {
    bottom: 3rem;
  }
  ul {
    margin: 0;
    padding: 0;
    text-align: center;
    li {
      display: inline-block;
      width: 14px;
      height: 13px;
      margin: 7px;
      position: relative;
      a {
        display: block;
        position: relative;
        z-index: 1;
        width: 100%;
        height: 100%;
        cursor: pointer;
        text-decoration: none;
        span {
          position: absolute;
          z-index: 1;
          height: 4px;
          width: 4px;
          border: 0;
          background: var(--main-secondary);
          left: 50%;
          top: 50%;
          margin: -2px 0 0 -2px;
          transition: all 0.1s ease-in-out;
        }
        &.active span,
        &:hover span {
          height: 12px;
          width: 12px;
          margin: -6px 0 0 -6px;
          border-radius: 100%;
        }
        span.fp-sr-only {
          width: 1px;
          height: 1px;
          padding: 0;
          clip: rect(0, 0, 0, 0);
          border: 0;
        }
      }
    }
  }
}
</style>
