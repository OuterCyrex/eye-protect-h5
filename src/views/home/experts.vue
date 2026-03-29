<template>
  <div class="bg-gray-100 p-3 min-h-full">
    <var-list :finished="finished" :immediate-check="true" v-model:loading="loading" @load="loadExperts">
      <div
        v-for="expert in expertList"
        :key="expert.id"
        class="mb-3 flex gap-3 rounded-lg border border-slate-200 bg-white p-3"
        @click="router.push({ path: '/home/experts/detail', query: { id: expert.id } })"
      >
        <img :src="expert.imageUrl" :alt="expert.name" class="h-24 w-24 shrink-0 rounded-lg bg-slate-100 object-cover" />
        <div class="min-w-0 flex-1">
          <div class="flex items-center justify-between gap-2">
            <div class="truncate text-base font-semibold text-slate-800">{{ expert.name }}</div>
            <div class="shrink-0 text-xs text-slate-500">{{ displayText(expert.areaName) }}</div>
          </div>
          <div class="mt-1 text-sm text-blue-600">{{ displayText(expert.title) }}</div>
          <div class="mt-2 line-clamp-3 text-sm leading-6 text-slate-600">{{ displayText(expert.introduction) }}</div>
        </div>
      </div>
    </var-list>
    <LoadLay v-model="pageLoading" />
  </div>
</template>

<script lang="ts" setup>
  import { ref } from 'vue';
  import { fetchGetExpertList } from '@/api/misc';
  import LoadLay from '@/templates/LoadLay.vue';

  const router = useRouter();
  const expertList = ref<Array<API.Misc.ExpertInfo>>([]);
  const loading = ref(false);
  const finished = ref(false);
  const pageLoading = ref(false);
  const query = ref<API.Misc.GetExpertListRequest>({
    current: 1,
    size: 10,
    name: '',
    title: '',
    areaCode: '',
    status: 1,
    orderBy: '',
    orderDirection: '',
  });

  const displayText = (value?: string | null) => {
    if (typeof value !== 'string') return '暂无';
    const text = value.trim();
    return text ? text : '暂无';
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

    const reachedLastPageByPages = typeof res?.pages === 'number' && query.value.current >= res.pages;
    const reachedLastPageBySize = records.length < query.value.size;

    if (reachedLastPageByPages || reachedLastPageBySize) {
      finished.value = true;
      return;
    }

    query.value.current += 1;
  };
</script>
