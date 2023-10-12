<template>
  <header class="sticky top-0 bg-color-primary">
    <div>
      <div></div>
      <h2>Select an Option:</h2>
      <select v-model="selectedRepo" @change="handleChange">
        <option v-for="repo in repos" :key="repo.id" :value="repo.name">
          <div>
            <p @click="console.log('test')">{{ repo.name }}</p>
          </div>
        </option>
      </select>
    </div>
    <Content :id="selectedRepo" />
    <button @click="login()">Login</button>
  </header>
</template>
<script setup lang="js">
import { ref } from "vue";
import Content from './Content.vue'

const clientID = "bedd18f6c7359755a50e";

function login() {
    window.location.assign('https://github.com/login/oauth/authorize?client_id='+clientID)
}







const repos = ref({})


async function handleChange(e) {
    const name = e.target.value;

    const allRepos = repos._value;


    const currentRepo = await allRepos.find(repo => repo.name == name)

    console.log();
    const response = await octokit.request('GET /repos/{owner}/{repo}', {
        owner: currentRepo.full_name.split('/')[0],
        repo: currentRepo.full_name.split('/')[1]
    });

    console.log(response);

}

const apiUrl = 'https://api.github.com/user/repos'; // Replace with your API endpoint
</script>
