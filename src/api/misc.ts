import { httpAuth } from '@/utils/request';

export function fetchGetAxiosChart(patientId: string) {
  return httpAuth.get(`/growth-record/axial-length-chart/${patientId}`);
}
