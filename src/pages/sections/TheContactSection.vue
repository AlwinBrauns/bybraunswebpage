<script setup lang="ts">
import {ref} from "vue";

const subject = ref('');
const email = ref('');
const message = ref('');
const error = ref();
const success = ref();

const handleContactSubmit = async (event: Event) => {
  const form = event.target as HTMLFormElement;
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
</script>
<template>
  <section id="contact" class="landingpage--grid-section">
    <form
        class="contact-form"
        @submit.prevent="handleContactSubmit"
    >
      <h2 class="form-title">Contact</h2>
      <transition name="fade">
        <div v-if="success || error" class="py-2">
          <p v-if="error">{{error}}</p>
          <p v-if="success">{{success}}</p>
        </div>
      </transition>
      <div class="form-fields">
        <input type="text" v-model="subject" name="subject" id="subject" placeholder="Subject"
               class="input-field">
        <input type="email" v-model="email" name="email" id="email" placeholder="E-Mail"
               class="input-field">
        <textarea name="message" v-model="message" id="message" placeholder="Your message..."
                  class="textarea-field"></textarea>
        <button :disabled="!(subject && email && message)" type="submit"
                class="submit-button">
          Send
        </button>
      </div>
    </form>
  </section>
</template>

<style scoped lang="postcss">
.contact-form {
  @apply bg-white p-6 rounded-lg shadow-md w-full max-w-md;
}
.form-title {
  @apply text-2xl font-bold mb-4 text-center;
}
.form-fields {
  @apply flex flex-col space-y-4;
}
.input-field {
  @apply p-2 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-gray-400;
}
.textarea-field {
  @apply p-2 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-gray-400 h-32;
}
.submit-button {
  @apply p-2 border border-gray-300 rounded bg-gray-900 text-white hover:bg-gray-700 focus:outline-none focus:ring-1 focus:ring-gray-400 disabled:bg-gray-500 disabled:cursor-not-allowed;
}
.fade-enter-active, .fade-leave-active {
  @apply transition-opacity duration-200;
}
.fade-enter-from, .fade-leave-to {
  @apply opacity-0;
}
</style>
