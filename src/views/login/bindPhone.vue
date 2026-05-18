<template>
  <div class="flex min-h-dvh flex-col">
    <div class="justify-center">
      <div class="my-12 flex flex-col items-center justify-center">
        <div class="mb-2 text-2xl font-semibold">绑定手机号</div>
        <div class="text-center text-gray-500">完成绑定后即可继续登录</div>
      </div>

      <div class="mx-8 grid gap-6">
        <InputBar prepend-icon="phone" isNumber v-model="phoneNumber" :validator="validatePhone" placeholder="输入手机号" />

        <div class="flex items-center gap-3">
          <div class="flex-1">
            <InputBar prepend-icon="lock" isNumber v-model="verificationCode" :max-length="6" placeholder="请输入验证码" />
          </div>
          <van-button class="min-w-24" size="small" type="primary" :disabled="countdown > 0" @click="handleSendCode">
            <span class="text-sm">{{ countdown > 0 ? `${countdown}s后重试` : '获取验证码' }}</span>
          </van-button>
        </div>

        <var-button class="login-btn" type="primary" block @click="handleBindPhone">确认绑定</var-button>
      </div>
    </div>

    <div class="pb-4 text-center text-xs text-gray-400 absolute right-0 bottom-2 left-0">
      <a href="https://beian.miit.gov.cn/" target="_blank" rel="noopener noreferrer" class="underline">京ICP备2025147132号-5</a>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { ref } from 'vue';
  import { WeChatBindPhone } from '@/api';
  import { fetchGetCurrentStudent } from '@/api/student';
  import { fetchGetUserInfo, fetchSendLoginCode } from '@/api/user';
  import { useUserStore } from '@/store/modules/user';
  import InputBar from '@/templates/InputBar.vue';

  const WECHAT_BIND_USER_STORAGE_KEY = 'wechat_bind_user';

  const phoneNumber = ref('');
  const verificationCode = ref('');
  const countdown = ref(0);
  let countdownTimer: ReturnType<typeof setInterval> | null = null;

  const route = useRoute();
  const router = useRouter();
  const userStore = useUserStore();

  const validatePhone = (value: string) => {
    if (!value) {
      return '请输入手机号';
    }
    if (!/^1[3-9]\d{9}$/.test(value)) {
      return '请输入正确的11位手机号';
    }
    return '';
  };

  const getWechatBindUser = (): { userId: string } | null => {
    const raw = localStorage.getItem(WECHAT_BIND_USER_STORAGE_KEY);
    if (!raw) {
      return null;
    }

    try {
      const parsed = JSON.parse(raw) as { userId?: string };
      if (typeof parsed.userId !== 'string') {
        return null;
      }
      return { userId: parsed.userId };
    } catch (error) {
      console.warn('[wechat-bind-phone] Invalid bind cache', error);
      return null;
    }
  };

  const clearWechatBindUser = () => {
    localStorage.removeItem(WECHAT_BIND_USER_STORAGE_KEY);
  };

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

  const initUserState = async (token: string) => {
    userStore.setToken(token);
    await fetchGetUserInfo().then((res) => {
      userStore.setInfo(res);
    });
    await userStore.initWebsocket();
    try {
      await fetchGetCurrentStudent().then((res: API.Student.studentInfo) => {
        userStore.setStudent(res);
      });
    } catch (error) {
      console.log(error);
    }
  };

  const finishLogin = async (token: string) => {
    await initUserState(token);
    clearWechatBindUser();
    showToast('登录成功');
    const redirect = typeof route.query.redirect === 'string' ? route.query.redirect : '/';
    await router.replace(redirect);
  };

  const handleSendCode = async () => {
    const phoneError = validatePhone(phoneNumber.value);
    if (phoneError) {
      showToast(phoneError);
      return;
    }
    await fetchSendLoginCode(phoneNumber.value);
    showToast('验证码已发送');
    startCountdown();
  };

  const handleBindPhone = async () => {
    const bindUser = getWechatBindUser();
    if (!bindUser) {
      showToast('微信登录信息已失效，请重新登录');
      await router.replace('/login');
      return;
    }

    const phoneError = validatePhone(phoneNumber.value);
    if (phoneError) {
      showToast(phoneError);
      return;
    }

    if (!verificationCode.value) {
      showToast('请输入验证码');
      return;
    }

    const res = await WeChatBindPhone({
      userId: bindUser.userId,
      phone: phoneNumber.value,
      code: verificationCode.value,
    });
    await finishLogin(res.token);
  };

  onMounted(async () => {
    const bindUser = getWechatBindUser();
    if (!bindUser) {
      showToast('请先完成微信登录');
      await router.replace('/login');
    }
  });

  onUnmounted(() => {
    if (countdownTimer) {
      clearInterval(countdownTimer);
      countdownTimer = null;
    }
  });
</script>
