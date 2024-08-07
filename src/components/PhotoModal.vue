<script setup lang="ts">
import { addComment, getPhotoDetails, type PhotoDetail } from '@/services/api'
import { onMounted, ref, watch } from 'vue'
import CommentList from './CommentList.vue'

onMounted(() => {
  if (!photoDialog.value) {
    return
  }

  photoDialog.value.addEventListener('click', closeDialogOnOutsideClick)
})

const props = defineProps<{
  photoId: number
}>()

const photoDialog = ref<HTMLDialogElement>()
const show = defineModel<boolean>('show', { default: false })

function closeDialogOnOutsideClick(event: MouseEvent) {
  if (!photoDialog.value) {
    return
  }

  if (!(event.target instanceof HTMLElement)) {
    return
  }

  if (event.target.tagName !== 'DIALOG') {
    return
  }
  const rect = event.target.getBoundingClientRect()
  const clickedOnDialog =
    rect.top <= event.y && rect.bottom >= event.y && rect.left <= event.x && rect.right >= event.x

  if (!clickedOnDialog) {
    show.value = false

    event.stopPropagation()
  }
}
watch(
  show,
  (show) => {
    if (show) {
      openPhotoDialog()
    } else {
      closePhotoDialog()
    }
  },
  { immediate: true }
)

function openPhotoDialog() {
  if (!photoDialog.value) {
    return
  }

  photoDialog.value.showModal()
}

function closePhotoDialog() {
  if (!photoDialog.value) {
    return
  }

  photoDialog.value.close()
}

const photoDetails = ref<PhotoDetail>()

getPhotoDetails(props.photoId).then((details) => {
  photoDetails.value = details
})

const comment = ref('')
let isError = ref<boolean>(false)

function addNewComment() {
  addComment(props.photoId, comment.value).then((resp) => {
    if (resp.status === 'ok') {
      show.value = false
      isError.value = false
      comment.value = ''
      return
    } else {
      isError.value = true
      return
    }
  })
}
</script>

<template>
  <dialog ref="photoDialog" class="dialog-box">
    <div class="dialog-wrapper">
      <img :src="photoDetails?.image" height="405px" class="dialog-photo" />

      <div class="dialog-content-box">
        <span class="title-comment">Comment</span>
        <textarea
          class="dialog-input"
          :class="{ 'dialog-input-error': isError }"
          v-model="comment"
        ></textarea>
        <span class="title-comment-description" v-if="!isError"
          >Write a few sentences about the photo.</span
        >
        <span class="dialog-text-error" v-else>The comment was written incorrectly</span>
      </div>

      <button @click.stop="addNewComment" class="dialog-btn-save">Save</button>

      <div class="comments-box">
        <span class="subtitle-comments">Comments</span>
        <CommentList v-if="photoDetails" :comments="photoDetails.comments" />
      </div>
    </div>
  </dialog>
</template>

<style scoped>
.dialog-box {
  padding: 0;
  border: none;
  margin: auto;
  border-radius: 8px;
  box-shadow: 0px 20px 25px -5px #0000001a;
}

.dialog-box::backdrop {
  background-color: #222222be;
}

.dialog-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #ffffff;
  padding: 24px;
  gap: 24px;
  max-width: 692px;
  min-width: 400px;
  width: 100%;
  max-height: 800px;
  min-height: 600px;
  height: 100%;
}

.dialog-photo {
  max-width: 405px;
  min-width: 205px;
  max-height: 405px;
  min-height: 205px;
  height: 100%;
  width: 100%;
  border-radius: 24px;
  box-shadow: 0px 25px 50px -12px #00000040;
}

.dialog-content-box {
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 8px;
}

.title-comment {
  font-weight: 500;
  font-size: 14px;
  line-height: 20px;
  color: #374151;
}

.dialog-input {
  width: 644px;
  height: 105px;
  border-radius: 5px;
  border: 1px solid #d1d5db;
  box-shadow: 0px 1px 2px 0px #0000000d;
}

.dialog-input-error {
  border: 1px solid rgb(134, 44, 44);
}

.dialog-text-error {
  color: rgb(134, 44, 44);
  font-weight: 400;
  font-size: 14px;
  line-height: 20px;
}

.title-comment-description {
  font-weight: 400;
  font-size: 14px;
  line-height: 20px;
  color: #6b7280;
}

.dialog-btn-save {
  border-radius: 6px;
  padding: 9px 17px 9px 17px;
  background-color: #4f46e5;
  cursor: pointer;
  color: #ffffff;
  font-weight: 500;
  font-size: 14px;
  line-height: 20px;
  border: none;
  transition: 0.4s ease;
}

.comments-box {
  display: flex;
  flex-direction: column;
  align-self: baseline;
  gap: 18px;
}

.subtitle-comments {
  font-weight: 500;
  font-size: 14px;
  line-height: 20px;
  color: #374151;
}
.dialog-btn-save:hover {
  background-color: #484492;
}

@media (max-width: 740px) {
  .dialog-input {
    width: 500px;
  }
}

@media (max-width: 580px) {
  .dialog-input {
    width: 400px;
  }
}

@media (max-width: 480px) {
  .dialog-input {
    width: 370px;
  }
}
</style>
