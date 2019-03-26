import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';
import {
  baseUrl
} from './env';

const axiosConfig: AxiosRequestConfig = {
  baseURL: baseUrl,
  timeout: 20000,
  withCredentials: true
};
const axiosInstance = axios.create(axiosConfig);

axios.defaults.headers.post['Content-Type'] = 'application/json';

axiosInstance.interceptors.request.use(function (config) {
  // config.headers['YourHeaderName'] = 'Your header value';
  return config;
}, function (error) {
  // 全局请求异常处理
  // 如果请求超时，这里可以进行处理
  return Promise.reject(error);
});

axiosInstance.interceptors.response.use(function (response) {
  // 统一的服务器状态码判断处理
  const SUCCESS_CODE = 200;
  const data = response.data || {};
  if (data.code === SUCCESS_CODE) {
    return data;
  } else {
    return Promise.reject(data);
  }
}, function (error) {
  // 全局响应异常处理
  return Promise.reject(error);
});

/* eslint @typescript-eslint/no-explicit-any: 0 */
/**
 * 服务端返回的响应数据整体结构
 */
export interface ServerResponse<T> {
  code: number;
  message?: string;
  data: T;
}

class Http {
  private axiosInstance: AxiosInstance;

  public constructor(axiosInstance: AxiosInstance) {
    this.axiosInstance = axiosInstance;
  }

  /**
   * 重新包装axios的get方法，修改其Promise的返回值类型
   * @param url
   * @param config
   */
  public get<T>(url: string, config?: AxiosRequestConfig): Promise<ServerResponse<T>> {
    return new Promise((resolve, reject) => {
      this.axiosInstance.get(url, config)
        .then(response => {
          // 由于我们在interceptors.response中取出了实际服务端返回的响应数据
          // 所以这里拿到的实际response数据并不是AxiosResponse类型，需要强制转换下
          resolve(response as unknown as ServerResponse<T>);
        })
        .catch(error => {
          reject(error);
        });
    });
  }

  /**
   * 重新包装axios的post方法，修改其Promise的返回值类型
   * @param url
   * @param data
   * @param config
   */
  public post<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<ServerResponse<T>> {
    return new Promise((resolve, reject) => {
      this.axiosInstance.post(url, data, config)
        .then(response => {
          // 由于我们在interceptors.response中取出了实际服务端返回的响应数据
          // 所以这里拿到的实际response数据并不是AxiosResponse类型，需要强制转换下
          resolve(response as unknown as ServerResponse<T>);
        })
        .catch(error => {
          reject(error);
        });
    });
  }

  // 其它put、delete、request等方法，参考get、post方法的实现以及axios的d.ts描述文件即可
}

const http = new Http(axiosInstance);

export default http;
