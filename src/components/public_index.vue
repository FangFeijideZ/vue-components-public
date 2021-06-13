<template>
  <div class="public-index">
    <div class="box-left">
      <!-- <public-title
        title="研判地点"
        img="dtqwBg02"
        icon="dtqwBg76"
        height="5%"
        icon-width="100px"
        icon-margin="10px"
        font-size="20px"
        color="#666"
        show-icon
      ></public-title> -->
      <!-- <public-input
        v-model="gdmcObj.defaultValue"
        placeholder="请输入岗点名称"
        select-placeholder="请输入岗点名称"
        prop
        type="textarea"
        size="medium"
        maxlength="25"
        minlength="2"
        clearable
        filterable
        show-word-limit
        collapse-tags
        multiple
        resize="none"
        show-title
        show-icon
        show-suffix-button
        show-prefix-button
        max-rows="5"
        min-rows="3"
        label-position="right"
        label-width="100px"
        :ref="gdmcObj.ref"
        :input-obj="gdmcObj"
        @input="getInputObj"
      ></public-input> -->
      <!-- <public-select
        v-model="ssdwObj.defaultType"
        clearable
        prop
        show-icon
        show-title
        placeholder="请选择岗点名称"
        title="所属单位"
        multiple
        filterable
        collapse-tags
        size="mini"
        label-position="right"
        label-width="100px"
        :ref="ssdwObj.ref"
        :select-obj="ssdwObj"
        @change="getSelectSsdwObj"
      ></public-select> -->
      <!-- <public-date
        title="开始日期"
        placeholder="请选择开始日期"
        prop
        clearable
        disabled
        readonly
        show-icon
        :picker-options="getPickerOptions"
        format="yyyy-MM-dd HH:mm:ss"
        value-format="yyyy-MM-dd"
        default-time="['12:00:01','23:00:01']"
        type="datetimerange"
        range-separator="至"
        start-placeholder="开始日期"
        end-placeholder="结束日期"
        size="mini"
        label-position="right"
        label-width="100px"
        :date-obj="ksrqObj"
        :ref="ksrqObj.ref"
        @change="selectDateKsrq"
      ></public-date> -->
      <!-- <public-time
        title="开始时间"
        placeholder="请选择开始时间"
        prop
        clearable
        disabled
        readonly
        show-icon
        format="HH:mm:ss"
        value-format="HH:mm:ss"
        :default-value="kssjObj.defaultValue"
        range-separator="至"
        start-placeholder="开始时间"
        end-placeholder="结束时间"
        size="mini"
        label-position="right"
        label-width="100px"
        :date-obj="kssjObj"
        :ref="kssjObj.ref"
        @change="selectDateKssj"
      ></public-time> -->
      <!-- <public-button
        show-icon
        icon="dtqwBg76"
        title="保存"
        type="warning"
        disabled
        icon-width="100px"
        icon-margin="10px"
        font-size="20px"
        background-color="#ccc"
        @click="btnBcClick"
      ></public-button> -->
      
      <!-- <div class="imgs">
        <img style="width: 100px; height: 100px" :src="url" alt="">
        <img style="width: 100px; height: 100px" src="~img/24sdhb.png" alt="">
        <img style="width: 100px; height: 100px" :src="url3" alt="">
        <i style="width: 100px; height: 100px" class="img"></i>
      </div> -->

      <public-title
        title="研判地点"
        img="dtqwBg02"
        icon="dtqwBg76"
        height="5%"
      ></public-title>
      <public-input
        v-model="gdmcObj.defaultValue"
        placeholder="请输入岗点名称"
        title="岗点名称"
        prop
        style="margin-bottom: 20px"
        :validator="this.$validate.checkPhone"
        show-suffix-button
        :ref="gdmcObj.ref"
        :input-obj="gdmcObj"
        @input="getInputObj"
      ></public-input>
      <public-select
        v-model="ssdwObj.defaultType"
        placeholder="请选择所属单位"
        title="所属单位"
        prop
        :ref="ssdwObj.ref"
        :select-obj="ssdwObj"
        @change="getSelectSsdwObj"
      ></public-select>
      <public-date
        title="开始日期"
        placeholder="请选择开始日期"
        v-model="ksrqObj.defaultDate"
        prop
        format="yyyy-MM-dd"
        value-format="yyyy-MM-dd"
        :picker-options="getPickerOptionsStart"
        :date-obj="ksrqObj"
        :ref="ksrqObj.ref"
        @change="selectDateKsrq"
      ></public-date>
      <public-date
        title="结束日期"
        placeholder="请选择结束日期"
        v-model="jsrqObj.defaultDate"
        prop
        format="yyyy-MM-dd"
        value-format="yyyy-MM-dd"
        :picker-options="getPickerOptionsEnd"
        :date-obj="jsrqObj"
        :ref="jsrqObj.ref"
        @change="selectDateJsrq"
      ></public-date>
      <public-time
        title="开始时间"
        placeholder="请选择开始时间"
        v-model="kssjObj.defaultTime"
        prop
        format="HH:mm:ss"
        value-format="HH:mm:ss"
        :time-obj="kssjObj"
        :ref="kssjObj.ref"
        @change="selectDatekssj"
      ></public-time>
      <public-time
        title="结束时间"
        placeholder="请选择结束时间"
        v-model="jssjObj.defaultTime"
        prop
        format="HH:mm:ss"
        value-format="HH:mm:ss"
        :time-obj="jssjObj"
        :ref="jssjObj.ref"
        @change="selectDateJssj"
      ></public-time>
      <div class="button flex">
        <public-button
          icon="dtqwBg76"
          title="保存"
          @click="btnBcClick"
        ></public-button>
        <public-button
          v-del="['zd']"
          icon="dtqwBg76"
          type="primary"
          title="防抖和节流"
          @click="throttleAndDebounce"
        ></public-button>
        <public-button
          icon="dtqwBg76"
          type="primary"
          title="格式化日期"
          @click="dateFormatClick"
        ></public-button>
      </div>
      <public-bar-charts :bar-charts="barObj"></public-bar-charts>
      <public-line-charts :line-charts="lineObj"></public-line-charts>
    </div>
    <public-pei-charts :pei-charts="peiObj"></public-pei-charts>
    <div class="box-right flex-column">
      <public-table
        :head-data="publicTableHead"
        :head-style="headStyleObj"
        :body-data="publicTablebody"
        :body-style="bodyStyleObj"
        :body-tr-style="bodyTrStyleObj"
        :body-td-style="bodyTdStyleObj"
        :page-info="pageInfo"
        :checkbox="true"
        @iconClick="iconClick"
      ></public-table>
      <div class="button flex">
        <public-button
          icon="dtqwBg76"
          type="primary"
          title="getters方法"
          @click="vuexGettersClick"
        ></public-button>
        <public-button
          icon="dtqwBg76"
          type="primary"
          title="actions方法"
          @click="vuexActionshClick"
        ></public-button>
        <public-button
          icon="dtqwBg76"
          type="primary"
          title="mutations方法"
          @click="vuexMutationsClick"
        ></public-button>
      </div>
      <el-public-input :input-obj="gdmcObj">
        <!-- 具名插槽 -->
        <div class="iconfont" slot="left">
          <span class="left">1232</span>
        </div>
        <!-- 作用域插槽，核心理念就是在父组件拿到子组件数据来在父组件渲染 -->
        <template slot="item" slot-scope="scope">
          <ul>
            <li v-for="(item,index) in scope.row" :key="index" :class="item.date | y_m_d"><b>{{item.date | y_m_d}}</b></li>
          </ul>
        </template>
      </el-public-input>
      <public-pagination
        :pagination-obj="pageInfo" 
        @change="handlePageChange"
      ></public-pagination>
    </div>
  </div>
</template>
<script>
import elPublicInput from "../views/common-ui/public_input";
import { mapState,mapActions,mapGetters,mapMutations } from "vuex";
export default {
  name: "public_index",
  components: {
    elPublicInput
  },
  data() {
    return {
      url: require("../views/element-ui/img/riqibb.png"),
      url3: require("../views/element-ui/img/4e10662af608.png"),
      pageInfo: {
        pageSize: 10,
        pageSizes: [10, 30, 50, 100],
        currentPage: 1,
        pagerCount: 5,
        total: 0,
        hideOnSinglePage: false,
        showRight: false,
        disabled: false,
        small: false,
        text_align: "right",
        layout: "prev, pager, next, sizes, jumper",
      },
      gdmcObj: {
        defaultValue: "", // 输入框绑定的值
        ref: "gdmc", // 用于触发表单验证的方法
        icon: "dtqwBg76", // 输入框外左侧标题的图标
        button_icon: "dtqwBg04", // 输入框外按钮的图标
        button_icon_left: "dtqwBg04", // 输入框内左侧图标
        button_icon_right: "dtqwBg04", // 输入框内右侧图标
        defaultType: "", // 下拉选择框绑定的值
        typeOptions: [ // 下拉选择框的每一项
          // { code: "", label: "全部" },
          { code: "0", label: "工作日", date: new Date() },
          { code: "1", label: "休息日", date: new Date() },
          { code: "2", label: "节假日", date: new Date() },
        ],

        // title: "岗点名称", // 左侧标题
        // placeholder: "请输入岗点名称", // 输入框提示文字
        // resize: "none",// 文本域拖拽的状态
        // size: "", // 输入框大小
        // label_position: "left", // 标题显示的位置
        // type: "textarea", // 输入框类型
        // type: "autocomplete", // 输入框类型
      },
      ssdwObj: {
        typeOptions: [
          { code: "0", label: "全部" },
          { code: "work", label: "工作日" },
          { code: "rest", label: "休息日" },
          { code: "holiday", label: "节假日" },
        ],
        defaultType: "",
        ref: "ssdw", // 用于触发表单验证的方法
        icon: "dtqwBg76", // 输入框外左侧标题的图标
      },
      ksrqObj: {
        // type: "date",
        // type: "datetimerange",
        // type: "datetime",
        // type: "dates",
        // type: "week",
        // type: "month",
        // type: "year",
        code: "start",
        // defaultDate: "2021-03-11 01:00:00",
        // defaultDate: ['2021-03-27 12:00:01','2021-04-27 23:00:01'],
        defaultDate: "",
        disabledDate: "",
        // defaultTime: ["12:00:01","23:00:01"],
        // format: "yyyy 第 WW 周",
        // format: "yyyy-MM-dd",
        // valueFormat: "yyyy-MM-dd HH:mm:ss", // valueFormat与format不能相同，不然会报错
        // title: "开始日期",
        // placeholder: "请选择开始日期", // 输入框提示文字
        // size: "", // 选择框大小
        ref: "ksrq", // 用于触发表单验证的方法
        icon: "dtqwBg76", // 输入框外左侧标题的图标
      },
      jsrqObj: {
        // type: "date",
        // type: "week",
        // type: "month",
        // type: "year",
        code: "end",
        defaultDate: "",
        disabledDate: "",
        // defaultDate: "2021-04-11 01:00:00",
        // format: "yyyy-MM-dd",
        // valueFormat: "yyyy-MM-dd HH:mm:ss", // valueFormat与format不能相同，不然会报错
        // title: "结束日期",
        // placeholder: "请选择结束日期", // 输入框提示文字
        // size: "", // 选择框大小
        ref: "jsrq", // 用于触发表单验证的方法
        icon: "dtqwBg76", // 输入框外左侧标题的图标
      },
      kssjObj: {
        code: "start",
        defaultTime: '14:03:45',
        // disabledTime: '',
        disabledTime: '21:03:45',
        // defaultValue: '2021-04-25 14:03:45', // 时间选择器打开时默认显示的时间
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
        defaultTime: "21:03:45",
        // defaultTime: ["2021-03-27 14:03:45","2021-03-27 21:03:45"],
        // disabledTime: "",
        disabledTime: "14:03:45",
        // defaultValue: "", // 时间选择器打开时默认显示的时间
        // placeholder: "请选择结束时间", // 输入框提示文字
        // title: "结束时间",
        // format: "HH:mm:ss",
        // valueFormat: "HH:mm:ss", // valueFormat与format不能相同，不然会报错
        // align: "left",
        ref: "jssj", // 用于触发表单验证的方法
        icon: "dtqwBg76", // 输入框外左侧标题的图标
      },
      getPickerOptionsStart: {
        // disabledDate: (time) => {
        //   return time.getTime() > this.jsrqObj.defaultDate;
        // },
        shortcuts: [
          {
            text: "今天",
            onClick(picker) {
              picker.$emit("pick", new Date());
            },
          },
          {
            text: "昨天",
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24);
              picker.$emit("pick", date);
            },
          },
          {
            text: "一周前",
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit("pick", date);
            },
          },
        ],
      },
      getPickerOptionsEnd: {
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
      //     operation: [
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
        {id: 8, description: '113', spotName: '113', details: true, del: true, edit: true, sort: 2, checked: true},
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


      barObj: {
        // 柱状图数据
        legendData: [
          {
            name: this.$date.y_m_d(new Date()),
            color: "#25da81",
            icon: "circle", // 标志类型
            textStyle: {
              fontSize: 14, // 文字的大小
              inactiveColor: "#ccc", // 图例关闭的颜色
              color: "#25da81", // 文字的颜色
            },
          },
          {
            name: "同比上月",
            color: "#fdca00",
            icon: "circle", // 标志类型
            textStyle: {
              fontSize: 14, // 文字的大小
              inactiveColor: "#ccc", // 图例关闭的颜色
              color: "#fdca00", // 文字的颜色
            },
          },
        ],
        axisData: [],
        seriesData: [],
        gridStyle: {
          top: "20%",
          // bottom: '-10px',
        },
        legendStyle: {
          // left: 0,
          // bottom: 10,
          right: 10,
          // itemWidth: 12, // 图例的宽度
          itemHeight: 12, // 图例的高度
          color: "#666666", // 文字颜色
        },
        dataZoomStyle: {
          yScroll: false, // 开启Y轴滑动条
          xScroll: false, // 开启X轴滑动条
        },
        yAxisStyle: {
          // yAxisType: "category", // y轴显示的类别
          axisLineColor: "#246979", // 坐标轴线的颜色
          axisLabelColor: "#246979", // 坐标轴文字的颜色
          splitLineType: "dashed", // 分隔线的线型
          splitLineColor: "#014757", // 分隔线的颜色
          formatter: "条",
        },
        xAxisStyle: {
          // axisLineShow: true, // 是否显示坐标轴线
          // axisLabelShow: true, // 是否显示坐标轴文字
          // axisTickShow: false, // 是否显示刻度线
          // splitLineShow: false, // 是否显示分隔线
          // axisLineType: "solid", // 坐标轴线的线型
          // axisTickType: "solid", // 刻度线的线型
          // splitLineType: "solid", // 分隔线的线型
          // axisLineColor: "#999999", // 坐标轴线的颜色
          axisLineColor: "#246979", // 坐标轴线的颜色
          axisLabelColor: "#246979", // 坐标轴文字的颜色
          // splitLineColor: "#d5d5d5", // 分隔线的颜色
          // axisLineWidth: "1", // 坐标轴线的宽度
          // axisLabelFontSize: "12", // 坐标轴文字的大小
          // axisTickWidth: "1", // 刻度线的宽度
          // splitLineWidth: "1", // 分隔线的宽度
          // xAxisType: "value", // x轴显示的类别
          axisLabelInterval: 1, // 坐标轴文字间隔展示的数量
          // axisLabelRrotate: 0, // 坐标轴文字逆时针旋转角度
          dislocation: false, // 是否错位显示X轴文字
        },
        itemStyle: [
          {
            showBackground: false, // 是否打开背景颜色
            barBorderRadius: [50, 50, 0, 0], // 设置柱状图圆角 [上，右，下，左]
            // linearGradient: true, // 是否设置渐变色
            color: ["#25da81"], // 图形颜色
            barWidth: 12, // 图形宽度
          },
          {
            showBackground: false, // 是否打开背景颜色
            barBorderRadius: [50, 50, 0, 0], // 设置柱状图圆角 [上，右，下，左]
            // linearGradient: true, // 是否设置渐变色
            color: ["#fdca00"], // 图形颜色
            barWidth: 12, // 图形宽度
          },
        ],
      },
      lineObj: {
        // 折线图数据
        axisData: [],
        seriesData: [],
        legendStyle: {
          // left: 0,
          // bottom: 20,
          right: 10,
          top: 0,
          itemWidth: 12, // 图例的宽度
          itemHeight: 12, // 图例的高度
          color: "#666666", // 文字颜色
        },
        gridStyle: {
          top: "23%",
          // bottom: 0,
        },
        yAxisStyle: {
          axisLineColor: "#246979", // 坐标轴线的颜色
          axisLabelColor: "#246979", // 坐标轴文字的颜色
          splitLineType: "dashed", // 分隔线的线型
          splitLineColor: "#014757", // 分隔线的颜色
        },
        legendData: [
          {
            name: this.$date.y_m_d(new Date()),
            color: "#25da81", // 图例的颜色
            icon: "circle", // 标志类型
            textStyle: {
              fontSize: 14, // 文字的大小
              inactiveColor: "#ccc", // 图例关闭的颜色
              color: "#25da81", // 文字的颜色
            },
          },
          {
            name: "同比上月",
            color: "#fdca00", // 图例的颜色
            icon: "circle", // 标志类型 'circle' | 'rectangle' | 'triangle' | 'diamond' |'emptyCircle' | 'emptyRectangle' | 'emptyTriangle' | 'emptyDiamond'
            textStyle: {
              fontSize: 14, // 文字的大小
              inactiveColor: "#ccc", // 图例关闭的颜色
              color: "#fdca00", // 文字的颜色
            },
          },
        ],
        xAxisStyle: {
          // axisLineShow: true, // 是否显示坐标轴线
          // axisLabelShow: true, // 是否显示坐标轴文字
          // axisTickShow: false, // 是否显示刻度线
          // splitLineShow: false, // 是否显示分隔线
          // axisLineType: "solid", // 坐标轴线的线型
          // axisTickType: "solid", // 刻度线的线型
          // splitLineType: "dashed", // 分隔线的线型
          axisLineColor: "#246979", // 坐标轴线的颜色
          axisLabelColor: "#246979", // 坐标轴文字的颜色
          // axisTickColor: "#999999", // 刻度线的颜色
          // splitLineColor: "#d5d5d5", // 分隔线的颜色
          // axisLineWidth: "1", // 坐标轴线的宽度
          // axisLabelFontSize: "12", // 坐标轴文字的大小
          // axisTickWidth: "1", // 刻度线的宽度
          // splitLineWidth: "1", // 分隔线的宽度
          axisLabelInterval: 2, // 坐标轴文字间隔展示的数量
          axisLabelRrotate: 0, // 坐标轴文字逆时针旋转
        },
        itemStyle: [
          {
            linearGradient: false, // 是否设置渐变色
            // symbolSize: 0, // 图形拐点圆的大小
            symbol: "none",
            color: ["#25da81"], // 图形颜色
            width: 2, // 图形粗细
            smooth: true, // 图形是否圆滑过渡
          },
          {
            linearGradient: false, // 是否设置渐变色
            // symbolSize: 0, // 图形拐点圆的大小
            symbol: "none",
            color: ["#fdca00"], // 图形颜色
            width: 2, // 图形粗细
            smooth: true, // 图形是否圆滑过渡
          },
        ],
      },
      peiObj: {
        // 饼图数据
        seriesData: [],
        seriesColor: [
          "#e02b2b",
          "#0099e2",
          "#00fa80",
          "#fdca00",
        ],
        seriesStyle: {
          center: ['50%', '35%'], // 饼图的位置 第一个左右,第二个上下距离
          labelNormalShow: false,
          labelEmphasisShow: false,
          radius: ["38%","55%"], // 饼图内外圈的半径 第一个内圈,第二个外圈
          // roseType: "radius", // 饼图的模式 radius--半径模式 area--面积模式
          seriesHoverAnimation: true, // 是否取消掉环形图鼠标移上去时自动放大
          // hoverOffset: 2.5, // 设置鼠标放上去图放大的比例
        },
        titleStyle: {
          titleShow: true,
          titleTop: "20%",
          titleFontSize: 20,
          titleColor: "#fff"
        },
        legendStyle: {
          bottom: "2%",
          left: "center",
          // fontSize: 12,
          itemWidth: 18, // 图例的宽度
          itemHeight: 12, // 图例的高度
          selectedMode: true, // 是否取消图例上的点击事件
          color: []
        },
        graphicStyle: {
          graphicText: "今日总警情",
          graphicTop: "40%",
          graphicColor: "#00dcf5",
          graphicFontSize: 12,
        },
      },

      timeObj: undefined,
      validBol: true,
    };
  },
  mounted() {
    // console.log(process);
    // console.log(process.env);
    // console.log(process.env.NODE_ENV)
    this.publicTablebodys = this.publicTablebody;
    this.publicTablebody = this.publicTablebodys.slice(0, this.pageInfo.pageSize);
    this.pageInfo.total = this.publicTablebodys.length;
    this.getPageList();
    this.getBarCharts();
    this.getLineCharts();
    this.getPieCharts();
  },
  computed: {
    // 接收 state 写法一
    ...mapState({
      cameraList: state => {
        return state.monitor.cameraList
      },
      policeList: state => {
        return state.monitor.policeList
      },
    }),

    // 接收 state 写法二
    cameraList2() {
      return this.$store.state.monitor.cameraList;
    },
    policeList2() {
      return this.$store.state.monitor.policeList;
    },

    // 接收 getters 写法一
    ...mapGetters(['keepAlives','cacheList']),
    // 接收 getters 写法二
    keepAlives2() {
      return this.$store.getters.keepAlives;
    },
    cacheList2() {
      return this.$store.getters.cacheList;
    }
  },
  methods: {
    // 调用 actions 写法一，调用并且传值的写法。 this.getCameraList(["vuex里面存储的防抖和节流"])，这是调用并传值。 this.getPoliceList(["vuex里面存储的防抖和节流"])，这是调用并传值
    ...mapActions(['getCameraList','getPoliceList']),
    // actions 写法三，不传值只调用的写法。 vuexGettersClick 是调用的触发的函数，getCameraList 是vuex actions里面定义的方法名。
    ...mapActions({
      vuexActionshClick: "getPoliceList",
    }),

    // 调用 mutations 写法一，调用并且传值的写法
    ...mapMutations(['SET_CAMERA','SET_POLICE']),
    // mutations 写法三，不传值只调用的写法。 vuexMutationsClick 是调用的触发的函数，SET_CAMERA 是vuex mutations里面定义的方法名
    ...mapMutations({
      vuexMutationsClick: "SET_CAMERA",
    }),
    vuexGettersClick() {
      // 计算属性 getters 调用写法
      this.$store.commit("SET_CACHE_LIST", "test vuex存储的计算属性值，传入字符串，返回数组");
      this.$store.commit("SET_KEEP_ALIVE", "test vuex存储的计算属性值，传入字符串，返回数组");
      // 计算属性 getters 接收写法一
      console.log(this.keepAlives);
      console.log(this.cacheList);
      // 计算属性 getters 接收写法二
      console.log(this.keepAlives2);
      console.log(this.cacheList2);
      // 计算属性 getters 接收写法三
      console.log(this.$store.getters.keepAlives);
      console.log(this.$store.getters.cacheList);
    },
    async vuexActionshClick() {
      // 异步方法 actions 调用写法一
      this.getCameraList(["vuex里面存储的异步调用接口返回数据 cameraList"]);
      this.getPoliceList(["vuex里面存储的异步调用接口返回数据 policeList"]);
      // 异步方法 actions 调用写法二 ！！！this.$store.dispatch 只能用来执行调用异步 actions 的方法
      this.$store.dispatch("getCameraList", ["vuex里面存储的异步调用接口返回数据 cameraList2"]);
      this.$store.dispatch("getPoliceList", ["vuex里面存储的异步调用接口返回数据 policeList2"]);
      // 异步方法 actions 调用写法四
      let cameraList = await this.getCameraList(["vuex里面存储的异步调用接口返回数据 cameraList"]);
      let policeList = await this.getPoliceList(["vuex里面存储的异步调用接口返回数据 policeList"]);
      // let cameraList = await this.$store.dispatch("getCameraList", ["vuex里面存储的异步调用接口返回数据 cameraList2"]);
      // let policeList = await this.$store.dispatch("getPoliceList", ["vuex里面存储的异步调用接口返回数据 policeList2"]);
      console.log(cameraList,policeList);
      // 异步方法 actions 接收写法一
      console.log(this.cameraList);
      console.log(this.policeList);
      // 异步方法 actions 接收写法二
      console.log(this.cameraList2);
      console.log(this.policeList2);
      // 异步方法 actions 接收写法三
      console.log(this.$store.state.monitor.cameraList);
      console.log(this.$store.state.monitor.policeList);
    },
    vuexMutationsClick() {
      // 方法 mutations 调用写法一
      this.SET_CAMERA(["vuex里面的方法 cameraList"]);
      this.SET_POLICE(["vuex里面的方法 policeList"]);
      // 方法 mutations 调用写法二
      this.$store.commit("SET_CAMERA", ["vuex里面的方法 cameraList2"]);
      this.$store.commit("SET_POLICE", ["vuex里面的方法 policeList2"]);
      // 方法 mutations 接收写法一
      console.log(this.cameraList);
      console.log(this.policeList);
      // 方法 mutations 接收写法二
      console.log(this.cameraList2);
      console.log(this.policeList2);
      // 方法 mutations 接收写法三
      console.log(this.$store.state.monitor.cameraList);
      console.log(this.$store.state.monitor.policeList);
    },

    // 柱状图数据
    getBarCharts() {
      let seriesData = [];
      let seriesData1 = [];
      let axisData = [];
      for (let i = 0; i < 23; i++) {
        axisData.push(i);
        let n = Math.random()*200;
        let s = Math.random()*50;
        if (n < 60) {
          seriesData.push(n.toFixed(1))
        } else {
          seriesData.push(0)
        }
        if (s < 20) {
          seriesData1.push(s.toFixed(0))
        } else {
          seriesData1.push(0)
        }
      }
      this.barObj.axisData = axisData;
      this.barObj.seriesData = [seriesData,seriesData1.reverse()];
    },
    // 折线图数据
    getLineCharts() {
      let seriesData = [];
      let seriesData1 = [];
      let axisData = [];
      for (let i = 0; i < 23; i++) {
        axisData.push(i);
        seriesData.push(i);
        seriesData1.push(i);
      }
      this.lineObj.axisData = axisData;
      this.lineObj.seriesData = [seriesData,seriesData1.reverse()];
    },
    // 饼图数据
    getPieCharts() {
      let seriesData = [];
      for (let i = 1; i < 5; i++) {
        seriesData.push({
          label: i, name: `${i}${i}`, value: i,
          // {label: item.label, name: `${item.label}${item.value}`, value: item.value}
        });
      }
      this.peiObj.seriesData = seriesData;
    },
    getPageList() {
      this.ksrqObj.defaultDate = this.$date.y_m_d_zt();
      this.jsrqObj.defaultDate = this.$date.y_m_d_mt();
      this.ksrqObj.disabledDate = this.jsrqObj.defaultDate;
      this.jsrqObj.disabledDate = this.ksrqObj.defaultDate;
    },
    // 选择的开始日期
    selectDateKsrq(val) {
      // console.log(val);
      // this.ksrqObj.defaultDate = val;
      this.jsrqObj.disabledDate = val;
    },
    // 选择的结束日期
    selectDateJsrq(val) {
      // console.log(val);
      // this.jsrqObj.defaultDate = val;
      this.ksrqObj.disabledDate = val;
    },
    // 选择的开始时间
    selectDatekssj(val) {
      this.jssjObj.disabledTime = val;
    },
    // 选择的结束时间
    selectDateJssj(val) {
      this.kssjObj.disabledTime = val;
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
      // this.gdmcObj.defaultValue = val.replace(/[^\d]/g, "");
      console.log(val)
    },
    // 分页信息--前端分页
    handlePageChange(val) {
      let { currentPage,pageSize } = val;
      let strat = (currentPage-1) * pageSize;
      let end = currentPage * pageSize;
      this.publicTablebody = this.publicTablebodys.slice(strat, end)
    },
    // 格式化日期按钮
    dateFormatClick() {
      let date = this.$date.ymd_yymmdd("2021年04月15日 10时31分04秒");
      let aaaa = this.$date.defaultDate("2021-12-10");
      console.log(aaaa);
      console.log(date);
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
    },
    // 防抖和节流
    throttleAndDebounce() {
      this.$methods.throttle(this.getThrottleInfo,1000);
      this.$methods.debounce(this.getDebounceInfo,1000);
    },
    getThrottleInfo() {
      console.log('我是防抖，多次点击只会触发一次');
    },
    getDebounceInfo() {
      console.log('我是节流，多次点击会依据间隔时间来执行次数')
    },
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
      .public-bar-charts {
        height: 30%;
      }
      .public-line-charts {
        height: 30%;
      }
    }
    .public-pei-charts {
      // width: 30%;
      // height: 30%;
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
        flex: 1;
        // height: 95%;
      }
      .public-pagination {
        height: 5%;
      }
    }
  }
  .img {
    background: url("../views/element-ui/img/4e10662af608.png");
    background-size: 100% 100%;
  }
</style>