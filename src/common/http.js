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
  const data = response.data || {};
  if (data.code === 500) {
    // do something with '500' status code....
  }
  return data;
});

export default http;
