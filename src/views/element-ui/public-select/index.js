import publicSelect from './public_select.vue';
publicSelect.install = function(Vue) {
    Vue.component(publicSelect.name, publicSelect);
};
export default publicSelect;