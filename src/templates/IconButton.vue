<template>
  <div class="flex flex-col items-center p-3" style="cursor: pointer" @click="handleClick">
    <var-icon class="m-2" size="32" :name="iconName" />
    <div class="text-sm text-gray-600">{{ label }}</div>
  </div>
</template>

<script setup lang="ts">
  import { useRouter } from 'vue-router';

  const router = useRouter();

  const props = defineProps<{
    iconName: string;
    label: string;
    to?: string;
  }>();

  const emits = defineEmits<{
    (e: 'click'): void;
  }>();

  const handleClick = () => {
    if (!!props.to) router.push('' + props.to);
    emits('click');
  };
</script>

<style scoped lang="scss"></style>
