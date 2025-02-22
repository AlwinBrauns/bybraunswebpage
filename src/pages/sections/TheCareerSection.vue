<script setup lang="ts">
import {computed, onMounted, ref} from "vue";
import animejs from "animejs/lib/anime.es";
import {useIntersectionObserver} from "@vueuse/core";
import TimelineBuilder, { TimelineItem } from '../../tools/TimeLineBuilder';
const elem = ref<HTMLElement | null>(null);
const timelineItems = ref<TimelineItem[]>([]);
const timelinePoint = computed(() => timelineItems.value.length?timelineItems.value.filter(item => item.type === 'point'):[])

const { stop } = useIntersectionObserver(elem, ([{ isIntersecting }]) => {
  if (isIntersecting) {
    animejs.timeline({ loop: false })
        .add({
          targets: '.incoming',
          opacity: [0, 1],
          skew: [-10, 0],
          easing: "easeInOutQuad",
          duration: 400,
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
function itemClass(type: 'point' | 'line') {
  if (type === 'point') return 'timeline--point';
  if (type === 'line') return 'timeline--line';
  return '';
}
function gridPositionStyle(rowStart: number, rowEnd: number) {
  return {
    gridRowStart: rowStart,
    gridRowEnd: rowEnd
  };
}
onMounted(() => {
  if (elem.value) {
    elem.value.style.opacity = '0';
  }
  timelineItems.value = new TimelineBuilder()
      .addPoint('2019 - 2023', 'Trainings', 'Training as an IT Specialist for Application Development in Germany')
      .addLines(6)
      .addPoint('2023', 'Employed', 'Working as a Web-Dev at adorsys')
      .addLines(6)
      .build();
})

</script>

<template>
  <section id="career" class="landingpage--grid-section">
    <div ref="elem" class="timeline--grid h-full m-8">
      <template v-for="(item, _) in timelineItems">
        <div :class="[itemClass(item.type), 'incoming']" :style="gridPositionStyle(item.rowStart, item.rowEnd)">
          <div v-if="item.type === 'point'" class="circle grid place-items-center">
            <span class="italic text-xl">{{ item.date }}</span>
          </div>
          <div v-if="item.type === 'line'" class="line"></div>
        </div>
      </template>
      <div class="timeline--right-panel">
        <template v-for="(item, _) in timelinePoint">
        <div class="incoming right-panel--card place-self-start sm:place-self-stretch " :style="gridPositionStyle(item.rowStart, item.rowEnd)">
          <h3 class="font-bold text-xl">{{ item.title }}</h3>
          <hr class="py-1">
          <p>{{ item.description }}</p>
        </div>
        </template>
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
  @apply shadow rounded-xl p-4 border-b-2 border-gray-400 relative -left-[100%] top-[100px] sm:static bg-white min-w-40 md:min-w-48 sm:text-left text-center;
}
</style>