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
