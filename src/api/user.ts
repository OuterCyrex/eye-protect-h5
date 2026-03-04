import { httpAuth } from '@/utils/request';

/**
 * 获取用户信息
 * @returns
 */
export function fetchGetUserInfo() {
  return httpAuth.get(`/auth/getUserDetail`);
}

/**
 * 更新用户信息
 * @returns
 */
export function fetchUpdateUserInfo(data: API.Auth.UserInfo) {
  return httpAuth.put(`/auth/user-detail`, data);
}
