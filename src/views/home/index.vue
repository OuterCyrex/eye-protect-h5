<template>
  <div class="bg-gray-100">
    <div class="bg-white">
      <div class="m-3 rounded-lg bg-blue-600 p-4 text-white">
        <div class="mb-4 flex items-center justify-between">
          <div class="text-sm font-semibold">最新筛查数据</div>
        </div>
        <div class="mb-4 flex gap-4">
          <div class="flex-1 rounded-lg bg-blue-500 p-3 text-center">
            <div class="mb-2 flex items-center justify-center text-xs text-gray-200">
              <van-icon name="eye" size="16" class="mr-1" />
              <div>左眼(OS)</div>
            </div>
            <div class="mb-1 text-4xl font-bold">{{ EyeInfo.leftBareVision || 0 }}</div>
            <div class="text-xs text-gray-200">
              {{ `S${(EyeInfo.leftSphere || 0).toFixed(2)}/C${(EyeInfo.leftCylinder || 0).toFixed(2)}/A${EyeInfo.leftAxis || 0}` }}
            </div>
          </div>
          <div class="flex-1 rounded-lg bg-blue-500 p-3 text-center">
            <div class="mb-2 flex items-center justify-center text-xs text-gray-200">
              <van-icon name="eye" size="16" class="mr-1" />
              <div>右眼(OD)</div>
            </div>
            <div class="mb-1 text-4xl font-bold">{{ EyeInfo.rightBareVision || 0 }}</div>
            <div class="text-xs text-gray-200">
              {{ `S${(EyeInfo.rightSphere || 0).toFixed(2)}/C${(EyeInfo.rightCylinder || 0).toFixed(2)}/A${EyeInfo.rightAxis || 0}` }}
            </div>
          </div>
        </div>

        <div class="flex justify-end text-xs text-gray-300">(数据仅供参考)</div>
        <var-divider class="my-2 bg-blue-400" />

        <div class="mt-3 flex items-center justify-between text-xs">
          <div class="ml-3">
            <div class="mb-1 flex items-center">
              <div class="w-16 text-gray-200">左眼(OS):</div>
              <span>{{ EyeInfo.leftWarningRisk || '暂无信息' }}</span>
            </div>
            <div class="flex items-center">
              <div class="w-16 text-gray-200">右眼(OD):</div>
              <span>{{ EyeInfo.rightWarningRisk || '暂无信息' }}</span>
            </div>
          </div>
          <div class="cursor-pointer text-blue-200 underline" @click="router.push({ path: 'home/report' })">查看报告</div>
        </div>
      </div>

      <div class="grid grid-cols-4 gap-3 px-4 pb-3">
        <IconButton v-for="item in jumpButtons" :key="item.label" :icon-name="item.iconName" :label="item.label" :to="item.to" />
      </div>
    </div>

    <var-paper class="my-2 flex items-center px-4 py-3">
      <var-icon name="bell" size="28" class="mr-4 rounded-full bg-yellow-200 p-1" color="rgb(250, 204, 21)" />
      <div class="flex justify-between">
        <div>
          <div class="text-sm font-semibold">复查提醒</div>
          <div class="mt-0.5 text-xs text-gray-500">请及时查看医院信息并进行视力复查</div>
        </div>
      </div>
      <var-chip size="small" type="primary" class="ml-auto" @click="router.push({ path: 'appoint' })">去预约</var-chip>
    </var-paper>

    <var-paper class="p-4">
      <div class="mb-2 font-semibold">眼轴记录</div>
      <axiosChart :data="axiosData" />
    </var-paper>

    <var-paper class="mt-2 p-3">
      <div class="mb-2 font-semibold">热门推荐</div>
      <var-list :finished="articleFinished" :immediate-check="true" v-model:loading="articleLoading" @load="getArticlesList">
        <ConsultCard
          v-for="item in recommendList"
          :key="item.id"
          class="my-3"
          :title="item.title"
          :subtitle="item.summary"
          :src="item.coverImage"
          @click="handleClickArticle(item.id)"
        />
      </var-list>
    </var-paper>

    <CouponPopup v-model:show="showCouponGuide" @view-coupon="goCouponPage" />
  </div>
</template>

<script lang="ts" setup>
  import { ref } from 'vue';
  import { fetchGetArticleLink, fetchGetArticleList, fetchGetAxiosChart } from '@/api/misc';
  import { fetchGetUserInfo } from '@/api/user';
  import homeBtn1 from '@/assets/font/icon/home/home-btns-1.png';
  import homeBtn2 from '@/assets/font/icon/home/home-btns-2.png';
  import homeBtn3 from '@/assets/font/icon/home/home-btns-3.png';
  import homeBtn4 from '@/assets/font/icon/home/home-btns-4.png';
  import axiosChart from '@/templates/chart/axiosChart.vue';
  import ConsultCard from '@/templates/ConsultCard.vue';
  import IconButton from '@/templates/IconButton.vue';
  import CouponPopup from '@/templates/CouponPopup.vue';
  import { useUserStore } from '@/store/modules/user';

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
  const recommendList = ref<Array<API.Misc.articleInfo>>([]);
  const articleLoading = ref(false);
  const articleFinished = ref(false);
  const showCouponGuide = ref(false);
  const articleQuery = ref<API.Misc.GetArticleListRequest>({
    current: 1,
    size: 5,
    title: '',
    source: '',
    tagId: '',
    status: 1,
    orderBy: '',
    orderDirection: '',
  });
  const articleLink = ref<string>('');

  const jumpButtons = ref([
    { iconName: homeBtn1, label: '检查报告', to: '/home/report' },
    { iconName: homeBtn2, label: '干预方案', to: '/home/intervene' },
    { iconName: homeBtn3, label: '专家风采', to: '/home/experts' },
    { iconName: homeBtn4, label: '公益礼包', to: '/home/charity' },
  ]);

  const getArticlesList = async () => {
    if (articleFinished.value) {
      articleLoading.value = false;
      return;
    }

    const res = await fetchGetArticleList(articleQuery.value);
    const records = res?.records || [];
    recommendList.value.push(...records);
    articleLoading.value = false;

    const reachedLastPageByPages = typeof res?.pages === 'number' && articleQuery.value.current >= res.pages;
    const reachedLastPageBySize = records.length < articleQuery.value.size;
    if (reachedLastPageByPages || reachedLastPageBySize) {
      articleFinished.value = true;
      return;
    }

    articleQuery.value.current += 1;
  };

  const handleClickArticle = async (id: string) => {
    articleLink.value = await fetchGetArticleLink(id);
    if (!articleLink.value) {
      showToast('跳转失败请重试');
      return;
    }
    window.open(articleLink.value);
  };

  const goCouponPage = () => {
    showCouponGuide.value = false;
    router.push({ path: '/account/coupon' });
  };

  onMounted(async () => {
    try {
      const userInfo = await fetchGetUserInfo();
      showCouponGuide.value = Number(userInfo?.loginCount || 0) <= 1;
    } catch {
      showCouponGuide.value = false;
    }

    EyeInfo.value = userStore.getStudent as API.Student.studentInfo;
    axiosData.value = await fetchGetAxiosChart(userStore.getStudent.patientId);
  });
</script>
