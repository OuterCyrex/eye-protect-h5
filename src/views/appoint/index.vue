<template>
  <div class="p-4 bg-gray-100 min-h-full">
    <var-alert class="mb-4 text-xm rounded-md" variant="tonal">
      <template #content>挂号提示：请按预约时间提前15分钟到院签到。迟到需重新挂号排队。</template>
    </var-alert>
    <var-paper class="bg-white p-4 rounded-md">
      <div class="my-1">
        <div class="font-semibold text-gray-400 text-sm">预约医院</div>
        <van-field class="my-2" readonly is-link placeholder="请选择医院" @click="showHospitalPicker = true" v-model="hospitalName" />
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
      <div class="my-4" v-if="showDayTimeSelector">
        <div class="font-semibold text-gray-400 text-sm">选择时段</div>
        <DayTimePicker class="my-4" :slots="timeSlots" v-model="selectedTime" />
      </div>
    </var-paper>
    <var-button class="my-4 w-full" type="primary" @click="handleSubmitReservation">确认预约</var-button>
  </div>
</template>

<script lang="ts" setup>
  import { ref } from 'vue';
  import ChipTab from '@/templates/ChipTab.vue';
  import WeekDayPicker from '@/templates/WeekDayPicker.vue';
  import DayTimePicker from '@/templates/DayTimePicker.vue';
  import { fetchGetInstitutions } from '@/api/appoint';
  import { fetchGetReservationTime, fetchReserve } from '@/api/reservation';
  import { useUserStore } from '@/store/modules/user';

  const userStore = useUserStore();
  const showHospitalPicker = ref<boolean>(false);
  const columns = ref<Array<{ text: string; value: string }>>([]);
  const hospitalName = ref<string>('');
  const hospitalValue = ref<string>('');
  const onConfirm = (value: any) => {
    hospitalName.value = value.selectedOptions[0].text;
    hospitalValue.value = value.selectedOptions[0].value;
    showHospitalPicker.value = false;
  };

  const appointTabs = ref<Array<string>>(['常规检查', '视功能训练']);
  const appointType = ref<number>(0);

  const selectedDay = ref<string>('');
  const showDayTimeSelector = ref<boolean>(false);

  const selectedTime = ref<string>('');
  const timeSlotsMap = ['8:00-9:00', '9:00-10:00', '10:00-11:30', '14:30-15:30', '15:30-16:30', '16:30-18:00'];
  const timeSlots = ref<
    Array<{
      duration: string;
      valid: boolean;
    }>
  >([]);

  const handleGetInstitutions = () => {
    fetchGetInstitutions().then((res) => {
      const Hospitals = res.records.filter((item: { type: string }) => item.type === '医院');
      columns.value = Hospitals.map((item: API.Misc.institution) => ({ text: item.name, value: item.id }));
    });
  };

  const handleGetTimeList = () => {
    if (hospitalName.value === '' || selectedDay.value === '') return;
    fetchGetReservationTime({
      institutionId: hospitalValue.value,
      date: selectedDay.value,
      type: appointType.value + 1,
    }).then((res) => {
      timeSlots.value = timeSlotsMap.map((text, index) => ({
        duration: text,
        valid: res[index] !== 0,
      }));
    });
  };

  const handleSubmitReservation = () => {
    if (hospitalName.value === '' || selectedDay.value === '' || selectedTime.value === '') {
      showToast('请完善预约信息');
      return;
    }
    fetchReserve({
      patientId: userStore.getInfo.id,
      institutionId: hospitalValue.value,
      type: appointType.value,
      date: selectedDay.value,
      timeSlot: timeSlotsMap.indexOf(selectedTime.value),
    }).then(() => {
      showToast('预约成功');
    });
  };

  onMounted(() => {
    handleGetInstitutions();
    console.log(userStore.getInfo.id);
  });

  watch(
    [() => selectedDay.value, () => hospitalValue.value, () => appointType.value],
    () => {
      if (selectedDay.value !== '' && hospitalName.value !== '') {
        showDayTimeSelector.value = true;
        handleGetTimeList();
      }
    },
    {
      immediate: false,
    },
  );
</script>

<style scoped lang="scss"></style>
