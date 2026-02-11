<template>
  <div class="bg-gray-100 p-2 min-h-full">
    <var-paper class="p-6 mt-1 mb-3">
      <div class="flex items-center gap-4">
        <var-avatar size="large" src="https://b0.bdstatic.com/ugc/img//2025-08-02/6920d9259b909ea2ebc07abc4cc1db64.png" />
        <div class="flex flex-col gap-1">
          <div class="text-2xl font-semibold">张美兰</div>
          <div class="text-gray-500 text-sm">绑定手机：158****8888</div>
        </div>
      </div>
    </var-paper>
    <var-paper class="p-2">
      <van-cell title="个人信息修改" @click="router.push({ path: 'account/edit' })" center is-link>
        <template #icon>
          <van-icon size="24" class="mr-4" name="https://img.icons8.com/?size=100&id=151IAtg8gTZE&format=png&color=000000" />
        </template>
      </van-cell>
      <van-cell title="我的公益券" @click="router.push({ path: 'account/coupon' })" center is-link>
        <template #icon>
          <van-icon size="24" class="mr-4" name="https://img.icons8.com/?size=100&id=C9wli4zNyV7T&format=png&color=000000" />
        </template>
      </van-cell>
      <van-cell title="挂号记录查询" @click="router.push({ path: 'account/appoint' })" center is-link>
        <template #icon>
          <van-icon size="24" class="mr-4" name="https://img.icons8.com/?size=100&id=uEQBYqT3Wt27&format=png&color=000000" />
        </template>
      </van-cell>
    </var-paper>
    <div class="flex justify-center mt-6">
      <var-button @click="router.push({ path: 'login' })" class="w-96" color="#fef2f2" text outline type="danger">退出登录</var-button></div
    >
  </div>
</template>

<script lang="ts" setup>
  const router = useRouter();
</script>

<style scoped lang="scss"></style>
