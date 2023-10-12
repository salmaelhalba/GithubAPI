<template>
  <div>{{ props.fullName }}</div>
  <div>{{ props.commitsUrl }}</div>
</template>

<script setup lang="js">
import { watch } from 'vue';


const props = defineProps({ fullName: String, commitsUrl: String })
</script>
