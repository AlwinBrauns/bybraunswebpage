<script setup lang="ts">
import {onMounted, ref} from "vue";
import animejs from "animejs/lib/anime.es";
import {useIntersectionObserver} from "@vueuse/core";

const elem = ref<HTMLElement | null>(null);
const { stop } = useIntersectionObserver(elem, ([{ isIntersecting }]) => {
  if (isIntersecting) {
    animejs.timeline({ loop: false })
        .add({
          targets: '.incoming',
          opacity: [0, 1],
          skew: [-10, 0],
          easing: "easeInOutQuad",
          duration: 1100,
          delay: (_, i) => 100 * (i + 1) + 30,
          begin(_) {
            if(elem.value) {
              elem.value.style.opacity = '';
            }
          },
        });
    stop()
  }
})
onMounted(() => {
  if (elem.value) {
    elem.value.style.opacity = '0';
  }
})
</script>

<template>
  <section id="career" class="landingpage--grid-section">
    <div ref="elem" class="timeline--grid h-full m-8">
      <div class="incoming timeline--point-trainee relative">
        <div class="circle grid place-items-center">
          <span class="italic text-xl">2021 - 2023</span>
        </div>
      </div>
      <div v-for="index in 12" :key="index" class="incoming timeline--line">
        <div class="line"></div>
      </div>
      <div class="incoming timeline--point-company">
        <div class="circle grid place-items-center">
          <span class="italic text-xl">2023</span>
        </div>
      </div>
      <div class="incoming timeline--right-panel">
        <div class="right-panel--card place-self-center row-start-1 row-end-5 ">
          <h3 class="font-bold text-xl">Training</h3>
          <hr class="py-1">
          <p>Training as an IT Specialist for Application Development</p>
        </div>
        <div class="right-panel--card place-self-center row-start-[15] row-end-[19]">
          <h3 class="font-bold text-xl">Employed</h3>
          <hr class="py-1">
          <p>Working as a Web-Dev at adorsys</p>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped lang="postcss">
.timeline--grid {
  @apply grid grid-cols-[140px_1fr] grid-rows-[repeat(24,35px)]
}
.timeline--right-panel {
  @apply ml-12 row-span-full max-w-0 sm:min-w-32 sm:max-w-64 lg:ml-16 grid grid-rows-[repeat(24,35px)] ;
}
.timeline--point-trainee {
  @apply row-start-1 row-end-5 w-full;
}
.timeline--point-company {
  @apply row-start-[15] row-end-[19] w-full;
}
.timeline--line {
  @apply grid place-items-center;
}
.circle {
  @apply w-full h-full rounded-full shadow border-b-2 border-gray-400;
}
.line {
  @apply w-[2px] h-1/2 bg-gray-300;
}
.right-panel--card {
  @apply shadow rounded-xl p-4 border-b-2 border-gray-400 relative -left-[100%] top-3/4 sm:static bg-white min-w-40 md:min-w-48 sm:text-left text-center;
}
</style>