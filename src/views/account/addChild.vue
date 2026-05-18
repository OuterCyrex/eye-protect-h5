<template>
  <div class="bg-gray-100 min-h-full py-2">
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
        @click="openSchoolPicker"
      />

      <van-field label="校区" v-model="formData.campus" placeholder="请输入" class="border-b border-gray-100"> </van-field>

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
  </div>
</template>

<script lang="ts" setup>
  import { reactive, ref } from 'vue';
  import { DatePicker } from 'vant';
  import { fetchGetInstitutions } from '@/api/appoint';
  import { fetchAddStudent } from '@/api/student';

  const router = useRouter();

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

  const schoolColumns = ref<Array<{ text: string; value: string }>>([]);
  const currentPage = ref(1);
  const pageSize = ref(100);
  const loading = ref(false);
  const finished = ref(false);

  const handleGetInstitutions = async (pageNum = 1) => {
    if (loading.value || finished.value) return;
    loading.value = true;
    try {
      const res = await fetchGetInstitutions({ pageNum, pageSize: pageSize.value, type: '学校' });
      const schools = Array.isArray(res.records) ? res.records : [];
      if (pageNum === 1) {
        schoolColumns.value = schools.map((item: API.Misc.institution) => ({ text: item.name, value: item.id }));
      } else {
        const loadMoreIndex = schoolColumns.value.findIndex((col) => col.value === 'load_more');
        if (loadMoreIndex !== -1) {
          schoolColumns.value.splice(loadMoreIndex, 1);
        }
        schoolColumns.value.push(...schools.map((item: API.Misc.institution) => ({ text: item.name, value: item.id })));
      }

      const totalPages = typeof res.pages === 'number' ? res.pages : res.total && pageSize.value ? Math.ceil(res.total / pageSize.value) : pageNum;
      if (pageNum < totalPages) {
        finished.value = false;
        currentPage.value = pageNum + 1;
        if (!schoolColumns.value.some((col) => col.value === 'load_more')) {
          schoolColumns.value.push({ text: '加载更多...', value: 'load_more' });
        }
      } else {
        finished.value = true;
        const loadMoreIndex = schoolColumns.value.findIndex((col) => col.value === 'load_more');
        if (loadMoreIndex !== -1) {
          schoolColumns.value.splice(loadMoreIndex, 1);
        }
      }
    } catch (error) {
      console.error(error);
    } finally {
      loading.value = false;
    }
  };
  const showSchoolPicker = ref<boolean>(false);
  const openSchoolPicker = async () => {
    if (!schoolColumns.value.length) {
      await handleGetInstitutions(1);
    }
    if (!schoolColumns.value.length) {
      showToast('当前地区暂无可选学校');
      return;
    }
    showSchoolPicker.value = true;
  };
  const onSchoolChange = async (value: any) => {
    const option = value?.selectedOptions?.[0];
    if (!option) return;

    if (option.value === 'load_more') {
      await handleGetInstitutions(currentPage.value);
      showSchoolPicker.value = true;
      return;
    }

    formData.schoolId = option.value;
    schoolName.value = option.text;
    showSchoolPicker.value = false;
  };

  const handleSubmit = async () => {
    // 构建提交数据，过滤掉所有空值字段（空字符串、null、undefined）
    const submitData: any = {};
    Object.keys(formData).forEach((key) => {
      const value = (formData as any)[key];
      if (value !== '' && value !== null && value !== undefined) {
        submitData[key] = value;
      }
    });

    await fetchAddStudent(submitData).then(() => {
      showToast('添加成功');
      router.back();
    });
  };

  onMounted(async () => {
    await handleGetInstitutions();
  });
</script>
