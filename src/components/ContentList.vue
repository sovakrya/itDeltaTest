<script setup lang="ts">
import { getPhotos, type Photo } from '@/services/api'
import { ref } from 'vue'
import ContentItem from './ContentItem.vue'

const photos = ref<Photo[]>([])

getPhotos().then((pics) => {
  photos.value = pics
})
</script>

<template>
  <main class="main-box">
    <ContentItem v-for="photo of photos" :key="photo.id" :photo="photo" />
  </main>
</template>

<style scoped>
.main-box {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(431.33px, 1fr));
  gap: 32px;
}
</style>
