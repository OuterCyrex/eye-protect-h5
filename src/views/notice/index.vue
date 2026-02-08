<template>
  <div>
    <chip-tab :tabs="tabs" v-model="tabValue" />
    <div class="mx-4 my-5">
      <var-paper
        @click="router.push({ path: '/notice/detail' })"
        class="mb-4 p-4"
        :elevation="1"
        v-for="item in noticeList"
        :key="item.title"
        :style="`border-left: 3px solid ` + GetType(item.type)"
      >
        <div class="flex justify-between">
          <div class="font-semibold flex items-center">
            <var-chip type="danger" size="small" dot class="mr-3" v-if="!item.isRead">未读</var-chip>
            <var-chip type="info" size="small" dot class="mr-3" v-if="item.isRead">已读</var-chip>
            <div class="font-semibold">{{ item.title }}</div>
          </div>
          <div class="text-gray-500 text-sm">{{ item.time }}</div>
        </div>
        <div class="text-gray-500 text-sm my-2">{{ item.content }}</div>
      </var-paper>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import ChipTab from '@/templates/ChipTab.vue';
  import { noticeList } from './mock';

  const router = useRouter();
  const tabs = ['全部', '随访提醒', '待办事项'];
  const tabValue = ref<number>(0);

  const GetType = (val: string) => {
    switch (val) {
      case 'policy':
        return '#5ec8e2';
      case 'remind':
        return '#d4e214';
      default:
        return '';
    }
  };
</script>
