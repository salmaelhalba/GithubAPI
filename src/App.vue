<!-- This script block includes the Vue 3 setup -->
<script setup>
import SideBar from "./components/SideBar.vue"; // Importing the SideBar component
import { Octokit } from "Octokit"; // Importing Octokit for GitHub API requests
import { ref } from "vue"; // Importing ref for creating reactive variables
import Content from "./components/Content.vue"; // Importing the Content component
import arrowSvg from "./assets/arrow.svg"; // Importing an arrow SVG image
import { all } from "axios"; // Importing the 'all' function from Axios for HTTP requests

const isLoged = ref(false); // A reactive variable for user login status
const repos = ref({}); // A reactive variable to store user's repositories
const isBranch = ref(false); // A reactive variable for branch information
const branch = ref({}); // A reactive variable to store branch details
const clientSecret = "f782894ece97fb80485390f0b4bb44dd5aea1030"; // GitHub OAuth client secret
const clientID = "bedd18f6c7359755a50e"; // GitHub OAuth client ID
const commits = ref([]); // A reactive variable to store commit information

// Function to fetch user repositories from GitHub using OAuth token
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

  if (repos.value) {
    isLoged.value = true;
  }
  return result.data;
};

const url = window.location.href;
const urlParams = new URL(url);

// Function to retrieve branch name based on commit SHA
async function commitBranchName(sha, fullName) {
  const result = await fetch(
    "https://api.github.com/repos/" +
    fullName +
    "/commits/" +
    sha +
    "/branches-where-head"
  );

  const branchName = await result.json();
}

// Function to fetch commits for a specific repository
async function fetchCommits(fullName) {
  const result = await fetch(
    "https://api.github.com/repos/" + fullName + "/commits"
  );

  if (result.status === 403) {
    alert("rate limit exceeded");
    return;
  }
  const allcommits = await result.json();
  commits.value = [];

  // Map through commits and fetch their associated branch information
  allcommits.map(async (commit) => {
    const branchFetch = await fetch(
      `https://api.github.com/repos/${fullName}/commits/${commit.sha}/branches-where-head`
    );

    const branch = await branchFetch.json();
    commits.value.push({
      author: commit.author.login,
      message: commit.commit.message,
      branch: branch[0] ? branch[0].name : "main",
    });
  });

  isBranch.value = true;
}

// Check if there is a GitHub login code in the URL and exchange it for an access token
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

<!-- The template section defines the visual content of the page -->
<template>
  <div class="container max-w-7xl mx-auto">
    <!-- Include the SideBar component -->
    <SideBar />

    <div class="w-full flex justify-center items-center flex-row">
      <!-- Display a back button when 'isBranch' is true -->
      <button
        class="flex space-x-2 items-center justify-center bg-gradient-to-b from-youcan-700 to-youcan-600 py-2 text-sm px-16 rounded-lg text-youcan-50 font-semibold tracking-wide capitalize hover:shadow-lg hover:shadow-youcan-400 hover:scale-[1.02] transition-all duration-300"
        v-if="isBranch" @click="isBranch = false">
        <span>
          <img class="h-8 w-auto" :src="arrowSvg" alt="" />
        </span>
        <span> Back ? </span>
      </button>
    </div>

    <div class="!flex w-full" v-if="!isBranch" v-for="repo in repos">
      <!-- Include the Content component for each repository -->
      <Content :id="repo.id" :fullName="repo.full_name" :commitsUrl="repo.commits_url" :fetchCommits="fetchCommits" />
    </div>

    <!-- Display commit information when 'isBranch' is true -->
    <div v-if="isBranch" v-for="key in commits">
      <p><strong>Author:</strong> {{ key.author }}</p>
      <br />
      <p><strong>Message:</strong> {{ key.message }}</p>
      <br />
      <p><strong>Branch:</strong> {{ key.branch }}</p>
      <br />
      <hr />
    </div>
  </div>
</template>
