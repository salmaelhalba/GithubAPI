<template>
  <section class="flex items-center justify-center flex-col font-mono h-screen space-y-12">
    <div class="w-full flex space-x-4 justify-center">
      <h2 class="text-7xl text-youcan-600 font-bold">YouCan</h2>
      <h2 class="text-7xl text-slate-900 font-bold">GitHub</h2>
    </div>
    <div class="w-96 text-center">
      <p>
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima
      exercitationem atque aliquam error <span class="font-bold text-youcan-600">obcaecati</span> nostrum natus vitae aperiam
      repudiandae quibusdam.
    </p>
    </div>
    <button
      @click="login()"
      class="bg-gradient-to-b from-youcan-700 to-youcan-600 py-3.5 text-sm px-16 rounded-lg text-youcan-50 font-semibold tracking-wide capitalize hover:shadow-lg hover:shadow-youcan-400 hover:scale-[1.02] transition-all duration-300"
    >
      Login with your github account ?
    </button>
  </section>
</template>
<script setup lang="js">

const clientID = "bedd18f6c7359755a50e";

function login() {
    window.location.assign('https://github.com/login/oauth/authorize?client_id='+clientID)
}


const apiUrl = 'https://api.github.com/user/repos'; // Replace with your API endpoint
</script>
