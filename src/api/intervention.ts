import { httpAuth } from '@/utils/request';

export function fetchGetLastIntervention() {
  return httpAuth.post('/intervention/query/latest');
}
