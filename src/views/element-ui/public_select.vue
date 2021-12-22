<template>
  <div class="public-select">
    <el-form :model="selectObj" :rules="formRules" v-bind="$attrs" :ref="selectObj.ref">
      <el-form-item v-bind="$attrs" :prop="$attrs.prop || $attrs.prop === '' ? 'defaultType' : ''">
        <el-select v-model="selectObj.defaultType" v-bind="$attrs" v-on="$listeners">
          <el-option
            v-for="item in $attrs.options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
            :disabled="item.disabled">
            <slot :row="item"></slot>
            <!-- <slot name="row" :row="item"></slot> -->
          </el-option>
        </el-select>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  inheritAttrs: false, // true 会把父组件传过来的属性放到子组件的根元素上
  name: "publicSelect",
  model: {
    prop: 'defaultType',
    event: 'change' // v-model 事件触发方式
  },
  props: {
    // v-model的值
    defaultType: {
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
    defaultType: {
      handler(newVal, onload) {
        if (newVal) {
          this.selectObj.defaultType = newVal;
        }
      },
      deep: true,
      immediate: true,
    },
  },
  data() {
    return {
      selectObj: {
        defaultType: "",
        ref: 'formRefSelect'
      },
      formRules: {
        defaultType: [
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
    getInputValue(val) {
      // console.log(val);
      // this.$emit('input',123)
    },
    // 触发表单验证
    validate() {
      let flag = false;
      this.$refs[this.selectObj.ref].validate((valid) => {
        if (valid) {
          flag = true;
        }
      });
      return flag;
    },
    // 清除表单验证和表单的值
    resetFields() {
      this.$refs[this.selectObj.ref].resetFields();
    },
    // 清除表单验证，不清除值
    clearValidate() {
      this.$refs[this.selectObj.ref].clearValidate();
    },
  },
}
</script>

<style scoped>
  .public-select {
    
  }
  .el-select {
    width: 100%;
  }
</style>