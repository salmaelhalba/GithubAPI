<!-- In the script setup block, clientID is declared and a login function is defined -->
<script setup lang="js">

const clientID = "bedd18f6c7359755a50e";

// this Function is to initiate GitHub OAuth login by redirecting to the GitHub authorization URL with the clientID.
function login() {
  window.location.assign('https://github.com/login/oauth/authorize?client_id=' + clientID)
}

// Defineing the GitHub API endpoint URL.
const apiUrl = 'https://api.github.com/user/repos'; // Replace with your API endpoint
</script>

<!-- The template section defines the visual content of the page. -->
<template>
  <section class="flex items-center justify-center flex-col font-mono h-screen space-y-12">
    <div class="w-full flex space-x-4 justify-center">
      <h2 class="text-7xl text-youcan-600 font-bold">YouCan</h2>
      <h2 class="text-7xl text-slate-900 font-bold">GitHub</h2>
    </div>
    <div class="w-96 text-center">
      <p>
        The application I have developed as part of my coding challenge for
        <span class="font-bold text-youcan-600">YouCan</span>
        is designed to facilitate the process of accessing your GitHub account,
        enabling you to conveniently view all your repositories and commits in
        one place.
      </p>
    </div>

    <!-- A button that triggers the 'login' function when clicked to initiate the GitHub login process. -->
    <button @click="login()"
      class="bg-gradient-to-b from-youcan-700 to-youcan-600 py-3.5 text-sm px-16 rounded-lg text-youcan-50 font-semibold tracking-wide capitalize hover:shadow-lg hover:shadow-youcan-400 hover:scale-[1.02] transition-all duration-300">
      Login with your github account ?
    </button>
  </section>
</template>
