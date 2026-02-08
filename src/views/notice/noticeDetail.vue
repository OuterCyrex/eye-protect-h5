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
            <span :style="{ color: GetType(noticeDetail.type) }">{{ getTypeName(noticeDetail.type) }}</span>
          </div>
          <div>{{ noticeDetail.time }}</div>
        </div>

        <div class="text-gray-700 text-base leading-relaxed whitespace-pre-line">
          {{ noticeDetail.content }}
        </div>

        <div class="mt-8 text-right text-gray-500 text-sm"> —— 视力健康管理平台 </div>
      </var-paper>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { ref, onMounted } from 'vue';

  interface NoticeItem {
    title: string;
    time: string;
    content: string;
    type: string;
    isRead: boolean;
    id?: string;
  }

  const noticeDetail = ref<NoticeItem>({
    title: '',
    time: '',
    content: '',
    type: '',
    isRead: false,
  });

  const GetType = (val: string) => {
    switch (val) {
      case 'policy':
        return '#5ec8e2';
      case 'remind':
        return '#d4e214';
      default:
        return '#cccccc';
    }
  };

  const getTypeName = (val: string) => {
    switch (val) {
      case 'policy':
        return '政策通知';
      case 'remind':
        return '随访提醒';
      case 'todo':
        return '待办事项';
      default:
        return '系统消息';
    }
  };

  onMounted(() => {
    const mockDetail = {
      title: '3个月随访提醒',
      time: '2026-01-15 09:30',
      content: `尊敬的家长：
    您的孩子张小明的视力随访检查已到期，请于2026年01月20日前前往电子科大附院眼科完成复查，检查项目包括眼轴长度、眼压、视力验光等，避免错过最佳干预时机。

复查注意事项：
1. 检查前无需空腹；
2. 携带既往检查报告；
3. 可提前1天电话预约：028-12345678。`,
      type: 'remind',
      isRead: false,
      id: '1',
    };

    noticeDetail.value = mockDetail;
  });
</script>
