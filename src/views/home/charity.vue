<template>
  <div class="min-h-screen bg-gradient-to-b from-red-600 to-white p-4">
    <div class="text-center mb-6">
      <p class="text-gray-200 mt-1 text-sm">公益礼包</p>
      <h1 class="text-2xl font-bold text-white flex items-center justify-center"> 限时领取 </h1>
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
            <div class="text-sm text-gray-500">{{ coupon.institutionName }}</div>
            <div class="text-lg font-bold text-red-700 mt-1">{{ coupon.name }}</div>
          </div>
          <div :class="getStatusClass(coupon.status)">
            {{ getStatusText(coupon.status) }}
          </div>
        </div>

        <div class="p-4 text-sm text-gray-700 space-y-2">
          <div class="flex items-start">
            <span class="w-24 text-gray-500">优惠券类型：</span>
            <span>{{ getCouponTypeText(coupon.type) }}</span>
          </div>
          <div class="flex items-start">
            <span class="w-24 text-gray-500">使用说明：</span>
            <span class="text-gray-600">{{ coupon.description || '无使用说明' }}</span>
          </div>
          <div class="flex items-start">
            <span class="w-24 text-gray-500">发放数量：</span>
            <span>{{ coupon.maxCouponCount || 0 }}张</span>
          </div>
          <div class="flex items-start">
            <span class="w-24 text-gray-500">有效期：</span>
            <span>{{ coupon.validStartDate || '暂无' }} 至 {{ coupon.validEndDate || '暂无' }}</span>
          </div>
          <div class="flex items-start">
            <span class="w-24 text-gray-500">使用规则：</span>
            <span class="text-gray-600">{{ coupon.usageRules || '无特殊使用规则' }}</span>
          </div>
        </div>

        <div class="px-4 pb-4">
          <button
            v-if="coupon.status === 1"
            @click="handleReceiveCoupon(coupon.id, coupon.institutionId)"
            class="w-full py-2 bg-gradient-to-r from-red-600 to-orange-500 text-white rounded-lg font-medium hover:from-red-700 hover:to-orange-600 transition-all shadow-sm"
          >
            立即领取
          </button>
          <button v-else class="w-full py-2 bg-gray-300 text-gray-600 rounded-lg font-medium cursor-not-allowed" disabled>
            {{ getStatusText(coupon.status) }}
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

  const getCouponTypeText = (type: number) => {
    const typeMap: Record<number, string> = {
      1: '检查券',
      2: '配镜券',
      3: '训练券',
      4: '综合券',
    };
    return typeMap[type] || '通用券';
  };

  const getStatusText = (status: number) => {
    const statusMap: Record<number, string> = {
      1: '可领取',
      2: '已过期',
      3: '已下架',
    };
    return statusMap[status] || '未知状态';
  };

  const getStatusClass = (status: number) => {
    const classMap: Record<number, string> = {
      1: 'px-2 py-1 bg-green-100 text-green-700 rounded text-xs font-medium',
      2: 'px-2 py-1 bg-red-100 text-red-700 rounded text-xs font-medium',
      3: 'px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs font-medium',
    };
    return classMap[status] || 'px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs font-medium';
  };

  const handleGetCouponList = async () => {
    await fetchGetCouponList().then((res) => {
      couponList.value = res;
    });
  };

  const handleReceiveCoupon = async (vid: string, iid: string) => {
    await fetchReceiveCoupon({
      voucherId: vid,
      institutionId: iid,
    }).then(() => {
      showToast('领取成功');
      handleGetCouponList();
    });
  };

  onMounted(async () => {
    await handleGetCouponList();
  });
</script>
