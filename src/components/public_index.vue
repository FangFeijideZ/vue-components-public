<template>
  <div class="public-index">
    <div class="box-left">
      <public-title
        :title="'研判地点'"
        :img="'dtqwBg02'"
        :icon="'dtqwBg76'"
        :height="'5%'"
        :show-icon="true"
      ></public-title>
      <public-input
        :prop="true"
        :clearable="true"
        :multiple="false"
        :collapse-tags="false"
        :filterable="true"
        :placeholder="true"
        :disabled="false"
        :show-title="true"
        :show-icon="true"
        :show-button="false"
        :show-select="false"
        :show-suffix-button="true"
        :show-prefix-button="false"
        :trigger-on-focus="false"
        :show-word-limit="true"
        :show-password="false"
        :max-length="undefined"
        :min-length="undefined"
        :max-rows="undefined"
        :min-rows="undefined"
        :ref="gdmcObj.ref"
        :input-obj="gdmcObj"
        @input="getInputObj"
      ></public-input>
      <public-select
        :clearable="true"
        :prop="true"
        :show-icon="true"
        :show-title="true"
        :placeholder="true"
        :multiple="false"
        :disabled="false"
        :filterable="true"
        :collapse-tags="false"
        :ref="ssdwObj.ref"
        :select-obj="ssdwObj"
        @change="getSelectSsdwObj"
      ></public-select>
      <public-date
        :clearable="true"
        :showTitle="true"
        :prop="true"
        :picker-options="false"
        :disabled="false"
        :readonly="false"
        :show-icon="true"
        :date-obj="ksrqObj"
        :ref="ksrqObj.ref"
        @change="selectDateKsrq"
      ></public-date>
      <public-date
        :clearable="true"
        :showTitle="true"
        :prop="true"
        :picker-options="false"
        :show-icon="true"
        :date-obj="jsrqObj"
        :ref="jsrqObj.ref"
        @change="selectDateJsrq"
      ></public-date>
      <public-time
        :clearable="true"
        :showTitle="true"
        :prop="true"
        :is-range="false"
        :readonly="false"
        :show-icon="true"
        :time-obj="kssjObj"
        :ref="kssjObj.ref"
        @change="selectDatekssj"
      ></public-time>
      <public-time
        :clearable="true"
        :showTitle="true"
        :prop="true"
        :is-range="true"
        :readonly="false"
        :show-icon="true"
        :time-obj="jssjObj"
        :ref="jssjObj.ref"
        @change="selectDateJssj"
      ></public-time>
      <!-- <el-time-picker
        v-model="kssjObj.defaultTime"
        size="medium"
        @change="selectDatekssj"
        :picker-options="{'selectableRange': 
          kssjObj.code == 'start' ? `00:00:00 - ${kssjObj.disabledTime ? kssjObj.disabledTime : '23:59:59'}` : 
          kssjObj.code == 'end' ? `${kssjObj.disabledTime ? kssjObj.disabledTime : '00:00:00'} - 23:59:59` : 
          '00:00:00 - 23:59:59'
        }"
        placeholder="开始时间">
      </el-time-picker>
      <el-time-picker
        v-model="jssjObj.defaultTime"
        size="medium"
        @change="selectDateJssj"
        :picker-options="{'selectableRange': 
          jssjObj.code == 'start' ? `00:00:00 - ${jssjObj.disabledTime ? jssjObj.disabledTime : '23:59:59'}` : 
          jssjObj.code == 'end' ? `${jssjObj.disabledTime ? jssjObj.disabledTime : '00:00:00'} - 23:59:59` : 
          '00:00:00 - 23:59:59'
        }"
        placeholder="结束时间">
      </el-time-picker> -->
      <public-button
        :show-icon="true"
        :icon="'dtqwBg76'"
        :title="'保存'"
        @click="btnBcClick"
      ></public-button>
      <div class="imgs">
        <img style="width: 100px; height: 100px" :src="url" alt="">
        <img style="width: 100px; height: 100px" src="~img/24sdhb.png" alt="">
        <img style="width: 100px; height: 100px" :src="url3" alt="">
        <i style="width: 100px; height: 100px" class="img"></i>
      </div>
      <!-- <public-title
        :title="'研判地点'"
        :img="'dtqwBg02'"
        :icon="'dtqwBg76'"
        :color="'var(--fontColor01)'"
        :height="'5%'"
        :width="'100%'"
        :font-size="'14px'"
        :margin="'0 0 0 14px'"
        :padding="'0 0 0 14px'"
        :icon-margin="'0 14px 0 0'"
        :icon-padding="'0 0 0 0'"
        :icon-width="'14px'"
        :icon-height="'14px'"
        :show-icon="true"
      ></public-title> -->
    </div>
    <div class="box-right">
      <!-- <div class="head-box flex">
        <div class="left flex-align-center">单位</div>
        <div class="right">
          <div class="right-top flex-align-center">2021年4月各派出所交通类110警情管控</div>
          <div class="right-bottom">
            <ul class="flex">
              <li class="flex-align-center" v-for="(item,index) in 4" :key="index">{{item}}</li>
            </ul>
          </div>
        </div>
      </div> -->
      <public-table
        :head-data="publicTableHead"
        :head-style="headStyleObj"
        :body-data="publicTablebody"
        :body-style="bodyStyleObj"
        :body-tr-style="bodyTrStyleObj"
        :body-td-style="bodyTdStyleObj"
        :page-info="pageInfo"
        :checkbox="false"
        @iconClick="iconClick"
      ></public-table>
      <public-pagination :pagination-obj="pageInfo" @change="handlePageChange"></public-pagination>
    </div>
  </div>
</template>
<script>
export default {
  name: "public_index",
  components: {
    // dateLinkageForm
  },
  data() {
    return {
      url: require("../assets/img/riqibb.png"),
      url3: require("../assets/img/4e10662af608.png"),
      pageInfo: {
        pageSize: 20,
        pageSizes: [20, 30, 50, 100],
        currentPage: 1,
        pagerCount: 5,
        total: 10,
        hideOnSinglePage: false,
        showRight: false,
        disabled: false,
        small: false,
        text_align: "right",
        layout: "prev, pager, next, sizes, jumper",
      },
      gdmcObj: {
        inputValue: "", // 输入框绑定的值
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
        type: "autocomplete", // 输入框类型
        defaultType: "", // 下拉选择框绑定的值
        typeOptions: [ // 下拉选择框的每一项
          // { code: "", label: "全部" },
          { code: "work", label: "工作日" },
          { code: "rest", label: "休息日" },
          { code: "holiday", label: "节假日" },
        ],
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
        code: "start",
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
      jsrqObj: {
        type: "date",
        // type: "week",
        // type: "month",
        // type: "year",
        code: "end",
        defaultDate: "",
        disabledDate: "",
        // format: "yyyy-MM-dd",
        // valueFormat: "yyyy-MM-dd HH:mm:ss", // valueFormat与format不能相同，不然会报错
        title: "结束日期",
        placeholder: "请选择结束日期", // 输入框提示文字
        // size: "", // 选择框大小
        ref: "jsrq", // 用于触发表单验证的方法
        icon: "dtqwBg76", // 输入框外左侧标题的图标
      },
      kssjObj: {
        code: "start",
        defaultTime: '2021-03-27 14:03:45',
        // disabledTime: '',
        disabledTime: '21:03:45',
        // defaultValue: '2021-03-27 14:03:45', // 时间选择器打开时默认显示的时间
        placeholder: "请选择开始时间", // 输入框提示文字
        title: "开始时间",
        // format: "yyyy-MM-dd HH:mm:ss",
        // valueFormat: "yyyy-MM-dd HH:mm:ss", // valueFormat与format不能相同，不然会报错
        // align: "left",
        ref: "kssj", // 用于触发表单验证的方法
        icon: "dtqwBg76", // 输入框外左侧标题的图标
        pickerOptions: {},
      },
      jssjObj: {
        code: "end",
        defaultTime: "2021-03-27 21:03:45",
        // defaultTime: ["2021-03-27 14:03:45","2021-03-27 21:03:45"],
        // disabledTime: "",
        disabledTime: "14:03:45",
        defaultValue: "", // 时间选择器打开时默认显示的时间
        placeholder: "请选择结束时间", // 输入框提示文字
        title: "结束时间",
        format: "HH:mm:ss",
        // valueFormat: "HH:mm:ss", // valueFormat与format不能相同，不然会报错
        align: "left",
        ref: "jssj", // 用于触发表单验证的方法
        icon: "dtqwBg76", // 输入框外左侧标题的图标
      },
      // publicTableHead: [
      //   { id: "1", title: "序号", name: "numbers", ellipsis: "", width: "50px", color: "var(--dyqwColor23)" },
      //   {
      //     id: "2",
      //     title: "岗点名称",
      //     name: "spotName",
      //     width: "100px",
      //     color: "var(--dyqwColor26)",
      //     // div_background: "var(--bgColor11)",
      //     // text_align: 'left',
      //     ellipsis: "tooltip",
      //   },
      //   {
      //     id: "3",
      //     title: "岗点类型",
      //     name: "gdlx",
      //     width: "200px",
      //     color: "var(--dyqwColor23)",
      //     ellipsis: "",
      //   },
      //   {
      //     id: "4",
      //     title: "岗点描述",
      //     name: "description",
      //     width: "100px",
      //     color: "var(--dyqwColor23)",
      //     ellipsis: "tooltip",
      //   },
      //   {
      //     id: "5",
      //     title: "日期类型",
      //     name: "rqlx",
      //     width: "500px",
      //     color: "var(--dyqwColor23)",
      //     ellipsis: "",
      //   },
      //   {
      //     id: "6",
      //     title: "所属单位",
      //     name: "deptName",
      //     width: "500px",
      //     color: "var(--dyqwColor23)",
      //     ellipsis: "",
      //   },
      //   {
      //     id: "100",
      //     title: "操作",
      //     name: "operation",
      //     width: "300px",
      //     padding: "0 5px",
      //     // ellipsis: "tooltip",
      //     // justify_content: 'space-between',
      //     // justify_content: 'space-around',
      //     justify_content: 'center',
      //     array: [
      //       {
      //         // div_width: "100%", // 文本分散对齐
      //         cursor: "pointer",
      //         icon_show: true,
      //         title_show: true,
      //         item_show: false,
      //         code: "edit",
      //         icon: "dtqwBg74",
      //         name: "gdlx",
      //         title: "编辑",
      //         color: "var(--dyqwColor23)",
      //         width: "14px",
      //         height: "14px",
      //         div_margin: "0 10px 0 0",
      //         // right: true,
      //       },
      //       {
      //         code: "details",
      //         cursor: "pointer",
      //         icon_show: true,
      //         title_show: true,
      //         item_show: false,
      //         name: "rqlx",
      //         title: "详情",
      //         color: "var(--dyqwColor17)",
      //         // icon: "dtqwBg74",
      //         icon_font: "el-icon-view",
      //         font_size: "16px",
      //         width: "14px",
      //         height: "14px",
      //         div_margin: "0 10px 0 0",
      //       },
      //       {
      //         code: "del",
      //         cursor: "pointer",
      //         icon_show: true,
      //         title_show: true,
      //         item_show: false,
      //         name: "rqlx",
      //         title: "删除",
      //         color: "var(--dyqwColor09)",
      //         // icon: "dtqwBg74",
      //         icon_font: "el-icon-error",
      //         font_size: "16px",
      //         width: "14px",
      //         height: "14px",
      //         div_margin: "0 10px 0 0",
      //       },
      //     ],
      //   },
      // ],
      publicTableHead: [
        { id: "1", title: "序号", name: "numbers", ellipsis: "", width: "15%", color: "var(--dyqwColor23)",div_width: "20px",div_height: "20px",div_background: "#fff" },
        {
          id: "2",
          title: "岗点名称",
          name: "spotName",
          width: "15%",
          color: "var(--dyqwColor26)",
          // div_background: "var(--bgColor11)",
          // text_align: 'left',
          ellipsis: "tooltip",
        },
        {
          id: "3",
          title: "岗点类型",
          name: "gdlx",
          width: "15%",
          color: "var(--dyqwColor23)",
          ellipsis: "",
        },
        {
          id: "4",
          title: "岗点描述",
          name: "description",
          width: "20%",
          color: "var(--dyqwColor23)",
          ellipsis: "tooltip",
        },
        {
          id: "5",
          title: "岗点描述",
          name: "description",
          width: "35%",
          color: "var(--dyqwColor23)",
          ellipsis: "tooltip",
        },
      ],
      publicTablebody: [
        {id: 1, description: '123', spotName: '123', details: false, del: true, edit: true, sort: 1},
        {id: 2, description: '大大大飒飒大苏打萨达', spotName: '额嗡飒ddedsdsde飒飒嗡嗡', details: true, del: false, edit: true, sort: 2},
        {id: 3, description: '额嗡飒ddede飒飒嗡嗡', spotName: '额为强AaA打算萨达问问去', details: false, del: false, edit: true, sort: 4},
        {id: 4, description: '1233332223', spotName: '123', details: true, del: true, edit: true, sort: 3},
        {id: 5, description: '123', spotName: '123333222', details: false, del: true, edit: true, sort: 7},
        {id: 6, description: '额为强倒萨大苏强问问sassas去', spotName: '大萨达', details: false, del: true, edit: true, sort: 5, checked: true, checkedDisabled: true},
        {id: 7, description: '222', spotName: '额为强强s大苏打ssas去', details: true, del: false, edit: true, sort: 3, checked: true},
        {id: 8, description: '113', spotName: '113', details: true, del: true, edit: true, sort: 2},
        // {id: 9, description: '123', spotName: '123', details: true, del: true, edit: false, sort: 2},
        // {id: 11, description: '122', spotName: '122', details: true, del: true, edit: true, sort: 5},
        // {id: 22, description: '123', spotName: '123', details: false, del: true, edit: true, sort: 6},
        // {id: 33, description: '123', spotName: '123', details: true, del: false, edit: true, sort: 5},
        // {id: 44, description: '123', spotName: '123', details: true, del: false, edit: false, sort: 5},
        // {id: 55, description: '123', spotName: '123', details: true, del: false, edit: true, sort: 3},
        // {id: 66, description: '123', spotName: '123', details: true, del: true, edit: true, sort: 2},
        // {id: 77, description: '123', spotName: '123', details: true, del: true, edit: false, sort: 2},
        // {id: 88, description: '123', spotName: '123', details: true, del: true, edit: true, sort: 5},
        // {id: 56, description: '123', spotName: '123', details: false, del: true, edit: true, sort: 6},
        // {id: 34, description: '123', spotName: '123', details: true, del: false, edit: true, sort: 5},
        // {id: 12, description: '123', spotName: '123', details: true, del: false, edit: false, sort: 5},
        // {id: 31, description: '123', spotName: '123', details: true, del: false, edit: true, sort: 3},
      ],
      headStyleObj: {
        // height: "0px",
        // border: "none",
        // border: '1px solid var(--elBorderColor13)',
      },
      bodyStyleObj: {
      },
      bodyTrStyleObj: {
        
      },
      bodyTdStyleObj: {
        border: '1px solid var(--elBorderColor16)',
      },
    };
  },
  mounted() {
    console.log(process);
    console.log(process.env);
    console.log(process.env.NODE_ENV)
    this.getPageList();
  },
  methods: {
    getPageList() {
      this.ksrqObj.defaultDate = this.$date.y_m_d_zt();
      this.jsrqObj.defaultDate = this.$date.y_m_d_mt();
      this.ksrqObj.disabledDate = this.jsrqObj.defaultDate;
      this.jsrqObj.disabledDate = this.ksrqObj.defaultDate;
      let { defaultTime,disabledTime,code } = this.kssjObj;
      this.kssjObj.pickerOptions = {selectableRange: code == 'start' ? `00:00:00 - ${disabledTime ? disabledTime : '23:59:59'}` : code == 'end' ? `${disabledTime ? disabledTime : '00:00:00'} - 23:59:59` : '00:00:00 - 23:59:59'}
    },
    // 选择的开始日期
    selectDateKsrq(val) {
      // let date = val ? val : "";
      let date = val ? this.$date.y_m_d(val) : "";
      this.jsrqObj.disabledDate = date;
      console.log(date);
    },
    // 选择的结束日期
    selectDateJsrq(val) {
      // let date = val ? val : "";
      let date = val ? this.$date.y_m_d(val) : "";
      this.ksrqObj.disabledDate = date;
      console.log(date);
    },
    // 选择的开始时间
    selectDatekssj(val) {
      let date = val ? this.$date.h_m_s(val) : "";
      this.jssjObj.disabledTime = date;
    },
    // 选择的结束时间
    selectDateJssj(val) {
      console.log(val);
      let date = val ? this.$date.h_m_s(val) : "";
      this.kssjObj.disabledTime = date;
    },
    // 列表按钮点击
    iconClick(val,icon) {
      console.log(val,icon);
    },
    // 获取所属单位
    getSelectSsdwObj(val) {
      console.log(val)
    },
    // 获取岗点名称
    getInputObj(val) {
      // this.gdmcObj.inputValue = val.replace(/[^\d]/g, "");
      console.log(val)
    },
    // 分页信息
    handlePageChange(val) {
      let { currentPage,pageSize } = val;
      console.log(currentPage,pageSize);
    },
    // 保存按钮
    btnBcClick() {
      // debugger;
      let refs = [this.gdmcObj.ref,this.ssdwObj.ref,this.ksrqObj.ref,this.jsrqObj.ref,this.kssjObj.ref,this.jssjObj.ref];
      let flag = true;
      refs.forEach(item=>{
        let rules = this.$refs[item].getFormRules();
        if (rules == false) {
          flag = false;
        }
      })
      if (flag) {
        console.log(flag);
      }
    }
  }
};
</script>
<style lang="scss" scoped>
  .public-index {
    height: 100%;
    background: var(--bgColor08);
    .box-left {
      padding: 2%;
      width: 30%;
      .el-button {
        margin-top: 5%;
      }
    }
    .box-right {
      padding: 2%;
      width: 30%;
      .head-box {
        border: 1px solid var(--elBorderColor13);
        background-color: var(--elBgColor13);
        border-bottom: none;
        color: var(--dyqwColor23);
        font-weight: 900;
        height: 80px;
        .left {
          width: 15%;
          height: 100%;
        }
        .right {
          width: 85%;
          height: 100%;
          border-left: 1px solid var(--elBorderColor13);
          .right-top {
            height: 50%;
          }
          .right-bottom {
            height: 50%;
            border-top: 1px solid var(--elBorderColor13);
            ul {
              height: 100%;
              li {
                border-left: 1px solid var(--elBorderColor13);
              }
              li:nth-child(1) {
                width: 17.5%;
              }
              li:nth-child(2) {
                width: 17.5%;
              }
              li:nth-child(3) {
                width: 23.5%;
              }
              li:nth-child(4) {
                width: 41.5%;
              }
              li:first-child {
                border-left: none;
              }
            }
          }
        }
      }
      .public-table {
        height: 95%;
      }
      .public-pagination {
        height: 5%;
      }
    }
  }
  .img {
    background: url("../assets/img/4e10662af608.png");
    background-size: 100% 100%;
  }
</style>