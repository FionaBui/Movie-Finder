<script setup>
// Tar emot en prop med filmdata
const props = defineProps({
  movie: Object,
});

const { movie } = props;
</script>

<template>
  <!-- Container for movie-card -->
  <div class="movies-content">
    <div v-if="movie.poster_path">
      <img
        :src="`https://image.tmdb.org/t/p/w500${movie.poster_path}`"
        :alt="movie.title"
        class="movie-image"
      />
    </div>
    <!-- Om ingen bild finns, visa en standardbild -->
    <div v-else>
      <img
        src="/assets/No_Image_Available.jpg"
        alt="No Image"
        class="movie-image default"
      />
    </div>
    <h4>
      {{ movie.title }}
    </h4>
    <p>Release Date: {{ movie.release_date }}</p>
  </div>
</template>

<style>
a {
  text-decoration: none;
  color: #fffefbe5;
}
.movie-card h4 {
  font-size: 16px;
  margin: 10px;
  padding-top: 10px;
}
.movie-card p {
  font-size: 14px;
}
.movie-image {
  width: 100%;
}
.movie-image.default {
  aspect-ratio: 500 / 750;
}
.btn {
  background-color: aliceblue;
}
</style>
