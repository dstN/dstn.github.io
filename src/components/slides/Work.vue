<script setup>
const props = defineProps(["reference"]);
</script>

<template>
  <div class="column is-full-mobile is-two-thirds">
    <figure class="image is-16by9">
      <img
        :alt="'Picture of different viewports from ' + props.reference.name"
        :src="`/src/assets/references/${props.reference.img}`"
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
</style>
