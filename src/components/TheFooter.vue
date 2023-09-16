<script setup>
let date = new Date().getFullYear();
</script>

<template>
  <footer class="footer">
    <div
      class="columns is-desktop is-size-6-mobile is-size-5-tablet is-size-5-desktop is-size-4-fullhd"
    >
      <div
        class="column is-half-desktop has-text-centered has-text-left-desktop"
      >
        Made with
        <a
          href="https://alvarotrigo.com/fullPage/"
          rel="nofollow noopener"
          title="Link to fullPage.js"
          target="_blank"
          >Vue fullPage</a
        >
        and ❤️ in Hamburg
      </div>

      <div
        class="column is-half-desktop has-text-centered has-text-right-desktop"
      >
        &copy; {{ date }} - by dstN
      </div>
    </div>
  </footer>
</template>

<style lang="scss" scoped>
.footer {
  position: absolute;
  bottom: -2.75rem;
  width: 100%;
  background: transparent;
  border-top: 2px solid transparent;
  padding: 1rem 0;
  color: lighten(#2b3e50, 30%);
  @media (min-width: 1024px) {
    padding: 1.5rem 0 1.5rem;
  }
}
</style>
