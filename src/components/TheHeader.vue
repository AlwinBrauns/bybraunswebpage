<script setup lang="ts">
import {MenuButton, MenuItem, MenuItems, Menu} from "@headlessui/vue";
import {KeycloakInstance} from "../main.ts";
import {KeycloakProfile} from "keycloak-js";

defineProps<{
  userProfile: KeycloakProfile | undefined
}>();

</script>
<template>
  <div
      class="container max-w-screen-sm mx-auto p-3 px-10 grid grid-cols-2 items-center border-b-2 border-black"
  >
    <div class="h-full">
      <span>
        <svg
            width="32"
            height="32"
            viewBox="0 0 24 24"
            fill="none"
            transform="rotate(90)matrix(1, 0, 0, 1, 0, 0)"
        >
          <path
              d="M10.3365 12.3022C8.94652 13.1922 7.10652 13.2022 5.70652 12.3222C4.17652 11.3622 3.48652 9.72224 3.61652 8.14224C3.65652 7.64224 4.25653 7.41224 4.60653 7.76224L6.27653 9.44225C6.49653 9.67225 6.86653 9.67225 7.09653 9.44225L8.97652 7.54224C9.20652 7.31224 9.20652 6.94225 8.97652 6.72225L7.30652 5.04224C6.95652 4.69224 7.18652 4.08224 7.67652 4.04224C8.92652 3.94224 10.2165 4.36224 11.1665 5.32224C13.1365 7.31224 12.8565 10.7022 10.3365 12.3022Z"
              stroke="#0F0F0F"
              stroke-miterlimit="10"
              stroke-linecap="round"
              stroke-linejoin="round"
          />
          <path
              d="M13.8966 11.7523L20.2566 18.1223C20.4466 18.3223 20.4466 18.6323 20.2566 18.8223L18.2666 20.8223C18.0666 21.0223 17.7466 21.0223 17.5566 20.8223L11.2266 14.4223"
              stroke="#0F0F0F"
              stroke-miterlimit="10"
              stroke-linecap="round"
              stroke-linejoin="round"
          />
        </svg>
      </span>
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
          <MenuItems
              as="ul"
              class="absolute right-0 p-3 mt-1.5 w-max min-w-32 flex gap-2.5 flex-col rounded shadow bg-white z-10"
          >
            <MenuItem class="hover:bg-gray-100 p-2 rounded-lg">
              <a href="#" @click="KeycloakInstance.logout" v-if="userProfile"
              >Logout</a
              >
              <a href="#" @click="KeycloakInstance.login" v-else>Login</a>
            </MenuItem>
            <MenuItem
                v-if="userProfile"
                class="hover:bg-gray-100 p-2 rounded-lg"
            >
              <a href="#" @click="KeycloakInstance.accountManagement"
              >Your Account</a
              >
            </MenuItem>
          </MenuItems>
        </transition>
      </Menu>
    </nav>
  </div>
</template>