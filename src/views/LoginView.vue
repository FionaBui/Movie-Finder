<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import api from "../api";

const userName = ref("");
const password = ref("");
const errorMessage = ref("");
const router = useRouter();

const handleLogin = async () => {
  try {
    // 1. get request token tu TMDB
    const requestTokenResponse = await api.get("authentication/token/new");
    const requestToken = requestTokenResponse.data.request_token;
    // 2.  Send a POST request to validate login credentials (username, password, and request token)
    const loginResponse = await api.post(
      "authentication/token/validate_with_login",
      {
        username: userName.value,
        password: password.value,
        request_token: requestToken,
      }
    );
    console.log(loginResponse);

    // If login is successful
    if (loginResponse.data.success) {
      // 3. Send a POST request to create a new session using the request token
      const sessionResponse = await api.post("authentication/session/new", {
        request_token: requestToken,
      });
      // Retrieve session ID from the response and store it in localStorage
      const sessionId = sessionResponse.data.session_id;
      // Redirect to the home page and pass query parameters to indicate successful login
      localStorage.setItem("sessionId", sessionId);
      router.push({ path: "/", query: { isLogin: true } });
    }
  } catch (err) {
    // If wrong password or usernam
    if (err.response) {
      errorMessage.value = "Invalid username or password. Please try again.";
      console.log(errorMessage);
    } else {
      errorMessage.value = "Something went wrong. Please try again later.";
    }
  }
};
</script>
<template>
  <div class="login-form">
    <form @submit.prevent="handleLogin">
      <h2>Login</h2>
      <!-- Display error message if login fails -->
      <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>

      <label for="username">Username</label>
      <input
        id="username"
        type="text"
        v-model="userName"
        class="input-field"
        required
      />
      <label for="password">Password</label>
      <input
        id="password"
        type="password"
        v-model="password"
        class="input-field"
        required
      />
      <button type="submit" class="btn">Login</button>
    </form>
  </div>
</template>
<style>
.login-form {
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 35px;
}
form {
  display: flex;
  flex-direction: column;
  width: 300px;
  padding: 20px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
}
.input-field {
  padding: 8px 0;
}
label {
  padding: 10px 0;
}
.btn {
  color: #ccc;
  border: 1px solid #ccc;
  width: 50px;
  margin: 15px 0;
  padding: 5px;
}
.btn:hover {
  transform: scale(1.1);
  border: 1px solid #f9ab00;
}
</style>
