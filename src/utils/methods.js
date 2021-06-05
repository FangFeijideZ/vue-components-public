import Vue from 'vue'
const that = new Vue();
that.timeObj = undefined;
that.validBol = true;
const methods = {
  // 防抖
  throttle(fn,tiem) { // 第一个参数为要触发的函数，第二个参数为间隔时间
    if (that.timeObj) {
      clearTimeout(that.timeObj)
    }
    that.timeObj = setTimeout(() => {
      return fn();
    }, tiem);
  },
  // 节流
  debounce(fn,tiem) { // 第一个参数为要触发的函数，第二个参数为间隔时间
    if (!that.validBol) {
      return false
    }
    that.validBol = false;
    setTimeout(() => {
      that.validBol = true;
      return fn();
    }, tiem);
  },
}
Vue.prototype.$methods = methods; // 注册全局方法
export default methods