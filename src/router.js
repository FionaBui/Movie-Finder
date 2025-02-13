import { createRouter, createWebHashHistory } from "vue-router";
import HomeView from "./views/HomeView.vue";
import MovieDetailsView from "./views/MovieDetailsView.vue";
// import MoviesView from "./views/MoviesView.vue";
// import TvShowsView from "./views/TvShowsView.vue";

// Defining routes
export default createRouter({
  history: createWebHashHistory(),
  routes: [
    { path: "/", component: HomeView },
    { path: "/movie/:id", component: MovieDetailsView },
    // { path: "/movies", component: MoviesView },
    // { path: "/tvshows", component: TvShowView },
  ],
});
