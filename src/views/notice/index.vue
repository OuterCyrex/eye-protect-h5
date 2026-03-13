<template>
  <div>
    <div class="mx-4 my-5">
      <div @click="router.push({ path: '/notice/detail' })" v-for="item in noticeList" :key="item.title">
        <div class="mb-4 p-2">
          <div class="flex justify-between items-center">
            <div class="font-semibold flex items-center">
              <var-ellipsis :tooltip="false" class="font-semibold flex items-center" :line-clamp="1">
                <var-chip plain size="small" class="mr-1 text-xs mb-1" :text-color="typeColors[item.type]">
                  {{ tabs[item.type] }}
                </var-chip>
                {{ item.title }}
              </var-ellipsis>
            </div>
            <div v-if="!item.isRead" class="w-2 h-2 bg-red-500 rounded-full"></div>
          </div>
          <var-ellipsis :tooltip="false" class="m-2 text-gray-500" :line-clamp="2">{{ item.content }} </var-ellipsis>

          <div class="text-gray-500 text-sm flex justify-end">{{ item.createdAt }}</div>
        </div>
        <var-divider />
      </div>
    </div>

    <nut-empty v-if="!noticeList || noticeList.length <= 0" description="目前暂无消息"></nut-empty>
    <LoadLay v-model="loading" />
  </div>
</template>

<script lang="ts" setup>
  import { fetchGetHistoryMessage } from '@/api/message';
  import LoadLay from '@/templates/LoadLay.vue';

  const loading = ref<boolean>(false);
  const router = useRouter();
  const tabs = ['', '配镜提醒', '叫号通知', '报告生成', '复查提醒', '视力预警', '系统通知', '意见反馈'];
  const typeColors = ['', '#7CB3F8', '#8ED869', '#F0C078', '#A9ACB0', '#F89898', '#9E7CF5', '#4DCFCF'];

  const noticeList = ref<Array<API.Message.messageInfo>>([]);

  onMounted(async () => {
    noticeList.value = await fetchGetHistoryMessage();
  });
</script>
