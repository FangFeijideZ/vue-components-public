import publicInput from "./element-ui/public-input/index"; // 导入组件
import publicSelect from "./element-ui/public-select/index"; // 导入组件
import publicButton from "./element-ui/public-button/index"; // 导入组件
import publicDate from "./element-ui/public-date/index"; // 导入组件
import publicTable from "./element-ui/public-table/index"; // 导入组件
import publicTitle from "./element-ui/public-title/index"; // 导入组件
import publicTime from "./element-ui/public-time/index"; // 导入组件
import publicPagination from "./element-ui/public-pagination/index"; // 导入组件
// import publicInput from "./common-ui/public-input/index"; // 导入组件
// 存储组件列表
const components = [
  publicInput,
  publicTable,
  publicSelect,
  publicTitle,
  publicTime,
  publicButton,
  publicDate,
  publicPagination,
];
// 定义 install 方法，接收 Vue 作为参数。如果使用 use 注册插件，则所有的组件都将被注册
const install = function (Vue) { // 判断是否安装
  if (install.installed) return
  // 遍历注册全局组件
  components.map(component => Vue.component(component.name, component))
}
// 判断是否是直接引入文件
if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue)
}
export default {
  // 导出的对象必须具有 install，才能被 Vue.use() 方法安装
  install,
  // 以下是具体的组件列表
  // publicInput,
  // publicSelect,
  ...components // ...可以解构所有的对象，不用一个一个写
}