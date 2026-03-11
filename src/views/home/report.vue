<template>
  <div class="bg-gray-50 h-full">
    <div class="bg-white rounded-lg p-4 mb-4 shadow-sm border border-gray-100">
      <div class="text-sm font-semibold text-gray-800 mb-3 flex items-center">
        <span class="w-1.5 h-1.5 bg-blue-500 rounded-full mr-2"></span>
        患者基础信息
      </div>
      <div class="grid grid-cols-2 gap-3 text-sm">
        <div class="flex flex-col gap-1">
          <div class="text-xs text-gray-500">患者姓名</div>
          <div class="text-gray-800">{{ reportData.patientName || '暂无' }}</div>
        </div>
        <div class="flex flex-col gap-1">
          <div class="text-xs text-gray-500">性别</div>
          <div class="text-gray-800">{{ reportData.gender || '暂无' }}</div>
        </div>
        <div class="flex flex-col gap-1">
          <div class="text-xs text-gray-500">年龄</div>
          <div class="text-gray-800">{{ reportData.age ? `${reportData.age}岁` : '暂无' }}</div>
        </div>
        <div class="flex flex-col gap-1">
          <div class="text-xs text-gray-500">出生日期</div>
          <div class="text-gray-800">{{ formatDate(reportData.birthDate) }}</div>
        </div>
        <div class="flex flex-col gap-1">
          <div class="text-xs text-gray-500">联系方式</div>
          <div class="text-gray-800">{{ reportData.phone || '暂无' }}</div>
        </div>
        <div class="flex flex-col gap-1">
          <div class="text-xs text-gray-500">学校/班级</div>
          <div class="text-gray-800"> {{ reportData.school || '暂无' }} {{ reportData.clazz || '' }} </div>
        </div>
        <div class="flex flex-col gap-1">
          <div class="text-xs text-gray-500">防控手段</div>
          <div class="text-gray-800 text-xs leading-relaxed">
            {{ reportData.interventionMeasures || '暂无' }}
          </div>
        </div>
      </div>
    </div>

    <div class="bg-white rounded-lg p-4 mb-4 border border-gray-100" v-if="reportData.chartPoints">
      <div class="text-sm font-semibold text-gray-800 mb-3 flex items-center">
        <span class="w-1.5 h-1.5 bg-purple-500 rounded-full mr-2"></span>
        眼轴/身高数据
      </div>
      <div class="space-y-3 text-sm">
        <div class="flex justify-between items-center">
          <div class="text-xs text-gray-500">眼轴长度</div>
          <div class="text-gray-800 font-medium">
            {{ reportData.chartPoints.axialLengthData.axialLength ? `${reportData.chartPoints.axialLengthData.axialLength}mm` : '暂无' }}
          </div>
        </div>
        <div class="flex justify-between items-center">
          <div class="text-xs text-gray-500">眼轴增长量</div>
          <div class="text-gray-800 font-medium">
            {{ reportData.chartPoints.axialLengthData.growthAmount ? `${reportData.chartPoints.axialLengthData.growthAmount}mm` : '暂无' }}
          </div>
        </div>
        <div class="flex justify-between items-center">
          <div class="text-xs text-gray-500">年增长速度</div>
          <div class="text-gray-800 font-medium">
            {{
              reportData.chartPoints.axialLengthData.growthRatePerYear
                ? `${reportData.chartPoints.axialLengthData.growthRatePerYear}mm/年`
                : '暂无'
            }}
          </div>
        </div>
        <div class="flex justify-between items-center">
          <div class="text-xs text-gray-500">该年龄临界值</div>
          <div class="text-gray-800">
            {{
              reportData.chartPoints.axialLengthData.ageCriticalValue
                ? `${reportData.chartPoints.axialLengthData.ageCriticalValue}mm`
                : '暂无'
            }}
          </div>
        </div>
        <div class="flex justify-between items-center">
          <div class="text-xs text-gray-500">同龄人临界值</div>
          <div class="text-gray-800">
            {{
              reportData.chartPoints.axialLengthData.ageCriticalAxialLength
                ? `${reportData.chartPoints.axialLengthData.ageCriticalAxialLength}mm`
                : '暂无'
            }}
          </div>
        </div>

        <div class="border-t border-gray-100 pt-3 mt-3" v-if="reportData.chartPoints.heightData">
          <div class="flex justify-between items-center">
            <div class="text-xs text-gray-500">身高</div>
            <div class="text-gray-800 font-medium">
              {{ reportData.chartPoints.heightData.height ? `${reportData.chartPoints.heightData.height}cm` : '暂无' }}
            </div>
          </div>
          <div class="flex justify-between items-center mt-2">
            <div class="text-xs text-gray-500">同龄人身高临界值</div>
            <div class="text-gray-800">
              {{
                reportData.chartPoints.heightData.ageCriticalHeight ? `${reportData.chartPoints.heightData.ageCriticalHeight}cm` : '暂无'
              }}
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="bg-white rounded-lg p-4 mb-4 border border-gray-100">
      <div class="text-sm font-semibold text-gray-800 mb-2 flex items-center justify-between">
        <div class="flex items-center">
          <span class="w-1.5 h-1.5 bg-red-500 rounded-full mr-2"></span>
          风险分析
        </div>
        <div class="text-xs text-blue-600 bg-blue-50 px-2 py-0.5 rounded font-medium">
          风险预警：{{ reportData.chartPoints?.riskWarning || '无' }}
        </div>
      </div>

      <div class="text-sm text-gray-600 leading-relaxed p-3 bg-gray-50 rounded-lg border border-gray-100">
        {{ reportData.analysis || '暂无风险分析数据' }}
      </div>
    </div>

    <LoadLay v-model="loading" />
  </div>
</template>

<script lang="ts" setup>
  import { ref } from 'vue';
  import LoadLay from '@/templates/LoadLay.vue';
  import { fetchGetLastReport } from '@/api/intervention';
  import { useUserStore } from '@/store/modules/user';

  const loading = ref<boolean>(false);
  const userStore = useUserStore();

  const formatDate = (dateStr: string) => {
    if (!dateStr || dateStr === '') return '暂无';
    return dateStr.includes('T') ? dateStr.split('T')[0] : dateStr;
  };

  const reportData = ref<API.Intervene.report>({
    patientId: 0,
    patientName: '',
    gender: '',
    age: 0,
    birthDate: '',
    phone: '',
    school: '',
    clazz: '',
    interventionMeasures: '',
    chartPoints: {
      checkDate: '',
      age: 0,
      axialLengthData: {
        axialLength: 0,
        previousAxialLength: 0,
        growthAmount: 0,
        growthRatePerYear: 0,
        ageCriticalValue: 0,
        ageCriticalAxialLength: 0,
      },
      heightData: {
        height: 0,
        ageCriticalHeight: 0,
      },
      riskWarning: '',
    },
    analysis: '',
  });

  onMounted(async () => {
    loading.value = true;
    reportData.value = await fetchGetLastReport(userStore.getStudent.patientId);
    loading.value = false;
  });
</script>
