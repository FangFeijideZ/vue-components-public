import Vue from 'vue'
import axios from 'axios';
import api from './api';
import { Message } from 'element-ui';

let time = 1000 * 30;
axios.defaults.timeout = time; // 设置请求超时时间（ms）不超过半分钟 
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
  },
  download(obj) {
    // console.log(obj);
    let { url, fileName, method, data } = obj;
    let requestMethod = method ? method : 'post';
    let async = async ? async : true;
    return new Promise((resolve,reject) => {
      let xhr = new XMLHttpRequest();
      // xhr.onreadystatechange = function() { // 每当 readyState 属性改变时，就会调用该函数，会执行4次
      xhr.onload = function() { // 请求成功后 只执行一次 readyState 0: 请求未初始化 1: 服务器连接已建立 2: 请求已接收 3: 请求处理中 4: 请求已完成，且响应已就绪
        if (xhr.readyState == 4) {
          if (xhr.status == 200 ) {
            let blob = new Blob([xhr.response]);
            if (window.navigator && window.navigator.msSaveOrOpenBlob) { // IE 浏览器
              window.navigator.msSaveOrOpenBlob(blob, fileName)
            } else { // for No-IE (chrome, firefox etc.)
              let urlObj = URL.createObjectURL(blob);
              let link = document.createElement("a");
              link.style.display = "none";
              link.href = urlObj;
              link.download = fileName;
              document.body.appendChild(link);
              link.click();
              URL.revokeObjectURL(urlObj);
              document.body.removeChild(link);
            }
            resolve(xhr)
          } else {
            reject(xhr)
          }
        }
      }
      xhr.ontimeout = function(timeout) { // 请求超时后执行
        Message.error({ message: "加载超时" })
        reject(timeout);
      }
      xhr.onerror = function(error) { // 请求错误后执行
        Message.error({ message: "请求错误" })
        reject(error);
      }
      xhr.open(requestMethod, url, async); // requestMethod: 请求方式; url: 请求地址; async: 是否开启异步请求，默认开启
      xhr.timeout = time; // 设置请求超时时间
      xhr.responseType = "blob";
      // xhr.setRequestHeader("Content-type","application/x-www-form-urlencoded");
      // xhr.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');
      // xhr.setRequestHeader('token', 'fdddddd26sa56aaasas'); // 设置 token
      xhr.setRequestHeader('Content-Type', 'application/octet-stream;'); // 设置请求头为二进制流
      xhr.send(); // 发送 ajax 请求
    })
  }
}
Vue.prototype.$http = request; // 注册全局方法
Vue.prototype.$api = api; // 注册全局方法
export default request