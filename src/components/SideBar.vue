<template>

    <header class="sticky top-0 bg-color-primary ">
    <div>
        <h2>Select an Option:</h2>
        <select v-model="selectedRepo" @change="handleChange">
          <option  v-for="repo in repos" :key="repo.id" :value="repo.name">
            <div>
                <p @click="console.log('test')" > {{ repo.name }}</p>
            </div>
            
          </option>
        </select>
    </div>
    <Content :id='selectedRepo' />
    

    </header>

    
</template>
<script setup lang="js">
import { Octokit } from "Octokit";
import { ref } from "vue";
import Content from './Content.vue'

const octokit = new Octokit({
    auth: token
});

const fetchRepos = async () => {

    const result = await octokit.request('GET /user/repos', {
        headers: {
            'X-Github-Api-Version': '2022-11-28'
        },
    })
    repos.value = result.data
    return result.data
}
const repos = ref({})
fetchRepos()
const token = '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'; // Replace with your actual Bearer token

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