<template>
  <div>
    <div class="bg-blue-600 rounded-lg p-4 text-white m-3">
      <div class="flex justify-between items-center mb-4">
        <div class="text-sm font-semibold">最新筛查数据（2026-02-05）</div>
        <var-chip size="small" type="danger" class="bg-red-500 text-white">高风险</var-chip>
      </div>
      <div class="flex gap-4 mb-4">
        <div v-for="item in mockEyeData" :key="item.eye" class="flex-1 bg-blue-500 rounded-lg p-3 text-center">
          <div class="flex items-center justify-center text-xs text-gray-200 mb-2">
            <van-icon :name="item.eye === 'left' ? 'eye-o' : 'eye'" size="16" class="mr-1" />
            <div>{{ item.eye === 'left' ? '左眼（OS）' : '右眼（OD）' }}</div>
          </div>
          <div class="text-4xl font-bold mb-1">{{ item.power }}</div>
          <div class="text-xs text-gray-200">
            {{ `S${item.sphere.toFixed(2)}/C${item.cylinder.toFixed(2)}/A${item.axis}` }}
          </div>
        </div>
      </div>

      <var-divider class="my-2 bg-blue-400" />

      <div class="flex justify-between items-center text-xs mt-3">
        <div>风险提示：近视度数增长较快，建议复查</div>
        <div class="text-blue-200 underline cursor-pointer">查看报告</div>
      </div>
    </div>

    <div class="grid-cols-4 gap-3 grid">
      <IconButton v-for="item in JumpButtons" :key="item.label" :icon-name="item.iconName" :label="item.label" :to="`${item.to}`" />
    </div>

    <var-paper class="flex items-center my-4 mx-3 p-2">
      <var-icon name="bell" size="28" class="rounded-full p-1 bg-yellow-200 mr-4" color="rgb(250, 204, 21)" />
      <div class="flex justify-between">
        <div>
          <div class="font-semibold text-sm">复查提醒</div>
          <div class="text-xs text-gray-500 mt-0.5">张美兰同学已3个月未进行视力复查</div>
        </div>
      </div>
      <var-chip size="small" type="primary" class="ml-auto">去预约</var-chip>
    </var-paper>

    <var-paper class="m-3 mt-6">
      <div class="font-semibold mb-4">热门推荐</div>
      <var-card
        class="my-3"
        v-for="item in recommendList"
        :key="item.title"
        :title="item.title"
        :subtitle="item.subtitle"
        :src="item.src"
      />
    </var-paper>
  </div>
</template>

<script lang="ts" setup>
  import { ref } from 'vue';
  import IconButton from '@/templates/IconButton.vue';

  interface EyeInfo {
    eye: 'left' | 'right';
    power: number;
    sphere: number;
    cylinder: number;
    axis: number;
  }

  const mockEyeData = ref<[EyeInfo, EyeInfo]>([
    {
      eye: 'left',
      power: 4.2,
      sphere: -2.75,
      cylinder: -0.75,
      axis: 165,
    },
    {
      eye: 'right',
      power: 4.5,
      sphere: -2.0,
      cylinder: -0.5,
      axis: 170,
    },
  ]);

  const JumpButtons = ref([
    {
      iconName: 'src/assets/font/icon/home/home-btns-1.png',
      label: '视力档案',
      to: '/home/achieve',
    },
    {
      iconName: 'src/assets/font/icon/home/home-btns-2.png',
      label: '干预方案',
      to: '/home/prevent',
    },
    {
      iconName: 'src/assets/font/icon/home/home-btns-3.png',
      label: '预约配镜',
      to: '/home/glasses',
    },
    {
      iconName: 'src/assets/font/icon/home/home-btns-4.png',
      label: '公益礼包',
      to: '/home/charity',
    },
  ]);

  const recommendList = ref([
    {
      title: '本草纲目',
      subtitle: '我表情悠哉 跳个大概',
      src: 'https://varletjs.org/cat.jpg',
    },
    {
      title: '本草纲目',
      subtitle: '我表情悠哉 跳个大概',
      src: 'https://varletjs.org/cat.jpg',
    },
  ]);
</script>
