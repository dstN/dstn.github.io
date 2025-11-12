import { createApp } from "vue";
import "vue-fullpage.js/dist/style.css";
import VueFullPage from "vue-fullpage.js";
import "./assets/scss/style.scss";
import App from "./App.vue";

// Defer FontAwesome loading to improve FCP
const loadFontAwesome = () => {
  import("@fortawesome/fontawesome-free/css/all.css");
};

const app = createApp(App);
app.use(VueFullPage);
app.mount("#app");

// Load FontAwesome after initial render
if (document.readyState === "complete") {
  loadFontAwesome();
} else {
  window.addEventListener("load", loadFontAwesome);
}
