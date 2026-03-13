import * as Stomp from 'stompjs';
import * as SockJS from 'sockjs-client';
import { useUserStore } from '@/store/modules/user';

const baseURL = import.meta.env.VITE_APP_BASE_URL;

export enum channels {
  MESSAGE = `/user/queue/messages`,
  UNREAD = `/user/queue/unread`,
}

class WebsocketManager {
  private client!: Stomp.Client;
  private token: string = '';
  private isConnected = false;
  private connectPromise: Promise<void> | null = null;
  private subscriptions = new Map<channels, Stomp.Subscription>();

  constructor() {
    const userStore = useUserStore();
    this.token = userStore.getToken || '';
  }

  init(): Promise<void> {
    if (this.connectPromise && this.isConnected) return this.connectPromise;

    this.connectPromise = new Promise((resolve, reject) => {
      const userStore = useUserStore();
      this.token = userStore.getToken || '';

      if (!this.token) {
        reject(new Error('Token为空，无法建立连接'));
        this.connectPromise = null;
        return;
      }

      if (!this.client) {
        try {
          const sockJS = new SockJS.default(`${baseURL}/ws`);
          this.client = Stomp.over(sockJS);
        } catch (e) {
          reject(new Error(`创建WS客户端失败：${e}`));
          this.connectPromise = null;
          return;
        }
      }

      this.client.connect(
        { Authorization: this.token },
        (frame) => {
          this.isConnected = true;
          console.log(`连接成功: ${frame}`);
          resolve();
        },
        (error) => {
          this.isConnected = false;
          this.connectPromise = null;
          console.log(`连接失败: ${error}`);
          reject(new Error(`STOMP连接失败: ${error}`));
        },
      );
    });

    return this.connectPromise;
  }

  subscribe(c: channels, func: (message: Stomp.Message) => void): Stomp.Subscription | null {
    if (!this.isConnected || !this.client) {
      throw new Error('STOMP连接未建立，无法订阅主题');
    }

    if (this.subscriptions.has(c)) {
      this.subscriptions.get(c)!.unsubscribe();
      this.subscriptions.delete(c);
    }

    const subscription = this.client.subscribe(c, (message) => {
      try {
        const data = JSON.parse(message.body);
        func(data);
      } catch (e: any) {
        console.warn(e);
      }
    });

    this.subscriptions.set(c, subscription);
    return subscription;
  }

  disconnect() {
    if (this.client) {
      try {
        this.subscriptions.forEach((sub) => sub.unsubscribe());
        this.subscriptions.clear();

        this.client.disconnect(() => {
          this.isConnected = false;
          this.connectPromise = null;
          this.client = undefined!;
          console.log('STOMP连接已断开');
        });
      } catch (e) {
        console.warn('断开连接时出错:', e);
        this.isConnected = false;
        this.connectPromise = null;
        this.client = undefined!;
        this.subscriptions.clear();
      }
    }
  }
}

export const ws = new WebsocketManager();
