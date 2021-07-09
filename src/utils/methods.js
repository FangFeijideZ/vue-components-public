import { setInterval } from 'core-js';
import Vue from 'vue'
const that = new Vue();
that.timeObj = undefined;
that.validBol = true;
const methods = {
  // 防抖
  throttle(fn,time) { // 第一个参数为要触发的函数，第二个参数为间隔时间
    if (that.timeObj) {
      clearTimeout(that.timeObj)
    }
    that.timeObj = setTimeout(() => {
      return fn();
    }, time);
  },
  // 节流
  debounce(fn,time) { // 第一个参数为要触发的函数，第二个参数为间隔时间
    if (!that.validBol) {
      return false
    }
    that.validBol = false;
    setTimeout(() => {
      that.validBol = true;
      return fn();
    }, time);
  },
  // 对象转数组
  objToArr(obj) {
    let arr = []
    for (let i in obj) {
      let o = {};
      o[i] = obj[i];
      arr.push(o)
    }
    return arr;
  },
  // 数组去重  第一个参数要进行去重的数组  第二个参数去重拿来比较的字段名
	arrRemoval(list, type) {
		let result = [];
		let obj = {};
		for (var i = 0; i < list.length; i++) {
			if (!obj[list[i][type]]) {
				result.push(list[i]);
				obj[list[i][type]] = true;
			}
		}
		return result;
	},
  // 数组去重 findIndex  第一个参数要进行去重的数组  第二个参数去重拿来比较的字段名
	arrRemovalIndexOf(list, name) {
		let result = [];
    list.forEach((item,index) => {
      let i = result.findIndex(obj=>{
        let o = item[name] ? obj[name] == item[name] : obj == item;
        return o;
      });
      if (i == -1) {
        result.push(item)
      }
    });
		return result;
	},
	// 递归 深拷贝，传入数组或对象(推荐使用)
	deepCopyData(value) {
    let o = Array.isArray(value) ? [] : {};
    if (value && typeof value === "object") {
      for (let k in value) {
        if (value[k] && typeof value[k] === "object") {
          o[k] = this.deepCopyData(value[k])
        } else {
          o[k] = value[k]
        }
      }
    }
    return o
  },
  // assign 深拷贝，只针对对象，只能深拷贝对象的第一层
  copyDataAssign (value) {
    let newObj = Object.assign({},value);
    return newObj;
  },
  // ...解构 深拷贝，只针对对象，只能深拷贝对象的第一层
  copyDataObj (value) {
    let newObj = { ...value };
    return newObj;
  },
  // promiseXhr 方法
  promiseXhr(obj) {
    let { method,url,data,async } = obj;
    let asyncNew = async ? async : true;
    return new Promise((resolve,reject)=>{
      let xhr = new XMLHttpRequest();
      // xhr.onreadystatechange = function() { // 每当 readyState 属性改变时，就会调用该函数，会执行4次
      xhr.onload = function() { // 只执行一次 readyState 0: 请求未初始化 1: 服务器连接已建立 2: 请求已接收 3: 请求处理中 4: 请求已完成，且响应已就绪
        if (xhr.readyState == 4) {
          if (xhr.status == 200 ) {
            resolve(xhr)
          } else {
            reject(xhr)
          }
        }
      }
      xhr.open(method, url, asyncNew);
      // xhr.setRequestHeader("Content-type","application/x-www-form-urlencoded");
      xhr.setRequestHeader('Content-Type', 'application/json;charset=utf-8')
      xhr.send(data); // 发送 ajax 请求
    })
  },
}
Vue.prototype.$methods = methods; // 注册全局方法
export default methods