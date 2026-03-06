<template>
  <div class="bg-gray-50 min-h-screen">
    <div class="max-w-3xl mx-auto">
      <div class="bg-white p-4 mb-3 border border-gray-200">
        <div class="text-sm font-semibold text-gray-800 mb-2 flex items-center">
          <span class="w-1.5 h-1.5 bg-gray-700 rounded-full mr-2"></span>
          基础信息
        </div>
        <div class="grid grid-cols-2 gap-2 text-sm">
          <div class="flex flex-col">
            <div class="text-xs text-gray-500 mb-0.5">机构名称</div>
            <div class="text-gray-800 font-medium">{{ data.institutionName }}</div>
          </div>
          <div class="flex flex-col">
            <div class="text-xs text-gray-500 mb-0.5">方案类型</div>
            <div class="text-gray-800">{{ data.planType }}</div>
          </div>
          <div class="flex flex-col">
            <div class="text-xs text-gray-500 mb-0.5">医生签名</div>
            <div class="text-gray-800">{{ data.doctorSignature || '—' }}</div>
          </div>
          <div class="flex flex-col">
            <div class="text-xs text-gray-500 mb-0.5">方案日期</div>
            <div class="text-gray-800">{{ data.planDate }}</div>
          </div>
          <div class="flex flex-col col-span-2">
            <div class="text-xs text-gray-500 mb-0.5">下次复查日期</div>
            <div class="text-gray-800 font-medium">{{ data.nextReviewDate }}</div>
          </div>
        </div>
      </div>

      <div class="bg-white p-3 mb-3 border border-gray-200">
        <div class="text-sm font-semibold text-gray-800 mb-3 flex items-center">
          <span class="w-1.5 h-1.5 bg-gray-700 rounded-full mr-2"></span>
          诊断与干预
        </div>

        <div class="mb-3 pl-0.5">
          <div class="text-xs text-gray-500 mb-1.5">诊断结果</div>
          <div class="text-sm text-gray-800 font-medium">
            {{ data.structuredDiagnosis.diagnosisSuggestion.diagnosisTypes.join('、') }}
          </div>
        </div>

        <div class="pl-0.5">
          <div class="text-xs text-gray-500 mb-1.5">干预方案</div>
          <div class="text-sm text-gray-800 space-y-2">
            <div v-for="item in data.structuredDiagnosis.planItems" :key="item.index" class="flex items-start">
              <span class="w-5 text-gray-700 font-medium">{{ item.index }}.</span>
              <div>
                <span class="font-medium">{{ item.name }}</span
                >：<span class="text-gray-600">{{ item.remark }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="bg-white p-3 border border-gray-200">
        <div class="text-sm font-semibold text-gray-800 mb-2 flex items-center">
          <span class="w-1.5 h-1.5 bg-gray-700 rounded-full mr-2"></span>
          复查建议
        </div>
        <div class="text-sm text-gray-800 leading-relaxed">
          {{ data.reviewRule }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { fetchGetLastIntervention } from '@/api/intervention';
  import { useUserStore } from '@/store/modules/user';
  import { ref } from 'vue';
  const userStore = useUserStore();

  const data = ref<API.Intervene.interveneInfo>({
    institutionName: '',
    doctorSignature: '',
    planType: '',
    diagnosis: '',
    structuredDiagnosis: {
      planItems: [],
      diagnosisSuggestion: {
        diagnosisTypes: [],
        opticalIntervention: {
          enabled: false,
          frameGlasses: null,
          contactLenses: null,
          controlLenses: null,
        },
        drugIntervention: {
          enabled: false,
          drugs: null,
        },
        visualTraining: {
          enabled: false,
          trainingItems: null,
        },
        environmentalIntervention: {
          enabled: false,
          items: [],
        },
      },
      reviewTime: '',
    },
    axisRatioCalculation: null,
    visualFunctionDiagnosis: '',
    planDate: '',
    nextReviewDate: '',
    reviewRule: '',
  });

  const handleGetIntervention = async () => {
    await fetchGetLastIntervention(userStore.getStudent.patientId).then((res) => {
      data.value = res;
    });
  };

  onMounted(async () => {
    await handleGetIntervention();
  });
</script>
