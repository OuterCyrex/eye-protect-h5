import { httpAuth } from '@/utils/request';

export function fetchGetHistoryMessage() {
  return httpAuth.get(`/message/query`);
}

export function fetchGetUnreadCount() {
  return httpAuth.get(`/message/unread/count`);
}

export function fetchSetMessageRead(id: string) {
  return httpAuth.put(`/message/read/${id}`);
}
