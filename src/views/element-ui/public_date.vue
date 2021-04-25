<template>
  <div class="public-date">
    <el-form
      :model="dateObj"
      :label-position="labelPosition"
      :rules="formRules"
      :ref="dateObj.ref"
      :label-width="labelWidth"
      :class="{'flex-align': showIcon}"
    >
      <div v-if="showIcon" :class="['icon', 'icon-margin', dateObj.icon]" :style="{ 'width': dateObj.icon_width, 'height': dateObj.icon_height, 'margin': dateObj.icon_margin }"></div>
      <el-form-item
        :label="title"
        :prop="prop ? 'defaultDate' : ''"
        class="flex-align"
      >
        <div class="date-box flex" @mouseover="mouseOver" @mouseleave="mouseLeave">
          <div v-show="suffixIconShow || readonly" :class="['suffix-icon',skin]"></div>
          <el-date-picker
            v-model="dateObj.defaultDate"
            :type="type"
            :readonly="readonly"
            :disabled="disabled"
            :editable="editable"
            :clearable="clearable"
            :validate-event="validateEvent"
            :format="format"
            :picker-options="getPickerOptions"
            :default-time="defaultTime"
            :value-format="valueFormat"
            :placeholder="placeholder"
            :size="size"
            :range-separator="rangeSeparator"
            :start-placeholder="startPlaceholder"
            :end-placeholder="endPlaceholder"
            @change="changeDate"
            @blur="getBlur(dateObj.defaultDate,$event)"
            @focus="getFcus(dateObj.defaultDate,$event)"
          ></el-date-picker>
        </div>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: "publicDate",
  props: {
    defaultDate: {
      type: [String, Array],
      default: () => {},
    },
    dateObj: {
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
    // 显示的快捷提示
    pickerOptions: {
      type: Object,
      default: () => {},
    },
    // 是否禁用选择日期
    disabledDate: {
      type: Boolean,
      default: () => {
        return false;
      },
    },
    // 是否显示左侧标题
    showTitle: {
      type: Boolean,
      default: () => {
        return true;
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
    // 文本框是否可输入
    editable: {
      type: Boolean,
      default: () => {
        return true;
      },
    },
    // 选择框大小
    size: {
      type: String,
      default: () => {
        return 'medium'
      },
    },
    // 输入时是否触发表单的校验
    validateEvent: {
      type: Boolean,
      default: () => {
        return false;
      },
    },
    // 日期时间类型
    type: {
      type: String,
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
    // 左侧标题
    title: {
      type: [Number, String],
      default: () => {},
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
    // 显示的时分秒格式
    defaultTime: {
      type: [String, Array],
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
  },
  model: {
    prop: 'defaultDate',
  },
  watch: {
    dateObj: {
      handler(newVal, onload) {
        if (newVal) {
          let { defaultDate,disabledDate,code } = newVal;
          // console.log(newVal);
          let date = disabledDate ? new Date(disabledDate).getTime() : 0;
          this.getPickerOptions = Object.assign({}, this.getPickerOptions, {
            shortcuts: this.pickerOptions.shortcuts,
            disabledDate: (time) => {
              return code == "start" && disabledDate ? time.getTime() > date : code == "end" ? time.getTime() < date : false;
            }
          })
          // if (code) {
          //   this.changeDate(defaultDate);
          // }
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
        defaultDate: [{ required: true, message: this.placeholder, trigger: "change" }],
      },
      getPickerOptions: {
        // shortcuts: [
        //   {
        //     text: "今天",
        //     onClick(picker) {
        //       picker.$emit("pick", new Date());
        //     },
        //   },
        //   {
        //     text: "昨天",
        //     onClick(picker) {
        //       const date = new Date();
        //       date.setTime(date.getTime() - 3600 * 1000 * 24);
        //       picker.$emit("pick", date);
        //     },
        //   },
        //   {
        //     text: "一周前",
        //     onClick(picker) {
        //       const date = new Date();
        //       date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
        //       picker.$emit("pick", date);
        //     },
        //   },
        // ],
      },
    };
  },
  mounted() {
    this.dateObj.defaultDate = this.defaultDate;
    let skin = localStorage.getItem("skin");
    this.skin = skin ? skin : "black";
  },
  methods: {
    // 鼠标移入
    mouseOver() {
      if (this.dateObj.defaultDate && !this.disabled && this.clearable) {
        this.suffixIconShow = false
      }
    },
    // 鼠标移出
    mouseLeave() {
      if (this.dateObj.defaultDate && !this.disabled && this.clearable) {
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
    changeDate(val) {
      this.$emit("change", val);
      if (val == null) {
        this.suffixIconShow = true
      }
    },
    // 触发表单验证
    getFormRules() {
      let flag = undefined;
      this.$refs[this.dateObj.ref].validate((valid) => {
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
      this.$refs[this.dateObj.ref].resetFields();
    },
  },
};
</script>

<style lang="scss" scoped>
.public-date {
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
        .date-box {
          width: 100%;
          position: relative;
          .suffix-icon {
            position: absolute;
            right: 10px;
            top: 50%;
            width: 15px;
            height: 15px;
            z-index: 10;
            background-repeat: no-repeat;
            transform: translateY(-50%);
          }
          .black {
            background: url("../../assets/img/riqihb.png");
            background-size: 100% 100%;
          }
          .white {
            background: url("../../assets/img/riqibb.png");
            background-size: 100% 100%;
          }
          .el-date-editor--datetimerange {
            padding: 0 30px 0 15px;
          }
          .el-date-editor {
            width: 100%;
            .el-input__prefix {
              display: none;
            }
            .el-range-input {
              color: var(--elInnerColor19);
            }
            .el-icon-time {
              display: flex;
              align-items: center;
              justify-content: center;
            }
            .el-range-input {
              color: var(--elInnerColor19);
              width: 45%;
            }
            .el-range-separator {
              width: 10%;
              padding: 0;
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
