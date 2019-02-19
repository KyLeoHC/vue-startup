import axios from 'axios';
import {
  baseUrl
} from './env';

const http = axios.create({
  baseURL: baseUrl,
  timeout: 2000,
  withCredentials: true
});

axios.defaults.headers.post['Content-Type'] = 'application/json';

http.interceptors.request.use(function (config) {
  // config.headers['YourHeaderName'] = 'Your header value';
  return config;
}, function (error) {
  // 全局请求异常处理
  // 如果请求超时，这里可以进行处理
  return Promise.reject(error);
});

http.interceptors.response.use(function (response) {
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

export default http;
