<template>
  <div class="bg-white rounded-lg border border-gray-100 p-6 flex items-center justify-between">
    <div class="flex items-center gap-3">
      <div class="text-red-500 font-bold text-xl"> {{ getCouponTypeText(coupon.type) }} </div>

      <div class="text-sm text-gray-600 ml-2">
        <div class="font-semibold text-gray-800">{{ getCouponDescText(coupon.type) }}</div>
        <div class="text-sm text-gray-500">适用医院：{{ coupon.usedInstitutionName || '任意医院适用' }}</div>
        <div class="text-red-600 mt-1"> {{ coupon.expireDate }} 过期 </div>
      </div>
    </div>

    <button class="bg-red-500 text-white text-sm px-4 py-1.5 rounded-full cursor-pointer"> 去使用 </button>
  </div>
</template>

<script lang="ts" setup>
  defineProps<{
    coupon: API.Coupon.MyCoupon;
  }>();

  const getCouponDescText = (type: number) => {
    const typeMap: Record<number, string> = {
      1: '可抵消1次眼科检查费用',
      2: '可抵消10元配镜费用',
      3: '可抵消1次眼科训练费用',
      4: '用途请咨询相关工作人员',
    };
    return typeMap[type] || '通用券';
  };

  const getCouponTypeText = (type: number) => {
    const typeMap: Record<number, string> = {
      1: '检查券',
      2: '配镜券',
      3: '训练券',
      4: '综合券',
    };
    return typeMap[type] || '通用券';
  };
</script>
