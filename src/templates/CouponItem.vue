<template>
  <div class="bg-white rounded-lg border border-gray-100 px-4 py-5 flex items-center justify-between">
    <div class="flex items-center gap-3 min-w-0 pr-3">
      <div class="text-red-500 font-bold text-lg whitespace-nowrap">{{ coupon.value || '公益券' }}</div>

      <div class="min-w-0 text-sm text-gray-600">
        <div class="font-semibold text-gray-800 truncate">{{ coupon.giftName || '公益券' }}</div>
        <template v-if="coupon.status === 3">
          <div class="text-gray-500">已核销</div>
          <div class="text-gray-500 truncate">核销地点：{{ coupon.verifyLocation || '--' }}</div>
          <div class="text-gray-500">核销时间：{{ verifyTimeText }}</div>
        </template>
        <template v-else>
          <div class="text-gray-500 truncate">类型：{{ coupon.serviceName || '--' }}</div>
          <div :class="statusMeta.color">{{ statusMeta.label }}</div>
          <div class="text-gray-500" v-if="claimTimeLabel !== '--'">领取时间：{{ claimTimeLabel }}</div>
        </template>
      </div>
    </div>

    <button
      class="text-sm px-4 py-1.5 rounded-full whitespace-nowrap"
      :class="canVerify ? 'bg-red-500 text-white cursor-pointer' : 'bg-gray-300 text-white cursor-not-allowed'"
      :disabled="!canVerify"
      @click="emit('verify', coupon)"
    >
      核销
    </button>
  </div>
</template>

<script lang="ts" setup>
  import { computed } from 'vue';
  import dayjs, { type Dayjs } from 'dayjs';

  const props = defineProps<{
    coupon: API.Coupon.couponInfo;
  }>();

  const emit = defineEmits<{
    (e: 'verify', coupon: API.Coupon.couponInfo): void;
  }>();

  const statusMeta = computed(() => {
    const statusMap: Record<number, { label: string; color: string }> = {
      1: { label: '未领取', color: 'text-amber-600' },
      2: { label: '待核销', color: 'text-green-600' },
      3: { label: '已核销', color: 'text-gray-500' },
      4: { label: '已失效', color: 'text-red-500' },
    };

    return statusMap[props.coupon.status] || { label: '未知状态', color: 'text-gray-500' };
  });

  const MONTH_MAP: Record<string, number> = {
    JANUARY: 1,
    FEBRUARY: 2,
    MARCH: 3,
    APRIL: 4,
    MAY: 5,
    JUNE: 6,
    JULY: 7,
    AUGUST: 8,
    SEPTEMBER: 9,
    OCTOBER: 10,
    NOVEMBER: 11,
    DECEMBER: 12,
  };

  const parseToDayjs = (value: unknown): Dayjs | null => {
    if (!value) {
      return null;
    }

    if (typeof value === 'string' || typeof value === 'number' || value instanceof Date) {
      const parsed = dayjs(value);
      return parsed.isValid() ? parsed : null;
    }

    if (typeof value === 'object') {
      const obj = value as Record<string, unknown>;
      const year = Number(obj.year);
      const day = Number(obj.dayOfMonth ?? obj.day);
      const hour = Number(obj.hour ?? 0);
      const minute = Number(obj.minute ?? 0);
      const second = Number(obj.second ?? 0);

      const monthRaw = obj.monthValue ?? obj.month;
      let month = Number(monthRaw);
      if (Number.isNaN(month) && typeof monthRaw === 'string') {
        month = MONTH_MAP[monthRaw.toUpperCase()] ?? NaN;
      }

      if (!Number.isNaN(year) && !Number.isNaN(month) && !Number.isNaN(day)) {
        const parsed = dayjs(
          `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')} ${String(hour).padStart(2, '0')}:${String(
            minute,
          ).padStart(2, '0')}:${String(second).padStart(2, '0')}`,
        );
        return parsed.isValid() ? parsed : null;
      }

      if (obj.epochSecond !== undefined) {
        const parsed = dayjs(Number(obj.epochSecond) * 1000);
        return parsed.isValid() ? parsed : null;
      }
    }

    return null;
  };

  const claimTimeLabel = computed(() => {
    const claimAt = parseToDayjs(props.coupon.claimTime);
    if (!claimAt) {
      return '--';
    }

    const now = dayjs();
    const diffHours = now.diff(claimAt, 'hour');

    if (diffHours < 24) {
      if (diffHours <= 0) {
        return '刚刚';
      }
      return `${diffHours}小时前`;
    }

    return claimAt.format('M月D日');
  });

  const verifyTimeText = computed(() => {
    const verifyAt = parseToDayjs(props.coupon.verifyTime);
    if (!verifyAt) {
      return '--';
    }
    return verifyAt.format('YYYY-MM-DD HH:mm:ss');
  });

  const canVerify = computed(() => props.coupon.status === 2 && Boolean(props.coupon.barcodeBase64));
</script>
