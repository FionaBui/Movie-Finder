<script setup>
import { ref, onMounted, watch } from "vue";
import api from "../api";
import { useRoute } from "vue-router";
import CardMovie from "../components/CardMovie.vue";
import Pagination from "../components/Pagination.vue";

//variables to store movie data
const items = ref([]);
const totalPages = ref(0);
const PAGE_RANGE = 10;

// Get the keyword from the URL
const route = useRoute();
const keywordId = ref(route.query.keyword); // Stores the search query

// Function to fetch movies based on the search keyword
const fetchItems = async (page) => {
  const response = await api.get(
    `search/movie?query=${keywordId.value}&page=${page}`
  );
  items.value = response.data.results; // Sparar filmer i movies-arrayen
  totalPages.value = response.data.total_pages;
};
// Watch for changes in the keyword from the route and update it.When the keyword changes, it updates `keywordId.value` with the new value
watch(
  () => route.query.keyword,
  (newKeyword) => {
    keywordId.value = newKeyword;
  }
);
// Watch for changes in the keyword and fetch new search results
watch(keywordId, () => {
  fetchItems(1);
});

// Fetch search results when the component is mounted
onMounted(() => {
  fetchItems(1);
});
</script>
<template>
  <!-- Movies -->
  <div>
    <!-- Display message if no results are found -->
    <div v-if="keywordId === '' || items.length === 0">
      <h1>No results found</h1>
    </div>
    <div v-else>
      <h1>Search results with keyword : {{ keywordId }}</h1>
      <div class="movie-container">
        <div v-for="movie in items" :key="movie.id" class="movie-card">
          <router-link :to="`/movie/${movie.id}`">
            <CardMovie :movie="movie" />
          </router-link>
        </div>
      </div>
    </div>
    <!-- Show pagination only if there are results -->
    <div v-if="keywordId && items.length !== 0">
      <Pagination
        :totalPages="totalPages"
        :key="totalPages"
        :pageRange="PAGE_RANGE"
        @fetchData="fetchItems"
      />
    </div>
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
