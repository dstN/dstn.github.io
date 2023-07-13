<script setup></script>

<template>
  <nav
    id="nav"
    class="navbar is-transparent is-fixed-top is-spaced"
  >
    <!-- Bulma.io Navbar -->
    <div class="navbar-brand">
      <div
        class="navbar-burger burger"
        data-target="navBar"
      >
        <span></span>
        <span></span>
        <span></span>
      </div>
    </div>

    <div
      id="navBar"
      class="navbar-menu"
    >
      <div class="navbar-end">
        <span
          v-bind:key="title"
          v-for="title in menuItems"
        >
          <!-- Iterate through menuItems from data.json -->
          <a
            :href="`#${title}`"
            :data-menuanchor="title"
            class="navbar-item active"
            ><span :data-hover="title">{{ title }}</span></a
          >
        </span>
      </div>
    </div>
  </nav>
</template>

<style lang="scss" scoped>
.navbar-burger {
  color: var(--main-secondary);
}
.navbar-menu.is-active {
  display: block;
  background-color: var(--main-primary);
  height: calc(100vh - 6.25rem);
  min-height: calc(100vh - 6.25rem);
  visibility: visible;
  opacity: 1;
  top: 3.25rem;
}
.navbar-menu {
  display: block;
  background-color: var(--main-primary);
  height: calc(100vh - 6.25rem);
  min-height: calc(100vh - 6.25rem);
  visibility: visible;
  opacity: 1;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  top: -100vh;
  transition: all 0.75s ease;
}
@media (max-width: 1023px) {
  .navbar-menu {
    background-color: var(--main-primary) !important;
  }
  .navbar-end {
    height: 100%;
    min-height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: stretch;
    span > a {
      font-size: 2.25rem;
      text-align: center;
      &.active,
      &:focus,
      &:hover {
        color: var(--main-secondary) !important;
      }
    }
    > span {
      height: 25%;
      min-height: 25%;
      > a {
        min-height: 100%;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        > span {
          display: block;
          text-align: center;
        }
      }
    }
    > span:after {
      content: "";
      display: block;
      height: 2px;
      background-color: var(--main-primary-dark);
    }
    > span:last-of-type:after {
      display: none;
      height: 0;
    }
  }
}
@media (min-width: 1024px) {
  .navbar {
    background-color: transparent !important;
  }
  .navbar-menu {
    visibility: visible;
    opacity: 100;
    top: 0;
    position: static;
    height: auto;
    min-height: auto;
    transition: none;
    background-color: transparent;
  }
  .navbar a {
    /*color: var(--light-text) !important;*/
    font-size: 1.5rem;
    overflow: hidden;
    transition: color 0.25s cubic-bezier(0, 1.07, 0.89, 0.99);
    will-change: color;
  }
  .navbar a span {
    position: relative;
    display: inline-block;
    transition: transform 0.75s cubic-bezier(0, 1.07, 0.89, 0.99);
    will-change: transform;
  }
  .navbar a span:before {
    position: absolute;
    top: 100%;
    content: attr(data-hover);
    transform: translateZ(0);
  }
  .navbar a:hover span {
    transform: translateY(-100%);
  }
  .navbar a.active,
  .navbar a:hover {
    color: var(--main-secondary) !important;
  }
}
</style>
