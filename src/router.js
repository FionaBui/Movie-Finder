import { createRouter, createWebHashHistory } from "vue-router";
import HomeView from "./views/HomeView.vue";
import MovieDetailsView from "./views/MovieDetailsView.vue";
import SearchView from "./views/SearchView.vue";
// import TvShowsView from "./views/TvShowsView.vue";

// Defining routes
export default createRouter({
  history: createWebHashHistory(),
  routes: [
    { path: "/", component: HomeView },
    { path: "/movie/:id", component: MovieDetailsView },
    { path: "/search", component: SearchView },
    // { path: "/tvshows", component: TvShowView },
  ],
});
