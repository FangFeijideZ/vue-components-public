<template>
  <div class="hello">
    <!-- <public-input
      v-model="gdmcObj.inputValue"
      placeholder="请输入岗点名称"
      type="textarea"
      size="mini"
      maxlength="5"
      disabled
      clearable
      show-password
      show-word-limit
      :prop="false"
      :show-title="false"
      :ref="gdmcObj.ref"
      :input-obj="gdmcObj"
      @input="getInputObj"
    ></public-input> -->
    <public-date
      :clearable="true"
      :showTitle="true"
      :picker-options="false"
      :disabled="false"
      :readonly="false"
      :show-icon="true"
      :date-obj="ksrqObj"
      @change="selectDateKsrq"
    ></public-date>

    <!-- <el-image
      style="width: 100px; height: 100px"
      :src="url">
    </el-image> -->
    <!-- <img style="width: 100px; height: 100px" :src="url" alt=""> -->

    <!-- <public-select
      :clearable="true"
      :prop="false"
      :show-title="false"
      :placeholder="true"
      :filterable="true"
      :ref="ssdwObj.ref"
      :select-obj="ssdwObj"
      @change="getSelectSsdwObj"
    ></public-select> -->
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  props: {
    msg: String
  },
  data() {
    return {
      // url: require("../views/element-ui/img/riqibb.png"),
      gdmcObj: {
        inputValue: "测试v-model", // 输入框绑定的值
        title: "岗点名称", // 左侧标题
        placeholder: "请输入岗点名称", // 输入框提示文字
        ref: "gdmc", // 用于触发表单验证的方法
        resize: "none",// 文本域拖拽的状态
        icon: "dtqwBg76", // 输入框外左侧标题的图标
        button_icon: "dtqwBg04", // 输入框外按钮的图标
        button_icon_left: "dtqwBg04", // 输入框内左侧图标
        button_icon_right: "dtqwBg04", // 输入框内右侧图标
        // size: "", // 输入框大小
        // label_position: "left", // 标题显示的位置
        // type: "textarea", // 输入框类型
        // type: "autocomplete", // 输入框类型
        defaultType: "", // 下拉选择框绑定的值
        // typeOptions: [ // 下拉选择框的每一项
        //   // { code: "", label: "全部" },
        //   { code: "work", label: "工作日" },
        //   { code: "rest", label: "休息日" },
        //   { code: "holiday", label: "节假日" },
        // ],
      },
      ssdwObj: {
        typeOptions: [
          { code: "0", label: "全部" },
          { code: "work", label: "工作日" },
          { code: "rest", label: "休息日" },
          { code: "holiday", label: "节假日" },
        ],
        defaultType: "",
        title: "所属单位",
        // size: "medium", // 选择框大小
        ref: "ssdw", // 用于触发表单验证的方法
        icon: "dtqwBg76", // 输入框外左侧标题的图标
        placeholder: "请选择岗点名称", // 输入框提示文字
        // label_position: "left", // 标题显示的位置
        // label_width: "150px",
      },
      ksrqObj: {
        type: "date",
        // type: "datetimerange",
        // type: "datetime",
        // type: "dates",
        // type: "week",
        // type: "month",
        // type: "year",
        // code: "start",
        defaultDate: "",
        disabledDate: "",
        // defaultTime: ["12:00:01","23:00:01"],
        // format: "yyyy 第 WW 周",
        // format: "yyyy-MM-dd",
        // valueFormat: "yyyy-MM-dd HH:mm:ss", // valueFormat与format不能相同，不然会报错
        title: "开始日期",
        placeholder: "请选择开始日期", // 输入框提示文字
        // size: "", // 选择框大小
        ref: "ksrq", // 用于触发表单验证的方法
        icon: "dtqwBg76", // 输入框外左侧标题的图标
      },
    }
  },
  methods: {
    getInputObj(val) {
      console.log(val);
    },
    getSelectSsdwObj(val) {
      console.log(val)
    },
    // 选择的开始日期
    selectDateKsrq(val) {
      console.log(val);
    },
  }
}
</script>

<style scoped>
  .public-date {
    width: 100%;
  }
</style>
