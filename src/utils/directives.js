import Vue from 'vue'
const directives = {
  update: {
    bind(el, binding, vnode) {
      console.log(el, binding, vnode);
    }
  },
  del: {
    inserted(el, binding, vnode) { // 被绑定元素插入父节点时调用
      let arr = '[object Array]';
      let obj = '[object Object]';
      let fun = '[object Function]';
      let str = '[object String]';
      let num = '[object Number]';
      // let boo = '[object Boolean]';
      if (binding.value) {
        let type = Object.prototype.toString.call(binding.value);
        if (type == arr) {
          let flag = binding.value.some(item=>{
            return checkArray(item);
          })
          if (!flag) { // 判断是否有权限，没有权限就删除元素，等同于v-if指令
            el.parentNode && el.parentNode.removeChild(el)
          }
        }
        if (type == obj) {
          let array = Object.keys(binding.value);
          let flag = array.some(item=>{
            return checkArray(binding.value[item]);
          })
          if (!flag) { // 判断是否有权限，没有权限就删除元素，等同于v-if指令
            el.parentNode && el.parentNode.removeChild(el)
          }
        }
        if (type == str || type == num) {
          let flag = checkArray(binding.value);
          if (!flag) { // 判断是否有权限，没有权限就删除元素，等同于v-if指令
            el.parentNode && el.parentNode.removeChild(el)
          }
        }
        if (type == fun) {
          let value = binding.value();
          let type1 = Object.prototype.toString.call(value);
          if (type1 == arr) {
            let flag = value.some(item=>{
              return checkArray(item);
            })
            if (!flag) { // 判断是否有权限，没有权限就删除元素，等同于v-if指令
              el.parentNode && el.parentNode.removeChild(el)
            }
          }
          if (type1 == obj) {
            let array = Object.keys(value);
            let flag = array.some(item=>{
              return checkArray(value[item]);
            })
            if (!flag) { // 判断是否有权限，没有权限就删除元素，等同于v-if指令
              el.parentNode && el.parentNode.removeChild(el)
            }
          }
          if (type1 == str || type1 == num) {
            let flag = checkArray(value);
            if (!flag) { // 判断是否有权限，没有权限就删除元素，等同于v-if指令
              el.parentNode && el.parentNode.removeChild(el)
            }
          }
        }
      } else {
        // el.style = "display: none;"
        el.parentNode && el.parentNode.removeChild(el)
      }
      // // 判断指令中是否绑定了函数
      // if (binding.exptypesion) {
      //   // 如果绑定了函数 则调用那个函数，此处binding.value就是那个函数
      //   binding.value(el, binding, vnode);
      // }
    }
  },
}
function checkArray(key) {
  let arr = ['zd', 'dd'];
  let index = arr.indexOf(key);
  return index == -1 ? false : true;
}
let authority = {
  install(Vue) {
    Object.keys(directives).forEach((key) => {
      Vue.directive(key, directives[key])
    })
  },
}
Vue.use(authority);
export default authority