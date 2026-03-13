import { httpAuth } from '@/utils/request';

export function fetchGetHistoryMessage() {
  return httpAuth.get(`/message/query`);
}
