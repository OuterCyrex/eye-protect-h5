<template>
  <div class="bg-gray-100 py-1">
    <van-cell-group class="rounded-lg shadow-sm my-3 mx-0">
      <van-cell class="items-center" title="头像" is-link>
        <var-avatar class="mr-3"></var-avatar>
      </van-cell>
    </van-cell-group>

    <van-cell-group class="mt-2">
      <van-field label="姓名" v-model="userInfo.name" placeholder="请输入" class="border-b border-gray-100" />
    </van-cell-group>

    <van-cell-group>
      <van-field label="您的手机号" v-model="userInfo.phone" placeholder="请输入" class="border-b border-gray-100" />
    </van-cell-group>

    <van-field
      label="性别"
      v-model="userInfo.gender"
      placeholder="请选择"
      readonly
      is-link
      class="border-b border-gray-100"
      @click="showGenderPicker = true"
    />

    <div class="w-full justify-center flex mt-6">
      <van-button type="primary" class="w-96 h-14 rounded-xl bg-blue-600 text-white font-medium" @click="handleUpdateUserInfo">
        确认更改
      </van-button>
    </div>

    <van-popup v-model:show="showGenderPicker" position="bottom">
      <van-picker :columns="genderColumns" @cancel="showGenderPicker = false" @confirm="onGenderChange" />
    </van-popup>

    <LoadLay v-model="loading" />
  </div>
</template>

<script lang="ts" setup>
  import { fetchUpdateUserInfo, fetchGetUserInfoDetail } from '@/api/user';
  import LoadLay from '@/templates/LoadLay.vue';

  const userInfo = ref<API.Auth.UserDetail>({
    id: '',
    phone: '',
    name: '',
    gender: '',
    idCard: '',
    status: '',
    lastLoginTime: '',
    emergencyContact: '',
    emergencyPhone: '',
    address: '',
  });
  const router = useRouter();
  const loading = ref<boolean>(false);

  const handleGetUserDetail = async () => {
    await fetchGetUserInfoDetail().then((res) => {
      userInfo.value = res;
    });
  };

  const handleUpdateUserInfo = async () => {
    loading.value = true;
    await fetchUpdateUserInfo(userInfo.value.id, {
      name: userInfo.value.name,
      phone: userInfo.value.phone,
      idCard: userInfo.value.idCard,
      gender: userInfo.value.gender,
      birthDate: '',
      email: '',
      status: '',
      password: '',
      lastLoginTime: '',
    })
      .then(() => {
        showToast('信息更新成功');
        router.back();
      })
      .finally(() => {
        loading.value = false;
      });
  };

  const genderColumns = ref([
    { text: '男', value: '男' },
    { text: '女', value: '女' },
  ]);
  const showGenderPicker = ref<boolean>(false);
  const onGenderChange = (value: any) => {
    userInfo.value.gender = value.selectedOptions[0].text;
    showGenderPicker.value = false;
  };

  onMounted(async () => {
    loading.value = true;
    await handleGetUserDetail();
    loading.value = false;
  });
</script>
