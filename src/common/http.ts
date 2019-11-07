/* eslint @typescript-eslint/no-explicit-any: 0 */
import axios, { AxiosInstance, AxiosRequestConfig, Canceler } from 'axios';
import {
  baseUrl
} from './env';

// 由于babel7的支持问题，这里暂时不能使用const enum特性，需要等待babel的日后支持
export enum ServerResponseCode {
  /** 正常响应 */
  Success = 200
}

const isCancel = axios.isCancel;
const CancelToken = axios.CancelToken;
const axiosConfig: AxiosRequestConfig = {
  baseURL: baseUrl,
  timeout: 20000,
  withCredentials: true
};
const axiosInstance = axios.create(axiosConfig);

axios.defaults.headers.post['Content-Type'] = 'application/json';

axiosInstance.interceptors.request.use(function (config): AxiosRequestConfig {
  // 发送请求前的一些前置处理
  // config.headers['YourHeaderName'] = 'Your header value';
  return config;
}, function (error): Promise<any> {
  // 全局请求异常处理
  // 如果请求超时，这里可以进行处理
  return Promise.reject(error);
});

axiosInstance.interceptors.response.use(function (response): any {
  const data = response.data || { code: '' };
  // 统一的服务器状态码判断处理
  if (data.code === ServerResponseCode.Success) {
    return data;
  } else {
    return Promise.reject(data);
  }
}, function (error): Promise<any> {
  // 全局响应异常处理
  if (isCancel(error)) {
    console.log('Request canceled:', error);
  } else if (/timeout\sof[\w\s]+exceeded/.test(error.toString())) {
    console.log('请求超时!');
  } else if (/Request failed/.test(error.toString())) {
    console.log('请求异常!');
  }
  return Promise.reject(error);
});

/**
 * 服务端返回的响应数据整体结构
 */
export interface ServerResponse<T = any> {
  /** 服务端响应状态 */
  code: number;
  /** 发生异常时返回的额外文本信息 */
  message?: string;
  /** 正常调用返回的数据 */
  data?: T;
}

/**
 * 基于axios实例重新封装的Http请求类
 */
class Http {
  /** axios实例 */
  private _axiosInstance: AxiosInstance;
  private _cancelerMap: Map<string, Canceler> = new Map<string, Canceler>();

  public constructor(axiosInstance: AxiosInstance) {
    this._axiosInstance = axiosInstance;
  }

  /**
   * 处理cancelToken的配置，检测和终止上一个未完成的请求
   * @param url
   * @param config
   * @private
   */
  private _processCancelTokenConfig(url: string, config: AxiosRequestConfig = {}): AxiosRequestConfig {
    const cancelerMap = this._cancelerMap;
    const canceler = cancelerMap.get(url);
    if (canceler) {
      // 如果上一个请求尚未完成，则取消上一个请求先
      cancelerMap.delete(url);
      canceler('cancel previous request');
    }
    if (!config.cancelToken) {
      // 默认同一个请求只能同时存在一个
      // 后续发起的请求会终止上一个请求
      config.cancelToken = new CancelToken(function (canceler): void {
        cancelerMap.set(url, canceler);
      });
    }
    return config;
  }

  /**
   * 检查指定的请求是否正在发送，尚未完成
   * @param url
   */
  public checkRequestSending(url = ''): boolean {
    return this._cancelerMap.has(url);
  }

  /**
   * 重新包装axios的get方法，修改其Promise的返回值类型
   * @param url
   * @param config
   */
  public get<T>(url: string, config?: AxiosRequestConfig): Promise<ServerResponse<T>> {
    config = this._processCancelTokenConfig(url, config);
    return new Promise((resolve, reject): void => {
      this._axiosInstance.get<ServerResponse<T>, ServerResponse<T>>(url, config)
        .then((response): void => {
          // 正常请求结束，移除对应请求url的canceler
          this._cancelerMap.delete(url);
          // 在interceptors.response中取出了实际服务端返回的响应数据
          resolve(response);
        })
        .catch((error): void => {
          if (!isCancel(error)) {
            // 取消请求的异常，这里不需要处理对应请求url的canceler，因为已经被_processCancelTokenConfig方法处理了
            this._cancelerMap.delete(url);
            // 取消请求的异常不会reject
            reject(error);
          }
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
    config = this._processCancelTokenConfig(url, config);
    return new Promise((resolve, reject): void => {
      this._axiosInstance.post<ServerResponse<T>, ServerResponse<T>>(url, data, config)
        .then((response): void => {
          this._cancelerMap.delete(url);
          resolve(response);
        })
        .catch((error): void => {
          if (!isCancel(error)) {
            this._cancelerMap.delete(url);
            reject(error);
          }
        });
    });
  }

  // 其它put、delete、request等方法，参考get、post方法的实现以及axios的d.ts描述文件即可
}

const http = new Http(axiosInstance);

export {
  isCancel
};
export default http;
