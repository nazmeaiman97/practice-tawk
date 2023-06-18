import HomePage from "../pages/HomePage.vue";
import ArticlePage from "../pages/ArticlePage.vue";

const routes = [
  { name: "home", path: "/", component: HomePage },
  { name: "article", path: "/article/:id", component: ArticlePage },
];

export default routes;
