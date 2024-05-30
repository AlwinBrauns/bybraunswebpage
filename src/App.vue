<script setup lang="ts">
import TheUserHomePage from "./components/TheUserHomePage.vue";
import TheHeader from "./components/TheHeader.vue";
import {useKeycloakUser} from "./composable/User/useKeycloakUser.ts";
import {KeycloakInstance} from "./main.ts";
import {UserState} from "./composable/User/UserState.ts";

const {userState, userProfile} = useKeycloakUser();

</script>

<template>
  <template v-if="userState === UserState.LOGGED_IN_PAGE">
    <TheHeader :user-profile="userProfile"/>
    <TheUserHomePage :user-profile="userProfile" />
  </template>
  <template v-if="userState === UserState.NOT_LOGGED_IN">
    <TheHeader :user-profile="userProfile"/>
  </template>
  <template v-if="userState === UserState.LOADING">
    <div>Loading...</div>
  </template>
  <template v-if="userState === UserState.DISABLED">
    <TheHeader :user-profile="userProfile"/>
    <div>
      <p>This Account is disabled, please log into another Account!
        <a href="#" @click="KeycloakInstance.logout">Logout</a>
      </p>
    </div>
  </template>
</template>
