<template>
  <div class="bg-gray-100 py-1">
    <van-cell-group class="rounded-lg shadow-sm my-3 mx-0">
      <van-cell class="items-center" title="头像" is-link @click="openAvatarPicker">
        <template #right-icon>
          <van-uploader ref="avatarUploaderRef" :after-read="handleAvatarSelect" :max-count="1" :preview-image="false">
            <var-avatar class="mr-3" :src="avatarPreviewUrl || userInfo.avatarUrl || undefined"></var-avatar>
          </van-uploader>
        </template>
      </van-cell>
    </van-cell-group>

    <van-cell-group class="mt-2">
      <van-field label="姓名" v-model="userInfo.name" placeholder="请输入姓名" class="border-b border-gray-100" />
      <van-field label="手机号" v-model="userInfo.phone" placeholder="请输入手机号" class="border-b border-gray-100" />
      <van-field label="身份证号" v-model="userInfo.idCard" placeholder="请输入身份证号" class="border-b border-gray-100" />
      <van-field
        label="性别"
        v-model="userInfo.gender"
        placeholder="请选择性别"
        readonly
        is-link
        class="border-b border-gray-100"
        @click="showGenderPicker = true"
      />
      <van-field
        label="出生日期"
        v-model="userInfo.birthDate"
        placeholder="请选择出生日期"
        readonly
        is-link
        class="border-b border-gray-100"
        @click="showBirthPicker = true"
      />
      <van-field label="邮箱" v-model="userInfo.email" placeholder="请输入邮箱" class="border-b border-gray-100" />
      <van-field label="紧急联系人" v-model="userInfo.emergencyContact" placeholder="请输入紧急联系人" class="border-b border-gray-100" />
      <van-field label="紧急联系电话" v-model="userInfo.emergencyPhone" placeholder="请输入紧急联系电话" class="border-b border-gray-100" />
      <van-field label="地址" v-model="userInfo.address" placeholder="请输入地址" class="border-b border-gray-100" />
    </van-cell-group>

    <div class="w-full justify-center flex mt-6">
      <van-button type="primary" class="w-96 h-14 rounded-xl bg-blue-600 text-white font-medium" @click="handleUpdateUserInfo">
        确认修改
      </van-button>
    </div>

    <van-popup v-model:show="showGenderPicker" position="bottom">
      <van-picker :columns="genderColumns" @cancel="showGenderPicker = false" @confirm="onGenderChange" />
    </van-popup>

    <van-popup v-model:show="showBirthPicker" position="bottom">
      <DatePicker @confirm="onBirthChange" type="date" :min-date="minBirthDate" :max-date="maxBirthDate" />
    </van-popup>

    <LoadLay v-model="loading" />
  </div>
</template>

<script lang="ts" setup>
  import { DatePicker } from 'vant';
  import { fetchUpdateUserInfo, fetchGetUserInfoDetail, fetchUploadAvatar } from '@/api/user';
  import LoadLay from '@/templates/LoadLay.vue';

  interface EditUserInfo extends API.Auth.UserDetail {
    birthDate: string;
    email: string;
  }

  const userInfo = ref<EditUserInfo>({
    id: '',
    phone: '',
    name: '',
    gender: '',
    idCard: '',
    status: '',
    avatarUrl: '',
    lastLoginTime: '',
    emergencyContact: '',
    emergencyPhone: '',
    address: '',
    birthDate: '',
    email: '',
  });
  const router = useRouter();
  const loading = ref<boolean>(false);
  const avatarUploaderRef = ref();
  const pendingAvatarFile = ref<File | null>(null);
  const avatarPreviewUrl = ref<string>('');

  const handleGetUserDetail = async () => {
    await fetchGetUserInfoDetail().then((res) => {
      userInfo.value = {
        ...userInfo.value,
        ...res,
        birthDate: (res as EditUserInfo).birthDate || '',
        email: (res as EditUserInfo).email || '',
      };
    });
  };

  const handleUpdateUserInfo = async () => {
    loading.value = true;
    await fetchUpdateUserInfo({
      id: userInfo.value.id,
      userType: 'PARENT',
      baseInfo: {
        name: userInfo.value.name,
        phone: userInfo.value.phone,
        idCard: userInfo.value.idCard,
        gender: userInfo.value.gender,
        status: userInfo.value.status,
        password: '',
      },
      parentExtension: {
        birthDate: userInfo.value.birthDate,
        email: userInfo.value.email,
        emergencyContact: userInfo.value.emergencyContact,
        emergencyPhone: userInfo.value.emergencyPhone,
        address: userInfo.value.address,
      },
    })
      .then(async () => {
        if (pendingAvatarFile.value) {
          await fetchUploadAvatar(pendingAvatarFile.value);
          pendingAvatarFile.value = null;
          if (avatarPreviewUrl.value) {
            URL.revokeObjectURL(avatarPreviewUrl.value);
            avatarPreviewUrl.value = '';
          }
        }
        await handleGetUserDetail();
        showToast('信息更新成功');
        router.back();
      })
      .finally(() => {
        loading.value = false;
      });
  };

  const handleAvatarSelect = (file: any) => {
    pendingAvatarFile.value = file.file as File;
    if (avatarPreviewUrl.value) {
      URL.revokeObjectURL(avatarPreviewUrl.value);
    }
    avatarPreviewUrl.value = URL.createObjectURL(file.file as File);
  };

  const openAvatarPicker = () => {
    avatarUploaderRef.value?.chooseFile();
  };

  const genderColumns = ref([
    { text: '男', value: '男' },
    { text: '女', value: '女' },
  ]);
  const showGenderPicker = ref<boolean>(false);
  const showBirthPicker = ref<boolean>(false);
  const minBirthDate = new Date('1950-01-01');
  const maxBirthDate = new Date();
  const onGenderChange = (value: any) => {
    userInfo.value.gender = value.selectedOptions[0].text;
    showGenderPicker.value = false;
  };
  const onBirthChange = (value: any) => {
    userInfo.value.birthDate = value.selectedValues.join('-');
    showBirthPicker.value = false;
  };

  onMounted(async () => {
    loading.value = true;
    await handleGetUserDetail();
    loading.value = false;
  });

  onUnmounted(() => {
    if (avatarPreviewUrl.value) {
      URL.revokeObjectURL(avatarPreviewUrl.value);
    }
  });
</script>
