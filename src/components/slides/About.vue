<script setup>
const age = getAge();
const mainText = `I'm a ${age}-year-old front end developer based in Hamburg, Germany. I believe art to be an intermezzo of perfectly executed technology, craftsmanship and imagination. That is why design and realisation of front ends is one of the most sophisticated tasks.`;
const subText =
  "I love everything related to web development, for example trying out new bleeding edge technologies to find the best suitable technology for the given task. In my spare time, I spend time reading tech news, especially pc hardware related news because building PCs is my second biggest passion.";
const heading = "About me";
function getAge() {
  let today = new Date();
  let birthDate = new Date("1990-08-21");
  let age = today.getFullYear() - birthDate.getFullYear();
  let month = today.getMonth() - birthDate.getMonth();
  if (month < 0 || (month === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }
  return age;
}
</script>

<template>
  <div class="column is-one-fifths-widescreen">
    <h2 class="is-size-3 title">{{ heading }}</h2>
  </div>
  <div
    class="column is-full-mobile is-four-fifths-desktop is-four-fifths-fullhd"
  >
    <div class="notification is-primary is-size-6-mobile is-size-4-tablet">
      {{ mainText }}
    </div>
    <article class="message">
      <div class="message-body is-size-6 is-size-4-tablet">
        {{ subText }}
      </div>
    </article>
  </div>
</template>

<style scoped>
.notification {
  padding: 0.5rem;
  margin-bottom: 0.75rem !important;
}

.message-body {
  padding: 0.5rem;
}

@media (min-width: 768px) {
  .notification {
    padding: 1.25rem 2.5rem 1.25rem 1.5rem;
    margin-bottom: 1.5rem !important;
  }

  .message-body {
    padding: 1.25rem 1.5rem;
  }
}
</style>
