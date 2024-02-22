<script setup lang="ts">
import {KeycloakInstance} from "./main.ts";
import {onMounted, ref} from "vue";
import {KeycloakInitOptions, KeycloakProfile} from "keycloak-js";
import TheUserHomePage from "./components/TheUserHomePage.vue";
import {Menu, MenuButton, MenuItem, MenuItems} from "@headlessui/vue";

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
  <div class="container max-w-screen-sm mx-auto p-3 px-10 grid grid-cols-2 items-baseline border-b-4 rounded border-green-400">
    <div class="text-start">
      <span class="text-2xl">Welcome</span>
    </div>
    <nav class="justify-self-end">
      <Menu as="div" class="relative">
        <MenuButton>Account</MenuButton>
        <transition
            enter-active-class="transition duration-100 ease-out"
            enter-from-class="transform scale-95 opacity-0"
            enter-to-class="transform scale-100 opacity-100"
            leave-active-class="transition duration-75 ease-in"
            leave-from-class="transform scale-100 opacity-100"
            leave-to-class="transform scale-95 opacity-0"
        >
          <MenuItems as="ul" class="absolute right-0 p-5 mt-1.5 w-max min-w-32 flex flex-col rounded shadow bg-white">
            <MenuItem>
              <a href="#" @click="KeycloakInstance.logout" v-if="userProfile">Logout</a>
              <a href="#" @click="KeycloakInstance.login" v-else>Login</a>
            </MenuItem>
            <MenuItem v-if="userProfile">
              <a href="#" @click="KeycloakInstance.accountManagement">Your Account</a>
            </MenuItem>
          </MenuItems>
        </transition>
      </Menu>
    </nav>
  </div>
  <template v-if="userProfile">
    <TheUserHomePage :user-profile="userProfile" />
  </template>
</template>

