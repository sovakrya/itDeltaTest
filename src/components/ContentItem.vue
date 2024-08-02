<script setup lang="ts">
import type { Photo } from '@/services/api'
import PhotoModal from './PhotoModal.vue'
import { ref } from 'vue'

const props = defineProps<{
  photo: Photo
}>()

const photoModal = ref(false)
</script>

<template>
  <div class="photo-box" @click="photoModal = true">
    <img :src="props.photo.image" class="photo" />

    <span class="photo-title">id: {{ props.photo.id }}</span>

    <PhotoModal v-model:show="photoModal" :photoId="photo.id" />
  </div>
</template>

<style scoped>
.photo-box {
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 8px;
  cursor: pointer;
  align-items: center;
}

.photo {
  height: 216px;
  border-radius: 8px;
  object-fit: cover;
  max-width: 500px;
  min-width: 431.33px;
  width: 100%;
}

.photo-title {
  font-weight: 500;
  font-size: 14px;
  line-height: 20px;
  color: #111827;
}
</style>
