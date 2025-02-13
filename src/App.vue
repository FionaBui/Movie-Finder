<script setup></script>

<template>
  <div>
    <header class="header-content">
      <router-link to="/"
        ><img src="../assets/Movie.jpg" alt="logo" class="header-logo"
      /></router-link>
      <nav>
        <li><router-link to="/">Home</router-link></li>
        <li><router-link to="/movies">Movies</router-link></li>
        <li><router-link to="/tvshows">TV Shows</router-link></li>
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
.header-content {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  background: #000000;
  color: white;
}
h1 {
  color: #f9ab00;
}
p {
  font-size: 18px;
}
nav {
  display: flex;
  padding: 10px;
  text-align: center;
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
</style>
