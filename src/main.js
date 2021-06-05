import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/index';
import ElementUi from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import PublicComponents from './views';
import '../public/css/public.scss'; // 公共样式
import "./utils/date"; // 格式化日期
import "./utils/directives"; // 自定义指令


Vue.use(ElementUi);
Vue.use(PublicComponents);


// 是否启动生产消息打印到控制台
Vue.config.productionTip = false


new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
