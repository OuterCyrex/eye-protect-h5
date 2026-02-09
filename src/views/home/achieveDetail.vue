<template>
  <div class="bg-gray-50 h-full">
    <div class="bg-white rounded-lg p-4 mb-4 shadow-sm border border-gray-100">
      <div class="text-sm font-semibold text-gray-800 mb-3 flex items-center">
        <span class="w-1.5 h-1.5 bg-blue-500 rounded-full mr-2"></span>
        患者基础信息
      </div>
      <div class="grid grid-cols-2 gap-3 text-sm">
        <div class="flex flex-col gap-1">
          <div class="text-xs text-gray-500">患者ID</div>
          <div class="text-gray-800 font-medium">{{ reportData.patientId }}</div>
        </div>
        <div class="flex flex-col gap-1">
          <div class="text-xs text-gray-500">患者姓名</div>
          <div class="text-gray-800">{{ reportData.patientName }}</div>
        </div>
        <div class="flex flex-col gap-1">
          <div class="text-xs text-gray-500">性别</div>
          <div class="text-gray-800">{{ reportData.gender }}</div>
        </div>
        <div class="flex flex-col gap-1">
          <div class="text-xs text-gray-500">年龄</div>
          <div class="text-gray-800">{{ reportData.age }}岁</div>
        </div>
        <div class="flex flex-col gap-1">
          <div class="text-xs text-gray-500">出生日期</div>
          <div class="text-gray-800">{{ formatDate(reportData.birthDate) }}</div>
        </div>
        <div class="flex flex-col gap-1">
          <div class="text-xs text-gray-500">联系方式</div>
          <div class="text-gray-800">{{ reportData.phone }}</div>
        </div>
        <div class="flex flex-col gap-1">
          <div class="text-xs text-gray-500">学校/班级</div>
          <div class="text-gray-800">{{ reportData.school }} {{ reportData.clazz }}</div>
        </div>
        <div class="flex flex-col gap-1">
          <div class="text-xs text-gray-500">防控手段</div>
          <div class="text-gray-800 text-xs leading-relaxed">{{ reportData.interventionMeasures }}</div>
        </div>
      </div>
    </div>

    <div class="bg-white rounded-lg p-4 mb-4 border border-gray-100" v-if="latestChartPoint?.axialLengthData">
      <div class="text-sm font-semibold text-gray-800 mb-3 flex items-center">
        <span class="w-1.5 h-1.5 bg-purple-500 rounded-full mr-2"></span>
        眼轴/身高数据
      </div>
      <div class="space-y-3 text-sm">
        <div class="flex justify-between items-center">
          <div class="text-xs text-gray-500">眼轴长度</div>
          <div class="text-gray-800 font-medium">{{ latestChartPoint.axialLengthData.axialLength }}mm</div>
        </div>
        <div class="flex justify-between items-center">
          <div class="text-xs text-gray-500">眼轴增长量</div>
          <div class="text-gray-800 font-medium">{{ latestChartPoint.axialLengthData.growthAmount }}mm</div>
        </div>
        <div class="flex justify-between items-center">
          <div class="text-xs text-gray-500">年增长速度</div>
          <div class="text-gray-800 font-medium">{{ latestChartPoint.axialLengthData.growthRatePerYear }}mm/年</div>
        </div>
        <div class="flex justify-between items-center">
          <div class="text-xs text-gray-500">该年龄临界值</div>
          <div class="text-gray-800">{{ latestChartPoint.axialLengthData.ageCriticalValue }}mm</div>
        </div>
        <div class="flex justify-between items-center">
          <div class="text-xs text-gray-500">同龄人临界值</div>
          <div class="text-gray-800">{{ latestChartPoint.axialLengthData.ageCriticalAxialLength }}mm</div>
        </div>
        <div class="border-t border-gray-100 pt-3 mt-3">
          <div class="flex justify-between items-center">
            <div class="text-xs text-gray-500">身高</div>
            <div class="text-gray-800 font-medium">{{ latestChartPoint.heightData.height }}cm</div>
          </div>
          <div class="flex justify-between items-center mt-2">
            <div class="text-xs text-gray-500">同龄人身高临界值</div>
            <div class="text-gray-800">{{ latestChartPoint.heightData.ageCriticalHeight }}cm</div>
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
          风险预警：{{ latestChartPoint?.riskWarning || '无' }}
        </div>
      </div>

      <div class="text-sm text-gray-600 leading-relaxed p-3 bg-gray-50 rounded-lg border border-gray-100">
        {{ reportData.analysis || '暂无风险分析数据' }}
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { ref, computed } from 'vue';

  interface ParentReportVO {
    patientId: number;
    patientName: string;
    gender: string;
    age: number;
    birthDate: string | null;
    phone: string;
    school: string;
    clazz: string;
    interventionMeasures: string;
    chartPoints: ChartPoint[];
    analysis: string;
  }

  interface ChartPoint {
    checkDate: string | null;
    age: number;
    axialLengthData: AxialLengthData;
    heightData: HeightData;
    riskWarning: string;
  }

  interface AxialLengthData {
    axialLength: number;
    previousAxialLength: number | null;
    growthAmount: number;
    growthRatePerYear: number;
    ageCriticalValue: number;
    ageCriticalAxialLength: number;
  }

  interface HeightData {
    height: number;
    ageCriticalHeight: number;
  }

  const formatDate = (dateStr: string | null) => {
    if (!dateStr) return '暂无';
    return dateStr;
  };

  const reportData = ref<ParentReportVO>({
    patientId: 20240512008,
    patientName: '张小明',
    gender: '男',
    age: 8,
    birthDate: '2018-05-12T00:00:00',
    phone: '13800138000',
    school: '电子科大附小',
    clazz: '二年级(3)班',
    interventionMeasures: '1. 每日户外2小时；2. 佩戴离焦镜；3. 每3个月复查眼轴',
    analysis:
      '患者8岁，眼轴长度24.52mm，超过同年龄临界值24.00mm，年增长速度0.45mm/年，属于中风险。建议加强户外时间，调整用眼习惯，每月监测眼轴变化。',
    chartPoints: [
      {
        checkDate: '2026-01-15T09:30:00',
        age: 8,
        riskWarning: '中风险',
        axialLengthData: {
          axialLength: 24.52,
          previousAxialLength: 24.07,
          growthAmount: 0.45,
          growthRatePerYear: 0.45,
          ageCriticalValue: 24.0,
          ageCriticalAxialLength: 23.8,
        },
        heightData: {
          height: 135.5,
          ageCriticalHeight: 130.0,
        },
      },
      {
        checkDate: '2025-10-15T09:30:00',
        age: 7,
        riskWarning: '低风险',
        axialLengthData: {
          axialLength: 24.07,
          previousAxialLength: 23.85,
          growthAmount: 0.22,
          growthRatePerYear: 0.22,
          ageCriticalValue: 23.9,
          ageCriticalAxialLength: 23.7,
        },
        heightData: {
          height: 132.0,
          ageCriticalHeight: 128.0,
        },
      },
    ],
  });

  const latestChartPoint = computed(() => {
    return reportData.value.chartPoints.length > 0 ? reportData.value.chartPoints[0] : null;
  });
</script>
