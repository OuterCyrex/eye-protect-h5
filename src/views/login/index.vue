<template>
  <div class="flex justify-center flex-col">
    <div class="flex justify-center flex-col items-center my-12">
      <div class="text-2xl font-semibold mb-2">近视防控侧</div>
      <div class="text-gray-500 text-center">守护青少年光明未来</div>
    </div>

    <div class="mx-12 grid gap-6">
      <InputBar prepend-icon="phone" v-model="phoneNumber" :validator="validatePhone" placeholder="输入手机号" />
      <InputBar prepend-icon="lock" v-model="verifyCode" placeholder="请输入密码" />

      <var-button class="login-btn" type="primary" block @click="handleLogin"> 登录/注册 </var-button>

      <div class="flex items-center justify-center gap-4">
        <div class="flex-1 h-px bg-gray-200"></div>
        <span class="text-gray-500 text-sm whitespace-nowrap">其他登录方式</span>
        <div class="flex-1 h-px bg-gray-200"></div>
      </div>

      <var-button text class="flex items-center">
        <var-icon name="https://img.icons8.com/?size=100&id=4l0fwQnRnd10&format=png&color=000000" size="22" class="mr-2" />
        <span class="text-lg">微信一键登录</span>
      </var-button>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { ref } from 'vue';
  import InputBar from '@/templates/InputBar.vue';
  import { loginPassword } from '@/api';

  const phoneNumber = ref('');
  const verifyCode = ref('');
  const router = useRouter();

  const validatePhone = (value: string) => {
    if (!value) {
      return '请输入手机号';
    } else if (!/^1[3-9]\d{9}$/.test(value)) {
      return '请输入正确的11位手机号';
    }
    return '';
  };

  const handleLogin = () => {
    loginPassword({ phone: phoneNumber.value, password: verifyCode.value }).then(() => {
      showToast('登录成功');
      router.push({ path: '/' });
    });
  };
</script>
