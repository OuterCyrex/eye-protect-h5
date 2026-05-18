<template>
  <div class="min-h-full bg-gray-100 p-4">
    <var-alert class="mb-4 rounded-md text-xm" variant="tonal">
      <template #content>挂号提示：请按预约时间提前15分钟到院签到。迟到需重新挂号排队。</template>
    </var-alert>

    <var-paper class="rounded-md bg-white p-4">
      <div class="my-1">
        <div class="text-sm font-semibold text-gray-400">预约医院</div>
        <van-field class="my-2" v-model="hospitalName" readonly is-link placeholder="请选择医院" @click="handleOpenHospitalPicker" />
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
        <div class="flex items-center justify-between">
          <div class="text-sm font-semibold text-gray-400">选择时段</div>
          <var-button type="primary" size="small" plain @click="handleRefreshTimeSlots">
            <var-icon name="refresh" />
            刷新
          </var-button>
        </div>
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

  const currentPage = ref(1);
  const pageSize = ref(100);
  const loading = ref(false);
  const finished = ref(false);

  const appointTabs = ref<Array<string>>(['常规检查', '视功能训练']);
  const appointType = ref(0);
  const reservationTypeMap = [1, 2];

  const selectedDay = ref('');
  const showDayTimeSelector = ref(false);
  const selectedTime = ref(0);
  const timeSlots = ref<Array<DisplayTimeSlot>>([]);

  const handleConfirm = async (value: any) => {
    const option = value?.selectedOptions?.[0];
    if (!option) return;

    if (option.value === 'load_more') {
      await handleGetInstitutions(currentPage.value);
      showHospitalPicker.value = true;
      return;
    }

    hospitalName.value = option.text;
    hospitalValue.value = option.value;
    showHospitalPicker.value = false;
  };

  const handleOpenHospitalPicker = () => {
    if (!columns.value.length) {
      showToast('当前地区暂无可预约医院');
      return;
    }

    showHospitalPicker.value = true;
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

  const handleGetInstitutions = async (pageNum = 1) => {
    if (loading.value || finished.value) return;
    loading.value = true;
    try {
      const res = await fetchGetInstitutions({ pageNum: pageNum, pageSize: pageSize.value, type: '医院' });
      const institutions = Array.isArray(res.records) ? res.records : [];
      if (pageNum === 1) {
        columns.value = institutions.map((item: API.Misc.institution) => ({ text: item.name, value: item.id }));
      } else {
        const loadMoreIndex = columns.value.findIndex((col) => col.value === 'load_more');
        if (loadMoreIndex !== -1) {
          columns.value.splice(loadMoreIndex, 1);
        }
        columns.value.push(...institutions.map((item: API.Misc.institution) => ({ text: item.name, value: item.id })));
      }

      const totalPages = typeof res.pages === 'number' ? res.pages : res.total && pageSize.value ? Math.ceil(res.total / pageSize.value) : pageNum;
      if (pageNum < totalPages) {
        finished.value = false;
        currentPage.value = pageNum + 1;
        if (!columns.value.some((col) => col.value === 'load_more')) {
          columns.value.push({ text: '加载更多...', value: 'load_more' });
        }
      } else {
        finished.value = true;
        const loadMoreIndex = columns.value.findIndex((col) => col.value === 'load_more');
        if (loadMoreIndex !== -1) {
          columns.value.splice(loadMoreIndex, 1);
        }
      }
    } catch (error) {
      console.error(error);
    } finally {
      loading.value = false;
    }
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

  const handleRefreshTimeSlots = async () => {
    showToast('刷新中...');
    await handleGetTimeList();
    showToast('刷新成功');
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
    await handleGetInstitutions(1);
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
