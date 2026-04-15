<template>
  <div class="min-h-screen bg-gradient-to-b from-red-600 to-white p-4">
    <div class="text-center mb-6">
      <p class="text-gray-200 mt-1 text-sm">公益礼包</p>
      <h1 class="text-2xl font-bold text-white flex items-center justify-center">限时领取</h1>
    </div>

    <div class="max-w-lg mx-auto space-y-4">
      <div v-if="couponList.length <= 0" class="text-center py-10">
        <div class="w-12 h-12 mx-auto bg-red-100 rounded-full flex items-center justify-center mb-3">
          <var-icon name="tag-outline" />
        </div>
        <p class="text-white">暂无可领取的公益券</p>
      </div>

      <div
        v-for="coupon in couponList"
        :key="coupon.id"
        class="bg-white rounded-xl shadow-md overflow-hidden border border-red-200 relative group"
      >
        <div class="bg-gradient-to-r from-red-50 to-orange-50 p-4 flex justify-between items-center">
          <div>
            <div class="text-sm text-gray-500">{{ coupon.serviceName || '通用服务' }}</div>
            <div class="text-lg font-bold text-red-700 mt-1">{{ coupon.giftName || '公益券' }}</div>
          </div>
          <div :class="getStatusClass(coupon)">
            {{ getStatusText(coupon) }}
          </div>
        </div>

        <div class="p-4 text-sm text-gray-700 space-y-2">
          <div class="flex items-start">
            <span class="w-24 shrink-0 whitespace-nowrap text-gray-500">适用人群：</span>
            <span>{{ coupon.targetAudience || '不限' }}</span>
          </div>
          <div class="flex items-start">
            <span class="w-24 shrink-0 whitespace-nowrap text-gray-500">礼包内容：</span>
            <span class="text-gray-600">{{ coupon.content || '无使用说明' }}</span>
          </div>
          <div class="flex items-start">
            <span class="w-24 shrink-0 whitespace-nowrap text-gray-500">面值权益：</span>
            <span>{{ coupon.value || '以机构规则为准' }}</span>
          </div>
          <div class="flex items-start">
            <span class="w-24 shrink-0 whitespace-nowrap text-gray-500">发放时间：</span>
            <span>{{ coupon.createdAt || '暂无' }}</span>
          </div>
        </div>

        <div class="px-4 pb-4">
          <button
            v-if="canClaim(coupon)"
            @click="handleReceiveCoupon(coupon.id)"
            class="w-full py-2 bg-gradient-to-r from-red-600 to-orange-500 text-white rounded-lg font-medium hover:from-red-700 hover:to-orange-600 transition-all shadow-sm"
          >
            立即领取
          </button>
          <button v-else class="w-full py-2 bg-gray-300 text-gray-600 rounded-lg font-medium cursor-not-allowed" disabled>
            {{ getStatusText(coupon) }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { fetchGetCouponList, fetchReceiveCoupon } from '@/api/coupon';
  import { ref } from 'vue';

  const couponList = ref<Array<API.Coupon.couponInfo>>([]);

  const getStatusText = (coupon: API.Coupon.couponInfo) => {
    if (coupon.verifyTime) {
      return '已核销';
    }

    if (coupon.claimTime) {
      return '已领取';
    }

    const statusMap: Record<number, string> = {
      0: '可领取',
      1: '可领取',
      2: '已核销',
      3: '已过期',
      4: '已下架',
    };

    return statusMap[coupon.status] || '可领取';
  };

  const getStatusClass = (coupon: API.Coupon.couponInfo) => {
    const statusText = getStatusText(coupon);

    if (statusText === '可领取') {
      return 'px-2 py-1 bg-green-100 text-green-700 rounded text-xs font-medium';
    }

    if (statusText === '已领取') {
      return 'px-2 py-1 bg-blue-100 text-blue-700 rounded text-xs font-medium';
    }

    if (statusText === '已核销') {
      return 'px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs font-medium';
    }

    return 'px-2 py-1 bg-red-100 text-red-700 rounded text-xs font-medium';
  };

  const canClaim = (coupon: API.Coupon.couponInfo) => {
    if (coupon.claimTime || coupon.verifyTime) {
      return false;
    }

    const disabledStatuses = new Set([2, 3, 4]);
    return !disabledStatuses.has(coupon.status);
  };

  const handleGetCouponList = async () => {
    couponList.value = await fetchGetCouponList();
  };

  const handleReceiveCoupon = async (voucherId: string | number) => {
    await fetchReceiveCoupon(voucherId);
    showToast('领取成功');
    await handleGetCouponList();
  };

  onMounted(async () => {
    await handleGetCouponList();
  });
</script>
