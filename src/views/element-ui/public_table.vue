<template>
  <div class="public-table">
    <el-table v-bind="$attrs" v-on="$listeners">
      <el-table-column v-bind="item" v-for="item in $attrs.title" :key="item.id">
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
  data() {
    return {};
  },
  mounted() {},
  methods: {},
};
</script>
<style scoped>
.public-table {
  
}
</style>