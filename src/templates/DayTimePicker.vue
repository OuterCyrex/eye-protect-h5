<template>
  <div class="flex gap-3 flex-wrap">
    <div
      v-for="(slot, index) in slots"
      :key="index"
      class="flex items-center justify-center px-2 py-2 rounded-lg transition-all duration-200 text-sm font-medium"
      :class="{
        'bg-blue-500 text-white cursor-pointer font-semibold': slot.valid && isSelected(slot.duration),
        'bg-white text-gray-800 hover:bg-gray-50 cursor-pointer': slot.valid && !isSelected(slot.duration),
        'bg-gray-100 text-gray-400 cursor-not-allowed': !slot.valid,
      }"
      @click="slot.valid && handleSlotClick(slot.duration)"
    >
      {{ slot.duration }}
      <span v-if="!slot.valid" class="ml-2 text-xs">已满</span>
    </div>
  </div>
</template>

<script setup lang="ts">
  interface Slot {
    duration: string;
    valid: boolean;
  }

  const props = defineProps<{
    slots: Slot[];
    modelValue: string;
  }>();

  const emit = defineEmits<{
    (e: 'update:modelValue', value: string): void;
  }>();

  const isSelected = (duration: string): boolean => {
    return duration === props.modelValue;
  };

  const handleSlotClick = (duration: string) => {
    emit('update:modelValue', duration);
  };
</script>
