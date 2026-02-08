<template>
  <div class="p-4 bg-gray-100">
    <var-alert class="mb-4 text-xm rounded-md" variant="tonal">
      <template #content>挂号提示：请按预约时间提前15分钟到院签到。迟到需重新挂号排队。</template>
    </var-alert>
    <var-paper class="bg-white p-4 rounded-md">
      <div class="my-1">
        <div class="font-semibold text-gray-400 text-sm">预约医院</div>
        <van-field class="my-2" readonly is-link placeholder="请选择医院" @click="showHospitalPicker = true" v-model="hospitalValue" />
        <van-popup v-model:show="showHospitalPicker" position="bottom">
          <van-picker show-toolbar :columns="columns" @cancel="showHospitalPicker = false" @confirm="onConfirm" />
        </van-popup>
      </div>
      <div class="my-4">
        <div class="font-semibold text-gray-400 text-sm">预约类型</div>
        <chip-tab class="m-4" :tabs="appointTabs" v-model="appointType" />
      </div>
      <div class="my-4">
        <div class="font-semibold text-gray-400 text-sm">选择日期</div>
        <WeekDayPicker class="my-4" v-model="selectedDay" />
      </div>
      <div class="my-4">
        <div class="font-semibold text-gray-400 text-sm">选择时段</div>
        <DayTimePicker class="my-4" :slots="timeList" v-model="selectedTime" />
      </div>
    </var-paper>
    <var-button class="my-4 w-full" type="primary">确认预约</var-button>
  </div>
</template>

<script lang="ts" setup>
  import { ref } from 'vue';
  import ChipTab from '@/templates/ChipTab.vue';
  import WeekDayPicker from '@/templates/WeekDayPicker.vue';
  import DayTimePicker from '@/templates/DayTimePicker.vue';

  const showHospitalPicker = ref<boolean>(false);
  const columns = ref([{ text: '电子科大附院（成都市第一人民医院）', value: '电子科大附院（成都市第一人民医院）' }]);
  const hospitalValue = ref<string>('');

  const onConfirm = (value: any) => {
    hospitalValue.value = value.selectedOptions[0].text;
    showHospitalPicker.value = false;
  };

  const appointTabs = ref<Array<string>>(['常规检查', '视功能训练']);
  const appointType = ref<number>(0);

  const selectedDay = ref<string>('');

  const selectedTime = ref<string>('');
  const timeList = [
    { duration: '08:00-09:00', valid: true },
    { duration: '09:00-10:00', valid: true },
    { duration: '10:00-11:00', valid: false },
    { duration: '11:00-12:00', valid: true },
    { duration: '14:00-15:00', valid: false },
    { duration: '15:00-16:00', valid: true },
    { duration: '16:00-17:00', valid: true },
  ];
</script>

<style scoped lang="scss"></style>
