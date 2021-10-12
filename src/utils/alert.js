import Vue from 'vue'
import publicConfirm from '@/views/alert-ui/public_confirm.vue';
let publicConfirmExtend = Vue.extend(publicConfirm);
let publicConfirmNew = new publicConfirmExtend({
  el: document.createElement('div')
});
document.body.appendChild(publicConfirmNew.$el);
let alerts = (title, content,{dangerouslyUseHTMLString}) => {
  return new Promise((resolve,reject)=>{
    publicConfirmNew.title = title;
    publicConfirmNew.content = content;
    publicConfirmNew.dangerouslyUseHTMLString = dangerouslyUseHTMLString;
    publicConfirmNew.visible = true;
    publicConfirmNew.confirm = () => {
      resolve()
    }
    publicConfirmNew.cancel = () => {
      reject()
    }
  })
}
Vue.prototype.$alerts = alerts; // 注册全局方法
export default alerts