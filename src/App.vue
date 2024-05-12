<script setup lang="ts">
import {KeycloakInstance} from "./main.ts";
import {onMounted, ref} from "vue";
import {KeycloakInitOptions, KeycloakProfile} from "keycloak-js";
import TheUserHomePage from "./components/TheUserHomePage.vue";
import TheHeader from "./components/TheHeader.vue";

const userProfile = ref<KeycloakProfile>({});

const loadProfile = async () => {
  userProfile.value = await KeycloakInstance.loadUserProfile();
};

onMounted(async () => {
  KeycloakInstance.onReady = async (authenticated: boolean | undefined) => {
    if (!authenticated) return;
    await loadProfile();
  };
  await KeycloakInstance.init(<KeycloakInitOptions>{
    onLoad: "check-sso",
    pkceMethod: "S256",
  });
});
</script>

<template>
  <TheHeader :user-profile="userProfile"/>
  <template v-if="userProfile">
    <TheUserHomePage :user-profile="userProfile" />
  </template>
</template>
