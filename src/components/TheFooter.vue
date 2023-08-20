<script setup>
let date = new Date();
date = date.getFullYear();
</script>

<template>
  <footer class="footer">
    <div
      class="columns is-mobile is-size-6-mobile is-size-5-tablet is-size-5-desktop is-size-4-fullhd"
    >
      <div class="column is-half has-text-left">
        Made with
        <a
          href="https://vuejs.org/"
          rel="noreferrer"
          title="Link to Vuejs website"
          target="_blank"
          >Vue</a
        >
        and ❤️ in Hamburg
      </div>

      <div class="column is-half has-text-right">
        &copy; {{ date }} - by dstN
      </div>
    </div>
  </footer>
</template>

<style lang="scss" scoped>
.footer {
  position: absolute;
  bottom: -3rem;
  width: 100%;
  background: transparent;
  border-top: 2px solid transparent;
  padding: 1rem 0;
  color: lighten(#2b3e50, 20%);
  @media (min-width: 768px) {
    padding: 1rem 0;
  }
  @media (min-width: 1024px) {
    padding: 1.5rem 0 3rem;
    bottom: -5rem;
  }
}
</style>
