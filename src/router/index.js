import HomePage from "../pages/HomePage.vue";
import ArticlePage from "../pages/ArticlePage.vue";
import SearchArticlePage from "../pages/SearchArticlePage.vue";

const routes = [
  { name: "home", path: "/", component: HomePage },
  { name: "article", path: "/article/:id", component: ArticlePage },
  {
    name: "search-articles",
    path: "/articles-search/:title",
    component: SearchArticlePage,
  },
];

export default routes;
