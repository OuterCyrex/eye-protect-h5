<template>
  <div class="flex gap-4 flex-wrap">
    <div
      v-for="(day, index) in workDayWeek"
      :key="index"
      class="flex flex-col items-center justify-center w-14 h-14 rounded-lg transition-all duration-200"
      :class="{
        'bg-gray-100 text-gray-400 cursor-not-allowed': isDisabled(day),
        'bg-white text-gray-800 hover:bg-gray-50 cursor-pointer': !isDisabled(day) && !isSelected(day),
        'bg-blue-500 text-white cursor-pointer': !isDisabled(day) && isSelected(day),
      }"
      @click="!isDisabled(day) && handleDayClick(day)"
    >
      <span class="text-sm">{{ day.dayOfWeekText }}</span>
      <span class="text-lg font-semibold">{{ getDateNum(day.date) }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { ref, computed, watch } from 'vue';

  interface WeekDay {
    date: Date;
    dayOfWeek: number;
    dayOfWeekText: string;
    formatDate: string;
  }

  const props = defineProps<{
    modelValue: string;
  }>();

  const emit = defineEmits<{
    (e: 'update:modelValue', value: string): void;
  }>();

  const getCurrentWeekWithMondayStart = (): WeekDay[] => {
    const weekTextMap = ['周日', '周一', '周二', '周三', '周四', '周五', '周六'];
    const result: WeekDay[] = [];
    const today = new Date();
    const currentDate = new Date(today.getFullYear(), today.getMonth(), today.getDate());
    const offsetDay = currentDate.getDay() || 7;
    const weekStartDate = new Date(currentDate);
    weekStartDate.setDate(currentDate.getDate() - (offsetDay - 1));
    for (let i = 0; i < 7; i++) {
      const currentDay = new Date(weekStartDate);
      currentDay.setDate(weekStartDate.getDate() + i);
      const year = currentDay.getFullYear();
      const month = String(currentDay.getMonth() + 1).padStart(2, '0');
      const day = String(currentDay.getDate()).padStart(2, '0');
      const formatDate = `${year}-${month}-${day}`;
      const originalDayOfWeek = currentDay.getDay();
      const dayOfWeek = originalDayOfWeek === 0 ? 7 : originalDayOfWeek;
      const dayOfWeekText = weekTextMap[originalDayOfWeek] as string;
      result.push({
        date: currentDay,
        dayOfWeek,
        dayOfWeekText,
        formatDate,
      });
    }
    return result;
  };

  const currentWeek = ref<WeekDay[]>(getCurrentWeekWithMondayStart());
  const selectedDay = ref<WeekDay | null>(null);

  const workDayWeek = computed<WeekDay[]>(() => {
    return currentWeek.value.filter((day) => {
      const originalDayOfWeek = day.date.getDay();
      return originalDayOfWeek !== 0 && originalDayOfWeek !== 6;
    });
  });

  const getDateNum = (date: Date): number => {
    return date.getDate();
  };

  const isDisabled = (day: WeekDay): boolean => {
    const today = new Date();
    const todayFormat = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;
    return day.formatDate <= todayFormat;
  };

  const isSelected = (day: WeekDay): boolean => {
    return day.formatDate === props.modelValue;
  };

  const handleDayClick = (day: WeekDay) => {
    emit('update:modelValue', day.formatDate);
  };

  watch(
    () => props.modelValue,
    (newValue) => {
      const matchedDay = currentWeek.value.find((day) => day.formatDate === newValue);
      selectedDay.value = matchedDay || null;
    },
    { immediate: true },
  );
</script>
