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
  const sseMessages = ref<EventSourceMessage[]>([]);
  const streamId = ref();
  const historyId = ref();
  const currentError = ref();
  const done = ref(true);
  const currentOllamaMessage = ref("");
  const messages = ref<string[]>([]);
  const ollamaMessages = ref<string[]>([]);
  const userMessages = ref<string[]>([]);
  fetchEventSource(ollamaUrl + "/api/ollama/listen", {
    headers: {
      Authorization: `Bearer ${KeycloakInstance.token}`,
    },
    openWhenHidden: true,
    body: streamId.value?JSON.stringify({
        streamId: streamId.value,
        historyId: historyId.value
    }):undefined,
    onmessage(ev) {
      if (ev.id === "INIT") {
        const data = JSON.parse(ev.data) as InitOllamaMessage;
        console.info("[OLLAMA_LISTENER] INIT, ", data);
        streamId.value = data.streamid;
        historyId.value = data.historyid;
      } else {
        try {
          const data = JSON.parse(ev.data) as any;
          if(data?.done !== undefined) {
            currentOllamaMessage.value += data.message.content as string ?? "";
            done.value = data.done;
            if(data.done) {
              ollamaMessages.value.push(currentOllamaMessage.value);
              messages.value.push(currentOllamaMessage.value);
              currentOllamaMessage.value = "";
            }
          }
        } catch (e) {
          console.info("Message from User");
          userMessages.value.push(ev.data as string);
          messages.value.push(ev.data as string);
        }
      }
      sseMessages.value.push(ev);
    },
    onerror(err) {
      currentError.value = err;
    },
  }).then((_) => {});
  return { sseMessages, currentError, streamId, historyId, done, currentOllamaMessage, ollamaMessages, messages };
}
