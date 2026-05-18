<template>
  <div class="flex min-h-dvh flex-col">
    <div class="justify-center">
      <div class="my-12 flex flex-col items-center justify-center">
        <div class="mb-2 text-2xl font-semibold">睛准防控</div>
        <div class="text-center text-gray-500">守护青少年光明未来</div>
      </div>

      <div class="mx-8 grid gap-6">
        <InputBar prepend-icon="phone" isNumber v-model="phoneNumber" :validator="validatePhone" placeholder="输入手机号" />

        <template v-if="loginMode === 'password'">
          <InputBar prepend-icon="lock" type="password" show-password-toggle v-model="password" placeholder="请输入密码" />
        </template>

        <template v-else>
          <div class="flex items-center gap-3">
            <div class="flex-1">
              <InputBar prepend-icon="lock" isNumber v-model="verificationCode" placeholder="请输入验证码" />
            </div>
            <van-button class="min-w-24" size="small" type="primary" :disabled="countdown > 0" @click="handleSendCode">
              <span class="text-sm">{{ countdown > 0 ? `${countdown}s后重试` : '获取验证码' }}</span>
            </van-button>
          </div>
        </template>

        <div class="-mt-3 flex justify-end">
          <button type="button" class="border-none bg-transparent p-0 text-sm leading-none text-blue-500" @click="toggleLoginMode">
            {{ loginMode === 'code' ? '使用密码登录' : '使用验证码登录' }}
          </button>
        </div>

        <var-button class="login-btn" type="primary" block @click="handleLogin">登录/注册</var-button>

        <div class="flex items-center justify-center gap-4">
          <div class="h-px flex-1 bg-gray-200"></div>
          <span class="whitespace-nowrap text-sm text-gray-500">其他登录方式</span>
          <div class="h-px flex-1 bg-gray-200"></div>
        </div>

        <var-button text class="flex items-center" :loading="wechatLoading" @click="handleWeChatLogin">
          <var-icon :name="WeChatIcon" size="22" class="mr-2" />
          <span class="text-lg">微信一键登录</span>
        </var-button>
      </div>
    </div>

    <div class="pb-4 text-center text-xs text-gray-400 absolute bottom-2 right-0 left-0">
      <a href="https://beian.miit.gov.cn/" target="_blank" rel="noopener noreferrer" class="underline">京ICP备2025147132号-5</a>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { ref } from 'vue';
  import InputBar from '@/templates/InputBar.vue';
  import { loginPassword, loginVerificationCode } from '@/api';
  import WeChatIcon from '@/assets/font/icon/login/wechat.png';
  import { fetchGetCurrentStudent } from '@/api/student';
  import { fetchGetUserInfo, fetchSendLoginCode } from '@/api/user';
  import { useUserStore } from '@/store/modules/user';
  import { buildWechatAuthUrl, loginByWechatCallback } from './utils';

  const { VITE_WECHAT_APP_ID, VITE_WECHAT_REDIRECT_ORIGIN } = import.meta.env;

  const phoneNumber = ref('');
  const password = ref('');
  const verificationCode = ref('');
  const loginMode = ref<'password' | 'code'>('code');
  const countdown = ref(0);
  const wechatLoading = ref(false);
  let countdownTimer: ReturnType<typeof setInterval> | null = null;

  const route = useRoute();
  const router = useRouter();
  const userStore = useUserStore();
  const WECHAT_BIND_USER_STORAGE_KEY = 'wechat_bind_user';

  const validatePhone = (value: string) => {
    if (!value) {
      return '请输入手机号';
    }
    if (!/^1[3-9]\d{9}$/.test(value)) {
      return '请输入正确的11位手机号';
    }
    return '';
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

  const toggleLoginMode = () => {
    loginMode.value = loginMode.value === 'code' ? 'password' : 'code';
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
    showToast('登录成功');
    const redirect = typeof route.query.redirect === 'string' ? route.query.redirect : '/';
    await router.replace(redirect);
  };

  const handleWeChatLogin = async () => {
    if (!VITE_WECHAT_APP_ID) {
      showToast('微信登录配置缺失');
      return;
    }
    window.location.href = buildWechatAuthUrl({
      appId: VITE_WECHAT_APP_ID,
      redirectOrigin: VITE_WECHAT_REDIRECT_ORIGIN,
      routeQuery: route.query,
    });
  };

  const handleWechatCallbackLogin = async () => {
    wechatLoading.value = true;
    try {
      const res = await loginByWechatCallback(route.query);
      if (!res) return;

      if (res.needBindPhone) {
        localStorage.setItem(
          WECHAT_BIND_USER_STORAGE_KEY,
          JSON.stringify({
            userId: res.userId,
            nickname: res.nickname,
            avatar: res.avatar,
          }),
        );
        const redirect = typeof route.query.redirect === 'string' ? route.query.redirect : '/';
        await router.replace({
          path: '/bind-phone',
          query: {
            redirect,
          },
        });
        return;
      }

      await finishLogin(res.token);
    } finally {
      wechatLoading.value = false;
    }
  };

  const handleLogin = async () => {
    const phoneError = validatePhone(phoneNumber.value);
    if (phoneError) {
      showToast(phoneError);
      return;
    }

    if (loginMode.value === 'password') {
      if (!password.value) {
        showToast('请输入密码');
        return;
      }
      const res = await loginPassword({ phone: phoneNumber.value, password: password.value });
      await finishLogin(res.token);
      return;
    }

    if (!verificationCode.value) {
      showToast('请输入验证码');
      return;
    }
    const res = await loginVerificationCode({ phone: phoneNumber.value, verificationCode: verificationCode.value });
    await finishLogin(res.token);
  };

  onMounted(async () => {
    await handleWechatCallbackLogin();
  });

  onUnmounted(() => {
    if (countdownTimer) {
      clearInterval(countdownTimer);
      countdownTimer = null;
    }
  });
</script>
