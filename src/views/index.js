let elementFiles = require.context('./element-ui', true, /\.vue$/); // 引入 element-ui 文件夹下的所有 .vue 文件
let echartsFiles = require.context('./echarts', true, /\.vue$/); // 引入 echarts 文件夹下的所有 .vue 文件
let components = [];

elementFiles.keys().forEach((item) => { // 循环出组件
  let moduleName = elementFiles(item);
  components.push(moduleName.default);
})

echartsFiles.keys().forEach((item) => { // 循环出组件
  let moduleName = echartsFiles(item);
  components.push(moduleName.default);
})

// 安装组件
components.map(item => item.install = function(Vue) {
  Vue.component(item.name, item);
});
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