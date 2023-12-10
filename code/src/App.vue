<template>
  <router-view />
</template>

<script setup>
import { useAppStore } from '@/store/app'

const store = useAppStore();
store.initialize();
</script>

<style>
.v-toolbar {
  background: lightskyblue;
}
.v-img, video {
    width: 100%;
    max-height: 80vh;
}
textarea {
    width: 100%;
}
</style>