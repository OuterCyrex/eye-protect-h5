<template>
  <div class="p-3 bg-gray-100 min-h-full">
    <div v-for="student in studentList" :key="student.id" class="rounded-lg p-4 mb-3 bg-white">
      <div class="flex justify-between items-center mb-2">
        <div class="flex items-center">
          <div class="text-base font-semibold text-gray-800">{{ student.name }}</div>
          <div class="text-xs text-gray-500 ml-3"> {{ student.gender }} - {{ calculateAge(student.birthDate) }}岁 </div>
        </div>
        <button class="text-xs px-2 py-1 rounded text-blue-500 border border-blue-100 bg-blue-50" @click="handleEditStudent(student)">
          编辑
        </button>
      </div>

      <div class="flex justify-between text-sm text-gray-600">
        <div>学校: {{ schoolsList.find((school) => school.id === student.schoolId)?.name }}</div>
        <div>班级: {{ student.className }}</div>
      </div>
    </div>

    <div class="rounded-lg p-2 bg-white flex items-center h-20 cursor-pointer" @click="handleAddStudent">
      <div class="flex items-center">
        <var-icon name="plus" />
        <div class="text-sm font-medium ml-2">绑定新学生</div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { fetchGetStudentList } from '@/api/student';
  import { fetchGetInstitutions } from '@/api/appoint';
  import { ref } from 'vue';
  import { useRouter } from 'vue-router';
  import { calculateAge } from '@/utils/time';

  const router = useRouter();

  const studentList = ref<Array<API.Student.studentInfo>>([]);
  const schoolsList = ref<Array<API.Misc.institution>>([]);

  const handleGetStudentList = () => {
    fetchGetStudentList().then((res) => {
      studentList.value = res;
    });
  };

  const handleAddStudent = () => {
    router.push({ path: '/account/addChild' });
  };

  const handleEditStudent = (student: any) => {
    router.push({
      path: '/account/student/edit',
      query: { id: student.id },
    });
  };

  const handleGetInstitutions = () => {
    fetchGetInstitutions().then((res) => {
      schoolsList.value = res.records.filter((item: { type: string }) => item.type === '学校');
    });
  };

  onMounted(async () => {
    await handleGetStudentList();
    await handleGetInstitutions();
  });
</script>
