<template>
  <div class="min-h-full bg-gray-100 p-2">
    <var-paper class="mb-3 mt-1 p-6">
      <div class="flex items-center gap-4">
        <var-avatar size="large" :src="userInfo?.avatarUrl" />
        <div class="flex flex-col gap-1">
          <div class="text-2xl font-semibold">{{ userInfo?.name }}</div>
          <div class="text-sm text-gray-500">绑定手机：{{ userInfo?.phone }}</div>
        </div>
      </div>
    </var-paper>

    <var-paper class="p-2">
      <van-cell title="挂号记录查询" @click="router.push({ path: 'account/appoint' })" center is-link>
        <template #icon>
          <var-icon class="mr-4" size="22" name="calendar-month-outline" />
        </template>
      </van-cell>
      <van-cell title="学生信息管理" @click="router.push({ path: 'account/children' })" center is-link>
        <template #icon>
          <var-icon class="mr-4" size="22" name="card-account-details-outline" />
        </template>
      </van-cell>
      <van-cell title="个人信息修改" @click="router.push({ path: 'account/edit' })" center is-link>
        <template #icon>
          <var-icon class="mr-4" size="22" name="bookmark-outline" />
        </template>
      </van-cell>
      <van-cell title="更改密码" @click="router.push({ path: 'account/changePassword' })" center is-link>
        <template #icon>
          <var-icon class="mr-4" size="22" name="cog-outline" />
        </template>
      </van-cell>
      <van-cell title="通知" @click="router.push({ path: 'account/notice' })" center is-link>
        <template #icon>
          <var-icon class="mr-4" size="22" name="bell-outline" />
        </template>
        <template #right-icon>
          <div class="items-center flex">
            <div v-if="userStore.getUnread > 0" class="mr-2 text-sm bg-red-500 text-white rounded-full px-1">{{ userStore.getUnread }}</div>
            <van-icon name="arrow"
          /></div>
        </template>
      </van-cell>
      <van-cell title="我的公益券" @click="router.push({ path: 'account/coupon' })" center is-link>
        <template #icon>
          <var-icon class="mr-4" size="22" name="shopping-outline" />
        </template>
      </van-cell>
      <van-cell title="用户反馈" @click="router.push({ path: 'account/feedback' })" center is-link>
        <template #icon>
          <var-icon class="mr-4" size="22" name="message-text-outline" />
        </template>
      </van-cell>
    </var-paper>

    <div class="mt-6 flex justify-center w-full px-2">
      <var-button @click="handleLogout" class="w-full" color="#fef2f2" text outline type="danger">退出登录</var-button>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { logout } from '@/api';
  import { fetchGetUserInfoDetail } from '@/api/user';
  import { useUserStore } from '@/store/modules/user';

  const router = useRouter();
  const userStore = useUserStore();
  const userInfo = ref<API.Auth.UserDetail | null>(null);

  const handleLogout = () => {
    logout().then(() => {
      router.push({ path: 'login' });
      userStore.logout();
      showToast('退出登录成功');
    });
  };

  const handleGetUserDetail = async () => {
    await fetchGetUserInfoDetail().then((res) => {
      userInfo.value = res;
    });
  };

  onMounted(async () => {
    await handleGetUserDetail();
  });
</script>
