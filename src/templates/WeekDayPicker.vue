<template>
  <div class="flex gap-4 flex-wrap">
    <div
      v-for="(day, index) in next15Days"
      :key="index"
      class="flex flex-col items-center justify-center w-10 h-12 rounded-lg transition-all duration-200"
      :class="{
        'bg-gray-100 text-gray-400 cursor-not-allowed': isDisabled(day),
        'bg-white text-gray-800 hover:bg-gray-50 cursor-pointer': !isDisabled(day) && !isSelected(day),
        'bg-blue-500 text-white cursor-pointer': !isDisabled(day) && isSelected(day),
      }"
      @click="!isDisabled(day) && handleDayClick(day)"
    >
      <span class="text-sm">{{ day.dayOfWeekText }}</span>
      <span class="text-sm font-semibold">{{ getDateNum(day.date) }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { ref, watch } from 'vue';

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

  const getNext15Days = (): WeekDay[] => {
    const weekTextMap = ['周日', '周一', '周二', '周三', '周四', '周五', '周六'];
    const result: WeekDay[] = [];
    const today = new Date();
    for (let i = 0; i < 16; i++) {
      const currentDay = new Date(today);
      currentDay.setDate(today.getDate() + i);
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

  const next15Days = ref<WeekDay[]>(getNext15Days());
  const selectedDay = ref<WeekDay | null>(null);

  const getDateNum = (date: Date): number => {
    return date.getDate();
  };

  const isDisabled = (day: WeekDay): boolean => {
    const today = new Date();
    const todayFormat = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;
    return day.formatDate === todayFormat;
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
      const matchedDay = next15Days.value.find((day) => day.formatDate === newValue);
      selectedDay.value = matchedDay || null;
    },
    { immediate: true },
  );
</script>
