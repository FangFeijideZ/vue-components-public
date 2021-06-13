<template>
  <div class="hello-world">
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
      :disabled="false"
      :readonly="false"
      :show-icon="true"
      :date-obj="ksrqObj"
      @change="selectDateKsrq"
    ></public-date>
    <el-button type="primary" @click="dragOpen" style="position: absolute; z-index: 2001;">{{dragTitle}}</el-button>
    <public-drag v-if="dragShow"></public-drag>

    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
      <el-form-item label="手机号码" prop="name">
        <el-input v-model="ruleForm.name"></el-input>
      </el-form-item>
    </el-form>

    <!-- <el-tree
      id="tree"
      ref="tree"
      :props="defaultProps"
      :data="departmentList"
      show-checkbox
      @node-click="handleNodeClick"
      :check-strictly="true"
      :default-expanded-keys="[1,4]"
      :default-checked-keys="[4]"
      node-key="id"
    >
      <div  slot-scope="{ node, data }">
        {{ node.label }}
      </div>
    </el-tree> -->

    <!-- <div class="table-box">
      <el-table
        border
        height="250"
        ref="table"
        :data="tableData"
        style="width: 100%">
        <el-table-column
          prop="date"
          label="日期"
          width="180">
        </el-table-column>
        <el-table-column
          prop="name"
          label="姓名"
          width="180">
        </el-table-column>
        <el-table-column
          prop="address"
          label="地址">
        </el-table-column>
      </el-table>
    </div> -->

    <!-- <el-image
      style="width: 100px; height: 100px"
      :src="url">
    </el-image> -->
    <!-- <img style="width: 100px; height: 100px" :src="url" alt=""> -->
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
      dragTitle: "打开",
      dragShow: false,
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
      defaultProps: {
        children: "children",
        label: "label"
      },
      departmentList: [{
          id: 1,
          label: '一级 1',
          children: [
            {
            id: 4,
            label: '二级 1-1',
            children: [{
              id: 9,
              label: '三级 1-1-1'
            },
            {
              id: 10,
              label: '三级 1-1-2'
            }]
          }]
        },
        {
          id: 2,
          label: '一级 2',
          children: [
            {
            id: 5,
            label: '二级 2-1'
            }, 
            {
            id: 6,
            label: '二级 2-2'
          }]
        },
        {
          id: 3,
          label: '一级 3',
          children: [{
            id: 7,
            label: '二级 3-1'
          }, {
            id: 8,
            label: '二级 3-2'
          }]
      }],

      tableData: [{
        date: '2016-05-02',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-04',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1517 弄'
      }, 
      {
        date: '2016-05-01',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1519 弄'
      }, 
      {
        date: '2016-05-01',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1519 弄'
      }, 
      {
        date: '2016-05-01',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1519 弄'
      }, 
      {
        date: '2016-05-01',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1519 弄'
      }, 
      {
        date: '2016-05-03',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1516 弄'
      }],

      ruleForm: {
        name: '',
      },
      rules: {
        name: [
          { required: true, message: '请输入活动名称', validator: this.$validate.checkPhone, trigger: 'blur' },
        ],
      }
    }
  },
  mounted() {
    // this.$bus.on("dragClose",data=>{
    //   console.log(data);
    // })
  },
  // beforeDestroy() {
  //   this.$bus.off("dragClose");
  // },
  updated() {
    // let table = this.$refs.table.$refs;
    // let tableHeight = this.$refs.table.height;
    // let thead = table && table.headerWrapper ? table.headerWrapper : {};
    // let tbody = table && table.bodyWrapper ? table.bodyWrapper : {};
    // let tbodyHeight = thead && thead.clientHeight ? tableHeight - thead.clientHeight - 2 : 0;
    // let isScrollY = tbody.scrollHeight > tbodyHeight ? true : false; // 判断tbody是否出现了Y轴滚动条
    // let str = isScrollY ? "出现" : "没出现";
    // console.log(isScrollY,`===========>Y轴${str}滚动条`);
  },
  methods: {
    dragOpen() {
      this.dragShow = !this.dragShow;
      this.dragTitle = this.dragShow ? "关闭" : "打开";
    },
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
    handleNodeClick(node) {
      console.log(node);
    }
  }
}
</script>

<style lang="scss" scoped>
  .hello-world {
    position: relative;
    height: 100%;
    .public-date {
      width: 100%;
    }
    .table-box {
      padding: 10%;
      margin-top: 100px;
    }
    .public-drag {
      position: absolute;
      width: 100%;
      top: 0;
      bottom: 0;
    }
  }
</style>
