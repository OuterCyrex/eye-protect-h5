import { http } from '@/utils/request';

/**
 * 账号密码登录
 * @returns UseAxiosReturn
 */
export function loginPassword(data: API.Auth.LoginPasswordRequest) {
  return http.post(`/auth/login`, {
    data: { ...data, port: 1 },
  });
}
