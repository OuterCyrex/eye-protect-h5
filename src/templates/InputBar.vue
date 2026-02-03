<template>
  <div class="input-wrapper">
    <var-paper class="input-bar-container" :class="{ 'input-error-container': hasError }">
      <var-icon class="prepend-icon" v-if="prependIcon" :name="prependIcon" :size="24" />
      <input
        type="text"
        class="native-input"
        :value="modelValue"
        @input="handleInput"
        :placeholder="placeholder"
        maxlength="11"
        :class="{ 'input-error': hasError }"
      />
    </var-paper>
    <div class="error-tip" v-if="hasError">
      {{ errorMessage }}
    </div>
  </div>
</template>

<script setup lang="ts">
  import { computed, ref } from 'vue';

  const props = defineProps<{
    prependIcon?: string;
    modelValue: string;
    placeholder?: string;
    validator?: (value: string) => string;
    validateTrigger?: boolean;
  }>();

  const emits = defineEmits<{
    (e: 'update:modelValue', value: string): void;
  }>();

  const isInputted = ref(false);
  const handleInput = (e: Event) => {
    const target = e.target as HTMLInputElement;
    const pureNumber = target.value.replace(/\D/g, '');
    emits('update:modelValue', pureNumber);
    if (!isInputted.value) {
      isInputted.value = true;
    }
  };

  const errorMessage = computed(() => {
    if (!props.validator) return '';
    if (!isInputted.value && !props.validateTrigger) {
      return '';
    }
    return props.validator(props.modelValue);
  });

  const hasError = computed(() => {
    return errorMessage.value !== '';
  });
</script>

<style lang="scss" scoped>
  .input-wrapper {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }

  .input-bar-container {
    display: flex;
    gap: 16px;
    align-items: center;
    height: 80px;
    padding: 16px;
    background-color: #fafafa;
    border: none;
    border: 1px solid transparent;
    border-radius: 15px;
    transition: border 0.2s;

    &.input-error-container {
      border-color: #f53f3f;
    }
  }

  .prepend-icon {
    flex-shrink: 0;
    color: #999;
  }

  .native-input {
    flex: 1;
    height: 36px;
    font-size: 28px;
    line-height: 36px;
    color: #333;
    outline: none;
    background: transparent;
    border: none;

    &.input-error {
      color: #f53f3f;
    }

    &::placeholder {
      font-size: 28px;
      color: #ccc;
    }
  }

  .error-tip {
    padding-left: 16px;
    font-size: 18px;
    line-height: 1.4;
    color: #f53f3f;
  }
</style>
