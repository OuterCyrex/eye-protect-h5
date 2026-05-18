<template>
  <div class="min-h-screen bg-gray-50 p-2">
    <div class="mb-4 rounded-lg border border-gray-100 bg-white p-4 shadow-sm">
      <div class="mb-4">
        <div class="mb-2 text-sm font-semibold text-gray-400">反馈对象 <span class="text-red-500">*</span></div>
        <van-field
          class="text-sm"
          readonly
          is-link
          :model-value="feedbackTargetLabel"
          placeholder="请选择反馈对象"
          @click="showTargetPicker = true"
        />
        <van-popup v-model:show="showTargetPicker" position="bottom">
          <van-picker show-toolbar :columns="targetColumns" @cancel="showTargetPicker = false" @confirm="onTargetConfirm" />
        </van-popup>
      </div>

      <div v-if="isHospitalTarget" class="mb-4">
        <div class="mb-2 text-sm font-semibold text-gray-400">反馈医院 <span class="text-red-500">*</span></div>
        <van-field class="text-sm" readonly is-link :model-value="hospitalName" placeholder="请选择医院" @click="openHospitalPicker" />
        <van-popup v-model:show="showHospitalPicker" position="bottom">
          <van-picker show-toolbar :columns="hospitalColumns" @cancel="showHospitalPicker = false" @confirm="onHospitalConfirm" />
        </van-popup>
      </div>

      <div class="mb-4">
        <div class="mb-2 text-sm font-semibold text-gray-400">反馈标题 <span class="text-red-500">*</span></div>
        <input
          v-model="feedbackForm.title"
          type="text"
          class="h-10 w-full rounded-lg border border-gray-200 px-3 text-sm focus:border-blue-400 focus:outline-none focus:ring-1 focus:ring-blue-400"
          placeholder="请输入反馈标题"
          maxlength="100"
        />
      </div>

      <div class="mb-4">
        <div class="mb-2 text-sm font-semibold text-gray-400">反馈内容</div>
        <textarea
          v-model="feedbackForm.content"
          class="min-h-[100px] w-full resize-y rounded-lg border border-gray-200 px-3 py-2 text-sm focus:border-blue-400 focus:outline-none focus:ring-1 focus:ring-blue-400"
          placeholder="请详细描述问题或建议（可选）"
          maxlength="1000"
        ></textarea>
      </div>

      <div class="mb-2">
        <div class="mb-2 text-sm font-semibold text-gray-400">上传图片（选填）</div>
        <div class="flex flex-wrap gap-2">
          <div
            v-for="(image, index) in uploadedImages"
            :key="index"
            class="relative h-20 w-20 overflow-hidden rounded-lg border border-gray-100"
          >
            <img :src="image.previewUrl" alt="反馈图片" class="h-full w-full object-cover" />
            <div
              class="absolute right-1 top-1 flex h-5 w-5 cursor-pointer items-center justify-center rounded-full bg-black/60 text-xs text-white hover:bg-black/80"
              @click="removeImage(index)"
              :class="{ 'cursor-not-allowed opacity-50': isLoading }"
            >
              ×
            </div>
          </div>

          <div
            class="flex h-20 w-20 flex-col items-center justify-center rounded-lg border border-dashed border-gray-200 text-gray-400 hover:border-blue-500 hover:text-blue-500"
            @click="fileInputRef?.click()"
            v-if="!(isLoading || uploadedImages.length >= 10)"
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
              :disabled="isLoading || uploadedImages.length >= 10"
            />
          </div>
        </div>
        <p class="mt-2 text-xs text-gray-400">支持 jpg/png，一次最多上传 10 张</p>
      </div>
    </div>

    <var-button @click="submitFeedback" :disabled="!isFormValid || isLoading" block type="primary">
      {{ isLoading ? '提交中...' : '提交反馈' }}
    </var-button>
  </div>
</template>

<script setup lang="ts">
  import { computed, ref } from 'vue';
  import { fetchGetInstitutions } from '@/api/appoint';
  import { fetchSendAdminFeedBack, fetchSendHospitalFeedBack, fetchUploadPicture } from '@/api/misc';

  const router = useRouter();

  type FeedbackTarget = '' | 'hospital' | 'admin';

  const showTargetPicker = ref(false);
  const targetColumns = ref([
    { text: '向医院反馈', value: 'hospital' },
    { text: '向区域管理员反馈', value: 'admin' },
  ]);

  const feedbackTarget = ref<FeedbackTarget>('');
  const feedbackTargetLabel = computed(() => {
    if (feedbackTarget.value === 'hospital') {
      return '向医院反馈';
    }
    if (feedbackTarget.value === 'admin') {
      return '向区域管理员反馈';
    }
    return '';
  });

  const isHospitalTarget = computed(() => feedbackTarget.value === 'hospital');

  const showHospitalPicker = ref(false);
  const hospitalColumns = ref<Array<{ text: string; value: string }>>([]);
  const hospitalName = ref('');
  const hospitalId = ref('');

  const onTargetConfirm = (value: any) => {
    const option = value?.selectedOptions?.[0];
    feedbackTarget.value = (option?.value || '') as FeedbackTarget;
    showTargetPicker.value = false;

    if (feedbackTarget.value !== 'hospital') {
      hospitalName.value = '';
      hospitalId.value = '';
    }
  };

  const isHospitalType = (type: unknown) => {
    const text = String(type || '').toLowerCase();
    return text.includes('医院') || text.includes('鍖婚櫌') || text.includes('hospital');
  };

  const currentPage = ref(1);
  const pageSize = ref(100);
  const finished = ref(false);

  const loadHospitals = async (pageNum = 1) => {
    if (hospitalColumns.value.length > 0 && pageNum === 1) {
      return;
    }

    const res = await fetchGetInstitutions({ pageNum, pageSize: pageSize.value, type: '医院' });
    const list = Array.isArray(res?.records) ? res.records : Array.isArray(res) ? res : [];
    if (pageNum === 1) {
      hospitalColumns.value = list.map((item: API.Misc.institution) => ({
        text: item.name,
        value: item.id,
      }));
    } else {
      const loadMoreIndex = hospitalColumns.value.findIndex((col) => col.value === 'load_more');
      if (loadMoreIndex !== -1) {
        hospitalColumns.value.splice(loadMoreIndex, 1);
      }
      hospitalColumns.value.push(...list.map((item: API.Misc.institution) => ({
        text: item.name,
        value: item.id,
      })));
    }

    const totalPages = typeof res.pages === 'number' ? res.pages : res.total && pageSize.value ? Math.ceil(res.total / pageSize.value) : pageNum;
    if (pageNum < totalPages) {
      finished.value = false;
      currentPage.value = pageNum + 1;
      if (!hospitalColumns.value.some((col) => col.value === 'load_more')) {
        hospitalColumns.value.push({ text: '加载更多...', value: 'load_more' });
      }
    } else {
      finished.value = true;
      const loadMoreIndex = hospitalColumns.value.findIndex((col) => col.value === 'load_more');
      if (loadMoreIndex !== -1) {
        hospitalColumns.value.splice(loadMoreIndex, 1);
      }
    }
  };

  const openHospitalPicker = async () => {
    await loadHospitals();
    if (!hospitalColumns.value.length) {
      showToast('暂无可选医院');
      return;
    }
    showHospitalPicker.value = true;
  };

  const onHospitalConfirm = async (value: any) => {
    const option = value?.selectedOptions?.[0];
    if (!option) return;

    if (option.value === 'load_more') {
      await loadHospitals(currentPage.value);
      showHospitalPicker.value = true;
      return;
    }

    hospitalName.value = option.text || '';
    hospitalId.value = option.value || '';
    showHospitalPicker.value = false;
  };

  const feedbackForm = ref({
    title: '',
    content: '',
  });

  const fileInputRef = ref<HTMLInputElement | null>(null);
  const uploadedImages = ref<{ file: File; previewUrl: string }[]>([]);
  const isLoading = ref(false);

  const isFormValid = computed(() => {
    if (feedbackTarget.value === '') {
      return false;
    }

    if (feedbackTarget.value === 'hospital' && !hospitalId.value) {
      return false;
    }

    return feedbackForm.value.title.trim().length > 0;
  });

  const handleFileUpload = (e: Event) => {
    const files = (e.target as HTMLInputElement).files;
    if (!files || isLoading.value) return;

    Array.from(files)
      .slice(0, 10 - uploadedImages.value.length)
      .forEach((file) => {
        uploadedImages.value.push({ file, previewUrl: URL.createObjectURL(file) });
      });

    (e.target as HTMLInputElement).value = '';
  };

  const removeImage = (index: number) => {
    if (isLoading.value) return;
    URL.revokeObjectURL(uploadedImages.value[index]!.previewUrl);
    uploadedImages.value.splice(index, 1);
  };

  const normalizeUploadedImages = (res: unknown): string[] => {
    const source = Array.isArray(res) ? res : Array.isArray((res as any)?.records) ? (res as any).records : [];

    return source
      .map((item: unknown) => {
        if (typeof item === 'string' && item.trim()) {
          return item;
        }

        if (item && typeof item === 'object') {
          const obj = item as Record<string, unknown>;
          const urlCandidates = [obj.url, obj.imageUrl, obj.fileUrl, obj.path];
          const hit = urlCandidates.find((url) => typeof url === 'string' && url.trim()) as string | undefined;
          if (hit) {
            return hit;
          }
        }

        return '';
      })
      .filter((item: string) => Boolean(item));
  };

  const resetForm = () => {
    feedbackTarget.value = '';
    hospitalName.value = '';
    hospitalId.value = '';
    feedbackForm.value = {
      title: '',
      content: '',
    };

    uploadedImages.value.forEach((img) => URL.revokeObjectURL(img.previewUrl));
    uploadedImages.value = [];
  };

  const submitFeedback = async () => {
    if (!isFormValid.value || isLoading.value) return;

    isLoading.value = true;

    try {
      let images: string[] = [];
      if (uploadedImages.value.length) {
        const uploadRes = await fetchUploadPicture(uploadedImages.value.map((item) => item.file));
        images = normalizeUploadedImages(uploadRes);
      }

      const payload: API.Misc.feedbackRequest = {
        title: feedbackForm.value.title.trim(),
        content: feedbackForm.value.content.trim(),
        images,
      };

      if (feedbackTarget.value === 'hospital') {
        await fetchSendHospitalFeedBack(hospitalId.value, payload);
      } else {
        await fetchSendAdminFeedBack(payload);
      }

      showToast('反馈提交成功');
      resetForm();
      router.back();
    } finally {
      isLoading.value = false;
    }
  };
</script>
