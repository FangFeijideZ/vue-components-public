<template>
  <div class="public-input">
    <el-form
      :model="inputObj"
      :label-position="labelPosition"
      :rules="formRules"
      :ref="inputObj.ref"
      :label-width="labelWidth"
      :class="{'flex-align': showIcon}"
    >
      <div v-if="showIcon" :class="['icon', 'icon-margin', inputObj.icon]" :style="{ 'width': inputObj.icon_width, 'height': inputObj.icon_height, 'margin': inputObj.icon_margin }"></div>
      <el-form-item
        :label="title"
        :prop="prop ? 'defaultValue' : ''"
        class="flex-align"
      >
        <div class="input-box flex" @mouseover="mouseOver" @mouseleave="mouseLeave">
          <el-input
            v-if="type == undefined || type == 'textarea'"
            v-model="inputObj.defaultValue"
            ref="inputRef"
            :disabled="disabled"
            :clearable="clearable"
            :maxlength="maxlength"
            :minlength="minlength"
            :resize="resize"
            :show-password="showPassword"
            :show-word-limit="showWordLimit"
            :type="type"
            :size="size"
            :class="{'border-right-none': showButton, 'border-left-none': showSelect, 'padding-left': showPrefixButton, 'padding-right': inputFcus}"
            :autosize="{ minRows: minRows, maxRows: maxRows }"
            :placeholder="placeholder"
            @focus="getFcus(inputObj.defaultValue,$event)"
            @blur="getBlur(inputObj.defaultValue,$event)"
            @input="getInputValue"
            @change="changeValue"
            @clear="clearValue"
          >
            <el-select
              v-if="showSelect"
              slot="prepend"
              v-model="inputObj.defaultType"
              @change="getSelect"
              @clear="clearSelectValue"
              :multiple="multiple"
              :collapse-tags="collapseTags"
              :clearable="clearable"
              :disabled="disabled"
              :placeholder="selectPlaceholder"
              :filterable="filterable"
              :size="size"
            >
              <el-option
                v-for="(item, index) in inputObj.typeOptions"
                :key="index"
                :label="item.label"
                :value="item.code"
              >
              </el-option>
            </el-select>
            <div v-if="showPrefixButton" slot="prefix" @click="btnClick(inputObj.defaultValue)" :class="['icon', 'icon-button', inputObj.button_icon_left, skin]" :style="{ 'width': inputObj.button_width, 'height': inputObj.button_height, 'margin': inputObj.button_margin }"></div>
            <div v-if="showSuffixButton" slot="suffix" @click="btnClick(inputObj.defaultValue)" :class="['icon', 'icon-button', inputObj.button_icon_right, skin]" :style="{ 'width': inputObj.button_width, 'height': inputObj.button_height, 'margin': inputObj.button_margin }"></div>
          </el-input>
          <el-autocomplete
            v-if="type == 'autocomplete'"
            v-model="inputObj.defaultValue"
            ref="inputRef"
            :disabled="disabled"
            :clearable="clearable"
            :maxlength="maxlength"
            :minlength="minlength"
            :show-password="showPassword"
            :show-word-limit="showWordLimit"
            :fetch-suggestions="querySearch"
            :trigger-on-focus="triggerOnFocus"
            :size="size"
            :class="{'border-right-none': showButton, 'border-left-none': showSelect, 'padding-left': showPrefixButton, 'padding-right': inputFcus}"
            :placeholder="placeholder"
            @clear="clearValue"
            @blur="getBlur(inputObj.defaultValue,$event)"
            @focus="getFcus(inputObj.defaultValue,$event)"
            @input="getInputValue"
            @select="handleSelect"
          >
            <div v-if="showPrefixButton" slot="prefix" @click="btnClick(inputObj.defaultValue)" :class="['icon', 'icon-button', inputObj.button_icon_left, skin]" :style="{ 'width': inputObj.button_width, 'height': inputObj.button_height, 'margin': inputObj.button_margin }"></div>
            <div v-if="showSuffixButton" slot="suffix" @click="btnClick(inputObj.defaultValue)" :class="['icon', 'icon-button', inputObj.button_icon_right, skin]" :style="{ 'width': inputObj.button_width, 'height': inputObj.button_height, 'margin': inputObj.button_margin }"></div>
          </el-autocomplete>
          <div v-if="showButton" class="flex-align" :style="{ 'height': `${inputHeight}px` }">
            <el-button v-if="showButton" :size="size" :disabled="disabled" :style="{ 'height': `${inputInnerHeight}px` }" @click="btnClick(inputObj.defaultValue)">
              <div class="flex-align-center">
                <div :class="['icon', inputObj.button_icon]" :style="{ 'width': inputObj.button_width, 'height': inputObj.button_height, 'margin': inputObj.button_margin }"></div>
                <div class="btn-title" :style="{ 'color': inputObj.button_color, 'font-size': inputObj.button_font_size }">{{inputObj.button_title}}</div>
              </div>
            </el-button>
          </div>
        </div>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: "publicInput",
  props: {
    defaultValue: {
      type: [String, Number],
      default: () => {},
    },
    inputObj: {
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
    // 是否激活即列出输入建议
    triggerOnFocus: {
      type: Boolean,
      default: () => {
        return false;
      },
    },
    // 是否为密码框类型
    showPassword: {
      type: Boolean,
      default: () => {
        return false;
      },
    },
    // 是否显示最长最短验证
    showWordLimit: {
      type: Boolean,
      default: () => {
        return true;
      },
    },
    // 字符最短验证
    minlength: {
      type: [Number, String],
      default: () => {
        return undefined;
      },
    },
    // 字符最长验证
    maxlength: {
      type: [Number, String],
      default: () => {
        return undefined;
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
    // 是否显示右侧按钮
    showButton: {
      type: Boolean,
      default: () => {
        return false;
      },
    },
    // 是否显示下拉选择框
    showSelect: {
      type: Boolean,
      default: () => {
        return false;
      },
    },
    // 是否显示后置按钮
    showSuffixButton: {
      type: Boolean,
      default: () => {
        return false;
      },
    },
    // 是否显示前置按钮
    showPrefixButton: {
      type: Boolean,
      default: () => {
        return false;
      },
    },
    // 左侧标题
    title: {
      type: [Number, String],
      default: () => {},
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
    // 选择框显示的占位提示文字
    selectPlaceholder: {
      type: String,
      default: () => {},
    },
    // 显示的占位提示文字
    placeholder: {
      type: String,
      default: () => {},
    },
    // 输入框类型
    type: {
      type: String,
      default: () => {},
    },
    // 输入框大小
    size: {
      type: String,
      default: () => {
        return 'medium'
      },
    },
    // 文本域拖拽的状态
    resize: {
      type: String,
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
    // 文本域最小高
    minRows: {
      type: [Number, String],
      default: () => {
        return 4;
      },
    },
    // 文本域最大高
    maxRows: {
      type: [Number, String],
      default: () => {
        return undefined;
      },
    },
    // 表单验证方式
    validator: {
      type: undefined,
      default: () => {
        return undefined
      },
    },
  },
  model: {
    prop: 'defaultValue',
    event: 'change'
  },
  watch: {
    inputObj: {
      handler(newVal, onload) {
        if (newVal) {
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
      inputFcus: false,
      inputBlur: false,
      inputHeight: undefined,
      inputInnerHeight: undefined,
      formRules: {
        defaultValue: [{ required: true, message: this.validator ? '' : this.placeholder, validator: this.validator, trigger: "change" }],
      }
    };
  },
  mounted() {
    this.inputObj.defaultValue = this.defaultValue;
    let skin = localStorage.getItem("skin");
    this.skin = skin ? skin : "black";
    this.$nextTick(()=>{
      if (this.$refs.inputRef) {
         this.inputHeight = this.$refs.inputRef.$el.offsetHeight;
        this.inputInnerHeight = this.type == 'autocomplete' ? this.$refs.inputRef.$el.firstElementChild.firstElementChild.offsetHeight : this.$refs.inputRef.$el.firstElementChild.offsetHeight;
      }
    })
  },
  methods: {
    // 鼠标移入
    mouseOver() {
      if (this.showSuffixButton) {
        this.inputFcus = true;
      }
    },
    // 鼠标移出
    mouseLeave() {
      if (this.inputBlur) {
        this.inputFcus = false;
      }
    },
    // 改变事件
    changeValue(val) {
      this.$emit("change", val);
    },
    // 按钮点击事件
    btnClick(val) {
      this.$emit("click", val);
    },
    // 获得焦点
    getFcus(val,e) {
      this.$emit("fcus", val);
      if (this.showSuffixButton) {
        this.inputFcus = true;
        this.inputBlur = false;
      }
    },
    // 失去焦点
    getBlur(val,e) {
      this.$emit("blur", val);
      if (this.showSuffixButton) {
        this.inputFcus = false;
        this.inputBlur = true;
      }
    },
    // 输入事件
    getInputValue(val) {
      if (val && this.showSuffixButton) {
        this.inputFcus = true;
      } else {
        this.inputFcus = false;
      }
      this.$emit("input", val);
    },
    // 清空内容
    clearValue() {
      this.$emit("clear", null);
    },
    // 清空下拉选择框内容
    clearSelectValue() {
      this.$emit("clear", null);
    },
    handleSelect(val) {
      this.$emit("select", val.value);
    },
    // 下拉选择框选择到的数据
    getSelect(val) {
      this.$emit("change", val);
    },
    // 输入建议列表的数据
    querySearch(queryString, cb) {
      let { typeOptions } = this.inputObj;
      if (typeOptions && typeOptions.length>0) {
        typeOptions.forEach(item => {
          item.value = item.label
        });
      }
      let restaurants = typeOptions;
      let results = queryString
        ? restaurants.filter(this.createFilter(queryString))
        : restaurants;
      // 调用 callback 返回建议列表的数据
      cb(results);
    },
    // 截取输入建议列表的数据
    createFilter(queryString) {
      return (restaurant) => {
        return (
          restaurant.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0 || restaurant.code.toLowerCase().indexOf(queryString.toLowerCase()) === 0
        );
      };
    },
    // 触发表单验证
    getFormRules() {
      let flag = undefined;
      this.$refs[this.inputObj.ref].validate((valid) => {
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
      this.$refs[this.inputObj.ref].resetFields();
    },
  },
};
</script>

<style lang="scss" scoped>
.public-input {
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
      .el-button {
        padding: 5px 12px;
        border-left: none;
        border-bottom-left-radius: 0px;
        border-top-left-radius: 0px;
      }
      ::v-deep.el-form-item__content {
        flex: 1;
        display: flex;
        height: 100%;
        margin-left: 0 !important;
        .input-box {
          width: 100%;
          .el-input-group__prepend {
            width: 30%;
            padding: 0;
            border: none;
            background-color: transparent;
             .el-select {
              width: 100%;
              .el-input {
                .el-input__inner {
                  box-sizing: border-box;
                  color: var(--elInnerColor19);
                  border: 1px solid var(--elBorderColor04);
                  border-right: none;
                  padding-right: 30px;
                  border-radius: 4px;
                  border-top-right-radius: 0;
                  border-bottom-right-radius: 0;
                }
                .el-select__caret.is-reverse {
                  margin-right: 0;
                }
              }
            }
          }
          .el-autocomplete {
            width: 100%;
          }
          .el-input__suffix {
            display: flex;
            align-items: center;
            justify-content: center;
            .el-input__suffix-inner {
              display: block;
              height: 100%;
              display: flex;
              align-items: center;
              justify-content: center;
              .icon-button {
                cursor: pointer;
              }
            }
          }
          .el-input__prefix {
            display: flex;
            align-items: center;
            justify-content: center;
            .icon-button {
              cursor: pointer;
            }
          }
          .border-right-none {
            .el-textarea__inner,
            .el-input__inner {
              border-bottom-right-radius: 0px;
              border-top-right-radius: 0px;
            }
          }
          .border-left-none {
            .el-textarea__inner,
            .el-input__inner {
              border-bottom-left-radius: 0px;
              border-top-left-radius: 0px;
            }
          }
          .padding-left {
            .el-input__inner {
              padding-left: 30px;
            }
          }
          .padding-right {
            .el-input__inner {
              padding-right: 55px;
            }
          }
          .el-textarea__inner {
            font-family: 'pingFang';
          }
          .el-textarea__inner::-webkit-scrollbar {
            width: 6px;
            height: 6px;
            background-color: var(--elBgColor09);
          }
          .el-textarea__inner::-webkit-scrollbar-track {
            background-color: var(--elBgColor09);
          }
          .el-textarea__inner::-webkit-scrollbar-thumb {
            background: var(--elInnerColor14);
            border-radius: 3px;
          }
          .black {
            background: url("./img/search_hb.png");
            background-size: 100% 100%;
          }
          .white {
            background: url("./img/search_bb.png");
            background-size: 100% 100%;
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
  .jqIcon14 {
    background: var(--jqIcon14);
    background-size: 100% 100%;
  }
  .dtqwBg04 {
    background: var(--dtqwBg04);
    background-size: 100% 100%;
  }
}
</style>
