<template>
  <div class="h-full bg-gray-50">
    <div class="space-y-4">
      <section class="overflow-hidden rounded-lg border border-slate-200 bg-white">
        <div class="border-b border-slate-200 bg-slate-100 px-4 py-3 text-sm font-semibold text-slate-700">患者基本信息</div>
        <table class="min-w-full border-collapse text-sm">
          <tbody>
            <tr v-for="item in basicInfoRows" :key="item.label" class="align-top">
              <td class="w-32 border-b border-r border-slate-200 bg-slate-50 px-3 py-2 text-slate-500">{{ item.label }}</td>
              <td class="border-b border-slate-200 px-3 py-2 whitespace-pre-wrap break-all text-slate-800">{{ item.value }}</td>
            </tr>
          </tbody>
        </table>
      </section>

      <section class="overflow-hidden rounded-lg border border-slate-200 bg-white">
        <div class="border-b border-slate-200 bg-slate-100 px-4 py-3 text-sm font-semibold text-slate-700">建档信息</div>
        <table class="min-w-full border-collapse text-sm">
          <tbody>
            <tr v-for="item in archiveRows" :key="item.label" class="align-top">
              <td class="w-36 border-b border-r border-slate-200 bg-slate-50 px-3 py-2 text-slate-500">{{ item.label }}</td>
              <td class="border-b border-slate-200 px-3 py-2 whitespace-pre-wrap break-all text-slate-800">{{ item.value }}</td>
            </tr>
          </tbody>
        </table>
      </section>

      <section class="overflow-hidden rounded-lg border border-slate-200 bg-white">
        <div class="border-b border-slate-200 bg-slate-100 px-4 py-3 text-sm font-semibold text-slate-700">眼轴记录</div>
        <div v-if="chartRows.length" class="overflow-x-auto">
          <table class="min-w-full border-collapse text-sm">
            <thead>
              <tr class="bg-slate-50 text-slate-600">
                <th class="border-b border-r border-slate-200 px-3 py-2 text-left font-medium">日期</th>
                <th class="border-b border-r border-slate-200 px-3 py-2 text-left font-medium">右眼眼轴</th>
                <th class="border-b border-r border-slate-200 px-3 py-2 text-left font-medium">左眼眼轴</th>
                <th class="border-b border-r border-slate-200 px-3 py-2 text-left font-medium">右眼变化</th>
                <th class="border-b border-r border-slate-200 px-3 py-2 text-left font-medium">左眼变化</th>
                <th class="border-b border-slate-200 px-3 py-2 text-left font-medium">备注</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="item in chartRows" :key="item.id" class="text-slate-700">
                <td class="border-b border-r border-slate-200 px-3 py-2 align-top whitespace-nowrap">{{ formatDate(item.recordDate) }}</td>
                <td class="border-b border-r border-slate-200 px-3 py-2 align-top whitespace-nowrap">{{
                  formatNumber(item.odAxialLength, 'mm')
                }}</td>
                <td class="border-b border-r border-slate-200 px-3 py-2 align-top whitespace-nowrap">{{
                  formatNumber(item.osAxialLength, 'mm')
                }}</td>
                <td class="border-b border-r border-slate-200 px-3 py-2 align-top whitespace-nowrap">{{
                  formatNumber(item.odAxialChange, 'mm')
                }}</td>
                <td class="border-b border-r border-slate-200 px-3 py-2 align-top whitespace-nowrap">{{
                  formatNumber(item.osAxialChange, 'mm')
                }}</td>
                <td class="border-b border-slate-200 px-3 py-2 align-top whitespace-pre-wrap break-all">{{ displayText(item.details) }}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div v-else class="px-4 py-6 text-sm text-slate-500">暂无眼轴记录</div>
      </section>

      <var-paper class="p-4 my-2">
        <div class="mb-2 font-semibold">眼轴趋势图</div>
        <axiosChart :data="axiosData" />
      </var-paper>

      <section class="overflow-hidden rounded-lg border border-slate-200 bg-white">
        <div class="border-b border-slate-200 bg-slate-100 px-4 py-3 text-sm font-semibold text-slate-700">最近视力检查</div>
        <div v-if="latestVisionExam" class="space-y-4 p-4">
          <div class="grid grid-cols-1 gap-2 text-sm md:grid-cols-2">
            <div
              ><span class="text-slate-500">检查日期：</span
              ><span class="text-slate-800">{{ formatDate(latestVisionExam.examinationDate) }}</span></div
            >
            <div
              ><span class="text-slate-500">检查类型：</span
              ><span class="text-slate-800">{{ displayText(latestVisionExam.examType) }}</span></div
            >
            <div
              ><span class="text-slate-500">检查医生：</span
              ><span class="text-slate-800">{{ displayText(latestVisionExam.examiner) }}</span></div
            >
            <div
              ><span class="text-slate-500">轴比计算：</span
              ><span class="text-slate-800">{{ formatNumber(latestVisionExam.axisRatioCalculation) }}</span></div
            >
          </div>

          <div class="overflow-x-auto">
            <table class="min-w-full border-collapse text-sm">
              <thead>
                <tr class="bg-slate-50 text-slate-600">
                  <th class="border-b border-r border-slate-200 px-3 py-2 text-left font-medium">项目</th>
                  <th class="border-b border-r border-slate-200 px-3 py-2 text-left font-medium">右眼</th>
                  <th class="border-b border-slate-200 px-3 py-2 text-left font-medium">左眼</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="row in visionExamRows" :key="row.label" class="text-slate-700">
                  <td class="border-b border-r border-slate-200 bg-slate-50 px-3 py-2 align-top whitespace-pre-wrap">{{ row.label }}</td>
                  <td class="border-b border-r border-slate-200 px-3 py-2 align-top whitespace-pre-wrap break-all">{{ row.right }}</td>
                  <td class="border-b border-slate-200 px-3 py-2 align-top whitespace-pre-wrap break-all">{{ row.left }}</td>
                </tr>
              </tbody>
            </table>
          </div>

          <table class="min-w-full border-collapse text-sm">
            <tbody>
              <tr v-for="item in visionExamSummaryRows" :key="item.label" class="align-top">
                <td class="w-32 border-b border-r border-slate-200 bg-slate-50 px-3 py-2 text-slate-500">{{ item.label }}</td>
                <td class="border-b border-slate-200 px-3 py-2 whitespace-pre-wrap break-all text-slate-800">{{ item.value }}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div v-else class="px-4 py-6 text-sm text-slate-500">暂无视力检查记录</div>
      </section>

      <section class="overflow-hidden rounded-lg border border-slate-200 bg-white">
        <div class="border-b border-slate-200 bg-slate-100 px-4 py-3 text-sm font-semibold text-slate-700">最近视觉功能检查</div>
        <table v-if="latestVisualFunctionTest" class="min-w-full border-collapse text-sm">
          <tbody>
            <tr v-for="item in visualFunctionRows" :key="item.label" class="align-top">
              <td class="w-40 border-b border-r border-slate-200 bg-slate-50 px-3 py-2 text-slate-500">{{ item.label }}</td>
              <td class="border-b border-slate-200 px-3 py-2 whitespace-pre-wrap break-all text-slate-800">{{ item.value }}</td>
            </tr>
          </tbody>
        </table>
        <div v-else class="px-4 py-6 text-sm text-slate-500">暂无视觉功能检查记录</div>
      </section>

      <section class="overflow-hidden rounded-lg border border-slate-200 bg-white">
        <div class="border-b border-slate-200 bg-slate-100 px-4 py-3 text-sm font-semibold text-slate-700">最近随访记录</div>
        <div v-if="latestFollowupRecord" class="space-y-4 p-4">
          <table class="min-w-full border-collapse text-sm">
            <tbody>
              <tr v-for="item in followupSummaryRows" :key="item.label" class="align-top">
                <td class="w-36 border-b border-r border-slate-200 bg-slate-50 px-3 py-2 text-slate-500">{{ item.label }}</td>
                <td class="border-b border-slate-200 px-3 py-2 whitespace-pre-wrap break-all text-slate-800">{{ item.value }}</td>
              </tr>
            </tbody>
          </table>

          <div class="overflow-x-auto">
            <table class="min-w-full border-collapse text-sm">
              <thead>
                <tr class="bg-slate-50 text-slate-600">
                  <th class="border-b border-r border-slate-200 px-3 py-2 text-left font-medium">项目</th>
                  <th class="border-b border-r border-slate-200 px-3 py-2 text-left font-medium">右眼</th>
                  <th class="border-b border-slate-200 px-3 py-2 text-left font-medium">左眼</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="row in followupRows" :key="row.label" class="text-slate-700">
                  <td class="border-b border-r border-slate-200 bg-slate-50 px-3 py-2 align-top whitespace-pre-wrap">{{ row.label }}</td>
                  <td class="border-b border-r border-slate-200 px-3 py-2 align-top whitespace-pre-wrap break-all">{{ row.right }}</td>
                  <td class="border-b border-slate-200 px-3 py-2 align-top whitespace-pre-wrap break-all">{{ row.left }}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div v-else class="px-4 py-6 text-sm text-slate-500">暂无随访记录</div>
      </section>

      <section class="overflow-hidden rounded-lg border border-slate-200 bg-white">
        <div class="border-b border-slate-200 bg-slate-100 px-4 py-3 text-sm font-semibold text-slate-700">医生分析</div>
        <div class="px-4 py-4 text-sm leading-7 text-slate-700">{{ displayText(reportData.analysis) }}</div>
      </section>
    </div>

    <LoadLay v-model="loading" />
  </div>
</template>

<script lang="ts" setup>
  import { computed, ref } from 'vue';
  import { fetchGetLastReport } from '@/api/intervention';
  import { fetchGetAxiosChart } from '@/api/misc';
  import axiosChart from '@/templates/chart/axiosChart.vue';
  import LoadLay from '@/templates/LoadLay.vue';
  import { useUserStore } from '@/store/modules/user';

  const loading = ref(false);
  const userStore = useUserStore();
  const axiosData = ref<Array<API.Misc.AxiosChartUnit>>([]);

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

  const latestVisionExam = computed(() => reportData.value.archiveDetail?.visionExaminations);
  const latestVisualFunctionTest = computed(() => reportData.value.archiveDetail?.visualFunctionTests?.[0]);
  const latestFollowupRecord = computed(() => reportData.value.archiveDetail?.followupRecords?.[0]);
  const chartRows = computed(() => reportData.value.chartPoints || []);

  const basicInfoRows = computed(() => [
    { label: '患者姓名', value: displayText(reportData.value.patientName) },
    { label: '性别', value: displayText(reportData.value.gender) },
    { label: '年龄', value: formatNumber(reportData.value.age, '岁') },
    { label: '出生日期', value: formatDate(reportData.value.birthDate) },
    { label: '联系电话', value: displayText(reportData.value.phone) },
    { label: '学校班级', value: `${displayText(reportData.value.school)} ${reportData.value.clazz || ''}`.trim() || '暂无' },
    { label: '防控措施', value: displayText(reportData.value.interventionMeasures) },
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
      { label: '裸眼远视力', right: formatNumber(exam.rightEye.uncorrectedDistant), left: formatNumber(exam.leftEye.uncorrectedDistant) },
      { label: '裸眼近视力', right: formatNumber(exam.rightEye.uncorrectedNear), left: formatNumber(exam.leftEye.uncorrectedNear) },
      { label: '矫正视力', right: formatNumber(exam.rightEye.correctedVision), left: formatNumber(exam.leftEye.correctedVision) },
      { label: '眼压', right: formatNumber(exam.rightEye.eyePressure), left: formatNumber(exam.leftEye.eyePressure) },
      { label: '眼轴长度', right: formatNumber(exam.rightEye.axialLength, 'mm'), left: formatNumber(exam.leftEye.axialLength, 'mm') },
      { label: '自动验光 S', right: displayText(exam.rightEye.autoRefractionS), left: displayText(exam.leftEye.autoRefractionS) },
      { label: '自动验光 C', right: displayText(exam.rightEye.autoRefractionC), left: displayText(exam.leftEye.autoRefractionC) },
      { label: '自动验光 A', right: displayText(exam.rightEye.autoRefractionA), left: displayText(exam.leftEye.autoRefractionA) },
      {
        label: '主觉验光 S',
        right: displayText(exam.rightEye.subjectiveRefractionS),
        left: displayText(exam.leftEye.subjectiveRefractionS),
      },
      {
        label: '主觉验光 C',
        right: displayText(exam.rightEye.subjectiveRefractionC),
        left: displayText(exam.leftEye.subjectiveRefractionC),
      },
      {
        label: '主觉验光 A',
        right: displayText(exam.rightEye.subjectiveRefractionA),
        left: displayText(exam.leftEye.subjectiveRefractionA),
      },
      { label: '最终处方 S', right: displayText(exam.rightEye.prescriptionS), left: displayText(exam.leftEye.prescriptionS) },
      { label: '最终处方 C', right: displayText(exam.rightEye.prescriptionC), left: displayText(exam.leftEye.prescriptionC) },
      { label: '最终处方 A', right: displayText(exam.rightEye.prescriptionA), left: displayText(exam.leftEye.prescriptionA) },
    ];
  });

  const visualFunctionRows = computed(() => {
    const item = latestVisualFunctionTest.value;
    if (!item) return [];
    return [
      { label: '检查日期', value: formatDate(item.examDate) },
      { label: 'Worth 4 Dot 远', value: displayText(item.worth4DotDistant) },
      { label: 'Worth 4 Dot 近', value: displayText(item.worth4DotNear) },
      { label: '远立体视', value: displayText(item.distantStereoVision) },
      { label: '近立体视', value: displayText(item.nearStereoVision) },
      { label: '遮盖试验', value: displayText(item.coverTest) },
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
    const item = latestFollowupRecord.value;
    if (!item) return [];
    return [
      { label: '裸眼远视力', right: formatNumber(item.rightEye.uncorrectedDistant), left: formatNumber(item.leftEye.uncorrectedDistant) },
      { label: '裸眼近视力', right: formatNumber(item.rightEye.uncorrectedNear), left: formatNumber(item.leftEye.uncorrectedNear) },
      { label: '矫正视力', right: formatNumber(item.rightEye.correctedVision), left: formatNumber(item.leftEye.correctedVision) },
      { label: '眼压', right: formatNumber(item.rightEye.eyePressure), left: formatNumber(item.leftEye.eyePressure) },
      { label: '眼轴长度', right: formatNumber(item.rightEye.axialLength, 'mm'), left: formatNumber(item.leftEye.axialLength, 'mm') },
      { label: '自动验光 S', right: displayText(item.rightEye.autoRefractionS), left: displayText(item.leftEye.autoRefractionS) },
      { label: '自动验光 C', right: displayText(item.rightEye.autoRefractionC), left: displayText(item.leftEye.autoRefractionC) },
      { label: '自动验光 A', right: displayText(item.rightEye.autoRefractionA), left: displayText(item.leftEye.autoRefractionA) },
      {
        label: '主觉验光 S',
        right: displayText(item.rightEye.subjectiveRefractionS),
        left: displayText(item.leftEye.subjectiveRefractionS),
      },
      {
        label: '主觉验光 C',
        right: displayText(item.rightEye.subjectiveRefractionC),
        left: displayText(item.leftEye.subjectiveRefractionC),
      },
      {
        label: '主觉验光 A',
        right: displayText(item.rightEye.subjectiveRefractionA),
        left: displayText(item.leftEye.subjectiveRefractionA),
      },
    ];
  });

  onMounted(async () => {
    loading.value = true;
    try {
      axiosData.value = await fetchGetAxiosChart(userStore.getStudent.patientId);
      reportData.value = await fetchGetLastReport(userStore.getStudent.patientId);
    } finally {
      loading.value = false;
    }
  });
</script>
