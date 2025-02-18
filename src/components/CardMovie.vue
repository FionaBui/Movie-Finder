<script setup>
import { useRoute } from "vue-router";
import api from "../api";
import { onMounted, ref } from "vue";
// Tar emot en prop med filmdata
const props = defineProps({
  movie: Object,
});
const emit = defineEmits(["fetchData"]);

const { movie } = props;
const route = useRoute();
const isAdd = ref(!route.path.includes("favorites"));

const sessionId = localStorage.getItem("sessionId");
const handleFavorite = async () => {
  const data = {
    media_id: movie.id,
    media_type: "movie",
    favorite: isAdd.value,
  };
  const response = await api.post(
    `account/{account_id}/favorite?session_id=${sessionId}`,
    data
  );
  if (response.data.success) {
    let favoriteIds = JSON.parse(localStorage.getItem("favoriteIds")) || [];
    let totalsFavorite = favoriteIds.length;
    if (response.data.status_code === 13) {
      // delete
      totalsFavorite--;
      favoriteIds = favoriteIds.filter((id) => id !== movie.id);
      emit("fetchData", 1);
      isAdd.value = true;
    } else {
      isAdd.value = false;
      totalsFavorite++;
      favoriteIds.push(movie.id);
    }
    localStorage.setItem("favoriteIds", JSON.stringify(favoriteIds));
    document.getElementById("totalsFavorite").textContent = totalsFavorite;
  }
};

onMounted(() => {
  const localFavoriteIds =
    JSON.parse(localStorage.getItem("favoriteIds")) || [];
  if (localFavoriteIds.includes(movie.id)) {
    isAdd.value = false;
  }
});
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
      <button v-if="sessionId" class="btn" @click="handleFavorite">
        {{ isAdd ? "Add" : "Remove" }}
      </button>
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
