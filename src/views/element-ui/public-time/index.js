import publicTime from './public_time.vue';
publicTime.install = function(Vue) {
    Vue.component(publicTime.name, publicTime);
};
export default publicTime;