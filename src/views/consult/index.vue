<template>
  <div class="consult-page min-h-full p-3">
    <div class="hero-card overflow-hidden rounded-2xl p-4 text-white">
      <div class="relative z-10">
        <div class="text-lg font-semibold">专家咨询</div>
        <div class="mt-2 text-sm text-blue-100">为您提供在线咨询服务</div>
        <div class="mt-3 rounded-xl bg-white/20 px-3 py-2 text-sm">
          <div>服务地区：{{ userAreaName || displayAreaNames }}</div>
          <div class="mt-1">二维码更新时间：{{ formatDateTime(qrCodeInfo.updateTime || qrCodeInfo.createTime) }}</div>
        </div>
      </div>
      <div class="hero-dot hero-dot-a" />
      <div class="hero-dot hero-dot-b" />
    </div>

    <div class="mt-3 rounded-2xl border border-gray-100 bg-white p-4 shadow-sm">
      <div class="qr-wrap flex min-h-[46vh] items-center justify-center rounded-xl border border-slate-200 bg-gray-100 p-4">
        <div v-if="pageLoading" class="text-center text-gray-500">
          <van-loading size="26px" />
          <div class="mt-3 text-sm">二维码加载中...</div>
        </div>

        <div v-else-if="qrCodeInfo.qrcodeUrl" class="text-center">
          <div class="mx-auto w-fit rounded-xl bg-white p-3 shadow-sm">
            <van-image width="230" height="230" :src="qrCodeInfo.qrcodeUrl" fit="cover" radius="8" />
          </div>
          <div class="mt-3 text-sm font-medium text-gray-700">请使用微信扫一扫</div>
          <div class="mt-1 text-xs text-gray-500">扫码后将跳转企业微信咨询页面</div>
        </div>

        <div v-else class="text-center text-sm text-gray-500">暂无可用二维码，请稍后重试</div>
      </div>
    </div>

    <div class="mt-3 rounded-2xl border border-gray-100 bg-white p-4 shadow-sm">
      <div class="text-sm font-semibold text-gray-800">咨询说明</div>
      <div class="mt-3 space-y-2 text-sm text-gray-600">
        <div>1. 请使用微信扫码进入企业微信咨询页面。</div>
        <div>2. 为便于快速响应，建议先简要说明咨询问题。</div>
        <div>3. 若二维码暂时无法识别，请稍后刷新页面重试。</div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { computed, ref } from 'vue';
  import { fetchGetQRCode } from '@/api/misc';
  import { fetchGetUserInfoDetail } from '@/api/user';

  const defaultQRCodeInfo: API.Misc.QRCodeInfo = {
    id: '',
    qrcodeUrl: '',
    areaCodes: [],
    areaNames: [],
    createTime: '',
    updateTime: '',
  };

  const qrCodeInfo = ref<API.Misc.QRCodeInfo>({ ...defaultQRCodeInfo });
  const userAreaCode = ref('');
  const userAreaName = ref('');
  const pageLoading = ref(false);

  const displayAreaNames = computed(() => {
    const names = qrCodeInfo.value.areaNames || [];
    return names.length ? names.join(' / ') : '暂无';
  });

  const loadQRCode = async (areaCode: string) => {
    if (!areaCode) {
      qrCodeInfo.value = { ...defaultQRCodeInfo };
      return;
    }
    pageLoading.value = true;
    try {
      const res = await fetchGetQRCode(areaCode);
      qrCodeInfo.value = {
        ...defaultQRCodeInfo,
        ...res,
      };
    } finally {
      pageLoading.value = false;
    }
  };

  const formatDateTime = (dateStr: string) => {
    if (!dateStr) return '暂无';
    const date = new Date(dateStr);
    if (Number.isNaN(date.getTime())) return dateStr;
    const y = date.getFullYear();
    const m = `${date.getMonth() + 1}`.padStart(2, '0');
    const d = `${date.getDate()}`.padStart(2, '0');
    const h = `${date.getHours()}`.padStart(2, '0');
    const mm = `${date.getMinutes()}`.padStart(2, '0');
    return `${y}-${m}-${d} ${h}:${mm}`;
  };

  const initData = async () => {
    try {
      const userDetail = await fetchGetUserInfoDetail();
      userAreaCode.value = userDetail?.areaCode || '';
      userAreaName.value = userDetail?.areaName || '';
    } catch {
      userAreaCode.value = '';
      userAreaName.value = '';
    }
    await loadQRCode(userAreaCode.value);
  };

  onMounted(async () => {
    await initData();
  });
</script>

<style lang="scss" scoped>
  .consult-page {
    background: #fff;
  }

  .hero-card {
    position: relative;
    background: linear-gradient(128deg, #2563eb 0%, #1d4ed8 60%, #1e40af 100%);
  }

  .hero-dot {
    position: absolute;
    background: rgb(255 255 255 / 14%);
    border-radius: 9999px;
  }

  .hero-dot-a {
    top: -26px;
    right: -24px;
    width: 110px;
    height: 110px;
  }

  .hero-dot-b {
    right: 58px;
    bottom: -46px;
    width: 92px;
    height: 92px;
  }
</style>
