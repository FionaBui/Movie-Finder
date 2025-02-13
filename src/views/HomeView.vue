<script setup>
import { ref, onMounted, watch } from "vue";
import axios from "axios";
import CardMovie from "../components/CardMovie.vue";
import Pagination from "../components/Pagination.vue";

//Variabler för att lagra filmdata
const movies = ref([]);

const totalPages = ref(0);
const PAGE_RANGE = 7;

const apiKey = import.meta.env.VITE_TMDB_API_KEY;
// Funktion för att hämta data från API
const fetchMovies = async (page) => {
  const response = await axios.get(
    `https://api.themoviedb.org/3/movie/now_playing?page=${page}&limit=5&api_key=${apiKey}`
  );
  movies.value = response.data.results; // Sparar filmer i movies-arrayen
  totalPages.value = response.data.total_pages;
};

// Hämta filmer när komponenten laddas
onMounted(() => {
  fetchMovies(1);
});
</script>
<template>
  <div>
    <h1>Now Playing</h1>

    <div v-if="movies.length === 0">Loading...</div>
    <div v-else class="movie-container">
      <div v-for="movie in movies" :key="movie.id" class="movie-card">
        <CardMovie :movie="movie" />
        <!-- <router-link :to="`/movie/${movie.id}`">
          <img
            :src="`https://image.tmdb.org/t/p/w500${movie.poster_path}`"
            :alt="movie.title"
            class="movie-image"
          />
          <h2>{{ movie.title }}</h2>
          <p>Release Date: {{ movie.release_date }}</p>
        </router-link> -->
      </div>
    </div>
    <Pagination
      :totalPages="totalPages"
      :key="totalPages"
      :pageRange="PAGE_RANGE"
      @fetchData="fetchMovies"
    />
  </div>
</template>
<style scoped>
h1 {
  text-align: center;
}
.movie-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 20px;
  padding: 20px;
}
.movie-card {
  width: calc(100% / 3 - 30px);
  text-align: center;
  /* border: 1px solid; */
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  background: none;
  transition: transform 0.3s ease-in-out;
}
@media (min-width: 768px) {
  .movie-card {
    width: calc(100% / 4 - 20px);
  }
}

@media (min-width: 1200px) {
  .movie-card {
    width: calc(100% / 5 - 20px);
  }
}
.movie-card:hover {
  transform: scale(1.05);
}
</style>
