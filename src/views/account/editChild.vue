<template>
  <div class="bg-gray-100 py-2">
    <van-cell-group>
      <van-field label="学生姓名" v-model="formData.name" placeholder="请输入" class="border-b border-gray-100"> </van-field>
      <van-field
        label="性别"
        v-model="formData.gender"
        placeholder="请选择"
        readonly
        is-link
        class="border-b border-gray-100"
        @click="showGenderPicker = true"
      />

      <van-field
        label="出生日期"
        v-model="formData.birthDate"
        placeholder="请选择"
        readonly
        is-link
        class="border-b border-gray-100"
        @click="showBirthPicker = true"
      />

      <van-field label="身份证号" v-model="formData.idCard" placeholder="请输入" class="border-b border-gray-100"> </van-field>

      <van-field
        label="学校"
        v-model="schoolName"
        placeholder="请选择"
        readonly
        is-link
        class="border-b border-gray-100"
        @click="showSchoolPicker = true"
      />

      <van-field label="班级" v-model="formData.className" placeholder="请输入" class="border-b border-gray-100"> </van-field>
    </van-cell-group>

    <div class="w-full justify-center flex mt-6">
      <van-button type="primary" class="w-96 h-14 rounded-xl bg-blue-600 text-white font-medium" @click="handleSubmit"> 提交 </van-button>
    </div>

    <van-popup v-model:show="showGenderPicker" position="bottom">
      <van-picker :columns="genderColumns" @cancel="showGenderPicker = false" @confirm="onGenderChange" />
    </van-popup>

    <van-popup v-model:show="showBirthPicker" position="bottom">
      <DatePicker @confirm="onBirthChange" type="date" :min-date="new Date('1999-01-01')" />
    </van-popup>

    <van-popup v-model:show="showSchoolPicker" position="bottom">
      <van-picker :columns="schoolColumns" @cancel="showSchoolPicker = false" @confirm="onSchoolChange" />
    </van-popup>

    <LoadLay v-model="loading" />
  </div>
</template>

<script lang="ts" setup>
  import { reactive, ref } from 'vue';
  import { DatePicker } from 'vant';
  import { fetchGetInstitutions } from '@/api/appoint';
  import { fetchUpdateStudent, fetchGetCurrentStudent } from '@/api/student';
  import LoadLay from '@/templates/LoadLay.vue';

  const router = useRouter();
  const loading = ref<boolean>(false);

  const formData = reactive<API.Student.addStudentRequest>({
    name: '',
    gender: '',
    birthDate: '',
    idCard: '',
    className: '',
    schoolId: '',
    province: '',
    parentName: '',
  });
  const schoolName = ref<string>('');

  const genderColumns = ref([
    { text: '男', value: '男' },
    { text: '女', value: '女' },
  ]);
  const showGenderPicker = ref<boolean>(false);
  const onGenderChange = (value: any) => {
    formData.gender = value.selectedOptions[0].text;
    showGenderPicker.value = false;
  };

  const showBirthPicker = ref<boolean>(false);
  const onBirthChange = (value: any) => {
    formData.birthDate = value.selectedValues.join('-');
    showBirthPicker.value = false;
  };

  const schoolColumns = ref<{ text: string; value: string }[]>([]);
  const handleGetInstitutions = async () => {
    await fetchGetInstitutions().then((res) => {
      const schools = res.records.filter((item: { type: string }) => item.type === '学校');
      schoolColumns.value = schools.map((item: API.Misc.institution) => ({ text: item.name, value: item.id }));
    });
  };
  const showSchoolPicker = ref<boolean>(false);
  const onSchoolChange = (value: any) => {
    formData.schoolId = value.selectedOptions[0].value;
    schoolName.value = value.selectedOptions[0].text;
    showSchoolPicker.value = false;
  };

  const handleSubmit = async () => {
    loading.value = true;

    await fetchUpdateStudent(formData).then(() => {
      showToast('更新成功');
      router.back();
    });

    loading.value = false;
  };

  const handleGetStudentInfo = async () => {
    await fetchGetCurrentStudent().then((res: API.Student.studentInfo) => {
      formData.birthDate = res.birthDate;
      formData.className = res.className;
      formData.gender = res.gender;
      formData.idCard = res.idCard;
      formData.name = res.name;
      formData.parentName = res.parentName;
      formData.province = res.province;
      formData.schoolId = res.schoolId;

      schoolName.value = schoolColumns.value.find((item) => `${item.value}` === formData.schoolId)?.text || '';
    });
  };

  onMounted(async () => {
    loading.value = true;
    await handleGetInstitutions();
    await handleGetStudentInfo();
    loading.value = false;
  });
</script>
