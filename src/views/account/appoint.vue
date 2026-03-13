<template>
  <div class="p-3 max-w-md mx-auto bg-gray-100 min-h-full">
    <div v-if="appointmentData && appointmentData.length > 0">
      <div
        v-for="item in appointmentData"
        :key="item.id"
        class="rounded-lg p-4 mb-3 bg-white"
        @click="router.push({ path: '/account/appoint/detail', query: { id: item.id } })"
      >
        <div class="flex justify-between items-center mb-2">
          <div class="flex items-center gap-2">
            <div class="text-sm font-semibold">{{ item.scheduleDate }}</div>
            <div class="text-sm font-semibold">{{ item.appointmentTypeDesc }}</div>
          </div>
          <div
            class="text-xs px-2 py-0.5 rounded"
            :class="[
              item.status === 0 || item.status === 1
                ? 'text-blue-500 bg-blue-50'
                : item.status === 2
                  ? 'text-green-500 bg-green-50'
                  : 'text-gray-500 bg-gray-100',
            ]"
          >
            {{ statusMap[`${item.status}` as '0' | '1' | '2' | '-1'] }}
          </div>
        </div>

        <div class="flex justify-between text-sm text-gray-600">
          <div>就诊时段: {{ timeSlotsMap[item.timeSlot] }}</div>
          <div>地点 : {{ item.institutionName }}</div>
        </div>
      </div></div
    >

    <nut-empty v-if="!appointmentData || appointmentData.length <= 0" description="没有挂号预约记录"></nut-empty>
    <LoadLay v-model="loading" />
  </div>
</template>

<script lang="ts" setup>
  import { fetchGetReservationList } from '@/api/reservation';
  import { useUserStore } from '@/store/modules/user';
  import { ref } from 'vue';
  import { useRouter } from 'vue-router';
  import LoadLay from '@/templates/LoadLay.vue';

  const router = useRouter();
  const userStore = useUserStore();
  const loading = ref<boolean>(false);
  const appointmentData = ref<Array<API.Reservation.reservationInfo>>([]);

  const handleGetReservationList = async () => {
    await fetchGetReservationList(userStore.getStudent.patientId).then((res) => {
      appointmentData.value = res;
    });
  };

  const timeSlotsMap = ['8:00-9:00', '9:00-10:00', '10:00-11:30', '14:30-15:30', '15:30-16:30', '16:30-18:00'];
  const statusMap = {
    '0': '待就诊',
    '1': '就诊中',
    '2': '已就诊',
    '-1': '已取消',
  };
  onMounted(async () => {
    loading.value = true;
    await handleGetReservationList().finally(() => {
      loading.value = false;
    });
  });
</script>
