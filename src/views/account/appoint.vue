<template>
  <div class="p-3 max-w-md mx-auto bg-gray-100 min-h-full">
    <div
      v-for="item in appointmentData"
      :key="item.id"
      class="rounded-lg p-4 mb-3 bg-white"
      @click="router.push({ path: '/account/appoint/detail' })"
    >
      <div class="flex justify-between items-center mb-2">
        <div class="flex items-center gap-2">
          <div class="text-sm font-semibold">{{ item.date }}</div>
          <div class="text-sm font-semibold">{{ item.type }}</div>
        </div>
        <div
          class="text-xs px-2 py-0.5 rounded"
          :class="[
            item.status === '已预约'
              ? 'text-blue-500 bg-blue-50'
              : item.status === '已完成'
                ? 'text-green-500 bg-green-50'
                : 'text-gray-500 bg-gray-100',
          ]"
        >
          {{ item.status }}
        </div>
      </div>

      <div class="flex justify-between text-sm text-gray-600">
        <div>就诊时段: {{ item.timeSlot }}</div>
        <div>地点 : {{ item.hospital }}</div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { ref } from 'vue';
  import { useRouter } from 'vue-router';

  const router = useRouter();

  const appointmentData = ref([
    {
      id: 1,
      date: '2026-02-10',
      type: '眼科复诊',
      status: '已预约',
      timeSlot: '09:00-10:00',
      hospital: '电子科大附院',
    },
    {
      id: 2,
      date: '2026-01-05',
      type: '视力检查',
      status: '已完成',
      timeSlot: '14:30-15:30',
      hospital: '眼科私立诊所',
    },
    {
      id: 3,
      date: '2026-02-18',
      type: '验光配镜',
      status: '已取消',
      timeSlot: '10:30-11:30',
      hospital: '市第一人民医院',
    },
  ]);
</script>
