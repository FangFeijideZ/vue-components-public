import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/index';
import ElementUi from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import PublicComponents from './views';
import '../public/css/public.scss'; // 公共样式
import "./utils/date"; // 全局格式化日期
import "./utils/directives"; // 自定义全局指令
import "./utils/filters"; // 自定义全局过滤器
import "./utils/methods"; // 自定义全局方法
import "./utils/eventBus"; // 自定义全局事件总线

Vue.use(ElementUi);
Vue.use(PublicComponents);


// 是否启动生产消息打印到控制台
Vue.config.productionTip = false


new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
