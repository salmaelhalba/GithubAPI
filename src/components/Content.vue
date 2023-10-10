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

<script>
import axios from 'axios';

export default {
     props: {
        id: Number,
    },
    name: 'Content',
    data() {
        return {
            repo: null,
            commits: [],
        };
    },

    watch: {
        id: async function () {
            const token = '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'; // Replace with your actual Bearer token
            const apiUrl = `https://api.github.com/repositories/${this.id}`;
            const owner = 'github_username'; // Replace with the owner's username or organization name
            const repo = 'repository_name';
            if (this.id) {
                console.log("fetch");
                axios({
                    method: 'get',
                    url: apiUrl,
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    },
                }).then(response => {
                    this.repo = response.data;
                    const owner = this.repo.owner.login;
                    const repo = this.repo.full_name;

                    axios({
                        method: 'get',
                        url: `https://api.github.com/repos/${repo}/commits`,
                        headers: {
                            'Authorization': `Bearer ${token}`,
                        }
                    }).then(response => {
                        console.log(response.data);
                    })
                })
            }
        }
    },
    mounted() {
        const token = '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'; // Replace with your actual Bearer token
        const apiUrl = `https://api.github.com/user`;
        axios({
            method: 'get',
            url: apiUrl,
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        }).then(response => {
            this.repo = response.data;
            console.log(this.repo);
        })
    },
};
</script>


