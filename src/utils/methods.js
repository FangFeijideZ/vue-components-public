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
  //数组去重  第一个参数要进行去重的数组  第二个参数去重的字段名
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
	// 递归深拷贝，传入数组或对象
	assignData(valve) {
    let o = Array.isArray(valve) ? [] : {};
    if (valve && typeof valve === "object") {
      for (let k in valve) {
        if (valve[k] && typeof valve[k] === "object") {
          o[k] = this.assignData(valve[k])
        } else {
          o[k] = valve[k]
        }
      }
    }
    return o
  }
}
Vue.prototype.$methods = methods; // 注册全局方法
export default methods