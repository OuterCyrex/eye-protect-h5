<template>
  <router-view />
  <UserAreaCodeDialog />
</template>
<script setup lang="ts">
  import { fetchGetUnreadCount } from '@/api/message';
  import { useUserStore } from './store/modules/user';
  import UserAreaCodeDialog from '@/templates/UserAreaCodeDialog.vue';
  const userStore = useUserStore();

  onMounted(async () => {
    if (userStore.getToken) {
      userStore.setUnread(Number(await fetchGetUnreadCount()) || 0);
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
