<template>
  <div class="bg-gray-100 p-3 min-h-full">
    <div class="overflow-hidden rounded-lg border border-slate-200 bg-white">
      <div class="p-4">
        <div class="flex gap-4">
          <img :src="expert.imageUrl || ExpertAvatar" :alt="expert.name" class="h-28 w-28 shrink-0 rounded-lg bg-slate-100 object-cover" />
          <div class="min-w-0 flex-1">
            <div class="text-lg font-semibold text-slate-800">{{ displayText(expert.name) }}</div>
            <div class="mt-2 text-sm text-blue-600">{{ displayText(expert.title) }}</div>
            <div class="mt-2 text-xs text-slate-500">{{ displayText(expert.areaName) }}</div>
          </div>
        </div>
      </div>
      <div class="border-t border-slate-200 bg-slate-50 px-4 py-3 text-sm font-semibold text-slate-700">专家简介</div>
      <div class="whitespace-pre-wrap break-all px-4 py-4 text-sm leading-7 text-slate-700">{{ displayText(expert.introduction) }}</div>
    </div>

    <LoadLay v-model="loading" />
  </div>
</template>

<script lang="ts" setup>
  import { ref } from 'vue';
  import { fetchGetExpertInfo } from '@/api/misc';
  import LoadLay from '@/templates/LoadLay.vue';
  import ExpertAvatar from '@/assets/font/icon/home/home-experts-avatar.png';

  const route = useRoute();
  const loading = ref(false);
  const expert = ref<API.Misc.ExpertInfo>({
    id: '',
    name: '',
    title: '',
    introduction: '',
    imageUrl: '',
    areaCode: '',
    areaName: '',
    sortOrder: 0,
    status: 0,
    statusDesc: '',
  });

  const displayText = (value?: string | null) => {
    if (typeof value !== 'string') return '暂无';
    const text = value.trim();
    return text ? text : '暂无';
  };

  onMounted(async () => {
    const id = typeof route.query.id === 'string' ? route.query.id : '';
    if (!id) return;

    loading.value = true;
    try {
      expert.value = await fetchGetExpertInfo(id);
    } finally {
      loading.value = false;
    }
  });
</script>
