<template>
  <div class="public-bar-charts">
    <div id="echart" class="charts-box">
      <div :id="echartsId" class="charts" v-show="showBarCharts"></div>
      <div class="flex-align-center no-data" v-show="!showBarCharts">暂无数据</div>
    </div>
  </div>
</template>
<script>
export default {
  name: "publicBarCharts",
  props: {
    echartsId: {
      // 图表id
      type: String,
      default: () => {
        return "barCharts";
      },
    },
    barCharts: {
      type: Object,
      default: () => {
        return {};
      },
    },
  },
  watch: {
    barCharts: {
      handler(newVal, onload) {
        if (newVal) {
          this.getCharts(newVal)
        }
      },
      deep: true,
      immediate: true,
    },
  },
  data() {
    return {
      showBarCharts: true,
    };
  },
  mounted() {},
  methods: {
    getCharts(obj) {
      this.showBarCharts = obj.seriesData && obj.seriesData.length > 0 ? true : false;
      let echarts = require('echarts');
      // let rich = {
      //   icon_x: {
      //     height: 15,
      //     align: 'center',
      //     // padding: [0, 0, 0, 10],
      //     width: 20,
      //     backgroundColor: {
      //       image: obj.xAxisStyle && obj.xAxisStyle.formatterIcon ? obj.xAxisStyle.formatterIcon : ""
      //     }
      //   },
      //   icon_y: {
      //     height: 15,
      //     align: 'center',
      //     // padding: [0, 0, 0, 10],
      //     width: 20,
      //     backgroundColor: {
      //       image: obj.yAxisStyle &&  obj.yAxisStyle.formatterIcon ? obj.yAxisStyle.formatterIcon : ""
      //     }
      //   },
      // };
      let option = {
        // backgroundColor: '#eaecf0',
        title: {
          // text: '世界人口总量', // 主标题
          // subtext: '数据来自网络', // 副标题
        },
        tooltip: {
          trigger: 'axis', // 鼠标移入图表时的提示方式
          axisPointer: {
            type: 'shadow', // 显示阴影的类型, 默认为直线，可选为：'line' | 'shadow'
          }
        },
        dataZoom: [
          // X轴滑动条
          {
            type: 'slider', //滑动条
            show: obj.dataZoomStyle && obj.dataZoomStyle.xScroll ? true : false,      //开启
            xAxisIndex: [0],
            left: obj.dataZoomStyle && obj.dataZoomStyle.xLeft ? obj.dataZoomStyle.xLeft : '18%',  //滑动条位置
            start: obj.dataZoomStyle && obj.dataZoomStyle.xStart ? obj.dataZoomStyle.xStart : 1,    //初始化时，滑动条宽度开始标度
            end: obj.dataZoomStyle && obj.dataZoomStyle.xEnd ? obj.dataZoomStyle.xEnd : 100,      //初始化时，滑动条宽度结束标度
          },
          // X轴内置滑动
          {
            type: 'inside',  //内置滑动，随鼠标滚轮展示
            xAxisIndex: [0],
            start: 1,//初始化时，滑动条宽度开始标度
            end: 100  //初始化时，滑动条宽度结束标度
          },
          // Y轴滑动条
          {
            type: 'slider', //滑动条
            show: obj.dataZoomStyle && obj.dataZoomStyle.yScroll ? true : false,      //开启
            yAxisIndex: [0],
            left: obj.dataZoomStyle && obj.dataZoomStyle.yLeft ? obj.dataZoomStyle.yLeft : '90%',  //滑动条位置
            start: obj.dataZoomStyle && obj.dataZoomStyle.yStart ? obj.dataZoomStyle.yStart : 1,    //初始化时，滑动条宽度开始标度
            end: obj.dataZoomStyle && obj.dataZoomStyle.yEnd ? obj.dataZoomStyle.yEnd : 50,      //初始化时，滑动条宽度结束标度
          },
          // y轴内置滑动
          {
            type: 'inside',  //内置滑动，随鼠标滚轮展示
            // show: false,
            yAxisIndex: [0],
            start: 1,//初始化时，滑动条宽度开始标度                    
            end: 100  //初始化时，滑动条宽度结束标度
          },
        ],
        legend: {
          data: [], // 顶部图例显示的内容
          itemGap: obj.legendStyle && obj.itemGap !== undefined && obj.legendStyle.itemGap ? obj.legendStyle.itemGap : 10, // 各个item之间的间隔，单位px，默认为10
          textStyle: {
            fontSize: obj.legendStyle && obj.legendStyle.fontSize ? obj.legendStyle.fontSize : 12, // 文字的大小
            inactiveColor: obj.legendStyle && obj.legendStyle.inactiveColor ? obj.legendStyle.inactiveColor : "#ccc", // 图例关闭的颜色
            color: obj.legendStyle && obj.legendStyle.color ? obj.legendStyle.color : "", // 文字的颜色 设置 [] 时默认为图形对应颜色 设置 "" 时为黑色
          },
        },
        grid: { // 上下左右距离
          left: obj.gridStyle && obj.gridStyle !== undefined && obj.gridStyle.left ? obj.gridStyle.left : '3%',
          right: obj.gridStyle && obj.gridStyle !== undefined && obj.gridStyle.right ? obj.gridStyle.right : '4%',
          bottom: obj.gridStyle && obj.gridStyle !== undefined && obj.gridStyle.bottom ? obj.gridStyle.bottom : '3%',
          top: obj.gridStyle == undefined ? '10%' : obj.gridStyle.top ? obj.gridStyle.top : '10%',
          containLabel: obj.gridStyle && obj.gridStyle !== undefined && obj.gridStyle.containLabel == false ? false :  true, // 是否包含标签的宽度高度
        },
        xAxis: {
          type: obj.xAxisStyle && obj.xAxisStyle.xAxisType ? obj.xAxisStyle.xAxisType : 'category', // x轴显示的值
          boundaryGap: [0, 0], // x轴左右两边离边界的距离
          data: obj.axisData, // x轴显示的类别的数据
          axisLine: {
            show: obj.xAxisStyle && obj.xAxisStyle.axisLineShow == false ? obj.xAxisStyle.axisLineShow : true, // 是否显示坐标轴线
            lineStyle: {
              type: obj.xAxisStyle && obj.xAxisStyle.axisLineType ? obj.xAxisStyle.axisLineType : "solid", // 坐标轴线的线型
              color: obj.xAxisStyle && obj.xAxisStyle.axisLineColor ? obj.xAxisStyle.axisLineColor : "#999999", // 坐标轴线的颜色
              width: obj.xAxisStyle && obj.xAxisStyle.axisLineWidth ? obj.xAxisStyle.axisLineWidth : "1", // 坐标轴线的宽度
            },
          },
          axisLabel: {
            formatter: obj.xAxisStyle && obj.xAxisStyle.formatter == true ?  // 坐标轴自定义显示的内容
            function (value) {
              return `{${obj.xAxisStyle.formatterValue}|}\n` + value;
            } : 
            obj.xAxisStyle && obj.xAxisStyle.dislocation == true ?  // 是否错位显示X轴文字
            function (value, index) {
              if (index % 2 != 0) {
                return "\n" + value;
              } else {
                return value;
              }
            } :
            function (value) {
              let str = obj.xAxisStyle && obj.xAxisStyle.formatter ? value + obj.xAxisStyle.formatter : value;
              return str;
            },
            rich: obj.xAxisStyle && obj.xAxisStyle.rich ? obj.xAxisStyle.rich : {},
            show: obj.xAxisStyle && obj.xAxisStyle.axisLabelShow == false ? obj.xAxisStyle.axisLabelShow : true, // 是否显示坐标轴文字
            interval: obj.xAxisStyle && obj.xAxisStyle.axisLabelInterval ? obj.xAxisStyle.axisLabelInterval : 0, // 坐标轴文字间隔展示的数量, 0为显示全部
            rotate: obj.xAxisStyle && obj.xAxisStyle.axisLabelRrotate ? obj.xAxisStyle.axisLabelRrotate : 0, // 45代表坐标轴文字逆时针旋转45度, 0为不旋转
            textStyle: {
              color: obj.xAxisStyle && obj.xAxisStyle.axisLabelColor ? obj.xAxisStyle.axisLabelColor : "#999999", // 坐标轴文字的颜色
              fontSize : obj.xAxisStyle && obj.xAxisStyle && obj.xAxisStyle.axisLabelFontSize ? obj.xAxisStyle.axisLabelFontSize : "12", // 坐标轴文字的大小
            },
          },
          axisTick: {
            show: obj.xAxisStyle && obj.xAxisStyle.axisTickShow == true ? obj.xAxisStyle.axisTickShow : false, // 是否显示刻度线
            lineStyle: {
              type: obj.xAxisStyle && obj.xAxisStyle.axisTickType ? obj.xAxisStyle.axisTickType : "solid", // 刻度线的线型 solid 和 dashed
              color: obj.xAxisStyle && obj.xAxisStyle.axisTickColor ? obj.xAxisStyle.axisTickColor : "#999999", // 刻度线的颜色
              width: obj.xAxisStyle && obj.xAxisStyle.axisTickWidth ? obj.xAxisStyle.axisTickWidth : "1", // 刻度线的宽度
            },
          },
          splitLine: {
            show: obj.xAxisStyle && obj.xAxisStyle.splitLineShow == true ? obj.xAxisStyle.splitLineShow : false, // 是否显示分隔线
            lineStyle: {
              type: obj.xAxisStyle && obj.xAxisStyle.splitLineType ? obj.xAxisStyle.splitLineType : "solid", // 分隔线的线型 solid 和 dashed
              color: obj.xAxisStyle && obj.xAxisStyle.splitLineColor ? obj.xAxisStyle.splitLineColor : "#d5d5d5", // 分隔线的颜色
              width: obj.xAxisStyle && obj.xAxisStyle.splitLineWidth ? obj.xAxisStyle.splitLineWidth : "1", // 分隔线的宽度
            },
          },
        },
        yAxis: {
          type: obj.yAxisStyle && obj.yAxisStyle.yAxisType ? obj.yAxisStyle.yAxisType : 'value', // y轴显示的类别 
          boundaryGap: [0, 0], // y轴左右两边离边界的距离
          data: obj.axisData, // y轴显示的类别的数据
          axisLine: {
            show: obj.yAxisStyle && obj.yAxisStyle.axisLineShow == false ? obj.yAxisStyle.axisLineShow : true, // 是否显示坐标轴线
            lineStyle: {
              type: obj.yAxisStyle && obj.yAxisStyle.axisLineType ? obj.yAxisStyle.axisLineType : "solid", // 坐标轴线的线型
              color: obj.yAxisStyle && obj.yAxisStyle.axisLineColor ? obj.yAxisStyle.axisLineColor : "#999999", // 坐标轴线的颜色
              width: obj.yAxisStyle && obj.yAxisStyle.axisLineWidth ? obj.yAxisStyle.axisLineWidth : "1", // 坐标轴线的宽度
            },
          },
          axisLabel: {
            formatter: obj.yAxisStyle && obj.yAxisStyle.formatter == true ? // 坐标轴自定义显示的内容
            function (value) {
              return value + `{${obj.yAxisStyle.formatterValue}|}`;
            } : 
            obj.yAxisStyle && obj.yAxisStyle.dislocation == true ?  // 是否错位显示Y轴文字
            function (value, index) {
              if (index % 2 != 0) {
                return "\n" + value;
              } else {
                return value;
              }
            } :
            function (value) {
              let str = obj.yAxisStyle && obj.yAxisStyle.formatter ? value + obj.yAxisStyle.formatter : value;
              return str;
            },
            rich: obj.yAxisStyle && obj.yAxisStyle.rich ? obj.yAxisStyle.rich : {},
            show: obj.yAxisStyle && obj.yAxisStyle.axisLabelShow == false ? obj.yAxisStyle.axisLabelShow : true, // 是否显示坐标轴文字
            interval: obj.yAxisStyle && obj.xAxisStyle.axisLabelInterval ? obj.yAxisStyle.axisLabelInterval : 0, // 坐标轴文字间隔展示的数量, 0为显示全部
            rotate: obj.yAxisStyle && obj.xAxisStyle.axisLabelRrotate ? obj.yAxisStyle.axisLabelRrotate : 0, // 45代表坐标轴文字逆时针旋转45度, 0为不旋转
            textStyle: {
              color: obj.yAxisStyle && obj.yAxisStyle.axisLabelColor ? obj.yAxisStyle.axisLabelColor : "#999999", // 坐标轴文字的颜色
              fontSize : obj.yAxisStyle && obj.yAxisStyle.axisLabelFontSize ? obj.yAxisStyle.axisLabelFontSize : "12", // 坐标轴文字的大小
            },
          },
          axisTick: {
            show: obj.yAxisStyle && obj.yAxisStyle.axisTickShow == true ? obj.yAxisStyle.axisTickShow : false, // 是否显示刻度线
            lineStyle: {
              type: obj.yAxisStyle && obj.yAxisStyle.axisTickType ? obj.yAxisStyle.axisTickType : "solid", // 刻度线的线型 solid 和 dashed
              color: obj.yAxisStyle && obj.yAxisStyle.axisTickColor ? obj.yAxisStyle.axisTickColor : "#999999", // 刻度线的颜色
              width: obj.yAxisStyle && obj.yAxisStyle.axisTickWidth ? obj.yAxisStyle.axisTickWidth : "1", // 刻度线的宽度
            },
          },
          splitLine: {
            show: obj.yAxisStyle && obj.yAxisStyle.splitLineShow == false ? obj.yAxisStyle.splitLineShow : true, // 是否显示分隔线
            lineStyle: {
              type: obj.yAxisStyle && obj.yAxisStyle.splitLineType ? obj.yAxisStyle.splitLineType : "solid", // 分隔线的线型 solid 和 dashed
              color: obj.yAxisStyle && obj.yAxisStyle.splitLineColor ? obj.yAxisStyle.splitLineColor : "#d5d5d5", // 分隔线的颜色
              width: obj.yAxisStyle && obj.yAxisStyle.splitLineWidth ? obj.yAxisStyle.splitLineWidth : "1", // 分隔线的宽度
            },
          },
        },
        series: []
      };
      for (let i = 0; i < obj.seriesData.length ; i++) {
        option.series.push(
          {
            name: obj.legendData[i] && obj.legendData[i].name, // 绑定数据的名称
            type: 'bar', // 图表类型
            data: obj.seriesData[i], // 绑定的数据
            barWidth: obj.itemStyle[i] && obj.itemStyle[i].barWidth ? obj.itemStyle[i].barWidth : 14, // 图例宽度
            showBackground: obj.itemStyle[i] && obj.itemStyle[i].showBackground ? obj.itemStyle[i].showBackground : false, // 是否打开背景颜色
            label: {
              show: obj.itemStyle[i] && obj.itemStyle[i].labelShow == true ? true : false,
              color: obj.itemStyle[i] && obj.itemStyle[i].labelColor ? obj.itemStyle[i].labelColor : "#000",
              position: obj.itemStyle[i] && obj.itemStyle[i].labelPosition ? obj.itemStyle[i].labelPosition : 'top',
              fontWeight: obj.itemStyle[i] && obj.itemStyle[i].labelFontWeight ? obj.itemStyle[i].labelFontWeight : 400,
              fontSize: obj.itemStyle[i] && obj.itemStyle[i].labelFontSize ? obj.itemStyle[i].labelFontSize : 12,
            },
            backgroundStyle: { // 背景属性设置
              color: obj.itemStyle[i] && obj.itemStyle[i].backgroundColor && obj.itemStyle[i].showBackground  ? obj.itemStyle[i].backgroundColor : '#f0f0f0',
            },
            itemStyle: {
              normal: { // 静止时
                barBorderRadius: obj.itemStyle[i] && obj.itemStyle[i].barBorderRadius ? obj.itemStyle[i].barBorderRadius : 0, // [0, 100, 100, 0]设置柱状图圆角 [上，右，下，左]
                color: obj.itemStyle[i] && obj.itemStyle[i].linearGradient ? 
                  new echarts.graphic.LinearGradient( // 设置渐变色
                    0, 1, 0, 0,
                    [
                        {offset: 0, color: obj.itemStyle[i].color[0]},
                        {offset: 1, color: obj.itemStyle[i].color[1]}
                        // {offset: 0.5, color: '#188df0'},
                    ]
                  ) :
                  obj.itemStyle[i] && obj.itemStyle[i].color[0] // 图形颜色
              },
              emphasis: { // 鼠标经过时

              },
            },
          },
        );
        option.legend.data.push(
          obj.legendData[i]
        )
      }
      if (obj.legendStyle && (obj.legendStyle.right || obj.legendStyle.right == 0)) {
        option.legend.right = obj.legendStyle.right
      }
      if (obj.legendStyle && (obj.legendStyle.left || obj.legendStyle.left == 0)) {
        option.legend.left = obj.legendStyle.left
      }
      if (obj.legendStyle && (obj.legendStyle.bottom || obj.legendStyle.bottom == 0)) {
        option.legend.bottom = obj.legendStyle.bottom
      }
      if (obj.legendStyle && (obj.legendStyle.top || obj.legendStyle.top == 0)) {
        option.legend.top = obj.legendStyle.top
      }
      if (obj.legendStyle && (obj.legendStyle.itemHeight || obj.legendStyle.itemHeight == 0)) {
        option.legend.itemHeight = obj.legendStyle.itemHeight
      }
      if (obj.legendStyle && (obj.legendStyle.itemWidth || obj.legendStyle.itemWidth == 0)) {
        option.legend.itemWidth = obj.legendStyle.itemWidth
      }
      if (obj.dataZoomStyle && !obj.dataZoomStyle.xScroll && !obj.dataZoomStyle.yScroll || !obj.dataZoomStyle) {
        option.dataZoom = [];
      }
      if (this.showBarCharts) {
        this.$nextTick(()=>{
          this.setOption(option);
        })
      }
    },
    setOption(option) {
      let echartsId = this.echartsId;
      let echarts = require('echarts');
      let myChart = echarts.init(document.getElementById(echartsId));
      myChart.setOption(option);
      window.addEventListener("resize", () => { myChart.resize()});
    }
  }
};
</script>
<style lang="scss" scoped>
  .public-bar-charts {
    height: 100%;
    .charts-box {
      height: 100%;
      position: relative;
      .no-data {
        top: 0;
        left: 0%;
        font-size: 14px;
        position: absolute;
      }
      .charts {
        height: 100%;
      }
    }
  }
</style>