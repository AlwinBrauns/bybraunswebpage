<script setup lang="ts">
import {KeycloakInstance} from "./main.ts";
import {onMounted, ref} from "vue";
import {KeycloakInitOptions, KeycloakProfile} from "keycloak-js";

const userProfile = ref<KeycloakProfile>();

const loadProfile = async () => {
  userProfile.value = await KeycloakInstance.loadUserProfile();
}

onMounted(async () => {
  KeycloakInstance.onReady = async (authenticated: boolean | undefined) => {
    if(!authenticated) return;
    await loadProfile();
  }
  await KeycloakInstance.init(<KeycloakInitOptions>{
    onLoad: "check-sso"
  });
})

</script>

<template>
  <h1>ByBrauns.com</h1>
  <template v-if="userProfile">
    <button @click="() => KeycloakInstance.logout()">Logout</button>
    <p>
      Hallo {{ userProfile.firstName }}!
    </p>
    <p>
      User:
      {{KeycloakInstance.hasRealmRole('user')}}
      Maintainer:
      {{KeycloakInstance.hasRealmRole('maintainer')}}
    </p>
  </template>
  <template v-else>
    <button @click="() => KeycloakInstance.login()">Login</button>
  </template>
</template>

<style scoped>
</style>
