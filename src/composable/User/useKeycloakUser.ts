import {onMounted, ref} from "vue";
import {KeycloakInitOptions, KeycloakProfile} from "keycloak-js";
import {KeycloakInstance} from "../../main.ts";
import {UserState} from "./UserState.ts";


export function useKeycloakUser() {
    const userState = ref<UserState>(UserState.LOADING);
    const userProfile = ref<KeycloakProfile>();

    const loadProfile = async () => {
        if ((userProfile.value = await KeycloakInstance.loadUserProfile())) {
            userState.value = UserState.LOGGED_IN_PAGE;
            if(userProfile.value.enabled === false) {
                userState.value = UserState.DISABLED;
            }
        }  else {
            userState.value = UserState.NOT_LOGGED_IN;
        }
    };
    onMounted(async () => {
        userState.value = UserState.NOT_LOGGED_IN;
        KeycloakInstance.onReady = async (authenticated: boolean | undefined) => {
            userState.value = UserState.LOADING;
            if (!authenticated) {
                userState.value = UserState.NOT_LOGGED_IN;
                return;
            }
            await loadProfile();
        };
        KeycloakInstance.onAuthLogout = () => {
            userState.value = UserState.NOT_LOGGED_IN;
            userProfile.value = undefined;
        }
        KeycloakInstance.onAuthError = () => {
            userState.value = UserState.NOT_LOGGED_IN;
            userProfile.value = undefined;
        }
        KeycloakInstance.onAuthRefreshError = () => {
            userState.value = UserState.NOT_LOGGED_IN;
            userProfile.value = undefined;
        }
        await KeycloakInstance.init(<KeycloakInitOptions>{
            onLoad: "check-sso",
            pkceMethod: "S256",
        });
    })
    return {userState, userProfile};
}


