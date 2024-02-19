<script setup lang="ts">
import {KeycloakInstance} from "../main.ts";
import {KeycloakProfile} from "keycloak-js";

defineProps<{
  userProfile: KeycloakProfile
}>()
</script>

<template>
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