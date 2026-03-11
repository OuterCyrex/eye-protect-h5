<template>
  <div class="bg-gray-100 min-h-screen p-3">
    <div v-if="couponList && couponList.length >= 0">
      <div v-for="item of couponList" :key="item.id"> <CouponItem :coupon="item" /> </div
    ></div>
    <nut-empty v-if="!couponList || couponList.length <= 0" description="没有可用的公益券"></nut-empty>
    <LoadLay v-model="loading" />
  </div>
</template>

<script lang="ts" setup>
  import { fetchGetMyCoupons } from '@/api/coupon';
  import { fetchGetUserInfo } from '@/api/user';
  import CouponItem from '@/templates/CouponItem.vue';
  import LoadLay from '@/templates/LoadLay.vue';
  const couponList = ref<Array<API.Coupon.MyCoupon>>([]);
  const handleGetMyCoupons = async () => {
    await fetchGetMyCoupons().then((res) => {
      couponList.value = res;
    });
  };
  const loading = ref<boolean>(false);

  onMounted(async () => {
    loading.value = true;
    await fetchGetUserInfo();
    await handleGetMyCoupons();
    loading.value = false;
  });
</script>
