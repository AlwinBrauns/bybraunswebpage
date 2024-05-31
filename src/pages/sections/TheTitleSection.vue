<script setup lang="ts">
import {onMounted, ref} from "vue";
import animejs from "animejs/lib/anime.es";

const myNameText = "ALWIN BRAUNS"
const myName = ref<HTMLElement | null>(null);

onMounted(() => {
  if(myName.value !== null) {
    try {
      myName?.value?.insertAdjacentHTML("afterbegin",myNameText.replace(/\S/g, "<span class='letter'>$&</span>")??'')
    } catch (_) {}
  }
  animejs.timeline({loop: false})
      .add({
        targets: '.my-name .letter',
        opacity: [0,1],
        skew: [-12, 0],
        easing: "easeInOutQuad",
        duration: 1100,
        delay: (_, i) => 100 * (i+1) + 500
      });
  animejs.timeline({loop: false})
      .add({
        targets: '.fade-in',
        opacity: [0, 1],
        easing: "easeInOutQuad",
        duration: 2000,
        delay: 250
      })
})
</script>
<template>
  <section class="landingpage--grid-section">
    <div class="grid">
      <p class="fade-in super-title">your developer</p>
      <h1 ref="myName" class="my-name title"></h1>
      <div class="fade-in lg:block hidden">
        <hr class="my-1">
        <p class="text-xs">Web Development - Vue, Angular, React, Spring Boot</p>
      </div>
      <a href="#contact" class="fade-in quick-link"><span
          class="opacity-60">- contact -</span></a>
    </div>
  </section>
</template>
<style scoped lang="postcss">
.super-title {
  @apply lg:text-xl text-xs text-center;
}
.title {
  @apply lg:text-8xl md:text-4xl text-2xl font-extrabold text-center;
}
.quick-link {
  @apply place-self-center my-8 font-light;
}
</style>