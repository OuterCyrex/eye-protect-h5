import { httpAuth } from '@/utils/request';

/**
 * 获取机构下拉列表
 * @param params 分页参数和机构类型
 * @returns
 */
export function fetchGetInstitutions(params?: { pageNum?: number; pageSize?: number; type?: string }) {
  return httpAuth.get(`/institutions/all`, { params });
}
