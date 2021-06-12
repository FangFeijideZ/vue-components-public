import Vue from 'vue';
let bus =  new Vue();
Vue.prototype.$bus = bus; // 注册全局方法
export default bus