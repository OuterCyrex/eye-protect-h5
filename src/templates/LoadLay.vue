<template>
  <var-popup v-model:show="modelValue" :overlay="false">
    <van-loading size="45px" color="white" class="bg-gray-500/80 p-3" />
  </var-popup>
</template>

<script setup lang="ts">
  import { computed } from 'vue';

  const props = defineProps({
    modelValue: {
      type: Boolean,
      default: false,
    },
  });

  const emit = defineEmits(['update:modelValue']);

  const modelValue = computed({
    get() {
      return props.modelValue;
    },
    set(value) {
      emit('update:modelValue', value);
    },
  });
</script>
