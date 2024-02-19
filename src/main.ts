import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import Keycloak from "keycloak-js";

const keycloak = new Keycloak({
    url: "https://auth.bybrauns.com/",
    realm: "bybrauns",
    clientId: window.origin.includes('dev') || window.origin.includes('localhost') ? 'dev-bybrauns' : 'bybrauns'
});
export const KeycloakInstance = keycloak;
createApp(App).mount('#app')