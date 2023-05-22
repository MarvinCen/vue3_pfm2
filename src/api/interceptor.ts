import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import { Message, Modal } from '@arco-design/web-vue';
import { useUserStore } from '@/store';

export interface HttpResponse<T = unknown> {
  status: number;
  message: string;
  code: number;
  data: T;
}

axios.interceptors.request.use(
  (config: AxiosRequestConfig) => {
    return config;
  },
  (error) => {
    // do something
    return Promise.reject(error);
  }
);
// add response interceptors
axios.interceptors.response.use(
  (response: AxiosResponse<HttpResponse>) => {
    const res = response.data;
    console.log(res)
    // if the custom code is not 20000, it is judged as an error.
    if (res.code < 20000 && res.code >= 30000) {
      if (res.code >= 30000 && res.code < 40000) { // Mistake
        Message.warning({
          content: res.message || 'Warning',
          duration: 8 * 1000,
        });
      }
      else { // Error
        Message.error({
          content: res.message || 'Error',
          duration: 8 * 1000,
        });
      }
      // 50008: Illegal token; 50012: Other clients logged in; 50014: Token expired;
      if (
        [50008, 50012, 50014].includes(res.code) &&
        response.config.url !== '/api/user/info'
      ) {
        Modal.error({
          title: 'Confirm logout',
          content:
            'You have been logged out, you can cancel to stay on this page, or log in again',
          okText: 'Re-Login',
          async onOk() {
            const userStore = useUserStore();

            await userStore.logout();
            window.location.reload();
          },
        });
      }
      return Promise.reject(new Error(res.message || 'Error'));
    }
    else if (res.code === 20500) {
      Message.warning({
        content: res.message || 'Warning',
        duration: 8 * 1000,
      });
    }
    return res;
  },
  (error) => {
    Message.error({
      content: error.message,
      duration: 5 * 1000,
    });
    return Promise.reject(error);
  }
);
