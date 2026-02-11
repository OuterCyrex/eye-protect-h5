<template>
  <div class="bg-gray-100">
    <div class="bg-white">
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

      <div class="grid-cols-4 gap-3 grid px-4 pb-3">
        <IconButton v-for="item in JumpButtons" :key="item.label" :icon-name="item.iconName" :label="item.label" :to="`${item.to}`" /> </div
    ></div>

    <var-paper class="flex items-center my-2 px-4 py-3">
      <var-icon name="bell" size="28" class="rounded-full p-1 bg-yellow-200 mr-4" color="rgb(250, 204, 21)" />
      <div class="flex justify-between">
        <div>
          <div class="font-semibold text-sm">复查提醒</div>
          <div class="text-xs text-gray-500 mt-0.5">张美兰同学已3个月未进行视力复查</div>
        </div>
      </div>
      <var-chip size="small" type="primary" class="ml-auto" @click="router.push({ path: 'appoint' })">去预约</var-chip>
    </var-paper>

    <var-paper class="p-3">
      <div class="font-semibold mb-2">热门推荐</div>
      <ConsultCard
        class="my-3"
        v-for="item in recommendList"
        :key="item.title"
        :title="item.title"
        :subtitle="item.subtitle"
        :src="item.src"
        @click="router.push({ path: 'home/article' })"
      />
    </var-paper>
  </div>
</template>

<script lang="ts" setup>
  import { ref } from 'vue';
  import IconButton from '@/templates/IconButton.vue';
  import ConsultCard from '@/templates/ConsultCard.vue';

  const router = useRouter();

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
      to: '/home/intervene',
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
      title: '2026新版儿童青少年近视防控指南解读：从离焦镜片到阿托品滴眼液的全流程干预方案',
      subtitle: '科学防控近视',
      src: 'https://copyright.bdstatic.com/vcg/creative/b1a6072d47411b2e45c2a3397295e0fc.jpg@wm_1,k_cGljX2JqaHdhdGVyLmpwZw==',
    },
    {
      title: '离焦镜片vs普通单光镜片效果对比',
      subtitle: '每3个月复查，调整镜片参数',
      src: 'https://gips1.baidu.com/it/u=322139397,715049327&fm=3074&app=3074&f=JPEG',
    },
    {
      title: '阿托品滴眼液使用指南',
      subtitle: '0.01%浓度阿托品滴眼液适用年龄3-18岁，每晚睡前1滴，连续使用三个月需做视力筛查+眼轴检测',
      src: 'https://img0.baidu.com/it/u=584537846,2555229289&fm=253&fmt=auto&app=138&f=JPEG?w=800&h=1067',
    },
    {
      title: '眼科预约挂号流程',
      subtitle: '电子科大附院线上预约支持微信公众号/小程序，提前1天预约，就诊前30分钟到院报到，迟到15分钟预约号作废',
      src: 'https://b0.bdstatic.com/8a542792b87895828b04064da25f30bb.jpg@h_1280',
    },
    {
      title: '【重要通知】2026年3月1日起执行新版眼科收费标准：验光/配镜/近视防控项目价格调整详情',
      subtitle: '医保报销比例不变',
      src: 'https://img4.cheshi-img.com/202510/12/39e1739f78.jpg',
    },
  ]);
</script>
