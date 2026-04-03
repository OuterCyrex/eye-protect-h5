<template>
  <van-popup
    v-model:show="show"
    round
    :close-on-click-overlay="false"
    class="w-[calc(100vw-30px)] max-w-[392px] overflow-hidden rounded-[18px]"
  >
    <div class="px-5 pb-[18px] pt-6 text-center text-white bg-[linear-gradient(135deg,#ef4444_0%,#dc2626_55%,#b91c1c_100%)]">
      <div class="text-[20px] font-bold leading-[1.2]">新用户专享福利</div>
      <div class="mt-2.5 text-[14px] opacity-95">已为您发放 1 张通用券</div>
    </div>

    <div class="bg-white px-5 pb-5 pt-[22px]">
      <div class="rounded-xl border border-red-200 bg-[linear-gradient(90deg,#fef2f2_0%,#fff7ed_100%)] px-[14px] py-3">
        <div class="text-[16px] font-bold leading-[1.35] text-red-700">注册礼 · 通用优惠券</div>
        <div class="mt-1.5 text-[13px] font-semibold text-red-900">已自动发放至您的账户</div>
      </div>
      <div class="mt-3.5 text-[14px] leading-[1.72] text-gray-800">请前往“我的 → 我的公益券”查看并使用，满足条件后可直接抵扣。</div>
      <div class="mt-2.5 mb-4 text-[12px] text-gray-500">温馨提示：优惠券以“我的公益券”页面展示为准</div>
      <van-button class="mt-[18px] h-[46px] rounded-xl border-0 text-[15px] font-bold" color="#dc2626" block @click="emit('view-coupon')">
        立即查看优惠券
      </van-button>
    </div>
  </van-popup>
</template>

<script lang="ts" setup>
  const show = defineModel<boolean>('show', { required: true });
  const emit = defineEmits<{
    (e: 'view-coupon'): void;
  }>();
</script>
