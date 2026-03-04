import { httpAuth } from '@/utils/request';

/**
 * 账号登出
 * @returns
 */
export function fetchGetInstitutions() {
  return httpAuth.get(`/institutions/all`);
}
