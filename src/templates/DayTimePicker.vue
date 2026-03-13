<template>
  <div class="flex gap-3 flex-wrap">
    <div
      v-for="(slot, index) in slots"
      :key="index"
      class="flex items-center justify-center px-2 py-2 rounded-lg transition-all duration-200 text-sm font-medium"
      :class="{
        'bg-blue-500 text-white cursor-pointer font-semibold': slot.availableNumber > 0 && isSelected(slot.timeSlot),
        'bg-white text-gray-800 hover:bg-gray-50 cursor-pointer': slot.availableNumber > 0 && !isSelected(slot.timeSlot),
        'bg-gray-100 text-gray-400 cursor-not-allowed': !(slot.availableNumber > 0),
      }"
      @click="slot.availableNumber > 0 && handleSlotClick(slot.timeSlot)"
    >
      {{ slot.description }}
      <span v-if="!(slot.availableNumber > 0)" class="ml-2 text-xs">已满</span>
    </div>
  </div>
</template>

<script setup lang="ts">
  const props = defineProps<{
    slots: API.Misc.timeSlotInfo[];
    modelValue: number;
  }>();

  const emit = defineEmits<{
    (e: 'update:modelValue', value: number): void;
  }>();

  const isSelected = (duration: number): boolean => {
    return duration === props.modelValue;
  };

  const handleSlotClick = (duration: number) => {
    emit('update:modelValue', duration);
  };
</script>
