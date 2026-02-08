<template>
  <div class="p-3 mx-auto bg-gray-50 h-full">
    <div class="rounded-md p-4 bg-white mb-4">
      <div class="flex mb-3">
        <div class="text-base font-semibold text-gray-800">{{ mockData.type }}</div>
      </div>

      <div class="pt-3 space-y-2">
        <div class="flex justify-between text-sm">
          <span class="text-gray-500">就诊医院：</span>
          <span class="text-gray-700 font-medium">{{ mockData.hospital }}</span>
        </div>
        <div class="flex justify-between text-sm">
          <span class="text-gray-500">就诊科室：</span>
          <span class="text-gray-700 font-medium">{{ mockData.department }}</span>
        </div>
        <div class="flex justify-between text-sm">
          <span class="text-gray-500">接诊医生：</span>
          <span class="text-gray-700 font-medium">{{ mockData.doctor }}</span>
        </div>
        <div class="flex justify-between text-sm">
          <span class="text-gray-500">就诊时段：</span>
          <span class="text-gray-700 font-medium">{{ mockData.timeSlot }}</span>
        </div>
        <div class="flex justify-between text-sm">
          <span class="text-gray-500">预约编号：</span>
          <span class="text-gray-700 font-medium">{{ mockData.orderNo }}</span>
        </div>
        <div class="flex justify-between text-sm">
          <span class="text-gray-500">就诊人：</span>
          <span class="text-gray-700 font-medium">{{ mockData.patientName }}</span>
        </div>
        <div class="flex justify-between text-sm">
          <span class="text-gray-500">联系电话：</span>
          <span class="text-gray-700 font-medium">{{ mockData.phone }}</span>
        </div>

        <div class="flex justify-between text-sm">
          <span class="text-gray-500">预约日期：</span>
          <div class="text-sm ml-auto text-gray-700">{{ mockData.date }}</div>
        </div>
      </div>
    </div>
    <div class="rounded-lg p-4 alert-color">
      <div class="flex items-center mb-2">
        <var-icon name="error" />
        <div class="font-medium ml-2">就诊须知</div></div
      >
      <div class="text-xs leading-relaxed">
        <div>1. 请提前30分钟到医院分诊台报到，迟到15分钟以上预约号作废；</div>
        <div>2. 就诊时请携带身份证/医保卡、既往病历及检查报告；</div>
        <div>3. 已预约时段如需取消，请提前24小时操作，否则视为爽约；</div>
        <div>4. 如有疑问可拨打医院咨询电话：028-12345678。</div>
      </div>
    </div>
    <div class="fixed bottom-0 left-0 right-0 z-10">
      <div class="max-w-md mx-auto px-4 py-3">
        <van-button v-if="mockData.status === '已预约'" type="primary" class="w-full"> 取消预约 </van-button>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { ref } from 'vue';

  const mockData = ref({
    id: 1,
    date: '2026-02-10',
    type: '眼科复诊',
    status: '已预约',
    doctor: '王医生',
    department: '小儿眼科',
    timeSlot: '上午09:00-10:00',
    hospital: '电子科大附院',
    orderNo: 'YY2026021000123',
    patientName: '张小明',
    phone: '13800138000',
    patientAge: '8岁',
    patientGender: '男',
    registerFee: '15.5元',
    paymentStatus: '已支付',
    remark: '需携带上次验光报告',
  });
</script>

<style lang="scss" scoped>
  .alert-color {
    color: hsl(196deg 100% 47% / 100%);
    background-color: hsl(196deg 100% 47% / 12%);
  }
</style>
