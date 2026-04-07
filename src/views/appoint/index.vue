<template>
  <div class="min-h-full bg-gray-100 p-4">
    <var-alert class="mb-4 rounded-md text-xm" variant="tonal">
      <template #content>挂号提示：请按预约时间提前15分钟到院签到。迟到需重新挂号排队。</template>
    </var-alert>

    <var-paper class="rounded-md bg-white p-4">
      <div class="my-1">
        <div class="text-sm font-semibold text-gray-400">预约医院</div>
        <van-field class="my-2" v-model="hospitalName" readonly is-link placeholder="请选择医院" @click="showHospitalPicker = true" />
        <van-popup v-model:show="showHospitalPicker" position="bottom">
          <van-picker show-toolbar :columns="columns" @cancel="showHospitalPicker = false" @confirm="handleConfirm" />
        </van-popup>
      </div>

      <div class="my-4">
        <div class="text-sm font-semibold text-gray-400">预约类型</div>
        <chip-tab class="m-4" :tabs="appointTabs" v-model="appointType" />
      </div>

      <div class="my-4">
        <div class="text-sm font-semibold text-gray-400">选择日期</div>
        <WeekDayPicker class="my-4" v-model="selectedDay" />
      </div>

      <div v-if="showDayTimeSelector" class="my-4">
        <div class="text-sm font-semibold text-gray-400">选择时段</div>
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

  type DisplayTimeSlot = API.Misc.timeSlotInfo & { expired?: boolean };

  const userStore = useUserStore();
  const router = useRouter();

  const showHospitalPicker = ref(false);
  const columns = ref<Array<{ text: string; value: string }>>([]);
  const hospitalName = ref('');
  const hospitalValue = ref('');

  const appointTabs = ref<Array<string>>(['常规检查', '视功能训练']);
  const appointType = ref(0);
  const reservationTypeMap = [1, 2];

  const selectedDay = ref('');
  const showDayTimeSelector = ref(false);
  const selectedTime = ref(0);
  const timeSlots = ref<Array<DisplayTimeSlot>>([]);

  const handleConfirm = (value: any) => {
    hospitalName.value = value.selectedOptions[0].text;
    hospitalValue.value = value.selectedOptions[0].value;
    showHospitalPicker.value = false;
  };

  const handleIsToday = (dateStr: string) => {
    if (!dateStr) return false;
    const today = new Date();
    const y = today.getFullYear();
    const m = `${today.getMonth() + 1}`.padStart(2, '0');
    const d = `${today.getDate()}`.padStart(2, '0');
    return dateStr === `${y}-${m}-${d}`;
  };

  const handleParseSlotStartMinutes = (description: string) => {
    const start = description.split('-')[0]?.trim() || '';
    const match = /^([01]\d|2[0-3]):([0-5]\d)$/.exec(start);
    if (!match) return null;
    const hour = Number(match[1]);
    const minute = Number(match[2]);
    return hour * 60 + minute;
  };

  const handleMarkExpiredSlots = (slots: API.Misc.timeSlotInfo[]) => {
    if (!handleIsToday(selectedDay.value)) {
      return slots.map((slot) => ({ ...slot, expired: false }));
    }

    const now = new Date();
    const nowMinutes = now.getHours() * 60 + now.getMinutes();

    return slots.map((slot) => {
      const startMinutes = handleParseSlotStartMinutes(slot.description);
      if (startMinutes === null) return { ...slot, expired: false };
      if (startMinutes <= nowMinutes) {
        return { ...slot, availableNumber: 0, expired: true };
      }
      return { ...slot, expired: false };
    });
  };

  const handleGetInstitutions = async () => {
    const res = await fetchGetInstitutions();
    const hospitals = res.records.filter((item: { type: string }) => item.type === '医院');
    columns.value = hospitals.map((item: API.Misc.institution) => ({ text: item.name, value: item.id }));
  };

  const handleGetTimeList = async () => {
    if (!hospitalValue.value || !selectedDay.value) return;

    const res = await fetchGetReservationTime({
      institutionId: hospitalValue.value,
      date: selectedDay.value,
      type: reservationTypeMap[appointType.value] ?? 1,
    });

    timeSlots.value = handleMarkExpiredSlots(res);

    if (!timeSlots.value.some((slot) => slot.timeSlot === selectedTime.value && slot.availableNumber > 0)) {
      selectedTime.value = 0;
    }
  };

  const handleSubmitReservation = async () => {
    if (!hospitalValue.value || !selectedDay.value || !selectedTime.value) {
      showToast('请完善预约信息');
      return;
    }

    await fetchReserve({
      patientId: userStore.getStudent.patientId,
      institutionId: hospitalValue.value,
      type: reservationTypeMap[appointType.value] ?? 1,
      date: selectedDay.value,
      timeSlot: selectedTime.value,
    });

    showToast('预约成功');
    router.push({ path: '/account/appoint' });
  };

  onMounted(async () => {
    await handleGetInstitutions();
  });

  watch(
    [() => selectedDay.value, () => hospitalValue.value, () => appointType.value],
    () => {
      if (selectedDay.value && hospitalValue.value) {
        showDayTimeSelector.value = true;
        handleGetTimeList();
      }
    },
    { immediate: false },
  );
</script>

<style scoped lang="scss"></style>
