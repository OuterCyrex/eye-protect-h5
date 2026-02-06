<template>
  <div class="bg-gray-50 min-h-screen">
    <div class="p-3 max-w-md mx-auto">
      <div class="bg-white rounded-lg p-4 mb-4 shadow-sm border border-gray-100">
        <div class="flex justify-between items-center mb-3">
          <div class="flex items-center gap-3">
            <div class="text-sm font-semibold text-gray-800">{{ detailData.date }}</div>
            <div class="text-sm text-gray-600 px-2 py-0.5 bg-gray-100 rounded">{{ detailData.type }}</div>
          </div>
          <div class="text-xs text-blue-600 bg-blue-50 px-2 py-0.5 rounded font-medium">
            {{ detailData.location }}
          </div>
        </div>
        <div class="flex justify-between text-sm text-gray-500">
          <div>检查医生：{{ detailData.doctorSignature.split('/')[0] }}</div>
          <div>患者ID：{{ detailData.patientId }}</div>
        </div>
      </div>

      <div class="bg-white rounded-lg p-4 mb-4 border border-gray-100">
        <div class="text-sm font-semibold text-gray-800 mb-2 flex items-center">
          <span class="w-1.5 h-1.5 bg-blue-500 rounded-full mr-2"></span>
          患者主诉
        </div>
        <div class="text-sm text-gray-600 leading-relaxed">{{ detailData.patientComplaints }}</div>
      </div>

      <div class="bg-white rounded-lg p-4 mb-4 border border-gray-100">
        <div class="text-sm font-semibold text-gray-800 mb-3 flex items-center">
          <span class="w-1.5 h-1.5 bg-green-500 rounded-full mr-2"></span>
          视力检查
        </div>
        <div class="grid grid-cols-2 gap-3 text-sm">
          <div class="flex flex-col gap-1">
            <div class="text-xs text-gray-500">主视眼</div>
            <div class="text-gray-800 font-medium">{{ detailData.dominantEye.od ? '右眼(OD)' : '左眼(OS)' }}</div>
          </div>
          <div class="flex flex-col gap-1">
            <div class="text-xs text-gray-500">裸眼远视力</div>
            <div class="text-gray-800">OD:{{ detailData.uncorrectedDistant.od }} / OS:{{ detailData.uncorrectedDistant.os }}</div>
          </div>
          <div class="flex flex-col gap-1">
            <div class="text-xs text-gray-500">裸眼近视力</div>
            <div class="text-gray-800">OD:{{ detailData.uncorrectedNear.od }} / OS:{{ detailData.uncorrectedNear.os }}</div>
          </div>
          <div class="flex flex-col gap-1">
            <div class="text-xs text-gray-500">矫正后视力</div>
            <div class="text-green-600 font-medium">OD:{{ detailData.correctedVision.od }} / OS:{{ detailData.correctedVision.os }}</div>
          </div>
        </div>
      </div>

      <div class="bg-white rounded-lg p-4 mb-4 border border-gray-100">
        <div class="text-sm font-semibold text-gray-800 mb-3 flex items-center">
          <span class="w-1.5 h-1.5 bg-orange-500 rounded-full mr-2"></span>
          验光数据
        </div>
        <div class="space-y-3 text-sm">
          <div class="flex flex-col gap-1">
            <div class="text-xs text-gray-500">旧镜度数</div>
            <div class="grid grid-cols-2 gap-2 text-gray-800 text-xs leading-relaxed">
              <div>右眼(OD)：{{ detailData.previousPrescription.od }}</div>
              <div>左眼(OS)：{{ detailData.previousPrescription.os }}</div>
            </div>
          </div>
          <div class="flex flex-col gap-1">
            <div class="text-xs text-gray-500">电脑验光</div>
            <div class="grid grid-cols-2 gap-2 text-gray-800 text-xs leading-relaxed">
              <div>右眼(OD)：{{ detailData.autoRefraction.od }}</div>
              <div>左眼(OS)：{{ detailData.autoRefraction.os }}</div>
            </div>
          </div>
          <div class="flex flex-col gap-1">
            <div class="text-xs text-gray-500">主观验光</div>
            <div class="grid grid-cols-2 gap-2 text-gray-800 text-xs leading-relaxed">
              <div>右眼(OD)：{{ detailData.subjectiveRefraction.od }}</div>
              <div>左眼(OS)：{{ detailData.subjectiveRefraction.os }}</div>
            </div>
          </div>
        </div>
      </div>

      <div class="bg-white rounded-lg p-4 mb-4 border border-gray-100">
        <div class="text-sm font-semibold text-gray-800 mb-3 flex items-center">
          <span class="w-1.5 h-1.5 bg-purple-500 rounded-full mr-2"></span>
          眼压/眼轴
        </div>
        <div class="space-y-3 text-sm">
          <div class="flex justify-between items-center">
            <div class="text-xs text-gray-500">眼压</div>
            <div class="text-gray-800 font-medium"
              >右眼(OD)：{{ detailData.eyePressure.od }} | 左眼(OS)：{{ detailData.eyePressure.os }}</div
            >
          </div>
          <div class="flex justify-between items-center">
            <div class="text-xs text-gray-500">眼轴长度</div>
            <div class="text-gray-800">右眼(OD)：{{ detailData.axialLength.od }} | 左眼(OS)：{{ detailData.axialLength.os }}</div>
          </div>
        </div>
      </div>

      <div class="bg-white rounded-lg p-3 mb-4 border border-gray-100">
        <div class="text-sm font-semibold text-gray-800 mb-2 flex items-center">
          <span class="w-1.5 h-1.5 bg-red-500 rounded-full mr-2"></span>
          诊断与建议
        </div>
        <div class="p-4 bg-gray-50 rounded-lg border border-gray-100">
          <div class="text-sm text-gray-700 leading-relaxed">
            {{ detailData.diagnosisSuggestions }}
          </div>
          <div class="text-right text-sm text-gray-500 mt-2 font-medium">
            {{ detailData.doctorSignature }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { ref } from 'vue';

  interface FollowupRecord {
    id: string;
    patientId: string;
    date: string;
    type: string;
    location: string;
    patientComplaints: string;
    dominantEye: { od: boolean; os: boolean };
    uncorrectedDistant: { od: string | null; os: string | null };
    uncorrectedNear: { od: string | null; os: string | null };
    correctedVision: { od: string | null; os: string | null };
    previousPrescription: { od: string | null; os: string | null };
    oldGlassesBrand: string;
    lensType: string;
    frameLensInspection: string;
    eyePressure: { od: string | null; os: string | null };
    autoRefraction: { od: string | null; os: string | null };
    subjectiveRefraction: { od: string | null; os: string | null };
    dilatedAutoRefraction: { od: string | null; os: string | null };
    dilatedSubjectiveRefraction: { od: string | null; os: string | null };
    visualFunction: { worth4Dot: string; eyePosition: string; npc: string | null; otherVisualTests: string };
    fundusExam: { od: string | null; os: string | null };
    axialLength: { od: string | null; os: string | null };
    slitLampExam: { od: string | null; os: string | null };
    diagnosisSuggestions: string;
    doctorSignature: string;
  }

  const detailData = ref<FollowupRecord>({
    id: 'F20260206001',
    patientId: 'P20240512008',
    date: '2026-01-15',
    type: '复诊记录',
    location: '电子科大附院',
    patientComplaints: '左眼视物模糊1周，看电子屏幕后眼干、酸胀，无眼痛、畏光及流泪',
    dominantEye: { od: false, os: true },
    uncorrectedDistant: { od: '4.8', os: '4.3' },
    uncorrectedNear: { od: '5.0', os: '4.7' },
    correctedVision: { od: '5.0', os: '5.0' },
    previousPrescription: {
      od: '球镜-0.50DS，柱镜-0.25DC，轴位180°',
      os: '球镜-2.00DS，柱镜-0.50DC，轴位175°',
    },
    oldGlassesBrand: '蔡司（ZEISS）',
    lensType: '非球面防蓝光树脂镜片，折射率1.61',
    frameLensInspection: '镜架无变形，镜片表面有轻微划痕，无脱膜、磨损，光学中心对齐',
    eyePressure: { od: '18mmHg', os: '19mmHg' },
    autoRefraction: {
      od: '球镜-0.75DS，柱镜-0.25DC，轴位180°',
      os: '球镜-2.25DS，柱镜-0.50DC，轴位175°',
    },
    subjectiveRefraction: {
      od: '球镜-0.50DS，柱镜-0.25DC，轴位180°',
      os: '球镜-2.00DS，柱镜-0.50DC，轴位175°',
    },
    dilatedAutoRefraction: { od: null, os: null },
    dilatedSubjectiveRefraction: { od: null, os: null },
    visualFunction: {
      worth4Dot: '双眼单视，无复视、抑制',
      eyePosition: '正位，集合功能正常，散开功能稍弱',
      npc: '10cm',
      otherVisualTests: '调节幅度：右眼10D，左眼8D；调节灵敏度：0.5cpm（左眼偏低）',
    },
    fundusExam: {
      od: '视盘边界清，杯盘比0.3，视网膜平伏，血管走行正常，无渗出、出血',
      os: '视盘边界清，杯盘比0.3，黄斑中心凹反光存在，视网膜周边无变性区',
    },
    axialLength: { od: '23.85mm', os: '24.52mm' },
    slitLampExam: {
      od: '结膜无充血，角膜透明，前房深度正常，瞳孔圆，对光反射灵敏',
      os: '结膜轻度充血，角膜透明，前房清，晶状体透明，玻璃体无混浊',
    },
    diagnosisSuggestions:
      '1. 双眼屈光不正（右眼轻度近视，左眼中度近视）；2. 视疲劳；3. 干眼症。建议：1. 更换左眼配镜度数，佩戴新镜；2. 减少电子屏幕使用，每30分钟远眺5分钟；3. 滴用玻璃酸钠滴眼液（0.1%），每日4次，缓解眼干；4. 每周行调节功能训练1-2次；5. 3个月后复查视力、眼压及眼轴长度，不适随诊。',
    doctorSignature: '张眼科/2026-01-15',
  });
</script>
