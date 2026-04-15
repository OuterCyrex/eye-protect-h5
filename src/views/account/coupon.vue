<template>
  <div class="bg-gray-100 min-h-screen p-3">
    <div v-if="couponList && couponList.length > 0">
      <div v-for="item of couponList" :key="item.id">
        <CouponItem class="mb-2" :coupon="item" @verify="openVerifyPopup" />
      </div>
    </div>

    <nut-empty v-if="!couponList || couponList.length <= 0" description="没有可用的公益券"></nut-empty>
    <LoadLay v-model="loading" />

    <van-popup v-model:show="showVerifyPopup" position="bottom" round>
      <div class="px-5 pt-4 pb-6 max-h-[85vh] overflow-y-auto">
        <div class="text-center text-base font-semibold text-gray-800">核销</div>

        <div class="mt-4 flex flex-col items-center">
          <img
            v-if="verifyImageSrc"
            :src="verifyImageSrc"
            alt="核销条形码"
            class="h-36 w-100 rounded-lg border border-gray-100 bg-white p-2 object-contain"
          />
          <div
            v-else
            class="h-48 w-48 rounded-lg border border-dashed border-gray-200 text-gray-400 flex items-center justify-center text-sm"
          >
            暂无条形码
          </div>
        </div>

        <div class="flex items-center justify-center">
          <div class="text-sm mr-3 font-semibold">券码</div>
          <div class="font-mono text-base font-semibold text-gray-500 break-all text-center">
            {{ selectedCoupon?.voucherCode || '--' }}
          </div>
        </div>

        <div class="mt-2 rounded-lg p-3 text-sm text-gray-700 space-y-2 mb-2">
          <div class="flex items-start">
            <span class="w-24 shrink-0 whitespace-nowrap text-gray-500">礼包名称：</span>
            <span>{{ selectedCoupon?.giftName || '--' }}</span>
          </div>
          <div class="flex items-start">
            <span class="w-24 shrink-0 whitespace-nowrap text-gray-500">礼包类型：</span>
            <span>{{ selectedCoupon?.serviceName || '--' }}</span>
          </div>
          <div class="flex items-start">
            <span class="w-24 shrink-0 whitespace-nowrap text-gray-500">礼包内容：</span>
            <span>{{ selectedCoupon?.content || '--' }}</span>
          </div>
          <div class="flex items-start">
            <span class="w-24 shrink-0 whitespace-nowrap text-gray-500">适用人群：</span>
            <span>{{ selectedCoupon?.targetAudience || '--' }}</span>
          </div>
          <div class="flex items-start">
            <span class="w-24 shrink-0 whitespace-nowrap text-gray-500">价值：</span>
            <span>{{ selectedCoupon?.value || '--' }}</span>
          </div>
          <div class="flex items-start">
            <span class="w-24 shrink-0 whitespace-nowrap text-gray-500">患者姓名：</span>
            <span>{{ selectedCoupon?.patientName || '--' }}</span>
          </div>
          <div class="flex items-start">
            <span class="w-24 shrink-0 whitespace-nowrap text-gray-500">发放时间：</span>
            <span>{{ formatDateTime(selectedCoupon?.createdAt) }}</span>
          </div>
          <div class="flex items-start">
            <span class="w-24 shrink-0 whitespace-nowrap text-gray-500">领取时间：</span>
            <span>{{ formatDateTime(selectedCoupon?.claimTime) }}</span>
          </div>
        </div>

        <van-button class="mt-5" type="primary" block @click="showVerifyPopup = false">关闭</van-button>
      </div>
    </van-popup>
  </div>
</template>

<script lang="ts" setup>
  import { computed, ref } from 'vue';
  import dayjs from 'dayjs';
  import { fetchGetMyCoupons } from '@/api/coupon';
  import { fetchGetUserInfo } from '@/api/user';
  import CouponItem from '@/templates/CouponItem.vue';
  import LoadLay from '@/templates/LoadLay.vue';

  const couponList = ref<Array<API.Coupon.couponInfo>>([]);
  const loading = ref<boolean>(false);

  const showVerifyPopup = ref(false);
  const selectedCoupon = ref<API.Coupon.couponInfo | null>(null);

  const MONTH_MAP: Record<string, number> = {
    JANUARY: 1,
    FEBRUARY: 2,
    MARCH: 3,
    APRIL: 4,
    MAY: 5,
    JUNE: 6,
    JULY: 7,
    AUGUST: 8,
    SEPTEMBER: 9,
    OCTOBER: 10,
    NOVEMBER: 11,
    DECEMBER: 12,
  };

  const pad2 = (value: number) => String(value).padStart(2, '0');

  const formatDateTime = (value: unknown) => {
    if (!value) {
      return '--';
    }

    if (typeof value === 'string' || typeof value === 'number' || value instanceof Date) {
      const parsed = dayjs(value);
      return parsed.isValid() ? parsed.format('YYYY-MM-DD HH:mm:ss') : String(value);
    }

    if (typeof value === 'object') {
      const obj = value as Record<string, unknown>;
      const year = Number(obj.year);
      const day = Number(obj.dayOfMonth ?? obj.day);
      const hour = Number(obj.hour ?? 0);
      const minute = Number(obj.minute ?? 0);
      const second = Number(obj.second ?? 0);

      const monthRaw = obj.monthValue ?? obj.month;
      let month = Number(monthRaw);
      if (Number.isNaN(month) && typeof monthRaw === 'string') {
        month = MONTH_MAP[monthRaw.toUpperCase()] ?? NaN;
      }

      if (!Number.isNaN(year) && !Number.isNaN(month) && !Number.isNaN(day)) {
        return `${year}-${pad2(month)}-${pad2(day)} ${pad2(hour)}:${pad2(minute)}:${pad2(second)}`;
      }

      if (obj.epochSecond !== undefined) {
        const seconds = Number(obj.epochSecond);
        const parsed = dayjs(seconds * 1000);
        if (parsed.isValid()) {
          return parsed.format('YYYY-MM-DD HH:mm:ss');
        }
      }
    }

    return '--';
  };

  const verifyImageSrc = computed(() => {
    const base64 = selectedCoupon.value?.barcodeBase64;
    if (!base64) {
      return '';
    }
    if (base64.startsWith('data:image')) {
      return base64;
    }
    return `data:image/png;base64,${base64}`;
  });

  const handleGetMyCoupons = async () => {
    couponList.value = await fetchGetMyCoupons();
  };

  const openVerifyPopup = (coupon: API.Coupon.couponInfo) => {
    selectedCoupon.value = coupon;
    showVerifyPopup.value = true;
  };

  onMounted(async () => {
    loading.value = true;
    await fetchGetUserInfo();
    await handleGetMyCoupons();
    loading.value = false;
  });
</script>
