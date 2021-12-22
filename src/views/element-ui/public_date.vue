<template>
  <div class="public-date">
    <el-form :model="dateObj" :rules="formRules" v-bind="$attrs" :ref="dateObj.ref">
      <el-form-item v-bind="$attrs" :prop="$attrs.prop || $attrs.prop === '' ? 'defaultDate' : ''">
        <el-date-picker v-model="dateObj.defaultDate" v-bind="$attrs" v-on="$listeners"></el-date-picker>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  inheritAttrs: false, // true 会把父组件传过来的属性放到子组件的根元素上
  name: "publicDate",
  model: {
    prop: 'defaultDate',
    event: 'change' // v-model 事件触发方式
  },
  props: {
    // v-model的值
    defaultDate: {
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
    defaultDate: {
      handler(newVal, onload) {
        if (newVal) {
          this.dateObj.defaultDate = newVal;
        }
      },
      deep: true,
      immediate: true,
    },
  },
  data() {
    return {
      dateObj: {
        defaultDate: "",
        ref: 'formRefDate'
      },
      formRules: {
        defaultDate: [
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
      this.$refs[this.dateObj.ref].validate((valid) => {
        if (valid) {
          flag = true;
        }
      });
      return flag;
    },
    // 清除表单验证和表单的值
    resetFields() {
      this.$refs[this.dateObj.ref].resetFields();
    },
    // 清除表单验证，不清除值
    clearValidate() {
      this.$refs[this.dateObj.ref].clearValidate();
    },
  },
}
</script>

<style scoped>
  .public-date {
    
  }
  .el-date-editor {
    width: 100%;
  }
</style>