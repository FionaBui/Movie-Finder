<script setup>
import { ref, onMounted, watch } from "vue";
import axios from "axios";
import { useRoute } from "vue-router";
import CardMovie from "../components/CardMovie.vue";
import Pagination from "../components/Pagination.vue";

//Variabler för att lagra filmdata
const items = ref([]);
const totalPages = ref(0);
const PAGE_RANGE = 10;

// Hämta keyword från URL
const route = useRoute();
const keywordId = ref(route.query.keyword);

const apiKey = import.meta.env.VITE_TMDB_API_KEY;

// Funktion för att hämta data från API
const fetchItems = async (page) => {
  const response = await axios.get(
    `https://api.themoviedb.org/3/search/movie?query=${keywordId.value}&page=${page}&api_key=${apiKey}`
  );
  items.value = response.data.results; // Sparar filmer i movies-arrayen
  totalPages.value = response.data.total_pages;
};

watch(
  () => route.query.keyword,
  (newKeyword) => {
    keywordId.value = newKeyword;
  }
);

watch(keywordId, () => {
  fetchItems(1);
});

// Hämta filmer när komponenten laddas
onMounted(() => {
  fetchItems(1);
});
</script>
<template>
  <!-- Movies -->
  <div>
    <h1>Search results with keyword : {{ keywordId }}</h1>
    <div v-if="items.length === 0">Loading...</div>
    <div v-else class="movie-container">
      <div v-for="movie in items" :key="movie.id" class="movie-card">
        <router-link :to="`/movie/${movie.id}`">
          <CardMovie :movie="movie" />
        </router-link>
      </div>
    </div>
    <Pagination
      :totalPages="totalPages"
      :key="totalPages"
      :pageRange="PAGE_RANGE"
      @fetchData="fetchItems"
    />
  </div>
</template>
<style>
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
