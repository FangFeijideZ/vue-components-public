<template>
  <div class="public-input">
    <el-form :model="inputObj" :rules="formRules" v-bind="$attrs" :ref="inputObj.ref">
      <el-form-item v-bind="$attrs" :prop="$attrs.prop || $attrs.prop === '' ? 'defaultValue' : ''">
        <div class="flex public-input-main">
          <div class="zyh-slot-prepend">
            <slot name="prepend"></slot>
          </div>
          <div class="zyh-input"
            @mouseenter="getMouseover(inputObj.defaultValue,$event)"
            @mouseleave="getMouseleave(inputObj.defaultValue,$event)">
            <div class="zyh-slot-prefix"><slot name="prefix"></slot></div>
            <el-input 
              v-model="inputObj.defaultValue" 
              v-bind="$attrs" 
              v-on="$listeners" 
              @input="getInputValue" 
              @blur="getInputBlur(inputObj.defaultValue,$event)"
              @focus="getInputFcus(inputObj.defaultValue,$event)"
              :class="inputClassName"></el-input>
            <div :class="[{'zyh-append-right': inputAppend},'zyh-slot-suffix']"><slot name="suffix"></slot></div>
          </div>
          <div class="zyh-slot-append">
            <slot name="append"></slot>
          </div>
        </div>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  inheritAttrs: false, // true 会把父组件传过来的属性放到子组件的根元素上
  name: "publicInput",
  model: {
    prop: 'defaultValue',
    event: 'change' // v-model 事件触发方式
  },
  props: {
    // v-model的值
    defaultValue: {
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
    defaultValue: {
      handler(newVal, onload) {
        if (newVal) {
          this.inputObj.defaultValue = newVal;
        }
      },
      deep: true,
      immediate: true,
    },
  },
  data() {
    return {
      inputClassName: '',
      inputAppend: false,
      inputFcus: false,
      inputObj: {
        defaultValue: "",
        ref: 'formRefInput'
      },
      formRules: {
        defaultValue: [
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
    for (const k in this.$slots) {
      this.inputClassName += `zyh-input-${k} `
    }
  },
  methods: {
    // 输入事件
    getInputValue(val) {
      // console.log(val);
      // this.$emit('input',123)
      this.getClearableChange(val,'input');
    },
    // 获得焦点
    getInputFcus(val) {
      this.getClearableChange(val,'fcus');
    },
    // 失去焦点
    getInputBlur(val) {
      this.getClearableChange(val,'blur');
    },
    // 鼠标进入
    getMouseover(val) {
      this.getClearableChange(val,'over');
    },
    // 鼠标离开
    getMouseleave(val) {
      this.getClearableChange(val,'leave');
    },
    // 显示和关闭
    getClearableChange(val,event) {
      let { clearable } = this.$attrs;
      let { suffix } = this.$slots;
      let flag = val && (clearable == '' || clearable) && (suffix == '' || suffix);
      if (event == 'input') {
        this.inputAppend = flag;
        this.inputFcus = true;
      } else if (event == 'blur' && flag) {
        this.inputAppend = false;
        this.inputFcus = false;
      } else if (event == 'fcus' && flag) {
        this.inputAppend = true;
        this.inputFcus = true;
      } else if (event == 'leave' && flag && !this.inputFcus) {
        this.inputAppend = false;
      } else if (event == 'over' && flag) {
        this.inputAppend = true;
      }
    },
    // 触发表单验证
    validate() {
      let flag = false;
      this.$refs[this.inputObj.ref].validate((valid) => {
        if (valid) {
          flag = true;
        }
      });
      return flag;
    },
    // 清除表单验证和表单的值
    resetFields() {
      this.$refs[this.inputObj.ref].resetFields();
    },
    // 清除表单验证，不清除值
    clearValidate() {
      this.$refs[this.inputObj.ref].clearValidate();
    },
  },
}
</script>

<style scoped>
  .public-input {

  }
  .public-input-main {
    
  }
  .zyh-input {
    width: 100%;
    position: relative;
  }
  .zyh-slot-suffix,
  .zyh-slot-prefix {
    position: absolute;
    top: 0;
    z-index: 2500;
  }
  .zyh-slot-suffix {
    right: 0;
  }
  .zyh-slot-prepend >>>.el-input__inner {
    border-top-right-radius: 0px;
    border-bottom-right-radius: 0px;
    border-right: 0px;
  }
  .zyh-slot-append >>>.el-input__inner {
    border-top-left-radius: 0px;
    border-bottom-left-radius: 0px;
    border-left: 0px;
  }
  .zyh-input-prefix >>>.el-input__inner {
    padding-left: 25px;
  }
  .zyh-input-prepend >>>.el-input__inner {
    border-top-left-radius: 0px;
    border-bottom-left-radius: 0px;
  }
  .zyh-input-append >>>.el-input__inner {
    border-top-right-radius: 0px;
    border-bottom-right-radius: 0px;
  }
  .zyh-append-right {
    right: 25px;
  }
</style>