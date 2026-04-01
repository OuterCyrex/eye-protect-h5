<template>
  <div class="bg-gray-100 p-3 min-h-full">
    <div class="mb-3 flex gap-2">
      <van-field v-model="provinceName" placeholder="选择省份" readonly is-link @click="openProvincePicker" />
      <van-field v-model="cityName" placeholder="选择城市" readonly is-link @click="openCityPicker" />
    </div>

    <var-list :finished="finished" :immediate-check="true" v-model:loading="loading" @load="loadExperts">
      <div
        v-for="expert in expertList"
        :key="expert.id"
        class="mb-3 flex gap-3 rounded-lg border border-slate-200 bg-white p-3"
        @click="router.push({ path: '/home/experts/detail', query: { id: expert.id } })"
      >
        <img :src="expert.imageUrl" class="h-24 w-24 rounded-lg object-cover" />
        <div class="flex-1">
          <div class="flex justify-between">
            <div class="font-semibold">{{ expert.name }}</div>
            <div class="text-xs text-gray-500">{{ expert.areaName || '暂无' }}</div>
          </div>
          <div class="text-sm text-blue-600 mt-1">{{ expert.title || '暂无' }}</div>
          <div class="text-sm mt-2 text-gray-600 line-clamp-3">{{ expert.introduction || '暂无' }}</div>
        </div>
      </div>
    </var-list>

    <van-popup v-model:show="showProvincePicker" position="bottom">
      <van-picker :columns="provinceColumns" @cancel="showProvincePicker = false" @confirm="onProvinceChange" />
    </van-popup>

    <van-popup v-model:show="showCityPicker" position="bottom">
      <van-picker :columns="cityColumns" @cancel="showCityPicker = false" @confirm="onCityChange" />
    </van-popup>

    <LoadLay v-model="pageLoading" />
  </div>
</template>

<script lang="ts" setup>
  import { ref, onMounted } from 'vue';
  import { fetchGetExpertList, fetchGetProvinceList, fetchGetCityList } from '@/api/misc';
  import LoadLay from '@/templates/LoadLay.vue';

  const router = useRouter();

  const expertList = ref<API.Misc.ExpertInfo[]>([]);
  const loading = ref(false);
  const finished = ref(false);
  const pageLoading = ref(false);

  const query = ref({
    current: 1,
    size: 10,
    name: '',
    title: '',
    areaCode: '',
    status: 1,
    orderBy: '',
    orderDirection: '',
  });

  const provinceColumns = ref<any[]>([]);
  const cityColumns = ref<any[]>([]);

  const showProvincePicker = ref(false);
  const showCityPicker = ref(false);

  const selectedProvinceCode = ref('');

  const provinceName = ref('');
  const cityName = ref('');

  const normalizeRegionOptions = (list: any) => {
    const source = Array.isArray(list) ? list : Array.isArray(list?.records) ? list.records : [];
    return source.map((item: any) => ({
      text: item.name || item.areaName || '',
      value: item.code || item.areaCode || '',
    }));
  };

  const handleGetProvinceList = async () => {
    const res = await fetchGetProvinceList();
    provinceColumns.value = normalizeRegionOptions(res);
  };

  const handleGetCityList = async (code: string) => {
    if (!code) {
      cityColumns.value = [];
      return;
    }
    const res = await fetchGetCityList(code);
    cityColumns.value = normalizeRegionOptions(res);
  };

  const openProvincePicker = async () => {
    if (!provinceColumns.value.length) {
      await handleGetProvinceList();
    }
    showProvincePicker.value = true;
  };

  const openCityPicker = () => {
    if (!selectedProvinceCode.value) {
      showToast('请先选择省份');
      return;
    }
    showCityPicker.value = true;
  };

  const onProvinceChange = async (value: any) => {
    const option = value.selectedOptions[0];
    selectedProvinceCode.value = option.value;
    provinceName.value = option.text;
    cityName.value = '';
    cityColumns.value = [];
    query.value.areaCode = option.value;
    showProvincePicker.value = false;
    await handleGetCityList(option.value);
    resetAndReload();
  };

  const onCityChange = (value: any) => {
    const option = value.selectedOptions[0];
    cityName.value = option.text;
    query.value.areaCode = option.value;
    showCityPicker.value = false;
    resetAndReload();
  };

  const loadExperts = async () => {
    if (finished.value) {
      loading.value = false;
      return;
    }
    const res = await fetchGetExpertList(query.value);
    const records = res?.records || [];
    expertList.value.push(...records);
    loading.value = false;
    if (records.length < query.value.size) {
      finished.value = true;
      return;
    }
    query.value.current += 1;
  };

  const resetAndReload = () => {
    query.value.current = 1;
    expertList.value = [];
    finished.value = false;
    loadExperts();
  };

  onMounted(async () => {
    await handleGetProvinceList();
  });
</script>
