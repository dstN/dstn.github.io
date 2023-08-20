import { createApp } from "vue";
import "./style.scss";
import "vue-fullpage.js/dist/style.css";
import VueFullPage from "vue-fullpage.js";
import App from "./App.vue";

const app = createApp(App);
app.use(VueFullPage);
app.mount("#app");
