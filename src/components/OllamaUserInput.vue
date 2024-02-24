<script setup lang="ts">
const model = defineModel<string>();
</script>
<template>
  <div
    class="overflow-hidden flex flex-col flex-grow w-full relative border rounded-2xl focus-within:border-black focus-within:shadow"
  >
    <textarea
      id="prompt-textarea"
      tabindex="0"
      data-id="root"
      v-model="model"
      rows="1"
      placeholder="Schreibe llama..."
      class="w-full focus-visible:outline-0 resize-none border-0 bg-transparent max-h-25 py-3 px-10 placeholder-black/50 md:py-3.5 md:pr-12 md:pl-[55px]"
    ></textarea>
    <div class="absolute bottom-1/2 transform translate-y-1/2 left-2 md:left-4">
      <div class="flex">
        <button
          class="btn relative p-0 text-black dark:text-white"
          aria-label="Attach files"
        >
          <span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
            >
              <path
                d="M15 3V6.4C15 6.96005 15 7.24008 15.109 7.45399C15.2049 7.64215 15.3578 7.79513 15.546 7.89101C15.7599 8 16.0399 8 16.6 8H20M10 8H6C4.89543 8 4 8.89543 4 10V19C4 20.1046 4.89543 21 6 21H12C13.1046 21 14 20.1046 14 19V16M16 3H13.2C12.0799 3 11.5198 3 11.092 3.21799C10.7157 3.40973 10.4097 3.71569 10.218 4.09202C10 4.51984 10 5.0799 10 6.2V12.8C10 13.9201 10 14.4802 10.218 14.908C10.4097 15.2843 10.7157 15.5903 11.092 15.782C11.5198 16 12.0799 16 13.2 16H16.8C17.9201 16 18.4802 16 18.908 15.782C19.2843 15.5903 19.5903 15.2843 19.782 14.908C20 14.4802 20 13.9201 20 12.8V7L16 3Z"
                stroke="#000000"
                stroke-width="2"
                stroke-linejoin="round"
              />
            </svg>
          </span>
        </button>
        <input
          multiple
          type="file"
          tabindex="-1"
          class="hidden"
          style="display: none"
        />
      </div>
    </div>
    <button
      class="absolute p-1 top-1/2 transform -translate-y-1/2 right-2.5 rounded-lg border border-black bg-black transition-colors enabled:bg-black disabled:text-gray-400 disabled:opacity-10"
      :disabled="!userTextInput"
    >
      <span>
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <path
            xmlns="http://www.w3.org/2000/svg"
            d="M11.5003 12H5.41872M5.24634 12.7972L4.24158 15.7986C3.69128 17.4424 3.41613 18.2643 3.61359 18.7704C3.78506 19.21 4.15335 19.5432 4.6078 19.6701C5.13111 19.8161 5.92151 19.4604 7.50231 18.7491L17.6367 14.1886C19.1797 13.4942 19.9512 13.1471 20.1896 12.6648C20.3968 12.2458 20.3968 11.7541 20.1896 11.3351C19.9512 10.8529 19.1797 10.5057 17.6367 9.81135L7.48483 5.24303C5.90879 4.53382 5.12078 4.17921 4.59799 4.32468C4.14397 4.45101 3.77572 4.78336 3.60365 5.22209C3.40551 5.72728 3.67772 6.54741 4.22215 8.18767L5.24829 11.2793C5.34179 11.561 5.38855 11.7019 5.407 11.8459C5.42338 11.9738 5.42321 12.1032 5.40651 12.231C5.38768 12.375 5.34057 12.5157 5.24634 12.7972Z"
            stroke="#FFF"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          /></svg
      ></span>
    </button>
  </div>
</template>
