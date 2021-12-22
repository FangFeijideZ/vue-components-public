<template>
  <div class="public-time">
    <el-form :model="timeObj" :rules="formRules" v-bind="$attrs" :ref="timeObj.ref">
      <el-form-item v-bind="$attrs" :prop="$attrs.prop || $attrs.prop === '' ? 'defaultTime' : ''">
        <el-time-select v-model="timeObj.defaultTime" v-bind="$attrs" v-on="$listeners" v-if="$attrs.type == 'timeselect'"></el-time-select>
        <el-time-picker v-model="timeObj.defaultTime" v-bind="$attrs" v-on="$listeners" v-else></el-time-picker>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  inheritAttrs: false, // true 会把父组件传过来的属性放到子组件的根元素上
  name: "publicTime",
  model: {
    prop: 'defaultTime',
    event: 'change' // v-model 事件触发方式
  },
  props: {
    // v-model的值
    defaultTime: {
      type: [String, Number],
      default: () => {},
    },
    // 表单验证方式
    validator: {
      type: undefined,
      default: () => {
        return undefined
      },
    },
  },
  watch: {
    defaultTime: {
      handler(newVal, onload) {
        if (newVal) {
          this.timeObj.defaultTime = newVal;
        }
      },
      deep: true,
      immediate: true,
    },
  },
  data() {
    return {
      timeObj: {
        defaultTime: "",
        ref: 'formRefTime'
      },
      formRules: {
        defaultTime: [
          { 
            required: true,
            message: this.validator ? '' : this.$attrs.placeholder,
            validator: this.validator,
            trigger: "change"
          }
        ],
      },
    }
  },
  mounted() {

  },
  methods: {
    // 触发表单验证
    validate() {
      let flag = false;
      this.$refs[this.timeObj.ref].validate((valid) => {
        if (valid) {
          flag = true;
        }
      });
      return flag;
    },
    // 清除表单验证和表单的值
    resetFields() {
      this.$refs[this.timeObj.ref].resetFields();
    },
    // 清除表单验证，不清除值
    clearValidate() {
      this.$refs[this.timeObj.ref].clearValidate();
    },
  },
}
</script>

<style scoped>
  .public-time {
    
  }
  .el-date-editor {
    width: 100%;
  }
</style>