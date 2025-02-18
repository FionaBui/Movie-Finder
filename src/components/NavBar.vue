<script setup>
import { onMounted, ref, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import api from "../api";

const keyword = ref("");
const account = ref(null);
const route = useRoute();
const router = useRouter();
const totalsFavorite = ref(0);

// Function to handle search and navigate to the search results page
function handleSearch() {
  router.push(`/search?keyword=${keyword.value}`);
  if (keyword.value) {
    // Navigate to the search page with the keyword as a query parameter
    router.push({
      path: "/search",
      query: { keyword: keyword.value },
    });
  }
}
// Function to fetch user account details from TMDB API
const fetchAccountDetail = async () => {
  try {
    const sessionId = localStorage.getItem("sessionId");
    const accountResponse = await api.get(`/account?session_id=${sessionId}`);
    account.value = accountResponse.data;
  } catch (err) {
    localStorage.removeItem("sessionId");
    account.value = null;
  }
};
// Function to handle user logout
const handleLogout = async () => {
  if (confirm("are you sure?")) {
    const sessionId = localStorage.getItem("sessionId");
    await api.delete(`/authentication/session`, {
      data: { session_id: sessionId },
    });
    localStorage.removeItem("sessionId");
    account.value = null;
    router.push("/");
  }
};
const fetchFavorites = async () => {
  const sessionId = localStorage.getItem("sessionId");
  const response = await api.get(
    `account/{account_id}/favorite/movies?session_id=${sessionId}`
  );
  const totalsFavoriteRes = response.data.total_results;
  totalsFavorite.value = totalsFavoriteRes;
  // localStorage.setItem("totals_favorite", totalsFavoriteRes);
};
// Watch for changes in the login status and fetch account details when needed
watch(
  () => route.query.isLogin,
  (isLoginValue) => {
    if (isLoginValue) {
      fetchAccountDetail();
      fetchFavorites();
    }
  }
);

// Fetch user account details when the component is mounted
onMounted(() => {
  fetchAccountDetail();
  fetchFavorites();
});
</script>

<template>
  <div>
    <header class="header-content">
      <!-- logo -->
      <router-link to="/"
        ><img src="/assets/Movie.jpg" alt="logo" class="header-logo"
      /></router-link>
      <nav>
        <li><router-link to="/">Home</router-link></li>
        <li v-if="account">
          <router-link to="/favorites"
            >Favorites (<span id="totalsFavorite">{{ totalsFavorite }}</span
            >)</router-link
          >
        </li>
        <!-- Search -->
        <div class="search-container">
          <input type="text" v-model="keyword" @keydown.enter="handleSearch" />
          <button @click="handleSearch">
            <i class="fa-solid fa-magnifying-glass"></i>
          </button>
        </div>
        <!-- Account -->
        <div class="account-container">
          <ul v-if="account">
            <li>
              {{ account.username }}
              <button @click="handleLogout" class="btn-logout">Logout</button>
            </li>
          </ul>
          <ul v-else>
            <li><router-link to="/login">Login</router-link></li>
          </ul>
        </div>
      </nav>
    </header>
  </div>
</template>
<style>
/* #app {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
} */
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
  font-size: 20px;
  text-decoration: none;
  margin: 0 15px;
}
.header-logo {
  width: 250px;
}
/* Search */
.search-container {
  display: flex;
  border: 1px;
  background: #2c2c2c;
  width: 200px;
}
.search-container input {
  width: calc(100% - 30px);
  height: 20px;
  padding: 5px 15px;
  background: transparent;
  color: aliceblue;
  border: 2px solid transparent;
  font-size: 16px;
}
.search-container input:focus {
  outline: none;
}
.search-container i {
  font-size: 20px;
  padding: 5px 15px;
}
.account-container {
  padding: 5px 15px;
}
.account-container li {
  color: #f9ab00;
}
.btn-logout {
  color: #ccc;
}
@media (min-width: 768px) {
}
@media (min-width: 1200px) {
}
</style>
