import { httpAuth } from '@/utils/request';

/**
 * 获取用户详细信息
 * @returns
 */
export function fetchGetUserInfoDetail() {
  return httpAuth.get(`/auth/getUserDetail`);
}

/**
 * 获取用户信息
 */
export function fetchGetUserInfo() {
  return httpAuth.get(`/auth/getUserInfo`);
}

/**
 * 更新用户信息
 * @returns
 */
export function fetchUpdateUserInfo(id: string, data: API.Auth.UpdateUserInfoRequest) {
  return httpAuth.put(`/auth/user-detail`, { ...data, userType: 'parent', id });
}
