import publicDate from './public_date.vue';
publicDate.install = function(Vue) {
    Vue.component(publicDate.name, publicDate);
};
export default publicDate;