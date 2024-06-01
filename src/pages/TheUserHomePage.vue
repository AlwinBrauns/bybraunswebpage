<script setup lang="ts">
import { KeycloakInstance } from "../main.ts";
import { KeycloakProfile } from "keycloak-js";
import { onMounted, ref } from "vue";
import ollamaAdapter, {
  useOllamaListener,
} from "../backend-connection/ollamaAdapter.ts";
import OllamaUserInput from "../components/OllamaUserInput.vue";
import { Disclosure, DisclosureButton, DisclosurePanel } from "@headlessui/vue";
import { ChevronRightIcon } from "@heroicons/vue/20/solid";

const ping = ref();
const OllamaListener = useOllamaListener();

defineProps<{
  userProfile: KeycloakProfile | undefined;
}>();

onMounted(async () => {
  const { data } = await ollamaAdapter.get("api/ollama/ping");
  ping.value = data;
});
</script>

<template>
  <section class="section-container">
    <div class="content-container"
         :class="OllamaListener.messages.value.length ? 'flex-1' : ''"
    >
      <div class="header-container">
        <span> Hallo {{ userProfile?.firstName }}! </span>
        <Disclosure as="span">
          <DisclosureButton class="disclosure-button">
            <i> Infos </i>
            <ChevronRightIcon class="chevron-icon" />
          </DisclosureButton>
          <transition
              enter-active-class="transition-enter-active"
              enter-from-class="transition-enter-from"
              enter-to-class="transition-enter-to"
              leave-active-class="transition-leave-active"
              leave-from-class="transition-leave-from"
              leave-to-class="transition-leave-to"
          >
            <DisclosurePanel class="disclosure-panel">
              <p>
                Server Ping:
                {{ ping }}
                User:
                {{ KeycloakInstance.hasRealmRole("user") }}
                Maintainer:
                {{ KeycloakInstance.hasRealmRole("maintainer") }}
              </p>
              <p>
                Stream Id: {{ OllamaListener.streamId }}, History Id:
                {{ OllamaListener.historyId }}
              </p>
            </DisclosurePanel>
          </transition>
        </Disclosure>
      </div>
      <div class="messages-container">
        <template v-for="message in OllamaListener.messages.value">
          <div class="ollama-message">
            <span>{{ message }}</span>
          </div>
        </template>
        <div v-if="OllamaListener.currentOllamaMessage.value" class="ollama-message-current">
          <span>{{ OllamaListener.currentOllamaMessage.value }}</span>
        </div>
        <div>
          <OllamaUserInput
              @send="
          (message: string) => {
            ollamaAdapter.post('api/ollama/send', {
              message: {
                message: message,
                role: 'user',
                other: '',
              },
              context: {
                streamId: OllamaListener.streamId.value,
                historyId:
                  OllamaListener.historyId.value === '-1'
                    ? null
                    : OllamaListener.historyId.value,
              },
            });
          }
        "
          />
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped lang="postcss">
.section-container {
  @apply h-screen flex flex-col;
}
.content-container {
  @apply container mx-auto p-5 grid gap-4 content-between self-end transition-all mb-4;
}
.header-container {
  @apply flex gap-2 items-center relative;
}
.disclosure-button {
  @apply grid grid-cols-2 place-items-center;
}
.chevron-icon {
  @apply ui-open:rotate-90 ui-open:transform h-1/2 relative -left-2 transition-transform;
}
.transition-enter-active {
  @apply transition duration-100 ease-out;
}
.transition-enter-from {
  @apply transform scale-95 opacity-0;
}
.transition-enter-to {
  @apply transform scale-100 opacity-100;
}
.transition-leave-active {
  @apply transition duration-75 ease-in;
}
.transition-leave-from {
  @apply transform scale-100 opacity-100;
}
.transition-leave-to {
  @apply transform scale-95 opacity-0;
}
.disclosure-panel {
  @apply bg-white shadow rounded p-5 z-10 absolute left-0;
}
.messages-container {
  @apply grid grid-cols-1 grid-flow-row gap-2;
}
.ollama-message {
  @apply w-full transition-all rounded-lg shadow bg-white p-5;
}
.ollama-message-current {
  @apply w-full transition-all rounded-lg shadow bg-white p-5;
}
</style>
