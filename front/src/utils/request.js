import axios from 'axios';
import {
  Message,
  MessageBox,
  Loading
} from 'element-ui';
import {
  showFullScreenLoading,
  tryHideFullScreenLoading
} from '@/utils/loading.js';
// import store from '../store'
// import {
//   getToken
// } from '@/utils/auth'

// 创建axios实例
const aioxs_ins = axios.create({
  // baseURL: process.env.BASE_API, // api 的 base_url
  // baseURL: process.env.NODE_ENV === "development" ? '/api' : "", //,
  timeout: 300000 // 请求超时时间 300秒=5分钟
})

// request拦截器
aioxs_ins.interceptors.request.use(
  config => {
    // Do something before request is sent

    //打开loading蒙版
    showFullScreenLoading();
    return config;

    // if (store.getters.token) {
    //   config.headers['X-Token'] = getToken() // 让每个请求携带自定义token 请根据实际情况自行修改
    // }
  },
  error => {
    // Do something with request error
    console.log(error) // for debug
    return Promise.reject(error)
  }
)

// response 拦截器
aioxs_ins.interceptors.response.use(
  response => {
    /**
     * 0 可结合自己业务进行修改
     */
    console.log("axios拦截器response开始！");
    const res = response.data;

    if (res.code !== 0 && res.code !== "0" && res.Code !== "0" && res.Code !== 0) {
      console.log("axios拦截器response返回 res.code !== 0：", res);
      Message({
        message: res.message,
        showClose: true,
        type: 'error',
        duration: 300 * 1000
      })

      // 50008:非法的token; 50012:其他客户端登录了;  50014:Token 过期了;
      if (res.code === 50008 || res.code === 50012 || res.code === 50014) {
        MessageBox.confirm(
          '你已被登出，可以取消继续留在该页面，或者重新登录',
          '确定登出', {
            confirmButtonText: '重新登录',
            cancelButtonText: '取消',
            type: 'warning'
          }
        ).then(() => {
          // store.dispatch('FedLogOut').then(() => {
          //   location.reload() // 为了重新实例化vue-router对象 避免bug
          // })
        })
      }
      return Promise.reject('error')
    } else {
      console.log("axios拦截器code=0");
      //关闭loading蒙版
      tryHideFullScreenLoading();
      return response;
    }
  },
  error => {
    console.log('axios拦截器response Err' + error) // for debug
    Message({
      message: 'response interceptors Error:' + ' ' + error.message,
      showClose: true,
      type: 'error',
      duration: 300 * 1000
    })
    return Promise.reject(error)
  }
)

export default aioxs_ins
