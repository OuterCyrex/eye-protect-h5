<template>
  <div class="p-3 max-w-md mx-auto">
    <div
      v-for="item in mockData"
      :key="item.id"
      class="bg-gray-50 rounded-lg p-4 mb-3 border border-gray-100"
      @click="router.push({ path: '/home/achieve/detail' })"
    >
      <div class="flex justify-between items-center mb-2">
        <div class="flex items-center gap-2">
          <div class="text-sm font-semibold">{{ item.date }}</div>
          <div class="text-sm font-semibold">{{ item.type }}</div>
        </div>
        <div class="text-xs text-blue-500 bg-blue-50 px-2 py-0.5 rounded">
          {{ item.location }}
        </div>
      </div>

      <div class="flex justify-between text-sm text-gray-600">
        <div>裸眼视力(L/R): {{ item.leftPower + ' / ' + item.rightPower }}</div>
        <div>眼轴长度: {{ item.axiosLength }}mm</div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { ref } from 'vue';

  const router = useRouter();

  const mockData = ref([
    {
      id: 1,
      date: '2026-01-15',
      type: '复诊记录',
      location: '电子科大附院',
      leftPower: 4.2,
      rightPower: 4.5,
      axiosLength: 24.12,
    },
    {
      id: 2,
      date: '2025-10-10',
      type: '初诊记录',
      location: '眼科私立诊所',
      leftPower: 4.5,
      rightPower: 4.8,
      axiosLength: 23.85,
    },
  ]);
</script>
