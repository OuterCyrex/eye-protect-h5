import { http, httpAuth } from '@/utils/request';

/**
 * 账号密码登录
 * @returns
 */
export function loginPassword(data: API.Auth.LoginPasswordRequest) {
  return http.post(`/auth/login`, {
    ...data,
    port: 1,
  });
}

/**
 * 账号登出
 * @returns
 */
export function logout() {
  return httpAuth.post(`/auth/logout`);
}
