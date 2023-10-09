<template>
    <div>
        <h2>Select an Option:</h2>
        <select v-model="selectedRepo" @change="handleChange">
            <option value="0">search</option>
          <option v-for="repo in repos" :key="repo.id" :value="repo.id">
            {{ repo.name }}
          </option>
        </select>
    </div>
    <Content :id='selectedRepo' />
</template>

<script>

import Content from './Content.vue'

import axios from 'axios';

export default { 
   
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
        const token = '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'; // Replace with your actual Bearer token
        const apiUrl = 'https://api.github.com/user/repos'; // Replace with your API endpoint
        axios({
            method: 'get',
            url: apiUrl,
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        })
            .then(response => {
                console.log(response.data);
                this.repos = response.data;
            })
            .catch(error => {
                
                console.error('Error:', error);
            });
    },
    methods: {
        handleChange() {
            console.log(this.selectedRepo);
        }
    }    
}
    

</script>