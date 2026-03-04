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
