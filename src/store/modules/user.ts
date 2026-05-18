import { useCookies } from '@vueuse/integrations/useCookies';
import { defineStore } from 'pinia';
import { fetchGetUserInfoDetail } from '@/api/user';
import { WebsocketManager, channels } from '@/utils/stomp';

const { VITE_TOKEN_KEY } = import.meta.env;
const token = useCookies().get(VITE_TOKEN_KEY as string);

interface StoreUser {
  token: string;
  info: Record<any, any>;
  student: Record<any, any>;
  unread: number;
  needsAreaCodeCompletion: boolean;
}

export const useUserStore = defineStore('user', {
  state: (): StoreUser => ({
    token: token || '',
    info: {},
    student: {},
    unread: 0,
    needsAreaCodeCompletion: false,
  }),
  getters: {
    getToken: (state) => state.token,
    getInfo: (state) => state.info,
    getStudent: (state) => state.student,
    getUnread: (state) => state.unread,
    getNeedsAreaCodeCompletion: (state) => state.needsAreaCodeCompletion,
  },
  actions: {
    setToken(token: string) {
      this.token = token;
    },
    setInfo(info: Record<string, any>) {
      this.info = info;
    },
    setStudent(student: Record<string, any>) {
      this.student = student;
    },
    setUnread(unread: number) {
      this.unread = Math.max(0, unread);
    },
    setNeedsAreaCodeCompletion(needsAreaCodeCompletion: boolean) {
      this.needsAreaCodeCompletion = needsAreaCodeCompletion;
    },
    async refreshAreaCodeRequirement() {
      if (!this.token) {
        this.needsAreaCodeCompletion = false;
        return false;
      }
      const detail = await fetchGetUserInfoDetail();
      this.setInfo(detail);
      this.needsAreaCodeCompletion = !detail?.areaCode;
      return this.needsAreaCodeCompletion;
    },
    logout() {
      this.token = '';
      this.info = {};
      this.student = {};
      this.unread = 0;
      this.needsAreaCodeCompletion = false;
      const ws = new WebsocketManager();
      ws.disconnect();
    },
    async initWebsocket() {
      const ws = new WebsocketManager();
      await ws.init();
      ws.subscribe(channels.UNREAD, (message) => {
        this.setUnread(Number.parseInt(message.body, 10) || 0);
      });
      return ws;
    },
  },
  persist: {
    key: 'user',
    pick: ['token', 'info', 'student', 'unread', 'needsAreaCodeCompletion'],
    storage: localStorage,
  },
});
