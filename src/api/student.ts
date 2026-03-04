import { httpAuth } from '@/utils/request';

/**
 * 获取绑定的学生列表
 * @returns
 */
export function fetchGetStudentList() {
  return httpAuth.get(`/student/list`);
}

export function fetchAddStudent(data: API.Student.addStudentRequest) {
  return httpAuth.post(`/student/create-and-bind`, data);
}

export function fetchGetCurrentStudent() {
  return httpAuth.get(`/student/current`);
}

export function fetchSwitchChild(id: string) {
  return httpAuth.post(`/student/switch/${id}`);
}

export function fetchGetStudentDetail(id: string) {
  return httpAuth.get(`/student/info/${id}`);
}

export function fetchUpdateStudent(data: API.Student.addStudentRequest) {
  return httpAuth.put(`/student/current`, data);
}
