<script setup>
defineProps({
  toggle: Boolean,
});
const menu = [
  {
    title: "Home",
  },
  {
    title: "About",
  },
  {
    title: "Work",
  },
  {
    title: "Contact",
  },
];
</script>

<template>
  <nav
    id="nav"
    class="navbar is-transparent is-fixed-top is-spaced"
  >
    <!-- Bulma.io Navbar -->
    <div class="navbar-brand">
      <div
        class="navbar-burger burger"
        :class="toggle ? 'is-active' : ''"
        @click="$emit('toggleNav')"
      >
        <span></span>
        <span></span>
        <span></span>
      </div>
    </div>

    <div
      id="navBar"
      class="navbar-menu"
      :class="toggle ? 'is-active' : ''"
    >
      <div class="navbar-end">
        <span
          v-bind:key="item"
          v-for="item in menu"
        >
          <a
            :href="`#${item.title}`"
            :data-menuanchor="item.title"
            @click="$emit('toggleNav', false)"
            class="navbar-item"
            ><span :data-hover="item.title">{{ item.title }}</span></a
          >
        </span>
      </div>
    </div>
  </nav>
  <div
    class="overlay"
    :class="toggle ? 'active' : ''"
  ></div>
</template>

<style lang="scss" scoped>
.navbar-burger {
  color: var(--main-secondary);
  span {
    transition: all 0.5s ease;
  }
  &:hover {
    background: transparent;
  }
}
.navbar-menu.is-active {
  display: block;
  background-color: var(--main-primary);
  height: calc(100vh - 6.25rem);
  min-height: calc(100vh - 6.25rem);
  visibility: visible;
  opacity: 1;
  transform: scale(1);
  transition: all 0.5s ease;
}
.navbar-menu {
  display: block;
  background-color: var(--main-primary);
  height: calc(100vh - 6.25rem);
  min-height: calc(100vh - 6.25rem);
  visibility: hidden;
  opacity: 0;
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  top: 10vh;
  transform: scale(0);
  transition: opacity 0.5s ease, visibility 0.5s ease, transform 0s ease 0.5s;
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
  a.navbar-item:focus,
  a.navbar-item:focus-within,
  .navbar-link:focus,
  .navbar-link:focus-within {
    color: var(--light-text) !important;
  }
  .navbar {
    background-color: transparent !important;
  }
  .navbar-burger {
    display: none;
  }
  .navbar-menu {
    visibility: visible;
    opacity: 100;
    transform: scale(1);
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
    transition: transform 0.5s cubic-bezier(0, 1.07, 0.89, 0.99);
    will-change: transform;
  }
  .navbar a span:before {
    position: absolute;
    top: 100%;
    content: attr(data-hover);
    transform: translateZ(0);
  }
  .navbar a:hover span,
  .navbar a.active span {
    transform: translateY(-100%);
  }
  .navbar a.active,
  .navbar a:hover {
    color: var(--main-secondary) !important;
  }
}
</style>
