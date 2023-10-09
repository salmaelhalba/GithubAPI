<template>
    <div>
        <h2>Repository Details</h2>
        <div v-if="repo">
            <h3>{{ repo.name }}</h3>
            <p>Description: {{ repo.description }}</p>
            <p>Language: {{ repo.language }}</p>
            <p>Stars: {{ repo.stargazers_count }}</p>
            <!-- Add more repository details as needed -->

            <h2>Commit Details</h2>
            <ul>
                <li v-for="commit in commits" :key="commit.sha">
                    <strong>{{ commit.commit.author.name }}</strong> - {{ commit.commit.message }}
                </li>
            </ul>
        </div>
        <div v-else>
            <p>Loading...</p>
        </div>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    name: 'Content',
    data() {
        return {
            repo: null,
            commits: [],
        };
    },
    mounted() {
        const owner = 'owner_username'; // Replace with the owner's GitHub username
        const repoName = 'repository_name'; // Replace with the repository's name

        // Fetch repository details
        axios
            .get(`https://api.github.com/repos/${owner}/${repoName}`)
            .then(response => {
                this.repo = response.data;
            })
            .catch(error => {
                console.error('Error fetching repository details:', error);
            });

        // Fetch commit details
        axios
            .get(`https://api.github.com/repos/${owner}/${repoName}/commits`)
            .then(response => {
                this.commits = response.data;
            })
            .catch(error => {
                console.error('Error fetching commit details:', error);
            });
    },
};
</script>

<style scoped>
/* Your component's CSS styles here */
</style>
