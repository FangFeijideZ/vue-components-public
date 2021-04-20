<template>
  <div class="public-select">
    <el-form
      :model="selectObj"
      :label-position="selectObj.label_position ? selectObj.label_position : 'left'"
      :rules="formRules"
      :ref="selectObj.ref"
      :label-width="selectObj.label_width"
      :class="{'flex-align': showIcon}"
    >
      <div v-if="showIcon" :class="['icon', 'icon-margin', selectObj.icon]" :style="{ 'width': selectObj.icon_width, 'height': selectObj.icon_height, 'margin': selectObj.icon_margin }"></div>
      <el-form-item
        :label="showTitle ? selectObj.title : ''"
        :prop="prop ? 'defaultType' : ''"
        class="flex-align"
      >
        <div class="select-box flex" @mouseover="mouseOver" @mouseleave="mouseLeave">
          <el-select
            v-model="selectObj.defaultType"
            :multiple="multiple"
            :disabled="disabled"
            :clearable="clearable"
            :filterable="filterable"
            :collapse-tags="collapseTags"
            :placeholder="placeholder ? selectObj.placeholder : ''"
            :size="selectObj.size ? selectObj.size : selectObj.size != null ? '' : 'medium'"
            @change="getSelect"
            @clear="clearValue"
            @remove-tag="removeTag"
            @visible-change="visibleChange"
            @focus="getFcus(selectObj.defaultType,$event)"
            @blur="getBlur(selectObj.defaultType,$event)"
          >
            <el-option
              v-for="(item, index) in selectObj.typeOptions"
              :key="index"
              :label="item.label"
              :value="item.code"
              :disabled="item.disabled"
            >
            </el-option>
          </el-select>
        </div>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: "publicSelect",
  props: {
    selectObj: {
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
    // 是否显示提示文字
    placeholder: {
      type: Boolean,
      default: () => {
        return true;
      },
    },
  },
  watch: {
    selectObj: {
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
      formRules: {
        defaultType: [{ required: true, message: this.selectObj.placeholder, trigger: "change" }],
      }
    };
  },
  mounted() {},
  methods: {
    // 鼠标移入
    mouseOver() {

    },
    // 鼠标移出
    mouseLeave() {
      
    },
    // 获得焦点
    getFcus(val,e) {
      this.$emit("fcus", val);
    },
    // 失去焦点
    getBlur(val,e) {
      this.$emit("blur", val);
    },
    // 多选模式下移除tag时触发	
    removeTag(val) {
      this.$emit("remove", val);
    },
    // 下拉框出现/隐藏时触发	
    visibleChange(val) {
      this.$emit("visible", val);
    },
    // 清空内容
    clearValue() {
      this.$emit("clear", null);
    },
    // 改变事件
    getSelect(val) {
      this.$emit("change", val);
    },
    // 触发表单验证
    getFormRules() {
      let flag = undefined;
      this.$refs[this.selectObj.ref].validate((valid) => {
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
      this.$refs[this.selectObj.ref].resetFields();
    },
  },
};
</script>

<style lang="scss" scoped>
.public-select {
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
        .select-box {
          width: 100%;
          .el-select {
            width: 100%;
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
  .dtqwBg04 {
    background: var(--dtqwBg04);
    background-size: 100% 100%;
  }
}
</style>
