import { useCookies } from '@vueuse/integrations/useCookies';
import { defineStore } from 'pinia';

const { VITE_TOKEN_KEY } = import.meta.env;
const token = useCookies().get(VITE_TOKEN_KEY as string);
console.log(token);

interface StoreUser {
  token: string;
  info: Record<any, any>;
  student: Record<any, any>;
}

export const useUserStore = defineStore('user', {
  state: (): StoreUser => ({
    token: '',
    info: {},
    student: {},
  }),

  getters: {
    getToken: (state) => state.token,
    getInfo: (state) => state.info,
    getStudent: (state) => state.student,
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
    logout() {
      this.token = '';
      this.info = {};
      this.student = {};
    },
  },

  persist: {
    key: 'user',
    pick: ['token', 'info', 'student'],
    storage: localStorage,
  },
});
