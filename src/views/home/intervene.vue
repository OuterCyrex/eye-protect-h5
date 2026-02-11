<template>
  <div class="p-4">
    <div :class="'mb-3 p-4 rounded-md ' + bgColor[item.type]" v-for="item in mockData" :key="item.id">
      <div :class="'font-semibold text-sm ' + textColor[item.type]">{{ item.title }}</div>
      <div class="text-gray-600 text-sm">{{ item.description }}</div>
    </div>
  </div>
</template>

<script lang="ts" setup>
  const bgColor = ['bg-blue-50', 'bg-green-50', 'bg-yellow-50', 'bg-red-50'];

  const textColor = ['text-blue-600', 'text-green-600', 'text-yellow-600', 'text-red-600'];

  const mockData = [
    {
      id: 1,
      type: 1,
      title: '配镜方案',
      description: '采用“离焦镜片”进行光学干预，控制眼轴增长速率。',
    },
    {
      id: 2,
      type: 2,
      title: '户外运动建议',
      description: '建议每日保持不少于“2小时”的户外自然光下运动。',
    },
    {
      id: 3,
      type: 3,
      title: '药物建议',
      description: '每晚睡前点用“0.01%阿托品”滴眼液1滴，连用三个月后复查。',
    },
  ];
</script>
