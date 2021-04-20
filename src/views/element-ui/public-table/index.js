import publicTable from './public_table.vue';
publicTable.install = function(Vue) {
    Vue.component(publicTable.name, publicTable);
};
export default publicTable;