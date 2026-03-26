<template>
  <div class="mx-auto h-full bg-gray-50 p-3">
    <div class="mb-4 rounded-md bg-white p-4">
      <div class="mb-3 flex">
        <div class="text-base font-semibold text-gray-800">{{ reservation.appointmentTypeDesc }}</div>
      </div>

      <div class="space-y-2 pt-3">
        <div class="flex justify-between text-sm">
          <span class="text-gray-500">就诊医院：</span>
          <span class="font-medium text-gray-700">{{ reservation.institutionName }}</span>
        </div>
        <div class="flex justify-between text-sm">
          <span class="text-gray-500">就诊时段：</span>
          <span class="font-medium text-gray-700">{{ reservation.timeSlotDesc }}</span>
        </div>
        <div class="flex justify-between text-sm">
          <span class="text-gray-500">预约编号：</span>
          <span class="font-medium text-gray-700">{{ reservation.id }}</span>
        </div>
        <div class="flex justify-between text-sm">
          <span class="text-gray-500">是否首诊：</span>
          <span class="font-medium text-gray-700">{{ reservation.isFirstVisit ? '是' : '否' }}</span>
        </div>
        <div class="flex justify-between text-sm">
          <span class="text-gray-500">预约日期：</span>
          <div class="ml-auto text-sm text-gray-700">{{ reservation.scheduleDate }}</div>
        </div>
        <div class="flex justify-between text-sm">
          <span class="text-gray-500">状态：</span>
          <span class="font-medium text-gray-700">
            <div
              class="rounded px-2 py-0.5 text-xs"
              :class="[
                reservation.status === 0 || reservation.status === 1
                  ? 'bg-blue-50 text-blue-500'
                  : reservation.status === 2
                    ? 'bg-green-50 text-green-500'
                    : 'bg-gray-100 text-gray-500',
              ]"
            >
              {{ statusMap[`${reservation.status}` as '0' | '1' | '2' | '-1'] }}
            </div>
          </span>
        </div>
      </div>
    </div>

    <div class="alert-color rounded-lg p-4">
      <div class="mb-2 flex items-center">
        <var-icon name="error" />
        <div class="ml-2 font-medium">就诊须知</div>
      </div>
      <div class="text-xs leading-relaxed">
        <div>1. 请提前30分钟到医院分诊台报到，迟到15分钟以上预约号作废；</div>
        <div>2. 就诊时请携带身份证、医保卡、既往病历及检查报告；</div>
        <div>3. 已预约时段如需取消，请提前24小时操作，否则视为爽约；</div>
        <div>4. 如有疑问可拨打医院咨询电话：028-12345678。</div>
      </div>
    </div>

    <div class="fixed bottom-0 left-0 right-0 z-10">
      <div class="mx-auto max-w-md px-4 py-3">
        <van-button v-if="reservation.status === 0" type="primary" class="w-full" @click="handleCancelReservation"> 取消预约 </van-button>
      </div>
    </div>

    <LoadLay v-model="loading" />
  </div>
</template>

<script lang="ts" setup>
  import { ref } from 'vue';
  import { showConfirmDialog } from 'vant';
  import { fetchDeleteReservation, fetchGetReservationInfo } from '@/api/reservation';
  import LoadLay from '@/templates/LoadLay.vue';

  const route = useRoute();
  const router = useRouter();
  const id = route.query.id;
  const loading = ref<boolean>(false);

  const reservation = ref<API.Reservation.reservationInfo>({
    id: '',
    patientId: '',
    scheduleDate: '',
    timeSlot: 0,
    timeSlotDesc: '',
    appointmentType: 0,
    appointmentTypeDesc: '',
    isFirstVisit: true,
    institutionName: '',
    institutionId: '',
    status: 0,
    createdAt: '',
  });

  const handleGetReservationInfo = async (reservationId: string) => {
    await fetchGetReservationInfo(reservationId).then((res) => {
      reservation.value = res;
    });
  };

  const handleCancelReservation = async () => {
    if (!reservation.value.id) return;

    await showConfirmDialog({
      title: '确认取消',
      message: '确定要取消当前预约吗？',
    });

    loading.value = true;
    await fetchDeleteReservation(reservation.value.id)
      .then(() => {
        reservation.value.status = -1 as never;
        showToast('预约已取消');
        router.back();
      })
      .finally(() => {
        loading.value = false;
      });
  };

  const statusMap = {
    '0': '待就诊',
    '1': '就诊中',
    '2': '已就诊',
    '-1': '已取消',
  };

  onMounted(async () => {
    if (id) {
      loading.value = true;
      await handleGetReservationInfo(id as string).finally(() => {
        loading.value = false;
      });
    }
  });
</script>

<style lang="scss" scoped>
  .alert-color {
    color: hsl(196deg 100% 47% / 100%);
    background-color: hsl(196deg 100% 47% / 12%);
  }
</style>
