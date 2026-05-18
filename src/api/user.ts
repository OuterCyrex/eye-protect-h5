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
export function fetchUpdateUserInfo(data: API.Auth.UpdateUserInfoRequest) {
  return httpAuth.put<API.Auth.UpdateUserInfoResponse>(`/auth/user-detail/current`, data);
}

export function fetchSendLoginCode(phone: string) {
  return httpAuth.post(`/auth/send-code`, { phone, type: 1 });
}

export function fetchSendChangePasswordCode(phone: string) {
  return httpAuth.post(`/auth/send-code`, { phone, type: 2 });
}

export function fetchChangePassword(data: API.Auth.ChangePasswordRequest) {
  return httpAuth.post('/auth/forgot-password/reset', data);
}

export function fetchUploadAvatar(file: File) {
  const formData = new FormData();
  formData.append('file', file);

  return httpAuth.post(`/auth/upload-avatar`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
}

export function fetchJudgeNewUser() {
  return httpAuth.get('/auth/isNewUser');
}
