import { useCookies } from '@vueuse/integrations/useCookies';
import { defineStore } from 'pinia';

const { VITE_TOKEN_KEY } = import.meta.env;
const token = useCookies().get(VITE_TOKEN_KEY as string);
console.log(token);

interface StoreUser {
  token: string;
  info: Record<any, any>;
}

export const useUserStore = defineStore('user', {
  state: (): StoreUser => ({
    token: '',
    info: {},
  }),

  getters: {
    getToken: (state) => state.token,
    getInfo: (state) => state.info,
  },

  actions: {
    setToken(token: string) {
      this.token = token;
    },
    setInfo(info: Record<string, any>) {
      this.info = info;
    },
    logout() {
      this.token = '';
      this.info = {};
    },
  },

  persist: {
    key: 'user',
    pick: ['token', 'info'],
    storage: localStorage,
  },
});
