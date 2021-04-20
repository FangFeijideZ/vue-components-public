import publicTitle from './public_title.vue';
publicTitle.install = function(Vue) {
    Vue.component(publicTitle.name, publicTitle);
};
export default publicTitle;