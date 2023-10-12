<script setup>
import SideBar from "./components/SideBar.vue";
import { Octokit } from "Octokit";
import { ref } from "vue";
import Content from "./components/Content.vue";
const repos = ref({});

const clientSecret = "f782894ece97fb80485390f0b4bb44dd5aea1030";
const clientID = "bedd18f6c7359755a50e";
const fetchRepos = async (token) => {
  const octokit = new Octokit({
    auth: token,
  });
  const result = await octokit.request("GET /user/repos", {
    headers: {
      "X-Github-Api-Version": "2022-11-28",
    },
  });
  repos.value = result.data;
  for (let i of result.data) {
    console.log(i);
  }
  return result.data;
};

const url = window.location.href;
const urlParams = new URL(url);

const loginCode = urlParams.searchParams.get("code");
if (loginCode) {
  fetch(
    "https://github.com/login/oauth/access_token" +
      "?client_id=" +
      clientID +
      "&client_secret=" +
      clientSecret +
      "&code=" +
      loginCode
  )
    .then((result) => result.text())
    .then((response) => {
      let match = response.match(/access_token=([^&]*)/);

      if (match && match.length > 1) {
        let accessToken = match[1];
        fetchRepos(accessToken);
      } else {
        window.location.assign("/");
      }
    });
}
</script>
<template>
  <div class="flex flex-col min-h-screen bg-color-primary">
    <SideBar />
    <div v-for="repo in repos">
      <Content :fullName="repo.full_name" :commitsUrl="repo.commits_url" />
    </div>
  </div>
</template>
