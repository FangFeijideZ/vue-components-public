import publicInput from './public_input.vue';
publicInput.install = function(Vue) {
    Vue.component(publicInput.name, publicInput);
};
export default publicInput;