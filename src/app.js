import Vue from "vue";
import App from "./App.vue";
import VueRouter from "vue-router";
import routes from "./router";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

Vue.use(VueRouter);
library.add(fas);
Vue.component("font-awesome-icon", FontAwesomeIcon);

const router = new VueRouter({
  routes,
});

new Vue({
  router,
  el: "#app",
  render: (h) => h(App),
});
