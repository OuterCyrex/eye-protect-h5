<template>
  <div class="bg-gray-100">
    <div class="bg-white">
      <div class="bg-blue-600 rounded-lg p-4 text-white m-3">
        <div class="flex justify-between items-center mb-4">
          <div class="text-sm font-semibold">最新筛查数据</div>
        </div>
        <div class="flex gap-4 mb-4">
          <div class="flex-1 bg-blue-500 rounded-lg p-3 text-center">
            <div class="flex items-center justify-center text-xs text-gray-200 mb-2">
              <van-icon name="eye" size="16" class="mr-1" />
              <div>左眼（OS）</div>
            </div>
            <div class="text-4xl font-bold mb-1">{{ EyeInfo.leftBareVision || 0 }}</div>
            <div class="text-xs text-gray-200">
              {{ `S${(EyeInfo.leftSphere || 0).toFixed(2)}/C${(EyeInfo.leftCylinder || 0).toFixed(2)}/A${EyeInfo.leftAxis || 0}` }}
            </div>
          </div>
          <div class="flex-1 bg-blue-500 rounded-lg p-3 text-center">
            <div class="flex items-center justify-center text-xs text-gray-200 mb-2">
              <van-icon name="eye" size="16" class="mr-1" />
              <div>右眼（OD）</div>
            </div>
            <div class="text-4xl font-bold mb-1">{{ EyeInfo.rightBareVision || 0 }}</div>
            <div class="text-xs text-gray-200">
              {{ `S${(EyeInfo.rightSphere || 0).toFixed(2)}/C${(EyeInfo.rightCylinder || 0).toFixed(2)}/A${EyeInfo.rightAxis || 0}` }}
            </div>
          </div>
        </div>

        <div class="text-xs justify-end flex text-gray-300">(数据仅供参考)</div>
        <var-divider class="my-2 bg-blue-400" />

        <div class="flex justify-between items-center text-xs mt-3">
          <div class="ml-3">
            <div class="mb-1 flex items-center">
              <div class="w-16 text-gray-200">左眼(OS):</div> <span> {{ EyeInfo.leftWarningRisk || '暂无信息' }}</span></div
            >
            <div class="flex items-center"
              ><div class="w-16 text-gray-200">右眼(OD):</div> <span> {{ EyeInfo.rightWarningRisk || '暂无信息' }}</span></div
            >
          </div>
          <div class="text-blue-200 underline cursor-pointer" @click="router.push({ path: 'home/report' })">查看报告</div>
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
          <div class="text-xs text-gray-500 mt-0.5">请及时查看医院信息进行视力复查</div>
        </div>
      </div>
      <var-chip size="small" type="primary" class="ml-auto" @click="router.push({ path: 'appoint' })">去预约</var-chip>
    </var-paper>

    <!-- <var-paper class="p-3">
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
    </var-paper> -->

    <var-paper class="p-4">
      <div class="font-semibold mb-2">眼轴记录</div>
      <axiosChart :data="axiosData" />
    </var-paper>
  </div>
</template>

<script lang="ts" setup>
  import { ref } from 'vue';
  import IconButton from '@/templates/IconButton.vue';
  import axiosChart from '@/templates/chart/axiosChart.vue';
  import { useUserStore } from '@/store/modules/user';
  import { fetchGetAxiosChart } from '@/api/misc';

  const router = useRouter();
  const userStore = useUserStore();
  const EyeInfo = ref<API.Student.studentInfo>({
    id: '',
    name: '',
    gender: '',
    birthDate: '',
    idCard: '',
    className: '',
    schoolId: '',
    province: '',
    parentName: '',
    phone: '',
    cancelCount: 0,
    patientId: '',
    schoolName: '',
    lastCheckupDate: '',
    nextFollowupDate: '',
    leftBareVision: 0,
    leftSphere: 0,
    leftCylinder: 0,
    leftAxis: 0,
    rightBareVision: 0,
    rightSphere: 0,
    rightCylinder: 0,
    rightAxis: 0,
    leftWarningRisk: '',
    rightWarningRisk: '',
  });

  const axiosData = ref<Array<API.Misc.AxiosChartUnit>>([]);

  const JumpButtons = ref([
    {
      iconName: 'src/assets/font/icon/home/home-btns-1.png',
      label: '检查报告',
      to: '/home/report',
    },
    {
      iconName: 'src/assets/font/icon/home/home-btns-2.png',
      label: '干预方案',
      to: '/home/intervene',
    },
    {
      iconName: 'src/assets/font/icon/home/home-btns-3.png',
      label: '配镜信息',
      to: '/home/glasses',
    },
    {
      iconName: 'src/assets/font/icon/home/home-btns-4.png',
      label: '公益礼包',
      to: '/home/charity',
    },
  ]);

  onMounted(async () => {
    EyeInfo.value = userStore.getStudent as API.Student.studentInfo;
    axiosData.value = await fetchGetAxiosChart(userStore.getStudent.patientId);
  });
</script>
