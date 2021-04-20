import publicPagination from './public_pagination.vue';
publicPagination.install = function(Vue) {
    Vue.component(publicPagination.name, publicPagination);
};
export default publicPagination;