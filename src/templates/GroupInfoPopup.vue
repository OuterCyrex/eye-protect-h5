<template>
  <van-popup v-model:show="showModel" round :style="{ width: '88%', maxWidth: '420px' }">
    <div class="px-5 pb-5 pt-4">
      <div class="text-center text-base font-semibold text-gray-800">当前分组</div>
      <div v-if="!loading" class="mt-1 text-center text-xs text-gray-500">共 {{ groups.length }} 个分组</div>

      <div v-if="loading" class="py-8 text-center text-sm text-gray-500 mb-2">加载中...</div>

      <div v-else class="mt-4 max-h-80 overflow-y-auto mb-2">
        <div v-if="groups.length <= 0" class="py-6 text-center text-sm text-gray-500">暂无分组</div>
        <div v-else class="rounded-lg border border-gray-100 bg-gray-50">
          <div
            v-for="(item, index) in groups"
            :key="`${item}-${index}`"
            class="flex items-center px-3 py-2.5 text-sm text-gray-700"
            :class="{ 'border-t border-gray-100': index > 0 }"
          >
            <span class="mr-2 text-gray-400">-</span>
            <span>{{ item }}</span>
          </div>
        </div>
      </div>

      <van-button type="primary" block @click="showModel = false">关闭</van-button>
    </div>
  </van-popup>
</template>

<script setup lang="ts">
  import { computed } from 'vue';

  const props = defineProps<{
    show: boolean;
    loading: boolean;
    groups: string[];
  }>();

  const emit = defineEmits<{
    (e: 'update:show', value: boolean): void;
  }>();

  const showModel = computed({
    get: () => props.show,
    set: (value: boolean) => emit('update:show', value),
  });
</script>
