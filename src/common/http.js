import axios from 'axios';
import {
  baseUrl
} from './env';

const http = axios.create({
  baseURL: baseUrl,
  timeout: 20000,
  withCredentials: true
});

axios.defaults.headers.post['Content-Type'] = 'application/json';

http.interceptors.request.use(function (config) {
  // config.headers['YourHeaderName'] = 'Your header value';
  return config;
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
});

export default http;
