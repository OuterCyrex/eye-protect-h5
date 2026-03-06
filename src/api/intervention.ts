import { httpAuth } from '@/utils/request';

export function fetchGetLastIntervention(id: string) {
  return httpAuth.get('/intervention/query/latest', {
    params: { patientId: id },
  });
}
