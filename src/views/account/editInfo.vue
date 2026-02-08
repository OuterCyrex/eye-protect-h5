<template>
  <div class="bg-gray-100 py-1">
    <van-cell-group class="rounded-lg shadow-sm my-3 mx-0">
      <van-cell class="items-center" title="头像" is-link>
        <var-avatar class="mr-3"></var-avatar>
      </van-cell>
    </van-cell-group>

    <van-cell-group>
      <van-field label="孩子姓名" v-model="formData.childName" placeholder="请输入" class="border-b border-gray-100"> </van-field>
      <van-field
        label="孩子性别"
        v-model="formData.childGender"
        placeholder="请选择"
        readonly
        is-link
        class="border-b border-gray-100"
        @click="showGenderPicker = true"
      />

      <van-field
        label="孩子年龄"
        v-model="formData.childAge"
        placeholder="请输入"
        readonly
        is-link
        class="border-b border-gray-100"
        @click="showAgePicker = true"
      />

      <van-field
        label="孩子学校"
        v-model="formData.childSchool"
        placeholder="请输入"
        readonly
        is-link
        class="border-b border-gray-100"
        @click="showSchoolPicker = true"
      />

      <van-field
        label="孩子班级"
        v-model="formData.childClass"
        placeholder="请输入"
        readonly
        clickable
        right-icon="arrow"
        @click="showClassPicker = true"
      />
    </van-cell-group>

    <van-cell-group class="mt-2">
      <van-field label="您的手机号" v-model="formData.parentPhone" placeholder="请输入" class="border-b border-gray-100" />

      <van-field
        label="与孩子关系"
        @click="showRelationPicker = true"
        v-model="formData.relation"
        placeholder="请选择"
        readonly
        is-link
        class="border-b border-gray-100"
      />
    </van-cell-group>

    <div class="w-full justify-center flex mt-6">
      <van-button type="primary" class="w-96 h-14 rounded-xl bg-blue-600 text-white font-medium"> 确认更改 </van-button>
    </div>

    <van-popup v-model:show="showRelationPicker" position="bottom">
      <van-picker :columns="relationColumns" @cancel="showRelationPicker = false" @confirm="onRelationChange" />
    </van-popup>

    <van-popup v-model:show="showGenderPicker" position="bottom">
      <van-picker :columns="genderColumns" @cancel="showGenderPicker = false" @confirm="onGenderChange" />
    </van-popup>

    <van-popup v-model:show="showAgePicker" position="bottom">
      <van-picker :columns="ageColumns" @cancel="showAgePicker = false" @confirm="onAgeChange" />
    </van-popup>

    <van-popup v-model:show="showSchoolPicker" position="bottom">
      <van-picker :columns="schoolColumns" @cancel="showSchoolPicker = false" @confirm="onSchoolChange" />
    </van-popup>

    <van-popup v-model:show="showClassPicker" position="bottom">
      <van-picker :columns="classColumns" @cancel="showClassPicker = false" @confirm="onClassChange" />
    </van-popup>
  </div>
</template>

<script lang="ts" setup>
  import { reactive, ref } from 'vue';

  const formData = reactive({
    avatar: '',
    childName: '张小明',
    childGender: '男',
    childAge: '8岁',
    childSchool: '电子科大附小',
    childClass: '二年级3班',
    parentPhone: '13800138000',
    relation: '爸爸',
  });

  const relationColumns = ref([
    { text: '爸爸', value: '爸爸' },
    { text: '妈妈', value: '妈妈' },
    { text: '爷爷', value: '爷爷' },
    { text: '奶奶', value: '奶奶' },
  ]);
  const showRelationPicker = ref<boolean>(false);
  const onRelationChange = (value: any) => {
    formData.relation = value.selectedOptions[0].text;
    showRelationPicker.value = false;
  };

  const genderColumns = ref([
    { text: '男', value: '男' },
    { text: '女', value: '女' },
  ]);
  const showGenderPicker = ref<boolean>(false);
  const onGenderChange = (value: any) => {
    formData.childGender = value.selectedOptions[0].text;
    showGenderPicker.value = false;
  };

  const ageColumns = ref(
    Array.from({ length: 18 }, (_, i) => ({
      text: `${i + 1}岁`,
      value: `${i + 1}岁`,
    })),
  );
  const showAgePicker = ref<boolean>(false);
  const onAgeChange = (value: any) => {
    formData.childAge = value.selectedOptions[0].text;
    showAgePicker.value = false;
  };

  const schoolColumns = ref([
    { text: '电子科大附小', value: '电子科大附小' },
    { text: '成都实验小学', value: '成都实验小学' },
    { text: '泡桐树小学', value: '泡桐树小学' },
    { text: '龙江路小学', value: '龙江路小学' },
  ]);
  const showSchoolPicker = ref<boolean>(false);
  const onSchoolChange = (value: any) => {
    formData.childSchool = value.selectedOptions[0].text;
    showSchoolPicker.value = false;
  };

  const classColumns = ref([
    { text: '一年级1班', value: '一年级1班' },
    { text: '一年级2班', value: '一年级2班' },
    { text: '二年级1班', value: '二年级1班' },
    { text: '二年级3班', value: '二年级3班' },
    { text: '三年级1班', value: '三年级1班' },
  ]);
  const showClassPicker = ref<boolean>(false);
  const onClassChange = (value: any) => {
    formData.childClass = value.selectedOptions[0].text;
    showClassPicker.value = false;
  };
</script>
