<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
const keyword = ref("");
const router = useRouter();
function handleSearch() {
  // router.push(`/search?keyword=${keyword.value}`);
  if (keyword.value) {
    router.push({
      path: "/search",
      query: { keyword: keyword.value },
    });
  } else {
  }

  // search?key=abc -> query
  // movie/1 -> param
}
</script>

<template>
  <div>
    <header class="header-content">
      <!-- logo -->
      <router-link to="/"
        ><img src="../assets/Movie.jpg" alt="logo" class="header-logo"
      /></router-link>
      <nav>
        <li><router-link to="/">Home</router-link></li>
        <li><router-link to="/movies">Movies</router-link></li>
        <li><router-link to="/tvshows">TV Shows</router-link></li>
        <!-- Search -->
        <div class="search-container">
          <input type="text" v-model="keyword" />
          <button @click="handleSearch">
            <i class="fa-solid fa-magnifying-glass"></i>
          </button>
        </div>
      </nav>
    </header>
    <router-view></router-view>
  </div>
</template>
<style>
body {
  background-color: black;
  color: white;
  margin: 0;
  padding: 0;
  font-family: "Quicksand", serif;
  box-sizing: border-box;
}

#app {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
}
h1 {
  color: #f9ab00;
}
p {
  font-size: 18px;
}
/* Header */
.header-content {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  background: #000000;
  color: white;
}

nav {
  display: flex;
  align-items: center;
  padding: 10px;
  margin-right: 30px;
}

nav li {
  list-style-type: none;
  color: white;
  text-decoration: none;
  margin: 0 15px;
}
.header-logo {
  width: 200px;
}
/* Search */
.search-container {
  border: 1px;
  background: #2c2c2c;
}
.search-container input {
  width: 150px;
  height: 20px;
  padding: 5px 15px;
  background: transparent;
  color: aliceblue;
  border: 2px solid transparent;
  font-size: 16px;
}
.search-container i {
  font-size: 20px;
  padding: 5px 15px;
}
</style>
