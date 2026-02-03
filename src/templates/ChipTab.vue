<template>
  <div class="m-3 flex">
    <div class="mr-5 flex items-center" v-for="(v, i) in tabs" :key="i" @click="handleChange(i)" style="cursor: pointer">
      <div class="text-gray-500 text-center inline-block" v-if="i !== modelValue">{{ v }}</div>
      <var-chip :type="i === modelValue ? 'primary' : 'default'" v-if="i === modelValue">{{ v }}</var-chip>
    </div>
  </div>
</template>

<script lang="ts" setup>
  defineProps<{
    tabs: Array<string>;
    modelValue: number;
  }>();

  const emits = defineEmits<{
    (e: 'update:modelValue', value: number): void;
  }>();

  const handleChange = (i: number) => {
    emits('update:modelValue', i);
  };
</script>
