<script setup lang="ts">
import { KeycloakInstance } from "../main.ts";
import { KeycloakProfile } from "keycloak-js";
import { onMounted, ref } from "vue";
import ollamaAdapter from "../backend-connection/ollamaAdapter.ts";

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
  <p>Hallo {{ userProfile.firstName }}!</p>
  <textarea
    name="userTextInput"
    id="userTextInput"
    cols="30"
    rows="1"
    class="p-2"
    v-model="userTextInput"
  ></textarea>
  <p>
    Server Ping:
    {{ ping }}
    User:
    {{ KeycloakInstance.hasRealmRole("user") }}
    Maintainer:
    {{ KeycloakInstance.hasRealmRole("maintainer") }}
  </p>
</template>
