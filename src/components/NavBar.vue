<script setup>
import { onMounted, ref, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import api from "../api";

const keyword = ref("");
const account = ref(null);
const route = useRoute();
const router = useRouter();

console.log("acount", account);

// Vue Router instance to handle navigation

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

const fetchAccountDetail = async () => {
  const sessionId = localStorage.getItem("sessionId");
  const accountResponse = await api.get(`/account?session_id=${sessionId}`);
  account.value = accountResponse.data;
};

watch(
  () => route.query.isLogin,
  (isLoginValue) => {
    if (isLoginValue) {
      fetchAccountDetail();
    }
  }
);
// {"session_id": "55559e82ceba5d04c48edbb38ae793a0582a1307"}

onMounted(() => {
  fetchAccountDetail();
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
        <li><router-link to="/movies">Movies</router-link></li>
        <!-- Search -->
        <div class="search-container">
          <input type="text" v-model="keyword" @keydown.enter="handleSearch" />
          <button @click="handleSearch">
            <i class="fa-solid fa-magnifying-glass"></i>
          </button>
        </div>
        <div class="account-container">
          <ul v-if="account">
            <li>
              {{ account.username }}
              <router-link to="/">Logout</router-link>
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
body {
  background-color: black;
  color: white;
  margin: 50px 100px;
  font-family: "Quicksand", serif;
  overflow: auto;
}

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
.account-container {
  padding: 5px 15px;
}
.account-container li {
  color: #f9ab00;
}
</style>
