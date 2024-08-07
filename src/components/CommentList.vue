<script setup lang="ts">
import { type Comment } from '@/services/api'
import CommentItem from './CommentItem.vue'

const props = defineProps<{
  comments: Comment[]
}>()
</script>

<template>
  <div class="comment-list-box">
    <CommentItem v-for="comment of comments" :key="comment.id" :comment />
  </div>
</template>

<style scoped>
.comment-list-box {
  display: flex;
  flex-direction: column;
  gap: 24px;
}
</style>
