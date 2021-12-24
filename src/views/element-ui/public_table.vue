<template>
  <div class="public-table">
    <el-table v-bind="$attrs" v-on="$listeners">
      <el-table-column v-bind="item" v-for="item in tableTitleType" :key="item.type"></el-table-column>
      <el-table-column v-bind="item" v-for="item in tableTitle" :key="item.id">
        <template slot-scope="scope">
          <slot v-if="!item.slots">{{scope.row[item.prop]}}</slot>
          <slot :name="item.slots" :row="scope.row"></slot>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
export default {
  name: "publicTable",
  props: {
    // v-model的值
    title: {
      type: Array,
      default: () => {
        return []
      },
    },
  },
  watch: {
    title: {
      handler(newVal, onload) {
        if (newVal && newVal.length>0) {
          this.tableTitle = newVal.filter(item => { return !item.type });
          this.tableTitleType = newVal.filter(item => { return item.type });
        }
      },
      deep: true,
      immediate: true,
    },
  },
  data() {
    return {
      tableTitle: [],
      tableTitleType: [],
    };
  },
  mounted() {},
  methods: {},
};
</script>
<style scoped>
  .public-table {
    
  }
</style>