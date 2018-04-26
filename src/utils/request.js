import axios from 'axios'
import { Message } from 'element-ui'

// 创建axios实例
axios.defaults.withCredentials = true
const service = axios.create({
  baseURL: 'https://data.block.cc', // api的base_url
  timeout: 15000 // 请求超时时间
})
service.interceptors.request.use(config => {
  console.log(config)
return config
}, error => {
  // Do something with request error
  Promise.reject(error)
})
// respone拦截器
service.interceptors.response.use((response) => {
  /**
  * code为非20000是抛错 可结合自己业务进行修改
  */

    const res = response.data
  console.log(res)
    if (res.status !== 200) {
      Message({
        message: res.data,
        type: 'error',
        duration: 5 * 1000
      });

      return Promise.reject()
    } else {
      return response.data
    }
  },
  (error) => {
    //  50014:Token 过期了;50015,长的
    Message({
      message: error.message,
      type: 'error',
      duration: 5 * 1000
    });
    return Promise.reject()
  }
)

export default service
