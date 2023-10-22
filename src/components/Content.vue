<script setup lang="js">

//This section imports the 'folderSvg' image from the 'assets' directory. 
import folderSvg from "../assets/folder.svg"

// Defines the properties for this component.
const props = defineProps({ fullName: String, commitsUrl: String, id: Number, isBranch: Boolean, fetchCommits: Object })
</script>

<template>
  <!-- This section defines the main content of the component. -->

  <div class="w-full font-mono flex gap-8 justify-center items-center">
    <div
      class="border bg-white hover:bg-gray-100 space-x-2 flex items-center justify-start p-12 w-[400px] hover:scale-[1.04] transition-all duration-300 cursor-pointer rounded-md hover:shadow-lg hover:shadow-black/10 mb-8"
      @click="props.fetchCommits(props.fullName)">
      <img class="h-8 w-auto" :src="folderSvg" alt="" />

      <h5 class="font-medium text-gray-900">
        {{ props.fullName }}
      </h5>
    </div>
  </div>
</template>



