<template>
  <div class="public-confirm" v-if="visible" @click="confirmClick">
    <div class="message-box" @click.stop="messageBoxClick">
      <div class="header-box">{{title}}</div>
      <div class="content-box" v-if="!dangerouslyUseHTMLString">{{content}}</div>
      <div class="content-box" v-if="dangerouslyUseHTMLString" v-html="content"></div>
      <div class="footer-box">
        <el-button size="small" type="primary" @click.stop="confirmButtonClick">保存</el-button>
        <el-button size="small" @click.stop="cancelButtonClick">{{cancelButtonText}}</el-button>
        <el-button size="small" type="primary" @click.stop="confirmButtonClick">{{confirmButtonText}}</el-button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "publicConfirm",
  props: {
    title: {
      type: String,
      default: ()=>{
        return '提示'
      }
    },
    content: {
      type: String,
      default: ()=>{
        return ''
      }
    },
    confirmButtonText: {
      type: String,
      default: ()=>{
        return '确定'
      }
    },
    cancelButtonText: {
      type: String,
      default: ()=>{
        return '取消'
      }
    },
    dangerouslyUseHTMLString: {
      type: Boolean,
      default: ()=>{
        return false
      }
    },
  },
  data() {
    return {
      visible: false,
    }
  },
  mounted() {

  },
  methods: {
    confirmClick() {
      this.visible = false;
    },
    messageBoxClick() {

    },
    cancelButtonClick() {
      this.cancel();
      this.visible = false;
    },
    confirmButtonClick() {
      this.confirm();
      this.visible = false;
    }
  }
}
</script>

<style lang="scss">
  .public-confirm {
    position: fixed;
    top: 0px;
    bottom: 0px;
    left: 0px;
    right: 0px;
    background-color: rgba(128, 128, 128, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    .message-box {
      display: inline-block;
      width: 420px;
      padding-bottom: 10px;
      vertical-align: middle;
      text-align: left;
      background-color: #ffffff;
      box-shadow: #0000001a 0px 2px 12px 0px;
      border: 1px solid #ebeef5;
      border-radius: 4px;
      .header-box {
        padding: 10px;
        font-size: 18px;
      }
      .content-box {
        padding: 10px;
      }
      .footer-box {
        display: flex;
        justify-content: flex-end;
        padding: 10px 10px 0 10px;
      }
    }
  }
</style>