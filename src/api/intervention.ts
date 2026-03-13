import { httpAuth } from '@/utils/request';

export function fetchGetLastIntervention(id: string) {
  return httpAuth.get('/intervention/query/latest', {
    params: { patientId: id },
  });
}

export function fetchGetLastReport(patientId: string) {
  return httpAuth.get(`/report/parent/${patientId}`);
}

export function fetchGetCurrentGlasses(patientId: string) {
  return httpAuth.get(`/eyeglass/current/${patientId}`);
}
