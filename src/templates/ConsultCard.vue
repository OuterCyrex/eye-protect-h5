<template>
  <div>
    <div class="flex p-2 items-center">
      <div class="w-3/4">
        <var-ellipsis :line-clamp="2" class="font-semibold text-lg" :tooltip="false">{{ title }} </var-ellipsis>
        <var-ellipsis :line-clamp="1" class="text-gray-500 text-sm" :tooltip="false">{{ subtitle }}</var-ellipsis>
      </div>
      <van-image class="ml-auto" width="70" height="70" :src="src" fit="cover" />
    </div>
    <var-divider
  /></div>
</template>

<script lang="ts" setup>
  defineProps<{
    title: string;
    subtitle: string;
    src: string;
  }>();
</script>

<style lang="sass" scoped></style>
