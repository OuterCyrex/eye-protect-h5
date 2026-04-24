<template>
  <div class="bg-gray-100 min-h-full py-1">
    <van-cell-group class="mt-2">
      <van-field label="手机号" v-model="formData.phone" readonly class="border-b border-gray-100" />
      <van-field v-model="formData.verificationCode" label="验证码" placeholder="请输入验证码" class="border-b border-gray-100">
        <template #button>
          <van-button size="small" type="primary" :disabled="countdown > 0 || !formData.phone" @click="handleSendCode">
            {{ countdown > 0 ? `${countdown}s后重试` : '获取验证码' }}
          </van-button>
        </template>
      </van-field>
      <van-field
        label="新密码"
        v-model="formData.newPassword"
        type="password"
        placeholder="请输入新密码"
        class="border-b border-gray-100"
      />
      <van-field
        label="确认密码"
        v-model="confirmPassword"
        type="password"
        placeholder="请再次输入新密码"
        class="border-b border-gray-100"
      />
    </van-cell-group>

    <div class="mt-6 flex w-full justify-center px-2">
      <van-button type="primary" class="h-14 w-full rounded-xl bg-blue-600 text-white font-medium" @click="handleChangePassword">
        确认修改
      </van-button>
    </div>

    <LoadLay v-model="loading" />
  </div>
</template>

<script lang="ts" setup>
  import { ref } from 'vue';
  import { fetchChangePassword, fetchGetUserInfoDetail, fetchSendChangePasswordCode } from '@/api/user';
  import LoadLay from '@/templates/LoadLay.vue';

  const router = useRouter();
  const loading = ref(false);
  const countdown = ref(0);
  const confirmPassword = ref('');
  let countdownTimer: ReturnType<typeof setInterval> | null = null;

  const formData = ref<API.Auth.ChangePasswordRequest>({
    phone: '',
    verificationCode: '',
    newPassword: '',
  });

  const startCountdown = () => {
    countdown.value = 60;
    countdownTimer = setInterval(() => {
      countdown.value -= 1;
      if (countdown.value <= 0 && countdownTimer) {
        clearInterval(countdownTimer);
        countdownTimer = null;
      }
    }, 1000);
  };

  const handleGetUserInfo = async () => {
    const res = await fetchGetUserInfoDetail();
    formData.value.phone = res.phone || '';
  };

  const handleSendCode = async () => {
    if (!formData.value.phone) {
      showToast('未获取到手机号');
      return;
    }
    await fetchSendChangePasswordCode(formData.value.phone);
    showToast('验证码已发送');
    startCountdown();
  };

  const handleChangePassword = async () => {
    if (!formData.value.verificationCode) {
      showToast('请输入验证码');
      return;
    }
    if (!formData.value.newPassword) {
      showToast('请输入新密码');
      return;
    }
    if (formData.value.newPassword !== confirmPassword.value) {
      showToast('两次输入的密码不一致');
      return;
    }

    loading.value = true;
    await fetchChangePassword(formData.value)
      .then(() => {
        showToast('密码修改成功');
        router.back();
      })
      .finally(() => {
        loading.value = false;
      });
  };

  onMounted(async () => {
    loading.value = true;
    await handleGetUserInfo();
    loading.value = false;
  });

  onUnmounted(() => {
    if (countdownTimer) {
      clearInterval(countdownTimer);
      countdownTimer = null;
    }
  });
</script>
