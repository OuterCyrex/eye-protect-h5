<template>
  <div class="min-h-screen bg-gray-50 p-3">
    <div v-if="interventionList.length" class="space-y-3">
      <div
        v-for="(item, index) in interventionList"
        :key="`${item.planDate}-${item.institutionName}-${index}`"
        class="rounded-lg border border-slate-200 bg-white p-4"
        @click="openDetail(item)"
      >
        <div class="flex items-start justify-between gap-3">
          <div class="min-w-0 flex-1">
            <div class="truncate text-base font-semibold text-slate-800">{{ displayText(item.planType) }}</div>
            <div class="mt-1 text-sm text-slate-500">{{ displayText(item.institutionName) }}</div>
          </div>
          <div class="shrink-0 rounded bg-slate-100 px-2 py-1 text-xs text-slate-600">{{ displayText(item.planDate) }}</div>
        </div>

        <div class="mt-3 grid grid-cols-2 gap-3 text-sm">
          <div>
            <div class="text-xs text-slate-500">视觉功能诊断</div>
            <div class="mt-1 text-slate-700">{{ displayText(item.visualFunctionDiagnosis) }}</div>
          </div>
          <div>
            <div class="text-xs text-slate-500">下次复查</div>
            <div class="mt-1 text-slate-700">{{ displayText(item.nextReviewDate) }}</div>
          </div>
        </div>

        <div class="mt-3 text-right text-sm text-blue-600">查看详情</div>
      </div>
    </div>

    <div v-else class="py-10 text-center text-sm text-slate-500">
      <nut-empty description="暂无干预方案"></nut-empty>
    </div>

    <LoadLay v-model="loading" />
  </div>
</template>

<script setup lang="ts">
  import { ref } from 'vue';
  import { fetchGetInterventionList } from '@/api/intervention';
  import LoadLay from '@/templates/LoadLay.vue';
  import { useUserStore } from '@/store/modules/user';

  const router = useRouter();
  const userStore = useUserStore();
  const loading = ref(false);
  const interventionList = ref<API.Intervene.interveneInfo[]>([]);

  const displayText = (value?: string | null) => {
    if (typeof value !== 'string') return '暂无';
    const text = value.trim();
    return text ? text : '暂无';
  };

  const openDetail = (item: API.Intervene.interveneInfo) => {
    router.push({
      path: '/home/intervene/detail',
      query: {
        id: item.id,
      },
    });
  };

  const handleGetInterventionList = async () => {
    const patientId = userStore.getStudent?.patientId;
    if (!patientId) {
      interventionList.value = [];
      return;
    }

    const res = await fetchGetInterventionList(patientId);
    interventionList.value = Array.isArray(res) ? res : [];
  };

  onMounted(async () => {
    loading.value = true;
    try {
      await handleGetInterventionList();
    } finally {
      loading.value = false;
    }
  });
</script>
