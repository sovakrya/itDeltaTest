<script setup lang="ts">
import CallIcon from './icons/CallIcon.vue'
import MessageIcon from './icons/MessageIcon.vue'
</script>

<template>
  <header class="header-box">
    <img src="../assets/picInHeader.jpg" height="192px" class="header-background" />

    <div class="header-content-box">
      <img src="../assets/avatar.jpg" width="128px" height="128px" class="avatar" />

      <div class="header-content-wrapper">
        <span class="text-name">Ricardo Cooper</span>

        <div class="header-btn-box">
          <button class="header-btn">
            <MessageIcon />
            Message
          </button>
          <button class="header-btn">
            <CallIcon />
            Call
          </button>
        </div>
      </div>
    </div>
  </header>
</template>

<style scoped>
.header-box {
  position: relative;
  display: grid;
  height: 256px;
}

.header-background {
  width: 100%;
  object-fit: cover;
}

.header-content-box {
  position: absolute;
  top: 128px;
  max-width: 1024px;
  width: 100%;
  display: flex;
  gap: 24px;
  align-items: flex-end;
  padding: 0 32px;
  place-self: center;
}

.header-content-wrapper {
  display: flex;
  flex-grow: 1;
}

.header-btn-box {
  display: flex;
  gap: 16px;
}

.avatar {
  border-radius: 64px;
  box-shadow: 0px 0px 0px 4px #ffffff;
}

.text-name {
  font-weight: 700;
  font-size: 24px;
  line-height: 24px;
  color: #111827;
  flex-grow: 1;
  min-width: max-content;
}

.header-btn-box {
  display: flex;
  gap: 16px;
}

.header-btn {
  display: flex;
  border: 1px solid #d1d5db;
  box-shadow: 0px 1px 2px 0px #0000000d;
  background-color: #ffffff;
  border-radius: 6px;
  padding: 9px 17px 9px 13px;
  cursor: pointer;
  gap: 8px;
  font-weight: 500;
  font-size: 14px;
  color: #374151;
  align-items: center;
  transition: 0.4s ease;
}

.header-btn:hover {
  background-color: #d1d5db;
}

@media (max-width: 720px) {
  .header-btn-box {
    display: grid;
  }

  .header-content-wrapper {
    display: flex;
    flex-wrap: wrap;
    gap: 12px;
  }
  .text-name {
    color: #ffffff;
  }
}
</style>
