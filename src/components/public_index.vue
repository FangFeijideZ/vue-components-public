<template>
  <div class="public-index">
    <el-button type="primary" @click="dragOpen" style="position: absolute; z-index: 2001;">{{dragTitle}}</el-button>
    <public-drag v-if="dragShow"></public-drag>
    <div class="box-left">
      <div class="button flex">
        <public-button
          @click="btnBcClick"
        >保存</public-button>
        <public-button
          type="primary"
          @click="promiseXhr"
        >XHR请求</public-button>
        <public-button
          v-del="[]"
          @click="throttleAndDebounce"
        >防抖和节流</public-button>
        <public-button
          type="primary"
          @click="dateFormatClick"
        >格式化日期</public-button>
      </div>
      <div class="button flex">
        <public-button
          type="primary"
          @click="deepCopyData"
        >深拷贝</public-button>
        <public-button
          title="数组去重"
          @click="arrRemovalIndexOf"
        >数组去重</public-button>
        <public-button
          type="primary"
          @click="isArray"
        >判断数组</public-button>
        <public-button
          @click="getPromise"
        >手写Promise</public-button>
      </div>
      <div class="button flex">
        <public-button
          @click="getRequest"
        >全局API</public-button>
        <public-button
          type="primary"
          @click="download"
        >下载文件</public-button>
      </div>
      <public-bar-charts :bar-charts="barObj"></public-bar-charts>
      <public-line-charts :line-charts="lineObj"></public-line-charts>
    </div>
    <public-pei-charts :pei-charts="peiObj"></public-pei-charts>
    <div class="box-right flex-column">
      <public-table
        :head-data="publicTableHead"
        :head-style="headStyleObj"
        :head-th-style="headThStyle"
        :head-img-style="headImgStyle"
        :body-data="publicTablebody"
        :body-style="bodyStyleObj"
        :body-tr-style="bodyTrStyleObj"
        :body-td-style="bodyTdStyleObj"
        :page-info="pageInfo"
        @click="iconClick"
        @checkbox="checkbox"
        @checkboxAll="checkboxAll"
      >
        <!-- 表头背景图插槽 -->
        <!-- <div class="head-img" slot="head-img"></div> -->

        <!-- 具名插槽
        <div class="iconfont" slot="left">
          <span class="left">1232</span>
        </div>
        全局过滤器
        <template slot="item" slot-scope="scope">
          <ul>
            <li v-for="(item,index) in scope.row" :key="index" :class="item.date | y_m_d"><b>{{item.date | y_m_d}}</b></li>
          </ul>
        </template> -->
        
        <!-- 作用域插槽，核心理念就是在父组件拿到子组件数据来在父组件渲染 -->
        <template slot="operation" slot-scope="{row: {value, index}}">
          <div class="flex-align-center">
            <div @click.stop="getEditInfo(value)">
              <i :class="{'el-icon-edit': value.edit}"></i>
              <span v-if="value.edit">编辑</span>
            </div>
            <div>
              <i :class="{'el-icon-view': value.details}"></i>
              <span v-if="value.details">详情</span>
            </div>
            <div>
              <i :class="{'el-icon-error': value.del}"></i>
              <span v-if="value.del">删除</span>
            </div>
            <!-- <el-button type="primary" size="mini">新增</el-button> -->
          </div>
        </template>
      </public-table>
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
      <public-pagination
        :pagination-obj="pageInfo" 
        @change="handlePageChange"
      ></public-pagination>
    </div>
  </div>
</template>
<script>
import { mapState,mapActions,mapGetters,mapMutations } from "vuex";
export default {
  name: "public_index",
  data() {
    return {
      dragTitle: "打开拖拽框",
      dragShow: false,
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
      publicTableHead: [
        { id: "0", title: "", name: "checkbox", width: "30px" },
        // { id: "0", title: "单选框", name: "radio", width: "30px" },
        { id: "1", title: "序号", name: "numbers", ellipsis: "", width: "15%", color: "var(--dyqwColor23)"},
        {
          id: "2",
          title: "岗点名称",
          name: "spotName",
          width: "15%",
          color: "var(--dyqwColor26)",
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
          ellipsis: "popover",
        },
        {
          id: "5",
          title: "岗点描述",
          name: "description",
          width: "25%",
          color: "var(--dyqwColor23)",
          ellipsis: "tooltip",
        },
        {
          id: "100",
          title: "操作",
          name: "operation",
          width: "35%",
          color: "var(--dyqwColor23)",
          slot: true,
          // ellipsis: "tooltip",
        },
      ],
      publicTablebody: [
        
      ],
      headStyleObj: {
        'border': '1px solid #ccc',
        'border-bottom': 'none',
        'img_height': '100px',
        // 'margin': '0 0 20px 0',4
      },
      headThStyle: {
        background: '#ccc',
        // 'border-right': '1px solid #ccc',
        // 'width': '200px',
      },
      headImgStyle: {
        // 'height': "50px",
        // 'background': 'pink',
      },
      bodyStyleObj: {
        'border': '1px solid #ccc',
      },
      bodyTrStyleObj: {
        'border-bottom': '1px solid #ccc',
        'stripe': true
      },
      bodyTdStyleObj: {
        'border-right': '1px solid #ccc',
        // 'border-right': '1px solid var(--elBorderColor16)',
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
    let publicTablebody = [
      {id: 1, description: '123', spotName: '123', details: false, del: true, edit: true, sort: 1},
      {id: 2, description: '大大大飒飒大苏打萨达', spotName: '额嗡飒ddedsdsde飒飒嗡嗡', details: true, del: false, edit: true, sort: 2},
      {id: 3, description: '额嗡飒ddede飒飒嗡嗡', spotName: '额为强AaA打算萨达问问去', details: false, del: false, edit: true, sort: 4},
      {id: 4, description: '1233332223', spotName: '123', details: true, del: true, edit: true, sort: 3},
      {id: 5, description: '123', spotName: '123333222', details: false, del: true, edit: true, sort: 7},
      {id: 6, description: '额为强倒萨大苏强问问sassas去', spotName: '大萨达', details: false, del: true, edit: true, sort: 5, checked: true, checkedDisabled: true, radioDisabled: true},
      {id: 7, description: '222', spotName: '额为强强s大苏打ssas去', details: true, del: false, edit: true, sort: 3, checked: true},
      {id: 8, description: '113', spotName: '113', details: true, del: true, edit: true, sort: 2, checked: true},
      {id: 9, description: '123', spotName: '123', details: true, del: true, edit: false, sort: 2, divStyle: {background: 'pink'}},
      {id: 11, description: '122', spotName: '122', details: true, del: true, edit: true, sort: 5},
      {id: 22, description: '123', spotName: '123', details: false, del: true, edit: true, sort: 6},
      {id: 33, description: '123', spotName: '123', details: true, del: false, edit: true, sort: 5},
      {id: 44, description: '123', spotName: '123', details: true, del: false, edit: false, sort: 5},
      {id: 55, description: '123', spotName: '123', details: true, del: false, edit: true, sort: 3},
      {id: 66, description: '123', spotName: '123', details: true, del: true, edit: true, sort: 2},
      {id: 77, description: '123', spotName: '123', details: true, del: true, edit: false, sort: 2},
      {id: 88, description: '123', spotName: '123', details: true, del: true, edit: true, sort: 5},
      {id: 56, description: '123', spotName: '123', details: false, del: true, edit: true, sort: 6},
      {id: 34, description: '123', spotName: '123', details: true, del: false, edit: true, sort: 5},
      {id: 12, description: '123', spotName: '123', details: true, del: false, edit: false, sort: 5},
      {id: 31, description: '123', spotName: '123', details: true, del: false, edit: true, sort: 3},
    ]
    this.publicTablebodys = publicTablebody;
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
    // 列表按钮点击
    iconClick(val,icon) {
      // console.log(val,icon);
    },
    checkbox(val) {
      console.log(val);
    },
    checkboxAll(val) {
      console.log(val);
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
    getEditInfo(val) {
      console.log(val);
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
    // 拖拽框
    dragOpen() {
      // window.confirm();
      this.dragShow = !this.dragShow;
      this.dragTitle = this.dragShow ? "关闭拖拽框" : "打开拖拽框";
    },
    // 手写一个Promise
    async getPromise() {
      let res = await this.getPromiseRandom();
      console.log(res);
      // this.getPromiseRandom().then(res=>{
      //   console.log(res,"===========>正确");
      // }).catch(err=>{
      //   console.log(err,"===========>错误");
      // });
    },
    // 手写一个Promise
    getPromiseRandom() {
      return new Promise((resolve,reject)=>{
        setTimeout(() => {
          let i = Math.random().toFixed(1);
          if (i > 0.5) {
            resolve(i)
          } else {
            return reject(i)
          }
        }, 500);
      })
      // .then(res=>{
      //   return res
      // }).catch(err=>{
      //   return new Error(err)
      // })
    },
    // 判断数组
    isArray() {
      // 判断是不是数组的方法
      var arr = [1,2,3];
      var is_arr_1 = arr instanceof Array;
      var is_arr_2 = Array.isArray(arr);
      var is_arr_4 = Array.prototype.isPrototypeOf(arr);
      var is_arr_5 = arr.constructor === Array;
      var is_arr_6 = Object.getPrototypeOf(arr) === Array.prototype;
      var is_arr_3 = Object.prototype.toString.call(arr) === "[object Array]"; // 推荐使用,可用于判断所有的数据类型
      console.log(is_arr_1,"=====>1.arr instanceof Array");
      console.log(is_arr_2,"=====>2.Array.isArray(arr)");
      console.log(is_arr_4,"=====>4.Array.prototype.isPrototypeOf(arr)");
      console.log(is_arr_5,"=====>5.arr.constructor === Array");
      console.log(is_arr_6,"=====>6.Object.getPrototypeOf(arr) === Array.prototype");
      console.log(is_arr_3,"=====>3.Object.prototype.toString.call(arr) === '[object Array]'");
    },
    // xhr 请求
    promiseXhr() {
      // let url = 'http://127.0.0.1:8081/listUsers'; // 本地 node 服务
      let url = 'https://www.runoob.com/try/ajax/ajax_info.txt';
      this.$methods.promiseXhr({method: "get", url, data: {key: 456}}).then(res=>{
        console.log(res.response);
        console.log(JSON.parse(res.response));
      }).catch(err=>{
        console.log(err.responseText);
      })
      function Zhang(first) {
        this.firstName = first;
      }
      Zhang.prototype.$zhang = {
        y_m(val) {
          return val + 50
        }
      }
      var myFather = new Zhang("John");
      let a = myFather.$zhang.y_m(20);
      console.log(a+"=====>prototype");
    },
    // axios 请求
    getRequest() {
      this.$http.get({url: this.$api.ajaxInfo, data: { key: 456 }}).then(res=>{
        console.log(res);
      }).catch(err=>{
        console.log(err);
      })
    },
    // 下载文件
    download() {
      this.$http.download({url: this.$api.download, fileName: '456789'}).then(res=>{
        console.log(res);
      }).catch(err=>{
        console.log(err);
      })
    },
    // 数组去重
    arrRemovalIndexOf() {
      let arr = [{name: "原数组name", id: 1},{name: "原数组name456", id: 2},{name: "原数组name", id: 1}];
      let arr_1 = [1,2,1];
      let arr1 = this.$methods.arrRemovalIndexOf(arr,"id"); // findIndex  第一个参数要进行去重的数组  第二个参数去重拿来比较的字段名
      let arr2 = this.$methods.arrRemovalIndexOf(arr_1); // findIndex  第一个参数要进行去重的数组  第二个参数不传就是去重简单的数组
      console.log(arr,"=====>原复杂数组");
      console.log(arr1,"=====>复杂数组去重");
      console.log(arr_1,"=====>原简单数组");
      console.log(arr2,"=====>简单数组去重");
    },
    // 深拷贝
    deepCopyData() {
      let arr = [{name: "原数组name", id: 1},{name: "原数组name456", id: 2},{name: "原数组name", id: 1}];
      let obj = {name: "原对象name", id: 1, obj: {code: "2555"}};
      let arr1 = this.$methods.deepCopyData(arr); // 递归 深拷贝, 传入数组或对象(推荐使用)
      let obj1 = this.$methods.copyDataAssign(obj); // assign 深拷贝, 只针对对象, 只能深拷贝对象的第一层
      let obj2 = this.$methods.copyDataObj(obj); // ...解构 深拷贝, 只针对对象, 只能深拷贝对象的第一层
      arr1[0].name = "拷贝后数组的name";
      obj1.name = "拷贝后对象的name";
      obj2.name = "拷贝后对象的name2";
      console.log(arr,"=========>原数组");
      console.log(arr1,"=========>拷贝后的数组");
      console.log(obj,"=========>原对象");
      console.log(obj1,"=========>拷贝后的对象");
      console.log(obj2,"=========>拷贝后的对象");
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
      // padding: 2%;
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
      // padding: 2%;
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
        .head-img {
          height: 50px;
          background-color: pink;
          left: -10px;
          right: -10px;
          // position: static;
        }
      }
      .public-pagination {
        height: 5%;
      }
    }
  }
</style>