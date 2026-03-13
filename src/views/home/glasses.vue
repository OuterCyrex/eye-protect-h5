<template>
  <div class="bg-gray-50 h-full p-2">
    <div class="bg-white rounded-lg p-4 mb-4 shadow-sm border border-gray-100" v-if="prescriptionData">
      <div class="text-sm font-semibold text-gray-800 mb-3 flex items-center">
        <span class="w-1.5 h-1.5 bg-green-500 rounded-full mr-2"></span>
        配镜信息
      </div>
      <div class="grid grid-cols-2 gap-3 text-sm mb-4">
        <div class="flex flex-col gap-1">
          <div class="text-xs text-gray-500">患者ID</div>
          <div class="text-gray-800 font-medium">{{ prescriptionData.patientId || '暂无' }}</div>
        </div>
        <div class="flex flex-col gap-1">
          <div class="text-xs text-gray-500">机构ID</div>
          <div class="text-gray-800">{{ prescriptionData.institutionId || '暂无' }}</div>
        </div>
        <div class="flex flex-col gap-1">
          <div class="text-xs text-gray-500">配镜日期</div>
          <div class="text-gray-800">{{ formatDate(prescriptionData.prescriptionDate) }}</div>
        </div>
        <div class="flex flex-col gap-1">
          <div class="text-xs text-gray-500">总价</div>
          <div class="text-gray-800 font-medium">¥{{ prescriptionData.totalPrice || 0 }}</div>
        </div>
        <div class="flex flex-col gap-1">
          <div class="text-xs text-gray-500">产品名称</div>
          <div class="text-gray-800">{{ prescriptionData.productName || '暂无' }}</div>
        </div>
        <div class="flex flex-col gap-1">
          <div class="text-xs text-gray-500">数量</div>
          <div class="text-gray-800">{{ prescriptionData.quantity || 0 }}副</div>
        </div>
        <div class="flex flex-col gap-1">
          <div class="text-xs text-gray-500">镜架型号</div>
          <div class="text-gray-800">{{ prescriptionData.frameModel || '暂无' }}</div>
        </div>
        <div class="flex flex-col gap-1">
          <div class="text-xs text-gray-500">镜片型号</div>
          <div class="text-gray-800">{{ prescriptionData.lensModel || '暂无' }}</div>
        </div>
        <div class="flex flex-col gap-1 col-span-2">
          <div class="text-xs text-gray-500">镜片类型</div>
          <div class="text-gray-800">{{ prescriptionData.lensType || '暂无' }}</div>
        </div>
        <div class="flex flex-col gap-1 col-span-2">
          <div class="text-xs text-gray-500">备注</div>
          <div class="text-gray-800 text-xs leading-relaxed">{{ prescriptionData.remarks || '暂无' }}</div>
        </div>
      </div>

      <div class="border-t border-gray-100 pt-4 mt-2">
        <div class="text-xs font-semibold text-gray-700 mb-3">验光数据</div>

        <div class="grid grid-cols-2 gap-4 text-sm">
          <div class="bg-gray-50 p-3 rounded-lg border border-gray-100">
            <div class="text-xs text-gray-500 mb-2">右眼</div>
            <div class="space-y-2">
              <div class="flex justify-between">
                <span class="text-xs text-gray-500">球镜(SPH)</span>
                <span class="text-gray-800">{{ prescriptionData.rightSphere || 0 }} D</span>
              </div>
              <div class="flex justify-between">
                <span class="text-xs text-gray-500">柱镜(CYL)</span>
                <span class="text-gray-800">{{ prescriptionData.rightCylinder || 0 }} D</span>
              </div>
              <div class="flex justify-between">
                <span class="text-xs text-gray-500">轴位(AXIS)</span>
                <span class="text-gray-800">{{ prescriptionData.rightAxis || 0 }}°</span>
              </div>
              <div class="flex justify-between">
                <span class="text-xs text-gray-500">矫正视力</span>
                <span class="text-gray-800">{{ prescriptionData.rightVisualAcuity || '暂无' }}</span>
              </div>
              <div class="flex justify-between">
                <span class="text-xs text-gray-500">加光(ADD)</span>
                <span class="text-gray-800">{{ prescriptionData.rightAdd || 0 }} D</span>
              </div>
            </div>
          </div>

          <div class="bg-gray-50 p-3 rounded-lg border border-gray-100">
            <div class="text-xs text-gray-500 mb-2">左眼</div>
            <div class="space-y-2">
              <div class="flex justify-between">
                <span class="text-xs text-gray-500">球镜(SPH)</span>
                <span class="text-gray-800">{{ prescriptionData.leftSphere || 0 }} D</span>
              </div>
              <div class="flex justify-between">
                <span class="text-xs text-gray-500">柱镜(CYL)</span>
                <span class="text-gray-800">{{ prescriptionData.leftCylinder || 0 }} D</span>
              </div>
              <div class="flex justify-between">
                <span class="text-xs text-gray-500">轴位(AXIS)</span>
                <span class="text-gray-800">{{ prescriptionData.leftAxis || 0 }}°</span>
              </div>
              <div class="flex justify-between">
                <span class="text-xs text-gray-500">矫正视力</span>
                <span class="text-gray-800">{{ prescriptionData.leftVisualAcuity || '暂无' }}</span>
              </div>
              <div class="flex justify-between">
                <span class="text-xs text-gray-500">加光(ADD)</span>
                <span class="text-gray-800">{{ prescriptionData.leftAdd || 0 }} D</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="mt-4 pt-3 border-t border-gray-100 flex justify-end text-xs text-gray-500">
        <div>更新时间：{{ formatDate(prescriptionData.updatedAt) }}</div>
      </div>
    </div>

    <nut-empty v-if="!prescriptionData" description="目前暂无配镜信息"></nut-empty>
    <LoadLay v-model="loading" />
  </div>
</template>

<script lang="ts" setup>
  import { fetchGetCurrentGlasses } from '@/api/intervention';
  import { useUserStore } from '@/store/modules/user';
  import { ref } from 'vue';
  import LoadLay from '@/templates/LoadLay.vue';

  const userStore = useUserStore();
  const loading = ref<boolean>(false);

  const formatDate = (dateStr: string) => {
    if (!dateStr || dateStr === '') return '暂无';
    return dateStr.includes('T') ? dateStr.split('T')[0] : dateStr;
  };

  const prescriptionData = ref<API.Intervene.glassInfo | null>(null);

  onMounted(async () => {
    loading.value = true;
    prescriptionData.value = await fetchGetCurrentGlasses(userStore.getStudent.patientId);
    loading.value = false;
  });
</script>
