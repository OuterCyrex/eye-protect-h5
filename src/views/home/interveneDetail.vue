<template>
  <div class="bg-gray-50 min-h-screen">
    <div class="max-w-3xl mx-auto p-1 space-y-3">
      <div class="bg-white p-4 border border-gray-200 rounded-lg">
        <div class="text-sm font-semibold text-gray-800 mb-3 flex items-center">
          <span class="w-1.5 h-1.5 bg-gray-700 rounded-full mr-2"></span>
          基础信息
        </div>
        <div class="grid grid-cols-2 gap-3 text-sm">
          <div>
            <div class="text-xs text-gray-500 mb-1">机构名称</div>
            <div class="text-gray-800">{{ displayText(data?.institutionName) }}</div>
          </div>
          <div>
            <div class="text-xs text-gray-500 mb-1">方案类型</div>
            <div class="text-gray-800">{{ displayText(data?.planType) }}</div>
          </div>
          <div>
            <div class="text-xs text-gray-500 mb-1">医生签名</div>
            <div class="text-gray-800">{{ displayText(data?.doctorSignature) }}</div>
          </div>
          <div>
            <div class="text-xs text-gray-500 mb-1">方案日期</div>
            <div class="text-gray-800">{{ displayText(data?.planDate) }}</div>
          </div>
          <div>
            <div class="text-xs text-gray-500 mb-1">复查时间</div>
            <div class="text-gray-800">{{ displayText(data?.structuredDiagnosis?.reviewTime) }}</div>
          </div>
          <div>
            <div class="text-xs text-gray-500 mb-1">下次复查日期</div>
            <div class="text-gray-800">{{ displayText(data?.nextReviewDate) }}</div>
          </div>
        </div>
      </div>

      <div class="bg-white p-4 border border-gray-200 rounded-lg">
        <div class="text-sm font-semibold text-gray-800 mb-3 flex items-center">
          <span class="w-1.5 h-1.5 bg-gray-700 rounded-full mr-2"></span>
          诊断信息
        </div>
        <div class="space-y-3 text-sm">
          <div>
            <div class="text-xs text-gray-500 mb-1">诊断类型</div>
            <div class="text-gray-800 leading-6">{{ joinOrDefault(diagnosisTypes) }}</div>
          </div>
          <div>
            <div class="text-xs text-gray-500 mb-1">视觉功能诊断</div>
            <div class="text-gray-800 leading-6">{{ displayText(data?.visualFunctionDiagnosis) }}</div>
          </div>
          <div>
            <div class="text-xs text-gray-500 mb-1">轴比计算</div>
            <div class="text-gray-800 leading-6">{{ numberOrDefault(data?.axisRatioCalculation) }}</div>
          </div>
        </div>
      </div>

      <div class="bg-white p-4 border border-gray-200 rounded-lg">
        <div class="text-sm font-semibold text-gray-800 mb-3 flex items-center">
          <span class="w-1.5 h-1.5 bg-gray-700 rounded-full mr-2"></span>
          方案项目
        </div>
        <div v-if="planItems.length" class="space-y-3">
          <div v-for="item in planItems" :key="item.index" class="text-sm border-b border-gray-100 pb-3 last:border-b-0 last:pb-0">
            <div class="text-gray-800 font-medium">{{ item.index }}. {{ displayText(item.name) }}</div>
            <div class="text-gray-500 mt-1 leading-6">{{ displayText(item.remark) }}</div>
          </div>
        </div>
        <div v-else class="text-sm text-gray-500">暂无</div>
      </div>

      <div class="bg-white p-4 border border-gray-200 rounded-lg">
        <div class="text-sm font-semibold text-gray-800 mb-3 flex items-center">
          <span class="w-1.5 h-1.5 bg-gray-700 rounded-full mr-2"></span>
          干预建议
        </div>
        <div class="space-y-3 text-sm">
          <div>
            <div class="text-xs text-gray-500 mb-1">光学干预</div>
            <div class="text-gray-800 leading-6">{{ opticalInterventionText }}</div>
          </div>
          <div>
            <div class="text-xs text-gray-500 mb-1">药物干预</div>
            <div class="text-gray-800 leading-6">{{ drugInterventionText }}</div>
          </div>
          <div>
            <div class="text-xs text-gray-500 mb-1">视觉训练</div>
            <div class="text-gray-800 leading-6">{{ visualTrainingText }}</div>
          </div>
          <div>
            <div class="text-xs text-gray-500 mb-1">环境干预</div>
            <div class="text-gray-800 leading-6">{{ environmentalInterventionText }}</div>
          </div>
        </div>
      </div>

      <div class="bg-white p-4 border border-gray-200 rounded-lg">
        <div class="text-sm font-semibold text-gray-800 mb-3 flex items-center">
          <span class="w-1.5 h-1.5 bg-gray-700 rounded-full mr-2"></span>
          复查建议
        </div>
        <div class="space-y-3 text-sm">
          <div>
            <div class="text-xs text-gray-500 mb-1">复查规则</div>
            <div class="text-gray-800 leading-6">{{ displayText(data?.reviewRule) }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { computed, ref } from 'vue';
  import { fetchGetInterventionInfo } from '@/api/intervention';

  const route = useRoute();
  const data = ref<API.Intervene.interveneInfo | null>(null);

  const displayText = (value?: string | null) => {
    if (typeof value !== 'string') return '暂无';
    const text = value.trim();
    return text ? text : '暂无';
  };

  const numberOrDefault = (value?: number | null) => {
    return typeof value === 'number' && Number.isFinite(value) ? String(value) : '暂无';
  };

  const joinOrDefault = (values?: Array<string | null | undefined>, separator = '、') => {
    const result = (values ?? []).map((item) => displayText(item)).filter((item) => item !== '暂无');
    return result.length ? result.join(separator) : '暂无';
  };

  const diagnosisTypes = computed(() => data.value?.structuredDiagnosis?.diagnosisSuggestion?.diagnosisTypes ?? []);
  const planItems = computed(() => data.value?.structuredDiagnosis?.planItems ?? []);

  const opticalInterventionText = computed(() => {
    const intervention = data.value?.structuredDiagnosis?.diagnosisSuggestion?.opticalIntervention;
    if (!intervention?.enabled) return '暂无';

    const parts = [
      `框架眼镜：${joinOrDefault(intervention.frameGlasses)}`,
      `隐形眼镜：${joinOrDefault(intervention.contactLenses)}`,
      `控制镜片：${joinOrDefault(intervention.controlLenses)}`,
    ].filter((item) => !item.endsWith('暂无'));

    return parts.length ? parts.join('；') : '暂无';
  });

  const drugInterventionText = computed(() => {
    const intervention = data.value?.structuredDiagnosis?.diagnosisSuggestion?.drugIntervention;
    if (!intervention?.enabled) return '暂无';

    const drugs = (intervention.drugs ?? []).map((item) => displayText(item?.name)).filter((item) => item !== '暂无');
    return drugs.length ? drugs.join('、') : '暂无';
  });

  const visualTrainingText = computed(() => {
    const intervention = data.value?.structuredDiagnosis?.diagnosisSuggestion?.visualTraining;
    if (!intervention?.enabled) return '暂无';
    return joinOrDefault(intervention.trainingItems);
  });

  const environmentalInterventionText = computed(() => {
    const intervention = data.value?.structuredDiagnosis?.diagnosisSuggestion?.environmentalIntervention;
    if (!intervention?.enabled) return '暂无';
    return joinOrDefault(intervention.items);
  });

  const handleGetDetail = async () => {
    const detailId = typeof route.query.id === 'string' ? route.query.id : '';
    if (!detailId) return;
    data.value = (await fetchGetInterventionInfo(detailId)) || null;
  };

  onMounted(async () => {
    await handleGetDetail();
  });
</script>
