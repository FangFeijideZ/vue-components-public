import publicButton from './public_button.vue';
publicButton.install = function(Vue) {
    Vue.component(publicButton.name, publicButton);
};
export default publicButton;