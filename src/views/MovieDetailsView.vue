<script setup>
import { ref, onMounted, watch } from "vue";
import api from "../api";
import { useRoute, useRouter } from "vue-router";

// Extract the movie ID from the URL
const route = useRoute();
const router = useRouter();
const movieId = route.params.id;

// Define reactive variables to store movie details
const movie = ref(null);
const credits = ref({ cast: [], crew: [] });
const similarMovies = ref([]);

console.log(movie);

// Function to fetch movie details from the API
const fetchMovieDetails = async (movieId) => {
  try {
    const movieResponse = await api.get(`movie/${movieId}`);
    movie.value = movieResponse.data;
  } catch (err) {
    router.push("/");
  }

  // Fetch movie credits
  const creditResponse = await api.get(`movie/${movieId}/credits`);

  credits.value = creditResponse.data;
  // Fetch similar movies
  const similarResponse = await api.get(`movie/${movieId}/similar`);
  similarMovies.value = similarResponse.data.results.slice(0, 8); // Store only the first 8 similar movies
  console.log(similarMovies.value);
};
// Watches for changes in `route.params.id`. When the ID changes, it logs the new value and fetches movie details.
watch(
  () => route.params.id,
  (newMovieId) => {
    console.log("watch", newMovieId);
    fetchMovieDetails(newMovieId);
  }
);

// Fetch movie details when the component is mounted
onMounted(() => {
  console.log("mounted");
  fetchMovieDetails(movieId);
});
</script>
<template>
  <div v-if="movie">
    <div class="container">
      <h1>{{ movie.title }}</h1>
      <!-- Movie Image and Information -->
      <div class="movie-content">
        <img
          :src="`https://image.tmdb.org/t/p/w500${movie.poster_path}`"
          :alt="movie.title"
        />
        <!-- movie info -->
        <div class="movie-info">
          <div>
            <p v-if="credits.crew.length > 0">
              <strong>Director:</strong>
              {{
                credits.crew.find((person) => person.job === "Director")
                  ?.name || "Unknown"
              }}
            </p>
            <p v-if="movie.origin_country.length > 0">
              <strong>Country:</strong> {{ movie.origin_country.join(",") }}
            </p>
            <p>
              <strong>Genres:</strong>
              {{ movie.genres.map((genre) => genre.name).join(",") }}
            </p>
            <p><strong>Primiere:</strong> {{ movie.release_date }}</p>
            <p><strong>Overview:</strong> {{ movie.overview }}</p>
            <p><strong>Duration:</strong> {{ movie.runtime }} min</p>
            <p><strong>Rating:</strong> {{ movie.vote_average.toFixed(1) }}</p>
          </div>
          <!-- Casts -->
          <div>
            <p><strong>Cast</strong></p>
            <div class="cast-container" v-if="credits.cast.length > 0">
              <div
                v-for="actor in credits.cast.slice(0, 4)"
                :key="actor.id"
                class="cast-card"
              >
                <img
                  :src="`https://image.tmdb.org/t/p/w185${actor.profile_path}`"
                  :alt="actor.name"
                />
                <p>{{ actor.name }} as {{ actor.character }}</p>
              </div>
            </div>
            <p v-else>No cast information available.</p>
          </div>
        </div>
      </div>
    </div>
  </div>
  <!-- Similar Movies Section -->
  <div class="container">
    <h2 v-if="similarMovies.length > 0">You may also like...</h2>
    <div v-if="similarMovies.length > 0" class="similar-movies-container">
      <div
        v-for="similar in similarMovies"
        :key="similar.id"
        class="similar-movie-card"
      >
        <RouterLink :to="`/movie/${similar.id}`">
          <div v-if="similar.poster_path">
            <img
              :src="`https://image.tmdb.org/t/p/w185${similar.poster_path}`"
              :alt="similar.title"
              class="similar-movie-image"
            />
          </div>
          <div v-else>
            <img
              src="/assets/No_Image_Available.jpg"
              alt="No Image"
              class="similar-movie-image default"
            />
          </div>
        </RouterLink>
        <p>{{ similar.title }}</p>
      </div>
    </div>
    <h2 v-else>No similar movies found.</h2>
  </div>
</template>
<style scoped>
h1 {
  text-align: left;
  color: #f9ab00;
  padding: 20px 0;
}
p {
  font-size: 18px;
}
.movie-content {
  display: flex;
  justify-content: left;
  align-items: flex-start;
  gap: 30px;
}

.movie-content img {
  width: 40%;
  height: auto;
  border-radius: 10px;
}

.movie-info {
  flex: 1;
  max-width: 70%;
}

.cast-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: left;
  gap: 10px;
  margin-top: 20px;
}
.cast-card {
  width: 100px;
}
.cast-card img {
  width: 100%;
  height: auto;
  border-radius: 5px;
}
.cast-card p {
  font-size: 14px;
}
.container {
  margin: 0 30px;
}
.similar-movies-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: left;
  gap: 15px;
  margin-top: 20px;
}

.similar-movie-card {
  text-align: center;
  cursor: pointer;
  transition: transform 0.2s ease-in-out;
  width: 200px;
}

.similar-movie-card:hover {
  transform: scale(1.1);
}

.similar-movie-image {
  width: 100%;
  border-radius: 5px;
}

.similar-movie-image.default {
  aspect-ratio: 185 / 278;
}

.similar-movie-card p {
  font-size: 16px;
  margin-top: 5px;
}
</style>
