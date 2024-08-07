<script setup lang="ts">
import type { Comment } from '@/services/api'

const props = defineProps<{
  comment: Comment
}>()
</script>

<template>
  <div class="comment-box">
    <span class="comment-text">{{ props.comment.author }}:</span>

    <span class="comment-text">{{ props.comment.text }}</span>
  </div>
</template>

<style scoped>
.comment-box {
  display: flex;
  gap: 4px;
}

.comment-text {
  font-weight: 500;
  color: #000000;
  font-size: 14px;
  line-height: 20px;
}
</style>
