<script setup>
import { ref, onMounted, watch } from "vue";
import api from "../api";
import { useRoute, useRouter } from "vue-router";
import CardMovie from "../components/CardMovie.vue";
import Pagination from "../components/Pagination.vue";

//variables to store movie data
const items = ref([]);
const totalPages = ref(0);
const PAGE_RANGE = 10;

// Get the keyword from the URL
const route = useRoute();
const router = useRouter();
const sessionId = localStorage.getItem("sessionId");

if (!sessionId) {
  router.push("/login");
}

// Function to fetch movies based on the search keyword
const fetchItems = async (page) => {
  const response = await api.get(
    `account/{account_id}/favorite/movies?session_id=${sessionId}&page=${page}`
  );
  items.value = response.data.results; // Sparar filmer i movies-arrayen
  totalPages.value = response.data.total_pages;
};

// Fetch search results when the component is mounted
onMounted(() => {
  fetchItems(1);
});
</script>
<template>
  <!-- Movies -->
  <div>
    <!-- Display message if no results are found -->
    <div v-if="items.length === 0">
      <h1>No results found</h1>
    </div>
    <div v-else>
      <h1>Search results with keyword :</h1>
      <div class="movie-container">
        <div v-for="movie in items" :key="movie.id" class="movie-card">
          <router-link :to="`#`">
            <!-- <router-link :to="`/movie/${movie.id}`"> -->
            <CardMovie :movie="movie" @fetchData="fetchItems" />
          </router-link>
        </div>
      </div>
    </div>
    <!-- Show pagination only if there are results -->
    <div v-if="items.length !== 0">
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
