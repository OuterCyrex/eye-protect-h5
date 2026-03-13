import { useCookies } from '@vueuse/integrations/useCookies';
import { defineStore } from 'pinia';
import { WebsocketManager, channels } from '@/utils/stomp';

const { VITE_TOKEN_KEY } = import.meta.env;
const token = useCookies().get(VITE_TOKEN_KEY as string);

interface StoreUser {
  token: string;
  info: Record<any, any>;
  student: Record<any, any>;
  unread: number;
}

export const useUserStore = defineStore('user', {
  state: (): StoreUser => ({
    token: token || '',
    info: {},
    student: {},
    unread: 0,
  }),
  getters: {
    getToken: (state) => state.token,
    getInfo: (state) => state.info,
    getStudent: (state) => state.student,
    getUnread: (state) => state.unread,
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
      this.unread = unread;
    },
    logout() {
      this.token = '';
      this.info = {};
      this.student = {};
      this.unread = 0;
      const ws = new WebsocketManager();
      ws.disconnect();
    },
    async initWebsocket() {
      const ws = new WebsocketManager();
      await ws.init();
      ws.subscribe(channels.UNREAD, (message) => {
        this.setUnread(parseInt(message.body));
      });
      return ws;
    },
  },
  persist: {
    key: 'user',
    pick: ['token', 'info', 'student', 'unread'],
    storage: localStorage,
  },
});
