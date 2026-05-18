<template>
  <van-popup
    v-model:show="visible"
    :close-on-click-overlay="false"
    :close-on-press-escape="false"
    position="center"
    :style="{ width: '88vw', maxWidth: '340px' }"
    round
  >
    <div class="rounded-2xl bg-white px-4 pb-6 pt-4 shadow-lg">
      <div class="mb-2 text-center text-lg font-semibold">补充区域信息</div>
      <div class="mb-4 text-center text-sm text-gray-500">首次登录后需要先填写区域信息，才能继续使用。</div>

      <van-cell-group>
        <van-field label="区域" :model-value="regionName" placeholder="请选择区域" readonly is-link @click="openRegionPicker" />
      </van-cell-group>

      <div class="mt-5">
        <van-button type="primary" block :loading="saving" :disabled="!userInfo.areaCode" @click="handleSave">确定</van-button>
      </div>
    </div>
  </van-popup>

  <van-popup v-model:show="showProvincePicker" position="bottom" teleport="body">
    <van-picker title="请选择省份" :columns="provinceColumns" @cancel="showProvincePicker = false" @confirm="onProvinceChange" />
  </van-popup>

  <van-popup v-model:show="showCityPicker" position="bottom" teleport="body">
    <van-picker title="请选择城市" :columns="cityColumns" @cancel="showCityPicker = false" @confirm="onCityChange" />
  </van-popup>
</template>

<script setup lang="ts">
  import { fetchGetCityList, fetchGetProvinceList } from '@/api/misc';
  import { fetchGetUserInfoDetail, fetchUpdateUserInfo } from '@/api/user';
  import { useUserStore } from '@/store/modules/user';

  interface RegionOption {
    text: string;
    value: string;
  }

  const visible = ref(false);
  const saving = ref(false);
  const userStore = useUserStore();

  const userInfo = ref<API.Auth.UserDetail>({
    id: '',
    phone: '',
    name: '',
    gender: '',
    idCard: '',
    status: '',
    lastLoginTime: '',
    areaCode: '',
    provinceName: '',
    cityName: '',
    emergencyContact: '',
    emergencyPhone: '',
    address: '',
    avatarUrl: '',
    birthDate: '',
    email: '',
  });

  const regionName = ref('');
  const provinceColumns = ref<RegionOption[]>([]);
  const cityColumns = ref<RegionOption[]>([]);
  const selectedProvinceCode = ref('');
  const selectedProvinceName = ref('');
  const showProvincePicker = ref(false);
  const showCityPicker = ref(false);

  const normalizeRegionOptions = (list: any) => {
    const source = Array.isArray(list) ? list : Array.isArray(list?.records) ? list.records : [];
    return source.map((item: any) => ({
      text: item.name || item.areaName || item.label || '',
      value: item.code || item.areaCode || item.value || '',
    }));
  };

  const formatRegionName = (provinceName?: string, cityName?: string) => `${provinceName || ''}${cityName || ''}`;

  const findProvinceCodeByAreaCode = (areaCode: string) => {
    if (!areaCode) return '';
    const matched = provinceColumns.value.find((item) => areaCode.startsWith(item.value));
    return matched?.value || areaCode.slice(0, 2);
  };

  const loadProvinceList = async () => {
    const res = await fetchGetProvinceList();
    provinceColumns.value = normalizeRegionOptions(res);
  };

  const loadCityList = async (provinceCode: string) => {
    if (!provinceCode) {
      cityColumns.value = [];
      return;
    }
    const res = await fetchGetCityList(provinceCode);
    cityColumns.value = normalizeRegionOptions(res);
  };

  const loadUserDetail = async () => {
    const res = userStore.getInfo?.id ? userStore.getInfo : await fetchGetUserInfoDetail();
    userInfo.value = {
      ...userInfo.value,
      ...res,
    };
    regionName.value = formatRegionName(res.provinceName, res.cityName);
  };

  const syncRegionState = async () => {
    selectedProvinceCode.value = findProvinceCodeByAreaCode(userInfo.value.areaCode);
    selectedProvinceName.value =
      provinceColumns.value.find((item) => item.value === selectedProvinceCode.value)?.text || userInfo.value.provinceName || '';
    await loadCityList(selectedProvinceCode.value);
  };

  const openRegionPicker = async () => {
    if (!provinceColumns.value.length) {
      await loadProvinceList();
    }
    showProvincePicker.value = true;
  };

  const onProvinceChange = async (value: any) => {
    selectedProvinceCode.value = value.selectedOptions[0].value;
    selectedProvinceName.value = value.selectedOptions[0].text;
    showProvincePicker.value = false;
    await loadCityList(selectedProvinceCode.value);
    if (!cityColumns.value.length) {
      userInfo.value.areaCode = selectedProvinceCode.value;
      userInfo.value.provinceName = selectedProvinceName.value;
      userInfo.value.cityName = '';
      regionName.value = formatRegionName(userInfo.value.provinceName, userInfo.value.cityName);
      return;
    }
    showCityPicker.value = true;
  };

  const onCityChange = (value: any) => {
    const city = value.selectedOptions[0];
    userInfo.value.areaCode = city.value;
    userInfo.value.provinceName = selectedProvinceName.value || userInfo.value.provinceName;
    userInfo.value.cityName = city.text;
    regionName.value = formatRegionName(userInfo.value.provinceName, userInfo.value.cityName);
    showCityPicker.value = false;
  };

  const syncDialogState = async () => {
    if (!userStore.getNeedsAreaCodeCompletion) {
      visible.value = false;
      return;
    }

    if (!provinceColumns.value.length) {
      await loadProvinceList();
    }
    await loadUserDetail();
    await syncRegionState();
    visible.value = true;
  };

  const handleSave = async () => {
    if (!userInfo.value.areaCode) {
      showToast('请选择区域');
      return;
    }

    saving.value = true;
    try {
      const response = await fetchUpdateUserInfo({
        id: userInfo.value.id,
        userType: 'PARENT',
        baseInfo: {
          name: userInfo.value.name,
          phone: userInfo.value.phone,
          idCard: userInfo.value.idCard,
          gender: userInfo.value.gender,
          status: userInfo.value.status,
          password: '',
          areaCode: userInfo.value.areaCode,
        },
        parentExtension: {
          birthDate: userInfo.value.birthDate,
          email: userInfo.value.email,
          emergencyContact: userInfo.value.emergencyContact,
          emergencyPhone: userInfo.value.emergencyPhone,
          address: userInfo.value.address,
        },
      });

      if (response?.token) {
        userStore.setToken(response.token);
      }

      await userStore.refreshAreaCodeRequirement();
      visible.value = false;
      showToast('已补充区域信息');
    } finally {
      saving.value = false;
    }
  };

  watch(
    () => userStore.getNeedsAreaCodeCompletion,
    async (needsAreaCodeCompletion) => {
      if (needsAreaCodeCompletion) {
        await syncDialogState();
        return;
      }
      visible.value = false;
    },
    { immediate: true },
  );
</script>
