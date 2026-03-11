<template>
  <div class="w-full bg-white rounded-lg shadow-sm" ref="chartRef" style="height: 320px"></div>
</template>

<script setup lang="ts">
  import { ref, onMounted, watch, onUnmounted, nextTick } from 'vue';
  import * as echarts from 'echarts';
  import type { EChartsOption } from 'echarts';

  const props = defineProps<{
    data: API.Misc.AxiosChartUnit[];
  }>();

  const axialLengthData = ref<API.Misc.AxiosChartUnit[]>([]);

  const chartRef = ref<HTMLDivElement | null>(null);
  let chartInstance: echarts.ECharts | null = null;
  let resizeTimer: NodeJS.Timeout | null = null;

  const getYAxisConfig = () => {
    const allData = [
      ...axialLengthData.value.map((item) => item.odAxialLength),
      ...axialLengthData.value.map((item) => item.osAxialLength),
    ];

    if (allData.length === 0) {
      return {
        min: 23.0,
        max: 24.5,
        interval: 0.3,
      };
    }

    const minVal = Math.min(...allData);
    const maxVal = Math.max(...allData);
    const step = 0.2;
    const yMin = (Math.floor(minVal / step) * step).toFixed(2);
    const yMax = (Math.ceil(maxVal / step) * step).toFixed(2);

    return {
      min: yMin,
      max: yMax,
      interval: step,
    };
  };

  const initChart = () => {
    if (!chartRef.value) return;

    chartRef.value.style.width = '100%';
    chartRef.value.style.height = '320px';

    if (chartInstance) chartInstance.dispose();

    chartInstance = echarts.init(chartRef.value, undefined, {
      width: chartRef.value.offsetWidth,
      height: 320,
    });

    const isDataEmpty = axialLengthData.value.length === 0;
    const xAxisData = isDataEmpty ? ['暂无数据'] : axialLengthData.value.map((item) => item.recordDate);
    const odData = isDataEmpty ? [] : axialLengthData.value.map((item) => item.odAxialLength);
    const osData = isDataEmpty ? [] : axialLengthData.value.map((item) => item.osAxialLength);
    const yAxisConfig = getYAxisConfig();

    const option: EChartsOption = {
      title: isDataEmpty
        ? {
            text: '暂无眼轴记录数据',
            left: 'center',
            top: '50%',
            textStyle: {
              fontSize: 14,
              color: '#999',
              fontWeight: 'normal',
            },
          }
        : {},
      tooltip: {
        trigger: 'axis',
        backgroundColor: 'rgba(255,255,255,0.95)',
        borderColor: '#e5e7eb',
        borderWidth: 1,
        padding: 10,
        textStyle: { fontSize: 12 },
        confine: true,
        formatter: (params: any) => {
          if (isDataEmpty) return '';
          const index = params[0].dataIndex;
          const record = axialLengthData.value[index] as API.Misc.AxiosChartUnit;
          return `
<div style="font-size:13px;font-weight:500;margin-bottom:6px">${record.recordDate}</div>
<div style="font-size:12px;line-height:1.6">
  <div>右眼：<span style="color:#409eff">${record.odAxialLength} mm</span></div>
  <div>左眼：<span style="color:#67c23a">${record.osAxialLength} mm</span></div>
  <div style="margin-top:4px;color:#666">${record.details}</div>
</div>`;
        },
      },
      grid: {
        left: 12,
        right: 12,
        bottom: 30,
        top: 30,
        containLabel: true,
      },
      xAxis: {
        type: 'category',
        data: xAxisData,
        axisLabel: {
          fontSize: 11,
          color: isDataEmpty ? '#999' : '#666',
          rotate: 0,
        },
        axisLine: { lineStyle: { color: '#e5e7eb' } },
        splitLine: { show: false },
      },
      yAxis: {
        type: 'value',
        name: '眼轴长度 (mm)',
        nameTextStyle: { fontSize: 11, color: '#666' },
        axisLabel: { fontSize: 11, color: '#666' },
        axisLine: { lineStyle: { color: '#e5e7eb' } },
        splitLine: { lineStyle: { color: '#f5f5f5' } },
        min: yAxisConfig.min,
        max: yAxisConfig.max,
        interval: yAxisConfig.interval,
      },
      legend: {
        top: 5,
        right: 10,
        textStyle: { fontSize: 11 },
        data: ['右眼', '左眼'],
        itemWidth: 10,
        itemHeight: 8,
        itemGap: 10,
        padding: [0, 0, 0, 0],
        show: !isDataEmpty,
      },
      series: [
        {
          name: '右眼',
          type: 'line',
          data: odData,
          lineStyle: { width: 2, color: '#409eff' },
          symbol: 'circle',
          symbolSize: 6,
          itemStyle: { color: '#409eff', borderColor: '#fff', borderWidth: 2 },
          areaStyle: {
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              { offset: 0, color: 'rgba(64,158,255,0.15)' },
              { offset: 1, color: 'rgba(64,158,255,0.02)' },
            ]),
          },
        },
        {
          name: '左眼',
          type: 'line',
          data: osData,
          lineStyle: { width: 2, color: '#67c23a' },
          symbol: 'circle',
          symbolSize: 6,
          itemStyle: { color: '#67c23a', borderColor: '#fff', borderWidth: 2 },
          areaStyle: {
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              { offset: 0, color: 'rgba(103,194,58,0.15)' },
              { offset: 1, color: 'rgba(103,194,58,0.02)' },
            ]),
          },
        },
      ],
    };

    chartInstance.setOption(option);

    setTimeout(() => {
      chartInstance?.resize();
    }, 100);
  };

  const resizeChart = () => {
    if (resizeTimer) clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
      if (chartInstance) {
        chartInstance.resize({
          width: chartRef.value?.offsetWidth,
          height: 320,
        });
      }
    }, 50);
  };

  onMounted(async () => {
    await nextTick();
    axialLengthData.value = props.data;
    setTimeout(() => {
      initChart();
    }, 200);

    window.addEventListener('resize', resizeChart);
  });

  watch(
    axialLengthData,
    () => {
      nextTick(() => initChart());
    },
    { deep: true },
  );

  onUnmounted(() => {
    window.removeEventListener('resize', resizeChart);
    if (resizeTimer) clearTimeout(resizeTimer);
    chartInstance?.dispose();
  });
</script>

<style scoped>
  :deep(.ec-container) {
    box-sizing: border-box !important;
    width: 100% !important;
    max-width: 100vw !important;
    height: 100% !important;
  }
</style>
