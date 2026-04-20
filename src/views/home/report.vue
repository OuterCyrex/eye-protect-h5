<template>
  <div class="h-full bg-gray-50">
    <div class="space-y-4">
      <section class="overflow-hidden rounded-lg border bg-white">
        <div class="border-b px-4 py-3 text-sm font-semibold bg-slate-100">患者基本信息</div>
        <table class="min-w-full text-sm">
          <tbody>
            <tr v-for="item in basicInfoRows" :key="item.label">
              <td class="w-32 border px-2 py-1 bg-slate-50 text-gray-500">{{ item.label }}</td>
              <td class="border px-2 py-1">{{ item.value }}</td>
            </tr>
          </tbody>
        </table>
      </section>

      <section class="overflow-hidden rounded-lg border bg-white">
        <div class="border-b px-4 py-3 text-sm font-semibold bg-slate-100">防控措施</div>
        <div class="p-4 text-sm">{{ displayText(reportData.interventionMeasures) }}</div>
      </section>

      <section class="overflow-hidden rounded-lg border bg-white">
        <div class="border-b px-4 py-3 text-sm font-semibold bg-slate-100">建档信息</div>
        <table class="min-w-full text-sm">
          <tbody>
            <tr v-for="item in archiveRows" :key="item.label">
              <td class="w-36 border px-2 py-1 bg-slate-50 text-gray-500">{{ item.label }}</td>
              <td class="border px-2 py-1">{{ item.value }}</td>
            </tr>
          </tbody>
        </table>
      </section>

      <section class="overflow-hidden rounded-lg border bg-white">
        <div class="border-b px-4 py-3 text-sm font-semibold bg-slate-100">眼轴记录</div>
        <div v-if="chartRows.length" class="overflow-x-auto">
          <table class="min-w-full text-sm">
            <thead>
              <tr>
                <th class="border px-2 py-1">日期</th>
                <th class="border px-2 py-1">右眼</th>
                <th class="border px-2 py-1">左眼</th>
                <th class="border px-2 py-1">右变化</th>
                <th class="border px-2 py-1">左变化</th>
                <th class="border px-2 py-1">备注</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="item in chartRows" :key="item.id">
                <td class="whitespace-nowrap border px-2 py-3">{{ formatDate(item.recordDate) }}</td>
                <td class="whitespace-nowrap border px-2 py-3">{{ formatNumber(item.odAxialLength, 'mm') }}</td>
                <td class="whitespace-nowrap border px-2 py-3">{{ formatNumber(item.osAxialLength, 'mm') }}</td>
                <td class="whitespace-nowrap border px-2 py-3">{{ formatNumber(item.odAxialChange, 'mm') }}</td>
                <td class="whitespace-nowrap border px-2 py-3">{{ formatNumber(item.osAxialChange, 'mm') }}</td>
                <td class="whitespace-nowrap border px-2 py-3">{{ displayText(item.details) }}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div v-else class="p-4 text-sm text-gray-500">暂无数据</div>
      </section>

      <var-paper class="p-4">
        <div class="mb-2 font-semibold">眼轴趋势图</div>
        <axiosChart :data="axiosData" />
      </var-paper>

      <section class="overflow-hidden rounded-lg border bg-white">
        <div class="border-b px-4 py-3 text-sm font-semibold bg-slate-100">视力检查</div>
        <div v-if="reportData.archiveDetail.visionExaminations" class="p-3">
          <table class="min-w-full text-sm mb-3">
            <tbody>
              <tr v-for="row in visionExamSummaryRows" :key="row.label">
                <td class="border px-2 py-1 bg-slate-50">{{ row.label }}</td>
                <td class="border px-2 py-1">{{ row.value }}</td>
              </tr>
            </tbody>
          </table>
          <table class="min-w-full text-sm">
            <tbody>
              <tr v-for="row in visionExamRows" :key="row.label">
                <td class="border px-2 py-1 bg-slate-50">{{ row.label }}</td>
                <td class="border px-2 py-1">{{ row.right }}</td>
                <td class="border px-2 py-1">{{ row.left }}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div v-else class="p-4 text-sm text-gray-500">暂无记录</div>
      </section>

      <section class="overflow-hidden rounded-lg border bg-white">
        <div class="border-b px-4 py-3 text-sm font-semibold bg-slate-100">视功能检查</div>
        <van-tabs v-if="reportData.archiveDetail?.visualFunctionTests?.length" v-model:active="activeFunctionIndex" shrink>
          <van-tab v-for="(item, index) in reportData.archiveDetail.visualFunctionTests" :key="index" :title="formatDate(item.examDate)">
            <div class="p-3">
              <table class="min-w-full text-sm">
                <tbody>
                  <tr v-for="row in visualFunctionRows" :key="row.label">
                    <td class="border px-2 py-1 bg-slate-50">{{ row.label }}</td>
                    <td class="border px-2 py-1">{{ row.value }}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </van-tab>
        </van-tabs>
        <div v-else class="p-4 text-sm text-gray-500">暂无记录</div>
      </section>

      <section class="overflow-hidden rounded-lg border bg-white">
        <div class="border-b px-4 py-3 text-sm font-semibold bg-slate-100">随访记录</div>
        <van-tabs v-if="reportData.archiveDetail?.followupRecords?.length" v-model:active="activeFollowIndex" shrink>
          <van-tab v-for="(item, index) in reportData.archiveDetail.followupRecords" :key="index" :title="formatDate(item.recordDate)">
            <div class="p-3">
              <table class="min-w-full text-sm mb-3">
                <tbody>
                  <tr v-for="row in followupSummaryRows" :key="row.label">
                    <td class="border px-2 py-1 bg-slate-50">{{ row.label }}</td>
                    <td class="border px-2 py-1">{{ row.value }}</td>
                  </tr>
                </tbody></table
              >
              <table class="min-w-full text-sm">
                <tbody>
                  <tr v-for="row in followupRows" :key="row.label">
                    <td class="border px-2 py-1 bg-slate-50">{{ row.label }}</td>
                    <td class="border px-2 py-1">{{ row.right }}</td>
                    <td class="border px-2 py-1">{{ row.left }}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </van-tab>
        </van-tabs>
        <div v-else class="p-4 text-sm text-gray-500">暂无记录</div>
      </section>

      <section class="overflow-hidden rounded-lg border bg-white">
        <div class="border-b px-4 py-3 text-sm font-semibold bg-slate-100">医生分析</div>
        <div class="p-4 text-sm">{{ displayText(reportData.analysis) }}</div>
      </section>
    </div>

    <LoadLay v-model="loading" />
  </div>
</template>

<script lang="ts" setup>
  import { computed, ref } from 'vue';
  import { fetchGetLastReport } from '@/api/intervention';
  import { fetchGetAxiosChart, fetchGetGroupInfo } from '@/api/misc';
  import axiosChart from '@/templates/chart/axiosChart.vue';
  import LoadLay from '@/templates/LoadLay.vue';
  import { useUserStore } from '@/store/modules/user';

  const loading = ref(false);
  const userStore = useUserStore();
  const axiosData = ref<Array<API.Misc.AxiosChartUnit>>([]);
  const activeFunctionIndex = ref<number>(0);
  const activeFollowIndex = ref<number>(0);

  const groupInfo = ref<API.Misc.GroupInfo>({
    patientId: '',
    researchGroupIds: [],
    researchGroupNames: [],
  });

  const reportData = ref<API.Intervene.report>({
    patientId: '',
    patientName: '',
    gender: '',
    age: 0,
    birthDate: '',
    phone: '',
    school: '',
    clazz: '',
    interventionMeasures: '',
    chartPoints: [],
    archiveDetail: {
      id: '',
      patientId: '',
      patientName: '',
      gender: '',
      age: 0,
      birthDate: '',
      parentPhone: '',
      schoolName: '',
      className: '',
      archiveNumber: '',
      lastCheckupDate: '',
      nextFollowupDate: '',
      fatherMyopia: null as any,
      fatherRefraction: '',
      motherMyopia: null as any,
      motherRefraction: '',
      visitReason: '',
      visitSource: '',
      previousCheckupDate: '',
      glassesWearingHabits: '',
      lensType: '',
      comfortLevel: '',
      oldGlassesDeformation: '',
      replacementCycle: '',
      eyeHabits: '',
      dailyNearWorkHours: 0,
      readingWritingHours: 0,
      bookDistance: 0,
      screenTimeHours: 0,
      screenDistance: 0,
      screenHeight: '',
      penHoldingStyle: '',
      dailyOutdoorHours: 0,
      sleepHours: 0,
      familyHistory: '',
      maternalIllnessDuringPregnancy: null as any,
      medicalHistory: '',
      eyeDiseaseHistory: '',
      isPrematureBirth: null as any,
      birthWeight: 0,
      eyeSurgeryHistory: '',
      refractiveSurgeryHistory: '',
      allergyHistory: '',
      createdAt: '',
      updatedAt: '',
      visionExaminations: {
        id: '',
        examinationDate: '',
        examType: '',
        diagnosis: '',
        recommendations: '',
        examiner: '',
        diagnosisSuggestions: '',
        remarks: '',
        axisRatioCalculation: 0,
        leftEye: {
          uncorrectedDistant: 0,
          uncorrectedDistantSign: 0,
          uncorrectedNear: 0,
          uncorrectedNearSign: 0,
          correctedVision: 0,
          correctedVisionSign: 0,
          previousPrescriptionS: '',
          previousPrescriptionC: '',
          previousPrescriptionA: '',
          pd: 0,
          eyePressure: 0,
          axialLength: 0,
          autoRefractionS: '',
          autoRefractionC: '',
          autoRefractionA: '',
          subjectiveRefractionS: '',
          subjectiveRefractionC: '',
          subjectiveRefractionA: '',
          subjectiveRefractionVa: '',
          dilatedAutoRefractionS: '',
          dilatedAutoRefractionC: '',
          dilatedAutoRefractionA: '',
          dilatedSubjectiveRefractionS: '',
          dilatedSubjectiveRefractionC: '',
          dilatedSubjectiveRefractionA: '',
          dilatedSubjectiveRefractionVa: '',
          slitLampExam: '',
          fundusExam: '',
          keratometryFlatK: '',
          keratometrySteepK: '',
          keratometryCornealAstigmatism: '',
          prescriptionS: '',
          prescriptionC: '',
          prescriptionA: '',
          pupilHeight: '',
        },
        rightEye: {
          uncorrectedDistant: 0,
          uncorrectedDistantSign: 0,
          uncorrectedNear: 0,
          uncorrectedNearSign: 0,
          correctedVision: 0,
          correctedVisionSign: 0,
          previousPrescriptionS: '',
          previousPrescriptionC: '',
          previousPrescriptionA: '',
          pd: 0,
          eyePressure: 0,
          axialLength: 0,
          autoRefractionS: '',
          autoRefractionC: '',
          autoRefractionA: '',
          subjectiveRefractionS: '',
          subjectiveRefractionC: '',
          subjectiveRefractionA: '',
          subjectiveRefractionVa: '',
          dilatedAutoRefractionS: '',
          dilatedAutoRefractionC: '',
          dilatedAutoRefractionA: '',
          dilatedSubjectiveRefractionS: '',
          dilatedSubjectiveRefractionC: '',
          dilatedSubjectiveRefractionA: '',
          dilatedSubjectiveRefractionVa: '',
          slitLampExam: '',
          fundusExam: '',
          keratometryFlatK: '',
          keratometrySteepK: '',
          keratometryCornealAstigmatism: '',
          prescriptionS: '',
          prescriptionC: '',
          prescriptionA: '',
          pupilHeight: '',
        },
        createdAt: '',
      },
      visualFunctionTests: [],
      followupRecords: [],
    },
    analysis: '',
  });

  const displayText = (value?: string | null) => {
    if (typeof value !== 'string') return '暂无';
    const text = value.trim();
    return text ? text : '暂无';
  };

  const formatDate = (value?: string | null) => {
    if (!value) return '暂无';
    return value.includes('T') ? value.split('T')[0] : value;
  };

  const formatNumber = (value?: number | null, suffix = '') => {
    return typeof value === 'number' && Number.isFinite(value) && value !== 0 ? `${value}${suffix}` : '暂无';
  };

  const formatBoolean = (value?: boolean | null) => {
    return typeof value === 'boolean' ? (value ? '是' : '否') : '暂无';
  };

  const formatEyeField = (value: unknown) => {
    if (value === null || value === undefined || value === '') return '暂无';
    return String(value);
  };

  const formatSCA = (eye: any, prefix: string) => {
    const s = formatEyeField(eye?.[`${prefix}S`]);
    const c = formatEyeField(eye?.[`${prefix}C`]);
    const a = formatEyeField(eye?.[`${prefix}A`]);
    return `${s}/${c}*${a}`;
  };

  const formatSCAWithVision = (eye: any, prefix: string, fallbackVision?: unknown) => {
    const vision = formatEyeField(eye?.[`${prefix}Va`] ?? fallbackVision);
    return `${formatSCA(eye, prefix)}→${vision}`;
  };

  const latestVisionExam = computed(() => reportData.value.archiveDetail?.visionExaminations);
  const latestVisualFunctionTest = computed(() => {
    const list = reportData.value.archiveDetail?.visualFunctionTests || [];
    return list[activeFunctionIndex.value];
  });

  const latestFollowupRecord = computed(() => {
    const list = reportData.value.archiveDetail?.followupRecords || [];
    return list[activeFollowIndex.value];
  });
  const chartRows = computed(() => reportData.value.chartPoints || []);

  const basicInfoRows = computed(() => [
    { label: '患者姓名', value: displayText(reportData.value.patientName) },
    { label: '性别', value: displayText(reportData.value.gender) },
    { label: '年龄', value: formatNumber(reportData.value.age, '岁') },
    { label: '出生日期', value: formatDate(reportData.value.birthDate) },
    { label: '联系电话', value: displayText(reportData.value.phone) },
    { label: '学校班级', value: `${displayText(reportData.value.school)} ${reportData.value.clazz || ''}`.trim() || '暂无' },
    { label: '分组', value: `${displayText(groupInfo.value.researchGroupNames.join('、'))}` || '暂无' },
  ]);

  const archiveRows = computed(() => {
    const archive = reportData.value.archiveDetail;
    return [
      { label: '档案编号', value: displayText(archive.archiveNumber) },
      { label: '学校', value: displayText(archive.schoolName) },
      { label: '班级', value: displayText(archive.className) },
      { label: '家长电话', value: displayText(archive.parentPhone) },
      { label: '上次检查', value: formatDate(archive.lastCheckupDate) },
      { label: '下次随访', value: formatDate(archive.nextFollowupDate) },
      { label: '就诊原因', value: displayText(archive.visitReason) },
      { label: '就诊来源', value: displayText(archive.visitSource) },
      { label: '上次检查日期', value: formatDate(archive.previousCheckupDate) },
      { label: '戴镜习惯', value: displayText(archive.glassesWearingHabits) },
      { label: '镜片类型', value: displayText(archive.lensType) },
      { label: '舒适度', value: displayText(archive.comfortLevel) },
      { label: '旧镜变形', value: displayText(archive.oldGlassesDeformation) },
      { label: '更换周期', value: displayText(archive.replacementCycle) },
      { label: '用眼习惯', value: displayText(archive.eyeHabits) },
      { label: '日均近距离用眼', value: formatNumber(archive.dailyNearWorkHours, '小时') },
      { label: '读写时长', value: formatNumber(archive.readingWritingHours, '小时') },
      { label: '读写距离', value: formatNumber(archive.bookDistance, 'cm') },
      { label: '屏幕时长', value: formatNumber(archive.screenTimeHours, '小时') },
      { label: '屏幕距离', value: formatNumber(archive.screenDistance, 'cm') },
      { label: '屏幕高度', value: displayText(archive.screenHeight) },
      { label: '握笔姿势', value: displayText(archive.penHoldingStyle) },
      { label: '日均户外活动', value: formatNumber(archive.dailyOutdoorHours, '小时') },
      { label: '睡眠时长', value: formatNumber(archive.sleepHours, '小时') },
      { label: '父亲近视', value: formatBoolean(archive.fatherMyopia) },
      { label: '父亲屈光', value: displayText(archive.fatherRefraction) },
      { label: '母亲近视', value: formatBoolean(archive.motherMyopia) },
      { label: '母亲屈光', value: displayText(archive.motherRefraction) },
      { label: '家族史', value: displayText(archive.familyHistory) },
      { label: '孕期患病', value: formatBoolean(archive.maternalIllnessDuringPregnancy) },
      { label: '病史', value: displayText(archive.medicalHistory) },
      { label: '眼病史', value: displayText(archive.eyeDiseaseHistory) },
      { label: '早产', value: formatBoolean(archive.isPrematureBirth) },
      { label: '出生体重', value: formatNumber(archive.birthWeight, 'kg') },
      { label: '眼科手术史', value: displayText(archive.eyeSurgeryHistory) },
      { label: '屈光手术史', value: displayText(archive.refractiveSurgeryHistory) },
      { label: '过敏史', value: displayText(archive.allergyHistory) },
    ];
  });

  const visionExamRows = computed(() => {
    const exam = latestVisionExam.value;
    if (!exam) return [];
    return [
      { label: '裸眼远视力', right: formatNumber(exam.rightEye?.uncorrectedDistant), left: formatNumber(exam.leftEye?.uncorrectedDistant) },
      { label: '裸眼近视力', right: formatNumber(exam.rightEye?.uncorrectedNear), left: formatNumber(exam.leftEye?.uncorrectedNear) },
      { label: '矫正视力', right: formatNumber(exam.rightEye?.correctedVision), left: formatNumber(exam.leftEye?.correctedVision) },
      { label: '眼压', right: formatNumber(exam.rightEye?.eyePressure), left: formatNumber(exam.leftEye?.eyePressure) },
      { label: '眼轴长度', right: formatNumber(exam.rightEye?.axialLength, 'mm'), left: formatNumber(exam.leftEye?.axialLength, 'mm') },
      { label: '电脑验光', right: formatSCA(exam.rightEye, 'autoRefraction'), left: formatSCA(exam.leftEye, 'autoRefraction') },
      {
        label: '主觉验光',
        right: formatSCAWithVision(exam.rightEye, 'subjectiveRefraction', exam.rightEye?.correctedVision),
        left: formatSCAWithVision(exam.leftEye, 'subjectiveRefraction', exam.leftEye?.correctedVision),
      },
      {
        label: '最终处方',
        right: formatSCAWithVision(exam.rightEye, 'prescription', exam.rightEye?.subjectiveRefractionVa ?? exam.rightEye?.correctedVision),
        left: formatSCAWithVision(exam.leftEye, 'prescription', exam.leftEye?.subjectiveRefractionVa ?? exam.leftEye?.correctedVision),
      },
    ];
  });

  const visualFunctionRows = computed(() => {
    const item = latestVisualFunctionTest.value;
    if (!item) return [];
    return [
      { label: '检查日期', value: formatDate(item.examDate) },
      { label: 'Worth 4 Dot 远', value: displayText(item.worth4DotDistant) },
      { label: 'Worth 4 Dot 近', value: displayText(item.worth4DotNear) },
      { label: '远隐斜', value: displayText(item.distancePhoria) },
      { label: '近隐斜', value: displayText(item.nearPhoria) },
      { label: 'NPC', value: displayText(item.npc) },
      { label: '远 BI', value: displayText(item.distanceBi) },
      { label: '远 BO', value: displayText(item.distanceBo) },
      { label: '近 BI', value: displayText(item.nearBi) },
      { label: '近 BO', value: displayText(item.nearBo) },
      { label: '+1.00D', value: displayText(item.addPlus100) },
      { label: '-1.00D', value: displayText(item.addMinus100) },
      { label: 'AC/A 比率', value: formatNumber(item.acaRatio) },
      { label: 'NRA', value: formatNumber(item.nra) },
      { label: 'BCC', value: formatNumber(item.bcc) },
      { label: 'PRA', value: formatNumber(item.pra) },
      { label: 'OD 调节幅度', value: formatNumber(item.odAccommodationAmplitude) },
      { label: 'OS 调节幅度', value: formatNumber(item.osAccommodationAmplitude) },
      { label: 'OU 调节幅度', value: formatNumber(item.ouAccommodationAmplitude) },
      { label: 'OD 调节灵活度', value: formatNumber(item.odAccommodationFacility) },
      { label: 'OS 调节灵活度', value: formatNumber(item.osAccommodationFacility) },
      { label: 'OU 调节灵活度', value: formatNumber(item.ouAccommodationFacility) },
      { label: '视觉功能诊断', value: displayText(item.visualFunctionDiagnosis) },
    ];
  });

  const visionExamSummaryRows = computed(() => {
    const exam = latestVisionExam.value;
    if (!exam) return [];
    return [
      { label: '诊断', value: displayText(exam.diagnosis) },
      { label: '建议', value: displayText(exam.recommendations) },
      { label: '诊断建议', value: displayText(exam.diagnosisSuggestions) },
      { label: '备注', value: displayText(exam.remarks) },
    ];
  });

  const followupSummaryRows = computed(() => {
    const item = latestFollowupRecord.value;
    if (!item) return [];
    return [
      { label: '记录日期', value: formatDate(item.recordDate) },
      { label: '主诉', value: displayText(item.patientComplaints) },
      { label: '优势眼-右眼', value: formatBoolean(item.odDominantEye) },
      { label: '优势眼-左眼', value: formatBoolean(item.osDominantEye) },
      { label: '旧眼镜品牌', value: displayText(item.oldGlassesBrand) },
      { label: '镜架镜片检查', value: displayText(item.frameLensInspection) },
      { label: '视功能', value: displayText(item.visualFunction) },
      { label: 'Worth 4 Dot', value: displayText(item.worth4Dot) },
      { label: '眼位', value: displayText(item.eyePosition) },
      { label: 'NPC', value: displayText(item.npc) },
    ];
  });

  const followupRows = computed(() => {
    const exam = latestFollowupRecord.value;
    if (!exam) return [];

    return [
      { label: '裸眼远视力', right: formatNumber(exam.rightEye?.uncorrectedDistant), left: formatNumber(exam.leftEye?.uncorrectedDistant) },
      { label: '裸眼近视力', right: formatNumber(exam.rightEye?.uncorrectedNear), left: formatNumber(exam.leftEye?.uncorrectedNear) },
      { label: '矫正视力', right: formatNumber(exam.rightEye?.correctedVision), left: formatNumber(exam.leftEye?.correctedVision) },

      { label: '旧镜 S', right: displayText(exam.rightEye?.previousPrescriptionS), left: displayText(exam.leftEye?.previousPrescriptionS) },
      { label: '旧镜 C', right: displayText(exam.rightEye?.previousPrescriptionC), left: displayText(exam.leftEye?.previousPrescriptionC) },
      { label: '旧镜 A', right: displayText(exam.rightEye?.previousPrescriptionA), left: displayText(exam.leftEye?.previousPrescriptionA) },

      { label: '眼压', right: formatNumber(exam.rightEye?.eyePressure), left: formatNumber(exam.leftEye?.eyePressure) },
      { label: '眼轴长度', right: formatNumber(exam.rightEye?.axialLength, 'mm'), left: formatNumber(exam.leftEye?.axialLength, 'mm') },

      { label: '电脑验光', right: formatSCA(exam.rightEye, 'autoRefraction'), left: formatSCA(exam.leftEye, 'autoRefraction') },
      {
        label: '主觉验光',
        right: formatSCAWithVision(exam.rightEye, 'subjectiveRefraction', exam.rightEye?.correctedVision),
        left: formatSCAWithVision(exam.leftEye, 'subjectiveRefraction', exam.leftEye?.correctedVision),
      },
      {
        label: '散瞳电脑',
        right: formatSCA(exam.rightEye, 'dilatedAutoRefraction'),
        left: formatSCA(exam.leftEye, 'dilatedAutoRefraction'),
      },
      {
        label: '散瞳主觉',
        right: formatSCAWithVision(exam.rightEye, 'dilatedSubjectiveRefraction', exam.rightEye?.correctedVision),
        left: formatSCAWithVision(exam.leftEye, 'dilatedSubjectiveRefraction', exam.leftEye?.correctedVision),
      },

      { label: '眼底检查', right: displayText(exam.rightEye?.fundusExam), left: displayText(exam.leftEye?.fundusExam) },
      { label: '裂隙灯检查', right: displayText(exam.rightEye?.slitLampExam), left: displayText(exam.leftEye?.slitLampExam) },
      { label: '角膜曲率', right: displayText(exam.rightEye?.keratometry), left: displayText(exam.leftEye?.keratometry) },

      { label: '远立体视', right: displayText(exam.rightEye?.distantStereoVision), left: displayText(exam.leftEye?.distantStereoVision) },
      { label: '近立体视', right: displayText(exam.rightEye?.nearStereoVision), left: displayText(exam.leftEye?.nearStereoVision) },
      { label: '遮盖试验', right: displayText(exam.rightEye?.coverTest), left: displayText(exam.leftEye?.coverTest) },

      { label: '远矫正度数', right: formatNumber(exam.rightEye?.correctDegreeD), left: formatNumber(exam.leftEye?.correctDegreeD) },
      { label: '近矫正度数', right: formatNumber(exam.rightEye?.correctDegreeN), left: formatNumber(exam.leftEye?.correctDegreeN) },
    ];
  });

  onMounted(async () => {
    loading.value = true;
    try {
      const patientId = userStore.getStudent?.patientId;
      if (!patientId) {
        showToast('暂无学生信息');
        return;
      }

      const [chartResult, reportResult, groupResult] = await Promise.allSettled([
        fetchGetAxiosChart(patientId),
        fetchGetLastReport(patientId),
        fetchGetGroupInfo(patientId),
      ]);

      if (chartResult.status === 'fulfilled') {
        axiosData.value = chartResult.value;
      }

      if (reportResult.status === 'fulfilled') {
        reportData.value = reportResult.value;
      }

      if (groupResult.status === 'fulfilled') {
        groupInfo.value = groupResult.value;
      }
    } finally {
      loading.value = false;
    }
  });
</script>
