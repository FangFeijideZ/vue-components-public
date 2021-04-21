<template>
  <div :class="['public-pagination',{'page-flex': paginationObj.showRight}]">
    <el-pagination
      :style="{'text-align': paginationObj.text_align}"
      :total="paginationObj.total"
      :small="paginationObj.small"
      :disabled="paginationObj.disabled"
      :pager-count="paginationObj.pagerCount"
      :page-size.sync="paginationObj.pageSize"
      :page-sizes.sync="paginationObj.pageSizes"
      :current-page.sync="paginationObj.currentPage"
      :hide-on-single-page="paginationObj.hideOnSinglePage"
      :background="paginationObj.background ? paginationObj.background : true"
      :layout="paginationObj.layout ? paginationObj.layout : 'prev, pager, next, sizes, jumper'"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    ></el-pagination>
    <div v-if="paginationObj.showRight" class="right-data">
      <span>{{`每页${paginationObj.limitSizes ? paginationObj.limitSizes : 20}条`}}</span>&nbsp;
      <span>{{`共${paginationObj.total ? paginationObj.total : 20}条`}}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "publicPagination",
  props: {
    paginationObj: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {}
  },
  methods: {
    handleSizeChange(val) {
      this.paginationObj.limitSizes = val;
      this.$emit("change", this.paginationObj);
      // if (this.autoScroll) {
      //   scrollTo(0, 800);
      // }
    },
    handleCurrentChange(val) {
      this.$emit("change", this.paginationObj);
      // if (this.autoScroll) {
      //   scrollTo(0, 800);
      // }
    },
  },
};
</script>

<style scoped lang="scss">
  .public-pagination {
    .right-data {
      font-size: 13px;
      color: var(--elInnerColor03);
    }
    ::v-deep.el-pagination {
      padding: 0;
      .btn-next {
        margin-right: 0;
      }
      .btn-prev {
        margin-left: 0;
      }
      .el-pagination__sizes {
        margin-right: 0;
        .el-select {
          .el-input {
            margin-right: 0;
          }
        }
      }
    }
  }
  .page-flex {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
</style>
