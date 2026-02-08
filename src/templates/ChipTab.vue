<template>
  <div class="m-3 flex">
    <div class="mr-5 flex items-center" v-for="(v, i) in tabs" :key="i" @click="handleChange(i)" style="cursor: pointer">
      <div :class="'text-gray-500 text-center text-sm inline-block ' + GetPaddingSize(size)" v-if="i !== modelValue">{{ v }}</div>
      <var-chip :size="size" :plain="plain" :type="i === modelValue ? 'primary' : 'default'" v-if="i === modelValue">
        <template #default>
          <div class="font-semibold">{{ v }}</div></template
        ></var-chip
      >
    </div>
  </div>
</template>

<script lang="ts" setup>
  defineProps<{
    tabs: Array<string>;
    modelValue: number;
    size?: 'normal' | 'mini' | 'small' | 'large';
    plain?: boolean;
  }>();

  const GetPaddingSize = (size: 'normal' | 'mini' | 'small' | 'large' | undefined) => {
    switch (size) {
      case 'mini':
        return 'px-2';
      case 'small':
        return 'px-3';
      case 'large':
        return 'px-6';
      case 'normal':
      default:
        return 'px-2';
    }
  };

  const emits = defineEmits<{
    (e: 'update:modelValue', value: number): void;
  }>();

  const handleChange = (i: number) => {
    emits('update:modelValue', i);
  };
</script>
