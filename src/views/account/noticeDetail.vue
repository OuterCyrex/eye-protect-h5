<template>
  <div class="min-h-screen">
    <div class="mx-4">
      <var-paper class="p-6" rounded="lg">
        <div class="text-center mb-6">
          <h1 class="text-lg font-bold text-gray-800 mb-2">{{ noticeDetail.title }}</h1>
        </div>

        <div class="flex justify-between items-center text-sm text-gray-500 mb-6 pb-3 border-b border-gray-100">
          <div>
            <span>类型：</span>
            <span :style="{ color: typeColors[noticeDetail.type] }">{{ tabs[noticeDetail.type] }}</span>
          </div>
          <div>{{ noticeDetail.createdAt }}</div>
        </div>

        <div class="text-gray-700 text-base leading-relaxed whitespace-pre-line">
          {{ noticeDetail.content }}
        </div>
      </var-paper>
    </div>

    <LoadLay v-model="loading" />
  </div>
</template>

<script lang="ts" setup>
  import { ref, onMounted } from 'vue';
  import { useRoute } from 'vue-router';
  import { fetchGetHistoryMessage } from '@/api/message';
  import LoadLay from '@/templates/LoadLay.vue';

  const tabs = ['', '配镜提醒', '叫号通知', '报告生成', '复查提醒', '视力预警', '系统通知', '意见反馈'];
  const typeColors = ['', '#7CB3F8', '#8ED869', '#F0C078', '#A9ACB0', '#F89898', '#9E7CF5', '#4DCFCF'];
  const loading = ref<boolean>(false);

  const route = useRoute();
  const noticeDetail = ref<API.Message.messageInfo>({
    title: '',
    createdAt: '',
    content: '',
    type: 0,
    isRead: 0,
    id: '',
    phone: '',
    images: [],
  });

  onMounted(async () => {
    loading.value = true;
    noticeDetail.value = await fetchGetHistoryMessage().then((res) =>
      res.find((item: API.Message.messageInfo) => item.id === route.query.id),
    );
    loading.value = false;
  });
</script>
