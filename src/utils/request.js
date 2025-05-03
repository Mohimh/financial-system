import axios from "axios"
import { ElMessage } from 'element-plus'

const http = axios.create({
    baseURL: 'http:/localhost:8000/api/v1',
    timeout: 10000
})

// 添加请求拦截器
http.interceptors.request.use(function (config) {
  // 在发送请求之前做些什么
  const token = localStorage.getItem('financial_token')
  // 不需要添加token的api
  const whiteUrl = ['/health']
  if (token && !whiteUrl.includes(config.url)) {
      config.headers['x-token'] = token
  }
  return config;
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error);
});

// 添加响应拦截器
http.interceptors.response.use(function (response) {
  console.log('response', response)
  // 2xx 范围内的状态码都会触发该函数。
  // 对响应数据做点什么

  // 对接口异常的数据，给用户提示
  if (response.data.code === -1) {
      ElMessage.warning(response.data.message)
  }
  if (response.data.code === -2) {
      localStorage.removeItem('financial_token')
      // localStorage.removeItem('pz_userInfo')
      // localStorage.removeItem('pz_v3pz')
      window.location.href = window.location.origin
  }
    
  return response;
}, function (error) {
  // 超出 2xx 范围的状态码都会触发该函数。
  // 对响应错误做点什么
  return Promise.reject(error);
});

export default http