<script setup>
import { ref, onMounted, watch } from "vue";
import axios from "axios";
import { useRoute } from "vue-router";

// Hämta film-ID från URL
const route = useRoute();
const movieId = route.params.id;

// Skapa en variabel för filmdata
const movie = ref(null);
const credits = ref({ cast: [], crew: [] });
const similarMovies = ref([]);
const apiKey = import.meta.env.VITE_TMDB_API_KEY;

console.log(movie);

const fetchMovieDetails = async (movieId) => {
  console.log("begin detail");
  const movieResponse = await axios.get(
    `https://api.themoviedb.org/3/movie/${movieId}?api_key=${apiKey}&language=en-US`
  );
  console.log("end detail");

  movie.value = movieResponse.data;
  // // Hämta credits API
  console.log("begin credit");
  const creditResponse = await axios.get(
    `https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=${apiKey}`
  );
  console.log("end credit");

  credits.value = creditResponse.data;
  // Hämta similar API
  console.log("begin similar");
  const similarResponse = await axios.get(
    `https://api.themoviedb.org/3/movie/${movieId}/similar?api_key=${apiKey}`
  );
  console.log("end similar");
  similarMovies.value = similarResponse.data.results.slice(0, 8);
  console.log(similarMovies.value);
};

watch(
  () => route.params.id,
  (newMovieId) => {
    console.log("watch", newMovieId);
    fetchMovieDetails(newMovieId);
  }
);

// Skapa en variabel för filmdata

onMounted(() => {
  console.log("mounted");

  fetchMovieDetails(movieId);
});
</script>
<template>
  <div v-if="movie">
    <div class="container">
      <h1>{{ movie.title }}</h1>
      <!-- image -->
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
          <!-- Cast -->
          <div>
            <p><strong>Cast</strong></p>
            <div class="cast-container" v-if="credits.cast.length > 0">
              <div
                v-for="actor in credits.cast.slice(0, 4)"
                :key="actor.id"
                class="cast-card"
              >
                <img
                  :src="
                    actor.profile_path
                      ? `https://image.tmdb.org/t/p/w185${actor.profile_path}`
                      : 'https://via.placeholder.com/185'
                  "
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
  <div>
    <h2 v-if="similarMovies.length > 0">You may also like...</h2>
    <div v-if="similarMovies.length > 0" class="similar-movies-container">
      <div
        v-for="similar in similarMovies"
        :key="similar.id"
        class="similar-movie-card"
      >
        <RouterLink :to="`/movie/${similar.id}`">
          <img
            :src="
              similar.poster_path
                ? `https://image.tmdb.org/t/p/w185${similar.poster_path}`
                : 'https://via.placeholder.com/185'
            "
            :alt="similar.title"
          />
        </RouterLink>
        <p>{{ similar.title }}</p>
      </div>
    </div>
    <div v-else>No similar movies found.</div>
  </div>
</template>
<style scoped>
h1 {
  text-align: center;
  color: #f9ab00;
}
p {
  font-size: 18px;
}
.movie-content {
  display: flex;
  justify-content: space-between;
  align-items: flex-start; /* Đảm bảo các phần tử thẳng hàng */
  gap: 30px; /* Tạo khoảng cách giữa ảnh và thông tin */
  padding: 10px 20px;
  margin: 10px 20px;
}

.movie-content img {
  width: 400px; /* Đặt kích thước cố định cho ảnh */
  height: auto;
  border-radius: 10px;
}

.movie-info {
  flex: 1;
  max-width: 600px;
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
.similar-movies-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: left;
  gap: 15px;
  margin-top: 20px;
}

.similar-movie-card {
  width: 120px;
  text-align: center;
  cursor: pointer;
  transition: transform 0.2s ease-in-out;
}

.similar-movie-card:hover {
  transform: scale(1.1);
}

.similar-movie-card img {
  width: 100%;
  border-radius: 5px;
}

.similar-movie-card p {
  font-size: 14px;
  margin-top: 5px;
}
</style>
