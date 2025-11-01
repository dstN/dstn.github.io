import { createApp } from "vue";
import "vue-fullpage.js/dist/style.css";
import VueFullPage from "vue-fullpage.js";
import "@fortawesome/fontawesome-free/css/all.css";
import "./assets/scss/style.scss";
import App from "./App.vue";

const app = createApp(App);
app.use(VueFullPage);
app.mount("#app");
