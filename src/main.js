import Vue from 'vue'
import App from './App.vue'
import router from './router'
import ElementUi from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import PublicComponents from './views';


Vue.use(ElementUi);
Vue.use(PublicComponents);

// 是否启动生产消息打印到控制台
Vue.config.productionTip = false


new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
