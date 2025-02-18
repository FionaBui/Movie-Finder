import { createRouter, createWebHashHistory } from "vue-router";
import HomeView from "./views/HomeView.vue";
import MovieDetailsView from "./views/MovieDetailsView.vue";
import SearchView from "./views/SearchView.vue";
import LoginView from "./views/LoginView.vue";
import FavoritesView from "./views/FavoritesView.vue";

// Defining routes
export default createRouter({
  history: createWebHashHistory(),
  routes: [
    { path: "/", component: HomeView },
    { path: "/movie/:id", component: MovieDetailsView },
    { path: "/search", component: SearchView },
    { path: "/login", component: LoginView },
    { path: "/favorites", component: FavoritesView },
  ],
});
