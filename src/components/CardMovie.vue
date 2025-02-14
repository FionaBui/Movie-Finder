<script setup>
defineProps(["movie"]);
</script>

<template>
  <!-- <router-link :to="`/movie/${movie.id}`"> -->
  <img
    :src="`https://image.tmdb.org/t/p/w500${movie.poster_path}`"
    :alt="movie.title || movie.name"
    class="movie-image"
  />
  <h4>
    {{ movie.title || movie.name }}
  </h4>
  <p>Release Date: {{ movie.release_date || movie.first_air_date }}</p>
  <!-- </router-link> -->
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
  height: auto;
}
</style>
