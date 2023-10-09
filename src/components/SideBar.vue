<template>
    <div>
        <h2>Select an Option:</h2>
        <select v-model="selectedOption">
            <option value="0">search</option>
          <option v-for="repo in repos" :key="repo.id" :value="repo.id">
            {{ repo.name }}
          </option>
        </select>
    </div>
    <Content/>
</template>

<script>

import Content from './Content.vue'

import axios from 'axios';

export default { 
    name: 'SideBar', 
    data() {
        return {
            repos: null,
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
                // Handle the API response here
                console.log(response.data);
                this.repos = response.data;
            })
            .catch(error => {
                // Handle errors here
                console.error('Error:', error);
            });
    },


   




        
    
}
    

</script>