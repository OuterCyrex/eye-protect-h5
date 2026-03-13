<template>
  <div class="bg-gray-50 min-h-screen p-2">
    <div class="bg-white rounded-lg shadow-sm border border-gray-100 p-4 mb-4">
      <div class="mb-4">
        <div class="my-2">
          <div class="font-semibold mb-2 text-sm text-gray-400">反馈方 <span class="text-red-500">*</span></div>
          <van-field
            class="mb-3 text-sm"
            readonly
            is-link
            placeholder="请选择医院"
            @click="showHospitalPicker = true"
            v-model="hospitalName"
          />
          <van-popup v-model:show="showHospitalPicker" position="bottom">
            <van-picker show-toolbar :columns="columns" @cancel="showHospitalPicker = false" @confirm="onConfirm" />
          </van-popup>
        </div>
        <div class="font-semibold mb-2 text-sm text-gray-400">反馈标题 <span class="text-red-500">*</span></div>
        <input
          v-model="feedbackForm.title"
          type="text"
          class="w-full h-10 px-3 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-400 focus:border-blue-400"
          placeholder="请输入反馈您要反馈的问题"
        />
      </div>
      <div class="mb-4">
        <div class="font-semibold text-sm text-gray-400 mb-2">反馈内容 <span class="text-red-500">*</span></div>
        <textarea
          v-model="feedbackForm.content"
          class="w-full min-h-[100px] px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-400 focus:border-blue-400 resize-y"
          placeholder="请详细描述您的问题、建议或遇到的异常情况"
        ></textarea>
      </div>

      <div class="mb-2">
        <div class="font-semibold text-sm text-gray-400 mb-2">上传图片（选填）</div>
        <div class="flex flex-wrap gap-2">
          <div
            v-for="(image, index) in uploadedImages"
            :key="index"
            class="w-20 h-20 relative rounded-lg overflow-hidden border border-gray-100"
          >
            <img :src="image.previewUrl" alt="反馈图片" class="w-full h-full object-cover" />
            <div
              class="absolute top-1 right-1 w-5 h-5 bg-black/60 rounded-full flex items-center justify-center text-white text-xs cursor-pointer hover:bg-black/80"
              @click="removeImage(index)"
              :class="{ 'opacity-50 cursor-not-allowed': isLoading }"
            >
              ×
            </div>
          </div>

          <div
            class="w-20 h-20 border border-dashed border-gray-200 rounded-lg flex flex-col items-center justify-center text-gray-400 hover:border-blue-500 hover:text-blue-500"
            @click="fileInputRef?.click()"
            v-if="!(isLoading || uploadedImages.length >= 5)"
          >
            <var-icon name="plus" />
            <span class="text-xs">添加图片</span>
            <input
              ref="fileInputRef"
              type="file"
              accept="image/*"
              multiple
              class="hidden"
              @change="handleFileUpload"
              :disabled="isLoading || uploadedImages.length >= 5"
            />
          </div>
        </div>
        <p class="text-xs text-gray-400 mt-2">支持上传jpg、png格式图片，最多5张</p>
      </div>
    </div>
    <var-button @click="submitFeedback" :disabled="!isFormValid || isLoading" block type="primary">
      {{ isLoading ? '提交中...' : '提交反馈' }}
    </var-button>
  </div>
</template>

<script setup lang="ts">
  import { ref, computed } from 'vue';
  import { fetchUploadPicture, fetchSubmitFeedback } from '@/api/misc';
  import { fetchGetInstitutions } from '@/api/appoint';
  const router = useRouter();

  const showHospitalPicker = ref<boolean>(false);
  const columns = ref<Array<{ text: string; value: string }>>([]);
  const hospitalName = ref<string>('');
  const hospitalValue = ref<string>('');
  const onConfirm = (value: any) => {
    hospitalName.value = value.selectedOptions[0].text;
    hospitalValue.value = value.selectedOptions[0].value;
    showHospitalPicker.value = false;
  };
  const handleGetInstitutions = async () => {
    await fetchGetInstitutions().then((res) => {
      const Hospitals = res.records.filter((item: { type: string }) => item.type === '医院');
      columns.value = Hospitals.map((item: API.Misc.institution) => ({ text: item.name, value: item.id }));
    });
  };

  const feedbackForm = ref<API.Misc.feedbackRequest>({ title: '', content: '', images: [] });
  const fileInputRef = ref<HTMLInputElement | null>(null);
  const uploadedImages = ref<{ file: File; previewUrl: string }[]>([]);
  const isLoading = ref(false);

  const isFormValid = computed(() => hospitalValue.value !== '' && feedbackForm.value.title.trim() && feedbackForm.value.content.trim());

  const handleFileUpload = (e: Event) => {
    const files = (e.target as HTMLInputElement).files;
    if (!files || isLoading.value) return;

    Array.from(files)
      .slice(0, 5 - uploadedImages.value.length)
      .forEach((file) => {
        uploadedImages.value.push({ file, previewUrl: URL.createObjectURL(file) });
      });
    (e.target as HTMLInputElement).value = '';
  };

  const removeImage = (index: number) => {
    if (isLoading.value) return;
    URL.revokeObjectURL(uploadedImages.value[index]!.previewUrl);
    uploadedImages.value.splice(index, 1);
    feedbackForm.value.images.splice(index, 1);
  };

  const submitFeedback = async () => {
    if (!isFormValid.value || isLoading.value) return;

    isLoading.value = true;
    if (uploadedImages.value.length) {
      const res = await fetchUploadPicture(uploadedImages.value.map((item) => item.file));
      feedbackForm.value.images = res;
    }
    await fetchSubmitFeedback(hospitalValue.value, feedbackForm.value)
      .then(() => {
        showToast('反馈提交成功');
        feedbackForm.value = { title: '', content: '', images: [] };
        uploadedImages.value.forEach((img) => URL.revokeObjectURL(img.previewUrl));
        uploadedImages.value = [];
        router.back();
      })
      .finally(() => {
        isLoading.value = false;
      });
  };

  onMounted(async () => {
    await handleGetInstitutions();
  });
</script>
