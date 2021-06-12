<template>
  <div class="public-drag">
    <div class="drag-box flex-column" id="dragBox" v-drag-resize="dragResize">
      <div class="drag-head flex-align">
        <div class="title flex-align" v-drag-move="dragMove">
          <el-button size="mini" type="primary" @click="dragMoveOpen">{{dragTitle}}</el-button>
          <el-button size="mini" type="primary" @click="dragResizeOpen">{{dragResizeTitle}}</el-button>
        </div>
        <div class="operation flex-align flex-end">
          <i class="el-icon-minus" v-drag-min="dragId"></i>
          <i class="el-icon-border" v-drag-max="dragId"></i>
          <i class="el-icon-close" v-drag-close="dragClose"></i>
          <!-- <i class="el-icon-close" v-drag-close="dragId"></i> -->
          <!-- <i class="el-icon-border" v-drag-max="dragMax"></i> -->
        </div>
      </div>
      <div class="drag-body flex-align-center">123</div>
    </div>
  </div>
</template>
<script>
export default {
  name: "publicDrag",
  data() {
    return {
      dragMoveShow: false,
      dragResizeShow: false,
      dragTitle: '开启拖拽',
      dragResizeTitle: '开启缩放',
      dragMove: '',
      dragResize: '',
      dragId: "dragBox",
      dragIdClose: "",
    };
  },
  mounted() {
   
  },
  computed: {
    
  },
  methods: {
    dragMoveOpen() {
      this.dragMoveShow = !this.dragMoveShow;
      this.dragTitle = this.dragMoveShow ? "关闭拖拽" : "开启拖拽";
      this.dragMove = this.dragMoveShow ? this.dragId : '';
    },
    dragResizeOpen() {
      this.dragResizeShow = !this.dragResizeShow;
      this.dragResizeTitle = this.dragResizeShow ? "关闭缩放" : "开启缩放";
      this.dragResize = this.dragResizeShow ? this.dragId : '';
    },
    dragClose(e, binding, vnode, event) {
      console.log(e, binding, vnode, event);
      vnode.context.$el.removeChild(dragBox)
    },
    dragMax(e, binding, vnode, event) {
      console.log(e, binding, vnode, event);
      let dragId = undefined;
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        dragId = 'dragBox';
        return dragId
      }).catch(() => {
        dragId = '';
        return dragId
      });
    },
  }
};
</script>
<style lang="scss" scoped>
  .public-drag {
    height: 100%;
    // --width: 30%;
    // --height: 40%;
    .drag-box {
      position: absolute;
      width: 30%;
      height: 40%;
      // left: 50%;
      // top: 50%;
      // transform: translate(-50%, -50%);
      // width: var(--width);
      // height: var(--height);
      // left: calc((100% - var(--width)) / 2);
      // top: calc((100% - var(--height)) / 2);
      z-index: 2000;
      border: 1px solid #A1B4B0;
      border-radius: 5px;
      background: #e9e9e9;
      box-shadow: 0 1px 3px 2px #ccc;
      .drag-head {
        flex: 0 0 40px;
        border-bottom: 1px solid #A1B4B0;
        .title {
          flex: 1;
          height: 100%;
          padding-left: 20px;
        }
        .operation {
          flex: 0 0 40px;
          height: 100%;
          padding-right: 20px;
          z-index: 2022;
          // .el-icon-border {
          //   width: 10px;
          //   height: 10px;
          //   border: 1px solid #879290;
          //   margin: 0 10px;
          //   cursor: pointer
          // }
        }
      }
      .drag-body {
        flex: 1;
        padding: 0 5% 5% 5%;
      }
    }
  }
</style>