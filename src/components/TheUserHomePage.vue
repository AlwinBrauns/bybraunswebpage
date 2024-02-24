<script setup lang="ts">
import { KeycloakInstance } from "../main.ts";
import { KeycloakProfile } from "keycloak-js";
import { onMounted, ref } from "vue";
import ollamaAdapter from "../backend-connection/ollamaAdapter.ts";
import OllamaUserInput from "./OllamaUserInput.vue";
import { Disclosure, DisclosureButton, DisclosurePanel } from "@headlessui/vue";

const ping = ref();
const userTextInput = ref();

defineProps<{
  userProfile: KeycloakProfile;
}>();

onMounted(async () => {
  const { data } = await ollamaAdapter.get("api/ollama/ping");
  ping.value = data;
});
</script>

<template>
  <div class="container mx-auto p-5 flex gap-4 flex-col">
    <p>
      Hallo {{ userProfile.firstName }}!
      <Disclosure as="span" class="relative">
        <DisclosureButton class="hover:opacity-10 transition-opacity"
          ><i>Infos</i></DisclosureButton
        >
        <transition
          enter-active-class="transition duration-100 ease-out"
          enter-from-class="transform scale-95 opacity-0"
          enter-to-class="transform scale-100 opacity-100"
          leave-active-class="transition duration-75 ease-in"
          leave-from-class="transform scale-100 opacity-100"
          leave-to-class="transform scale-95 opacity-0"
        >
          <DisclosurePanel class="bg-white shadow rounded p-5 z-10">
            <p>
              Server Ping:
              {{ ping }}
              User:
              {{ KeycloakInstance.hasRealmRole("user") }}
              Maintainer:
              {{ KeycloakInstance.hasRealmRole("maintainer") }}
            </p>
          </DisclosurePanel>
        </transition>
      </Disclosure>
    </p>
    <div>
      <OllamaUserInput v-model="userTextInput" />
    </div>
    <p>{{ userTextInput }}</p>
  </div>
</template>
