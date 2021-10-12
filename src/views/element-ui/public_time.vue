<template>
  <div class="public-time">
    <el-form
      :model="timeObj"
      :label-position="labelPosition"
      :rules="formRules"
      :ref="timeObj.ref"
      :label-width="labelWidth"
      :class="{'flex-align': showIcon}"
    >
      <div v-if="showIcon" :class="['icon', 'icon-margin', timeObj.icon]" :style="{ 'width': timeObj.icon_width, 'height': timeObj.icon_height, 'margin': timeObj.icon_margin }"></div>
      <el-form-item
        :label="title"
        :prop="prop ? 'defaultTime' : ''"
        class="flex-align"
      >
        <div class="time-box flex" @mouseover="mouseOver" @mouseleave="mouseLeave">
          <div v-show="suffixIconShow || readonly" :class="['suffix-icon',skin]"></div>{{defaultValue}}
          <el-time-picker
            v-model="timeObj.defaultTime"
            :readonly="readonly"
            :disabled="disabled"
            :editable="editable"
            :clearable="clearable"
            :format="format"
            :is-range="isRange"
            :align="align"
            :value-format="valueFormat"
            :default-value="defaultValue"
            :picker-options="pickerOptions"
            :placeholder="placeholder"
            :size="size"
            :range-separator="rangeSeparator"
            :start-placeholder="startPlaceholder"
            :end-placeholder="endPlaceholder"
            @change="changeTime"
            @blur="getBlur(timeObj.defaultTime,$event)"
            @focus="getFcus(timeObj.defaultTime,$event)"
          >
          </el-time-picker>
          <!-- :picker-options="{selectableRange: '09:30:00 - 20:30:00'}" -->
        </div>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: "publicTime",
  props: {
    defaultTime: {
      type: [String, Array],
      default: () => {},
    },
    timeObj: {
      type: Object,
      default: () => {},
    },
    // 是否开启多选
    multiple: {
      type: Boolean,
      default: () => {
        return false;
      },
    },
    // 多选时是否将选中值按文字的形式还是按标签展示
    collapseTags: {
      type: Boolean,
      default: () => {
        return false;
      },
    },
    // 是否可搜索
    filterable: {
      type: Boolean,
      default: () => {
        return false;
      },
    },
    // 是否开启表单验证
    prop: {
      type: Boolean,
      default: () => {
        return false;
      },
    },
    // 是否显示左侧标题的图标
    showIcon: {
      type: Boolean,
      default: () => {
        return false;
      },
    },
    // 是否禁用选择日期
    disabledTime: {
      type: Boolean,
      default: () => {
        return false;
      },
    },
    // 是否禁用
    disabled: {
      type: Boolean,
      default: () => {
        return false;
      },
    },
    // 是否可以清空选项
    clearable: {
      type: Boolean,
      default: () => {
        return true;
      },
    },
    // 显示的占位提示文字
    placeholder: {
      type: String,
      default: () => {},
    },
    // 是否完全只读	
    readonly: {
      type: Boolean,
      default: () => {
        return false;
      },
    },
    // 文本框是否可输入
    editable: {
      type: Boolean,
      default: () => {
        return true;
      },
    },
    // 是否为时间范围选择
    isRange: {
      type: Boolean,
      default: () => {
        return false;
      },
    },
    // 时间选择框大小
    size: {
      type: String,
      default: () => {
        return 'medium'
      },
    },
    // 选择框显示的位置
    align: {
      type: String,
      default: () => {
        return 'left'
      },
    },
    // 显示的日期时间格式
    format: {
      type: [String, Array],
      default: () => {},
    },
    // 获取的日期时间格式
    valueFormat: {
      type: [String, Array],
      default: () => {},
    },
    // 左侧标题
    title: {
      type: [Number, String],
      default: () => {},
    },
    // 标题显示的位置
    labelPosition: {
      type: String,
      default: () => {
        return 'left'
      },
    },
    // 标题的宽度
    labelWidth: {
      type: [Number, String],
      default: () => {},
    },
    // 选择范围时的分隔符	
    rangeSeparator: {
      type: String,
      default: () => {},
    },
    // 范围选择时开始日期的占位内容	
    startPlaceholder: {
      type: String,
      default: () => {},
    },
    // 范围选择时结束日期的占位内容	
    endPlaceholder: {
      type: String,
      default: () => {},
    },
    // 时间选择器打开时默认显示的时间
    defaultValue: {
      type: [String, Array],
      default: () => {},
    },
  },
  model: {
    prop: 'defaultTime',
  },
  watch: {
    timeObj: {
      handler(newVal, onload) {
        if (newVal) {
          let { defaultTime,disabledTime,code } = newVal;
          // console.log(newVal);
          let startTime = disabledTime ? disabledTime : '23:59:59';
          let endTime = disabledTime ? disabledTime : '00:00:00';
          this.pickerOptions = {
            selectableRange: code == "start" ? `00:00:00 - ${startTime}` : code == "end" ? `${endTime} - 23:59:59` : "00:00:00 - 23:59:59"
          }
        }
      },
      deep: true,
      // immediate: true,
    },
    defaultTime: {
      handler(newVal, onload) {
        if (newVal) {
          this.timeObj.defaultTime = newVal
          // console.log(newVal);
        }
      },
      deep: true,
      // immediate: true,
    },
  },
  data() {
    return {
      skin: "",
      suffixIconShow: true,
      formRules: {
        defaultTime: [{ required: true, message: this.placeholder, trigger: "change" }],
      },
      pickerOptions: {}
    };
  },
  mounted() {
    // this.timeObj.defaultTime = this.defaultTime;
    let skin = localStorage.getItem("skin");
    this.skin = skin ? skin : "black";
    // let prevBtn = document.querySelector('.el-range-editor');
    // prevBtn.children[1].style = "text-align: left;"
  },
  methods: {
    // 鼠标移入
    mouseOver() {
      if (this.timeObj.defaultTime && !this.disabled && this.clearable) {
        this.suffixIconShow = false
      }
    },
    // 鼠标移出
    mouseLeave() {
      if (this.timeObj.defaultTime && !this.disabled && this.clearable) {
        this.suffixIconShow = true
      }
    },
    // 获得焦点
    getFcus(val,e) {
      this.$emit("fcus", val);
    },
    // 失去焦点
    getBlur(val,e) {
      this.$emit("blur", val);
    },
    // 改变事件
    changeTime(val) {
      this.$emit("change", val);
      if (val == null) {
        this.suffixIconShow = true
      }
    },
    // 触发表单验证
    getFormRules() {
      let flag = undefined;
      this.$refs[this.timeObj.ref].validate((valid) => {
        if (valid) {
          flag = true;
        } else {
          flag = false;
        }
      });
      return flag;
    },
    // 清除表单验证
    cleanFormRule() {
      this.$refs[this.timeObj.ref].resetFields();
    },
  },
};
</script>

<style lang="scss" scoped>
.public-time {
  width: 100%;
  font-size: 13px;
  .flex {
    display: flex;
  }
  .flex-align {
    display: flex;
    align-items: center;
  }
  .flex-align-center {
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .el-form {
    width: 100%;
    .el-form-item {
      margin-bottom: 0px;
      flex: 1;
      ::v-deep.el-form-item__content {
        flex: 1;
        display: flex;
        height: 100%;
        margin-left: 0 !important;
        .time-box {
          width: 100%;
          position: relative;
          .suffix-icon {
            position: absolute;
            right: 10px;
            top: 50%;
            width: 15px;
            height: 15px;
            background-repeat: no-repeat;
            transform: translateY(-50%);
            z-index: 2;
          }
          .black {
            background: url("./img/24sdhb.png");
            background-size: 100% 100%;
          }
          .white {
            background: url("./img/24sdbb.png");
            background-size: 100% 100%;
          }
          .el-date-editor {
            width: 100%;
            .el-input__prefix {
              display: none;
            }
            .el-range-input {
              color: var(--elInnerColor19);
              // text-align: right;
              width: 45%;
            }
            .el-range-separator {
              width: 10%;
              padding: 0;
              display: flex;
              align-items: center;
              justify-content: center;
            }
            .el-icon-time {
              display: flex;
              align-items: center;
              justify-content: center;
            }
            .el-range__close-icon {
              position: absolute;
              right: 4px;
            }
            .el-range__icon {
              display: none;
            }
          }
          .el-range-editor {
            padding: 0 30px 0 15px;
          }
        }
      }
    }
    .icon {
      width: 20px;
      height: 20px;
    }
    .icon-margin {
      margin: 0 5px 0 0;
    }
  }
  .dtqwBg76 {
    background: var(--dtqwBg76);
    background-size: 100% 100%;
  }
}
</style>
