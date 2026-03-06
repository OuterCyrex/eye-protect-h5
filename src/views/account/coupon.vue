<template>
  <div class="bg-gray-100 min-h-screen p-3">
    <div v-for="item of couponList" :key="item.id">
      <CouponItem :coupon="item" />
    </div>

    <LoadLay v-model="loading" />
  </div>
</template>

<script lang="ts" setup>
  import { fetchGetMyCoupons } from '@/api/coupon';
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
    await handleGetMyCoupons();
    loading.value = false;
  });
</script>
