<script setup>
import { defineAsyncComponent } from "vue";
const props = defineProps(["component", "isDesktop", "isFooter"]);

const Slide = defineAsyncComponent(() =>
  import(`./slides/${props.component}.vue`)
);

const Footer = props.isFooter
  ? defineAsyncComponent(() => import("./TheFooter.vue"))
  : "";

const projects = [
  {
    name: "awinia gmbh",
    description: [
      {
        listitem: "Responsive templating",
      },
      {
        listitem: "Template integration in Wordpress",
      },
      {
        listitem: "Custom UI elements",
      },
    ],
    employer: "art-box media",
    employerLink: "https://art-box-media.de",
    img: "awinia-compressor.png",
  },
  {
    name: "Beratungskompass Inklusion",
    description: [
      {
        listitem: "Responsive templating from PSD template",
      },
      {
        listitem: "Custom UI elements from PSD template",
      },
      {
        listitem: "Special focus on accessibility",
      },
    ],
    employer: "Sven Vörtmann Internet & IT Service",
    employerLink: "https://svenvoertmann.de",
    img: "beratungskompass-compressor.png",
  },
  {
    name: "Energie Experten",
    description: [
      {
        listitem: "Responsive templating from given desktop design",
      },
      {
        listitem: "Custom UI elements fitting smaller viewports",
      },
    ],
    employer: "Sven Vörtmann Internet & IT Service",
    employerLink: "https://svenvoertmann.de",
    img: "energie-experten-compressor.png",
  },
  {
    name: "Golfclub Großensee",
    description: [
      {
        listitem: "Responsive design and templating",
      },
      {
        listitem: "Custom UI elements",
      },
    ],
    employer: "Sven Vörtmann Internet & IT Service",
    employerLink: "https://svenvoertmann.de",
    img: "gc-grossensee-compressor.png",
  },
  {
    name: "Gerlieva Sprühtechnik",
    description: [
      {
        listitem: "Responsive design and templating",
      },
      {
        listitem: "Template integration in Joomla",
      },
      {
        listitem: "Custom UI elements",
      },
    ],
    employer: "art-box media",
    employerLink: "https://art-box-media.de",
    img: "gerlieva-compressor.png",
  },
  {
    name: "GP Fiberoptics",
    description: [
      {
        listitem: "Responsive templating",
      },
      {
        listitem: "Template integration in Wordpress",
      },
      {
        listitem: "Custom UI elements",
      },
    ],
    employer: "art-box media",
    employerLink: "https://art-box-media.de",
    img: "gp-fiberoptics-compressor.png",
  },
  {
    name: "Handballteam Norderstedt",
    description: [
      {
        listitem: "Responsive design and templating",
      },
      {
        listitem: "Custom UI elements",
      },
    ],
    employer: "Sven Vörtmann Internet & IT Service",
    employerLink: "https://svenvoertmann.de",
    img: "ht-norderstedt-compressor.png",
  },
  {
    name: "Kauf-Lokal Müllheim",
    description: [
      {
        listitem: "Responsive templating",
      },
      {
        listitem: "Template integration in Wordpress",
      },
      {
        listitem: "Custom UI elements",
      },
    ],
    employer: "art-box media",
    employerLink: "https://art-box-media.de",
    img: "kauf-lokal-compressor.png",
  },
  {
    name: "Lieler Schlossbrunnen",
    description: [
      {
        listitem: "Responsive templating",
      },
      {
        listitem: "Template integration in Wordpress",
      },
      {
        listitem: "Custom UI elements",
      },
    ],
    employer: "art-box media",
    employerLink: "https://art-box-media.de",
    img: "lieler-compressor.png",
  },
  {
    name: "Schloss Bürgeln",
    description: [
      {
        listitem: "Responsive templating",
      },
      {
        listitem: "Template integration in Wordpress",
      },
      {
        listitem: "Custom UI elements",
      },
    ],
    employer: "art-box media",
    employerLink: "https://art-box-media.de",
    img: "schloss-buergeln-compressor.png",
  },
  {
    name: "Meesenburg GmbH",
    description: [
      {
        listitem: "Responsive templating from given PSD designs",
      },
      {
        listitem:
          "Interactive map for all offices and facilities based on Google Maps API",
      },
      {
        listitem: "Interactive job vacancies filter",
      },
      {
        listitem: "Complex UI elements",
      },
    ],
    employer: "Sven Vörtmann Internet & IT Service",
    employerLink: "https://svenvoertmann.de",
    img: "meesenburg-compressor.png",
  },
  {
    name: "Sven Vörtmann Internet & IT Service",
    description: [
      {
        listitem: "Responsive design & templating",
      },
      {
        listitem: "Interactive references",
      },
      {
        listitem: "Custom UI elements",
      },
    ],
    employer: "Sven Vörtmann Internet & IT Service",
    employerLink: "https://svenvoertmann.de",
    img: "svenvoertmann-compressor.png",
  },
];
</script>

<template>
  <div class="section">
    <div
      v-if="props.component === 'Work'"
      class="slide"
      v-for="reference in projects"
      :key="reference.name"
    >
      <div class="container">
        <div
          :class="isDesktop ? 'is-desktop' : ''"
          class="columns is-vcentered"
        >
          <Slide :reference="reference" />
        </div>
      </div>
    </div>
    <div
      v-else
      class="container"
    >
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

<style lang="scss">
.work {
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
}
</style>
