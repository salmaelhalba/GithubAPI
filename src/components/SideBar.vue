<template>

    <header class="sticky top-0 bg-color-primary ">
    <div>
        <h2>Select an Option:</h2>
        <select v-model="selectedRepo" @change="handleChange">
          <option  v-for="repo in repos" :key="repo.id" :value="repo.id" >
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
    console.log(repos.value);
    return result.data
}
const repos = ref({})
fetchRepos()
const token = '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'; // Replace with your actual Bearer token

function handleChange(e) {
    console.log(e.target.value);
}

const apiUrl = 'https://api.github.com/user/repos'; // Replace with your API endpoint



function gitOAuth() {
    

}

/* export default { 
   
    name: 'SideBar', 
    data() {
        return {
            repos: null,
            selectedRepo: null,
        }
    },
    components: {
        Content
    },
    mounted() {
        
    },
    methods: {
        
    }    
} */
    

</script>