import "./assets/main.css";

import { createApp } from "vue";
import { createPinia } from "pinia";
import piniaPluginPersistedstate from "pinia-plugin-persistedstate";

import App from "./App.vue";
import router from "./router";

const app = createApp(App);

const pinia = createPinia();
// 註冊持久化插件
pinia.use(piniaPluginPersistedstate);
app.use(pinia);

// app.use(createPinia())
app.use(router);

app.mount("#app");
