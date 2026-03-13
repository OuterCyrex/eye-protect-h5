<template>
  <router-view />
</template>
<script setup lang="ts">
  import { useUserStore } from './store/modules/user';
  const userStore = useUserStore();

  onMounted(async () => {
    if (userStore.getToken) {
      await userStore.initWebsocket();
    }
  });
</script>

<style>
  #app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #2c3e50;
  }
</style>
