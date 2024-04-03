<script setup lang="ts">
import { KeycloakInstance } from "../main.ts";
import { KeycloakProfile } from "keycloak-js";
import { onMounted, ref } from "vue";
import ollamaAdapter, {
  useOllamaListener,
} from "../backend-connection/ollamaAdapter.ts";
import OllamaUserInput from "./OllamaUserInput.vue";
import { Disclosure, DisclosureButton, DisclosurePanel } from "@headlessui/vue";
import { ChevronRightIcon } from "@heroicons/vue/20/solid";

const ping = ref();
const OllamaListener = useOllamaListener();

defineProps<{
  userProfile: KeycloakProfile;
}>();

onMounted(async () => {
  const { data } = await ollamaAdapter.get("api/ollama/ping");
  ping.value = data;
});
</script>

<template>
  <div class="container mx-auto p-5 grid gap-4 content-between self-end transition-all mb-4"
       :class="OllamaListener.messages.value.length ? 'flex-1' : ''"
  >
    <div class="flex gap-2 items-center relative">
      <span> Hallo {{ userProfile.firstName }}! </span>
      <Disclosure as="span">
        <DisclosureButton class="grid grid-cols-2 place-items-center">
          <i> Infos </i>
          <ChevronRightIcon
            class="ui-open:rotate-90 ui-open:transform h-1/2 relative -left-2 transition-transform"
          />
        </DisclosureButton>
        <transition
          enter-active-class="transition duration-100 ease-out"
          enter-from-class="transform scale-95 opacity-0"
          enter-to-class="transform scale-100 opacity-100"
          leave-active-class="transition duration-75 ease-in"
          leave-from-class="transform scale-100 opacity-100"
          leave-to-class="transform scale-95 opacity-0"
        >
          <DisclosurePanel
            class="bg-white shadow rounded p-5 z-10 absolute left-0"
          >
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
    <div class="grid grid-cols-1 grid-flow-row gap-2">
      <template v-for="message in OllamaListener.messages.value ">
        <div class="ollama-message">
          <span>
          {{ message }}
          </span>
        </div>
      </template>
      <div v-if="OllamaListener.currentOllamaMessage.value" class="ollama-message ollama-message-current">
        <span>
        {{ OllamaListener.currentOllamaMessage.value }}
        </span>
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
</template>

<style scoped lang="postcss">
  .ollama-message {
    @apply w-full transition-all rounded-lg shadow bg-white p-5;
  }
</style>
