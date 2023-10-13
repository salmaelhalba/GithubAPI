<script setup>
import SideBar from "./components/SideBar.vue";
import { Octokit } from "Octokit";
import { ref } from "vue";
import Content from "./components/Content.vue";
import arrowSvg from "./assets/arrow.svg";

const isLoged = ref(false);
const repos = ref({});
const isBranch = ref(false);
const clientSecret = "f782894ece97fb80485390f0b4bb44dd5aea1030";
const clientID = "bedd18f6c7359755a50e";
const commits = ref([]);
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

  if (repos.value) {
    isLoged.value = true;
  }
  return result.data;
};

const url = window.location.href;
const urlParams = new URL(url);

async function fetchCommits(fullName) {
  const result = await fetch(
    "https://api.github.com/repos/" + fullName + "/commits"
  );
  const fetchedCommits = await result.json();
  isBranch.value = true;
  commits.value = fetchedCommits;
}
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
  <div class="container max-w-7xl mx-auto">
    <SideBar />
    <div class="w-full flex justify-center items-center flex-row">
      <button class="flex space-x-2 items-center justify-center bg-gradient-to-b from-youcan-700 to-youcan-600 py-2 text-sm px-16 rounded-lg text-youcan-50 font-semibold tracking-wide capitalize hover:shadow-lg hover:shadow-youcan-400 hover:scale-[1.02] transition-all duration-300" v-if="isBranch" @click="isBranch = false">
        <span>
          <img class="h-8 w-auto" :src="arrowSvg" alt="" />
        </span>
        <span> Back ? </span>
      </button>
    </div>
    <div class="!flex w-full" v-if="!isBranch" v-for="repo in repos">
      <Content
        :id="repo.id"
        :fullName="repo.full_name"
        :commitsUrl="repo.commits_url"
        :fetchCommits="fetchCommits"
      />
    </div>
    <div v-if="isBranch" v-for="key in commits">
      <div>{{ key.commit.message }}</div>
      <div>{{ key.commit.author.date }}</div>
    </div>
  </div>
</template>
