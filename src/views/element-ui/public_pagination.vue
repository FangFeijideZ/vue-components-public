<template>
  <div class="public-pagination">
    <el-pagination
      v-bind="$attrs"
      v-on="$listeners"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    ></el-pagination>
  </div>
</template>

<script>
export default {
  name: "publicPagination",
  data() {
    return {
      pageInfo: {}
    }
  },
  methods: {
    handleSizeChange(val) {
      console.log(val);
      // this.pageInfo.pageSize = val;
      // this.$emit("change", this.pageInfo);
    },
    handleCurrentChange(val) {
      console.log(val);
      // this.pageInfo.currentPage = val;
      // this.$emit("change", this.pageInfo);
    },
  },
};
</script>

<style scoped>
  .public-pagination {

  }
</style>
