import axios from "axios";
import { KeycloakInstance } from "../main.ts";
import {
  EventSourceMessage,
  fetchEventSource,
} from "@microsoft/fetch-event-source";
import { ref } from "vue";

const ollamaUrl = "https://llm.bybrauns.com";

const ollamaAdapter = axios.create({
  baseURL: ollamaUrl,
});

ollamaAdapter.interceptors.request.use(
  (config) => {
    config.headers.Authorization = `Bearer ${KeycloakInstance.token}`;
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

export default ollamaAdapter;

type InitOllamaMessage = {
  streamid: string;
  historyid: string;
};
export function useOllamaListener() {
  const ollamaMessages = ref<EventSourceMessage[]>([]);
  const streamId = ref();
  const historyId = ref();
  const currentError = ref();
  fetchEventSource(ollamaUrl + "/api/ollama/listen", {
    headers: {
      Authorization: `Bearer ${KeycloakInstance.token}`,
    },
    onmessage(ev) {
      if (ev.id === "INIT") {
        const data = JSON.parse(ev.data) as InitOllamaMessage;
        console.info("[OLLAMA_LISTENER] INIT, ", data);
        streamId.value = data.streamid;
        historyId.value = data.historyid;
      }
      ollamaMessages.value.push(ev);
    },
    onerror(err) {
      currentError.value = err;
    },
  }).then((_) => {});
  return { ollamaMessages, currentError, streamId, historyId };
}
