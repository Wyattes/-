import axios from 'axios'
import { ElMessage } from 'element-plus'
import { diffTokenTime } from '@/utils/auth'
import store from '@/store'

const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API,
  timeout: 5000
})
// 请求拦截器
service.interceptors.request.use((config) => {
  // 判断是否超时
  if (localStorage.getItem('token')) {
  if (diffTokenTime()) {
    store.dispatch('app/logout')
    return Promise.reject(new Error('Token超时失效了'))
  }
}
  config.headers.Authorization = localStorage.getItem('token')
  return config
}, error => {
  return Promise.reject(new Error(error))
}
)

// 响应拦截器
service.interceptors.response.use(
  (response) => {
    // console.log(response)
    const { data, meta } = response.data
    if (meta.status === 200 || meta.status === 201) {
      return data
    } else {
      ElMessage.error(meta.msg)
      return Promise.reject(new Error(meta.msg))
    }
  }, (error) => {
    error.response && ElMessage.error(error.response)
    return Promise.reject(new Error(error.response))
  }
)

export default service
