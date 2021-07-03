import Vue from 'vue'
import axios from 'axios';
import api from './api';
import { Message } from 'element-ui';

axios.defaults.timeout = 30000; // 设置请求超时时间（ms）不超过半分钟 
axios.defaults.baseURL = 'https://www.runoob.com/';

// 请求拦截器
axios.interceptors.request.use(config => {
  // console.log(config);
  return config;
}, error => {
  Message.error({ message: "加载超时" })
  return Promise.reject(error);
})

// 响应拦截器
axios.interceptors.response.use(response => {
  // console.log(response);
  return response;
}, error => {
  return Promise.reject(error);
})


let typeObj = {
  json: 'application/json;charset=UTF-8',
  form: 'application/x-www-form-urlencoded',
  download: 'application/octet-stream'
};
let request = {
  get(obj) {
    let { url, data, contentType } = obj;
    return axios({
      method: 'get',
      url,
      params: data,
      headers: {
        'X-API-TOKEN': localStorage.getItem('token'),
        'Content-Type': contentType ? typeObj[contentType] : typeObj['json']
      }
    }).then(response => {
      // console.log(response);
      if (response.status == 200) {
        return Promise.resolve(response.data);
      } else {
        Message.error({ message: response.message })
      }
    }, error => {
      Message.error({ message: error })
      return Promise.reject(error)
    })
  },
  post(obj) {
    let { url, data, contentType } = obj;
    return axios({
      method: 'post',
      url,
      data,
      headers: {
        'X-API-TOKEN': localStorage.getItem('token'),
        'Content-Type': contentType ? typeObj[contentType] : typeObj['json']
      }
    }).then(response => {
      // console.log(response);
      if (response.status == 200) {
        return Promise.resolve(response.data);
      } else {
        Message.error({ message: response.message })
      }
    }, error => {
      Message.error({ message: error })
      return Promise.reject(error)
    })
  },
  put(obj) {
    let { url, data, contentType } = obj;
    return axios({
      method: 'put',
      url,
      data,
      headers: {
        'X-API-TOKEN': localStorage.getItem('token'),
        'Content-Type': contentType ? typeObj[contentType] : typeObj['json']
      }
    }).then(response => {
      // console.log(response);
      if (response.status == 200) {
        return Promise.resolve(response.data);
      } else {
        Message.error({ message: response.message })
      }
    }, error => {
      Message.error({ message: error })
      return Promise.reject(error)
    })
  },
  delete(obj) {
    let { url, data, contentType } = obj;
    return axios({
      method: 'delete',
      url,
      data,
      headers: {
        'X-API-TOKEN': localStorage.getItem('token'),
        'Content-Type': contentType ? typeObj[contentType] : typeObj['json']
      }
    }).then(response => {
      // console.log(response);
      if (response.status == 200) {
        return Promise.resolve(response.data);
      } else {
        Message.error({ message: response.message })
      }
    }, error => {
      Message.error({ message: error })
      return Promise.reject(error)
    })
  }
}
Vue.prototype.$http = request; // 注册全局方法
Vue.prototype.$api = api; // 注册全局方法
export default request