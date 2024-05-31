<script setup lang="ts">
  import {onMounted, ref} from "vue";
  import animejs from 'animejs/lib/anime.es.js';

  const myNameText = "ALWIN BRAUNS"
  const myName = ref<HTMLElement | null>(null);

  const subject = ref('');
  const email = ref('');
  const message = ref('');
  const error = ref();
  const success = ref();

  const handleContactSubmit = async (form: HTMLFormElement) => {
    if(!(subject.value && email.value && message.value)) {
      error.value = "please enter all fields";
      setTimeout(() => {
        error.value = undefined
      }, 10000)
      return;
    }
    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }
    const formData = new FormData();
    formData.append('subject', subject.value);
    formData.append('email', email.value);
    formData.append('message', message.value);

    try {
      const response = await fetch('https://formspree.io/f/xbjnvlaj', {
        method: 'POST',
        headers: {
          'Accept': 'application/json'
        },
        body: formData
      });

      if (response.ok) {
        subject.value = '';
        email.value = '';
        message.value = '';
        success.value = "Your message has been sent";
        setTimeout(() => {
          success.value = undefined
        }, 10000)
      } else {
        error.value = "Something went wrong, try again later";
        setTimeout(() => {
          error.value = undefined
        }, 10000)
      }
    } catch (error) {
    }
  };

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
  <section class="h-screen w-full grid place-items-center">
    <div class="grid">
      <p class="fade-in lg:text-xl text-xs text-center">your developer</p>
      <h1 ref="myName" class="my-name tart lg:text-8xl md:text-4xl text-2xl font-extrabold"></h1>
      <div class="fade-in lg:block hidden">
        <hr class="my-1">
        <p class="text-xs">Web Development - Vue, Angular, React, Spring Boot</p>
      </div>
      <a href="#contact" class="fade-in place-self-center my-8 font-light"><span class="opacity-60">- contact -</span></a>
    </div>
  </section>
  <section id="contact" class="h-screen w-full grid place-items-center">
    <form
        class="bg-white p-6 rounded-lg shadow-md w-full max-w-md"
        @submit.prevent="handleContactSubmit"
    >
      <h2 class="text-2xl font-bold mb-4 text-center">Contact</h2>
      <transition name="fade">
        <div v-if="success || error" class="py-2">
          <p v-if="error">{{error}}</p>
          <p v-if="success">{{success}}</p>
        </div>
      </transition>
      <div class="flex flex-col space-y-4">
        <input type="text" v-model="subject" name="subject" id="subject" placeholder="Subject" class="p-2 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-gray-400">
        <input type="email" v-model="email" name="email" id="email" placeholder="E-Mail" class="p-2 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-gray-400">
        <textarea name="message" v-model="message" id="message" placeholder="Your message..." class="p-2 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-gray-400 h-32"></textarea>
        <button :disabled="!(subject && email && message)" type="submit" class="p-2 border border-gray-300 rounded bg-gray-900 text-white hover:bg-gray-700 focus:outline-none focus:ring-1 focus:ring-gray-400 disabled:bg-gray-500 disabled:cursor-not-allowed">Send</button>
      </div>
    </form>
  </section>
</template>

<style scoped lang="postcss">
  .fade-enter-active, .fade-leave-active {
    @apply transition-opacity duration-200;
  }
  .fade-enter-from, .fade-leave-to {
    @apply opacity-0;
  }
</style>