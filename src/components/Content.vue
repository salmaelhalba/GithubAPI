<template>
    <div>
        <h2>Repository Details</h2>
        <div v-if="repo">
            <h3>{{ repo.name }}</h3>
            <p>Description: {{ repo.description }}</p>
            <p>Language: {{ repo.language }}</p>
            <p>Stars: {{ repo.stargazers_count }}</p>


            <h2>Commit Details</h2>
            <ul>
                <li v-for="commit in commits" :key="commit.sha">
                    <strong>{{ commit.commit.author.name }}</strong> - {{ commit.commit.message }}
                </li>
            </ul>
        </div>
        <div v-else>
            <p>Loading...</p>
            <p>{{id}}</p>

        </div>
    </div>
</template>


<script setup lang="js">
import { ref, watch, onMounted } from 'vue';
import axios from 'axios';

const id = ref(null);
const repo = ref(null);
const commits = ref([]);
const token = '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'; // Replace with your actual Bearer token

const apiUrl = 'https://api.github.com/user';

onMounted(async () => {
    try {
        const response = await axios.get(apiUrl, {
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        });
        repo.value = response.data;
        console.log(repo.value);
    } catch (error) {
        console.error(error);
    }
});

watch(id, async (newId) => {
    if (newId) {
        const repoApiUrl = `https://api.github.com/repositories/${newId}`;

        try {
            const response = await axios.get(repoApiUrl, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });
            repo.value = response.data;

            const owner = repo.value.owner.login;
            const repoName = repo.value.name;

            const commitsApiUrl = `https://api.github.com/repos/${owner}/${repoName}/commits`;

            const commitsResponse = await axios.get(commitsApiUrl, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });

            commits.value = commitsResponse.data;
            console.log(commits.value);
        } catch (error) {
            console.error(error);
        }
    }
});
</script>
