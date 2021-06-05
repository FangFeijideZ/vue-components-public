<template>
  <div class="public-pei-charts">
    <div id="echart" class="charts-box">
      <div :id="echartsId" class="charts" v-show="showPieCharts"></div>
      <div class="flex-align-center no-data" v-show="!showPieCharts">暂无数据</div>
    </div>
  </div>
</template>
<script>
export default {
  name: "publicPeiCharts",
  props: {
    echartsId: {
      // 图表id
      type: String,
      default: () => {
        return "peiCharts";
      },
    },
    peiCharts: {
      type: Object,
      default: () => {
        return {};
      },
    },
  },
  watch: {
    peiCharts: {
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
      showPieCharts: true,
    };
  },
  mounted() {},
  methods: {
    getCharts(obj) {
      this.showPieCharts = obj.seriesData && obj.seriesData.length > 0 ? true : false;
      let scale = 1;
      let rich = {
        total: {
          color: "#0099e2",
          fontSize: 40 * scale,
          // fontFamily: "shuma",
          align: 'center',
          // borderColor: '#0b5263',
          // width: '100%',
          // borderWidth: 1,
          // height: 0,
          padding: [21, 0]
        },
      }
      let option = {
        tooltip: {
          trigger: 'item', // trigger 设置触发类型，默认数据触发，可选值：'item' ¦ 'axis'
          // showDelay: 20,   // 显示延迟，添加显示延迟可以避免频繁切换，单位ms
          // hideDelay: 20,   // 隐藏延迟，单位ms
          // textStyle: {
          //   fontSize: '16px',
          //   color: '#000'  // 设置文本颜色 默认#FFF
          // },
          // backgroundColor: 'rgba(255,0,0,0.7)',  // 提示框背景颜色
          // formatter设置提示框显示内容
          // {a}指series.name  {b}指series.data的name
          // {c}指series.data的value  {d}%指这一部分占总数的百分比
          // formatter: '{a} <br/>{b} : {c}个 ({d}%)',
          // type: 'cross',//默认值，可选值：'line' | 'cross' | 'shadow' | 'none'(无)，指定type后对应style生效（如下）
          formatter: function(value) {
            return  value ? `${value.marker}${value.data ? value.data.label : ''}：${value.data.value}` : false
            // return `${value.marker}${value.data.label}：${value.data.value} 占比${value.percent}%`
          },
        },
        title: {},
        graphic: {},
        legend: {  // 图例
          // data: [], // 顶部图例显示的内容
          // left: 'center', // 设置左中右, left靠左对齐, right靠右对齐, cebter居中对齐
          itemGap: obj.legendStyle && (obj.legendStyle.itemGap || obj.legendStyle.itemGap == 0) ? obj.legendStyle.itemGap : 10,
          itemHeight: obj.legendStyle && (obj.legendStyle.itemHeight || obj.legendStyle.itemHeight == 0) ? obj.legendStyle.itemHeight : 16, // 图例的高度
          itemWidth: obj.legendStyle && (obj.legendStyle.itemWidth || obj.legendStyle.itemWidth == 0) ? obj.legendStyle.itemWidth : 24, // 图例的宽度
          left: obj.legendStyle && (obj.legendStyle.left || obj.legendStyle.left == 0) ? obj.legendStyle.left : undefined,
          right: obj.legendStyle && (obj.legendStyle.right || obj.legendStyle.right == 0) ? obj.legendStyle.right : undefined,
          bottom: obj.legendStyle && (obj.legendStyle.bottom || obj.legendStyle.bottom == 0) ? obj.legendStyle.bottom : undefined,
          top: obj.legendStyle  && (obj.legendStyle.top || obj.legendStyle.top == 0) ? obj.legendStyle.top : undefined,
          containLabel: obj.legendStyle && obj.legendStyle.containLabel == false ? false : true, // 是否包含标签的宽度高度
          selectedMode: obj.legendStyle && obj.legendStyle.selectedMode == false ? false : true, // 是否取消图例上的点击事件
          textStyle: {
            fontSize: obj.legendStyle && obj.legendStyle.fontSize ? obj.legendStyle.fontSize : 12, // 文字的大小
            inactiveColor: obj.legendStyle && obj.legendStyle.inactiveColor ? obj.legendStyle.inactiveColor : "#ccc", // 图例关闭的颜色
            color: obj.legendStyle && obj.legendStyle.color ? obj.legendStyle.color : "", // 文字的颜色 设置 [] 时默认为图形对应颜色 设置 "" 时为黑色
          },
        },
        series: [
          {
            name: '半径模式',
            type: 'pie',
            radius: [50, 80], // 饼图内外圈的半径 第一个内圈,第二个外圈
            center: ['50%', '50%'], // 饼图的位置 第一个左右,第二个上下距离
            // roseType: 'radius', // 饼图的模式 radius--半径模式 area--面积模式
            itemStyle: {},
            labelLine: {},
            // avoidLabelOverlap: false,
            label: {},
            color: [], // 饼图每一项的颜色
            data: [] // 饼图每一项的数据
          },
        ]
      };
      if (obj.legendStyle && obj.legendStyle.orient) {
        option.legend.orient = obj.legendStyle.orient; // 图例显示的位置
      }
      let total = 0; // 总和
      obj.seriesData.forEach((val,j)=>{
        total += (val.value-0);
      });
      option.title = {
        text: obj.titleStyle && obj.titleStyle.titleShow  ? total : obj.titleStyle && obj.titleStyle.titleText ? obj.titleStyle.titleText : "",
        left: obj.titleStyle && obj.titleStyle.titleLeft  ? obj.titleStyle.titleLeft : "center",
        top: obj.titleStyle && obj.titleStyle.titleTop  ? obj.titleStyle.titleTop : "25%",
        textStyle: {
          color: obj.titleStyle && obj.titleStyle.titleColor  ? obj.titleStyle.titleColor : "#0099e2",
          fontSize: obj.titleStyle && obj.titleStyle.titleFontSize  ? obj.titleStyle.titleFontSize : 36,
          fontFamily: obj.titleStyle && obj.titleStyle.titleFontFamily  ? obj.titleStyle.titleFontFamily : "shuma",
          fontWeight: obj.titleStyle && obj.titleStyle.titleFontWeight  ? obj.titleStyle.titleFontWeight : 400,
          align: obj.titleStyle && obj.titleStyle.titleAlign  ? obj.titleStyle.titleAlign : "center"
        }
      },
      option.graphic = {
        type: obj.graphicStyle && obj.graphicStyle.graphicType  ? obj.graphicStyle.graphicType : "text",
        left: obj.graphicStyle && obj.graphicStyle.graphicLeft  ? obj.graphicStyle.graphicLeft : "center",
        top: obj.graphicStyle && obj.graphicStyle.graphicTop  ? obj.graphicStyle.graphicTop : "45%",
        style: {
          text: obj.graphicStyle && obj.graphicStyle.graphicText  ? obj.graphicStyle.graphicText : "",
          fill: obj.graphicStyle && obj.graphicStyle.graphicColor  ? obj.graphicStyle.graphicColor : "#666666",
          fontSize: obj.graphicStyle && obj.graphicStyle.graphicFontSize  ? obj.graphicStyle.graphicFontSize : 14,
          fontFamily: obj.graphicStyle && obj.graphicStyle.graphicFontFamily  ? obj.graphicStyle.graphicFontFamily : "",
          fontWeight: obj.graphicStyle && obj.graphicStyle.graphicFontWeight  ? obj.graphicStyle.graphicFontWeight : 700,
          textAlign: obj.graphicStyle && obj.graphicStyle.graphicAlign  ? obj.graphicStyle.graphicAlign : "center",
        },
      },
      option.series.forEach(item=>{
        item.data = obj.seriesData; // 饼图每一项的数据
        item.color = obj.seriesColor; // 饼图每一项的颜色
        item.name = obj.seriesName ? obj.seriesName : "";
        item.hoverAnimation = obj.seriesStyle && obj.seriesStyle.seriesHoverAnimation == false ? false : true; // 是否取消掉环形图鼠标移上去时自动放大
        item.center = obj.seriesStyle && obj.seriesStyle.center  ? obj.seriesStyle.center : ['50%', '50%'], // 饼图的位置 第一个左右,第二个上下距离
        item.radius = obj.seriesStyle && obj.seriesStyle.radius  ? obj.seriesStyle.radius : [50, 80], // 饼图内外圈的半径 第一个内圈,第二个外圈
        // item.hoverOffset = obj.seriesStyle && obj.seriesStyle.hoverOffset  ? obj.seriesStyle.hoverOffset : 6, // 设置鼠标放上去图放大的比例
        item.itemStyle = {
          borderRadius: obj.seriesStyle && obj.seriesStyle.borderRadius  ? obj.seriesStyle.borderRadius : 0, // 每一项的圆角
        };
        item.labelLine = {
          show: obj.seriesStyle && obj.seriesStyle.labelLineShow == true ? true : false, // 是否显示提示文字的引线
        };
        item.label = {
          normal: { // 静止时
            show: obj.seriesStyle && obj.seriesStyle.labelNormalShow == true ? true : false, // 是否显示提示的文字
            position: obj.seriesStyle && obj.seriesStyle.labelNormalPosition ? obj.seriesStyle.labelNormalPosition : 'center', // 设置文字位置 inner - center
            // formatter: '{total|' + total + '}',
            textStyle: {
              fontSize: obj.seriesStyle && obj.seriesStyle.labelNormalFontSize ? obj.seriesStyle.labelNormalFontSize : '12', // 设置文字大小
              fontWeight: obj.seriesStyle && obj.seriesStyle.labelNormalFontWeight ? obj.seriesStyle.labelNormalFontWeight : 400, // 设置文字加粗
              color: obj.seriesStyle && obj.seriesStyle.labelNormalColor ? obj.seriesStyle.labelNormalColor : "#000", // 设置文字颜色
            }
          },
        };
        item.emphasis = {  // 鼠标放上去时
          label: {
            show: obj.seriesStyle && obj.seriesStyle.labelEmphasisShow == false ? false : true, // 是否显示提示的文字
            // position: obj.series[i].labelEmphasisPosition ? obj.series[i].labelEmphasisPosition : 'center', // 设置文字位置
            textStyle: {
              fontSize: obj.seriesStyle && obj.seriesStyle.labelEmphasisFontSize ? obj.seriesStyle.labelEmphasisFontSize : '20', // 设置文字大小
              fontWeight: obj.seriesStyle && obj.seriesStyle.labelEmphasisFontWeight ? obj.seriesStyle.labelEmphasisFontWeight : 'bold', // 设置文字加粗
              color: obj.seriesStyle && obj.seriesStyle.labelEmphasisColor ? obj.seriesStyle.labelEmphasisColor : "#000", // 设置文字颜色
            }
          }
        }
        let normalFlag = obj.seriesStyle && (obj.seriesStyle.labelNormalFontSize || obj.seriesStyle.labelNormalFontWeight || obj.seriesStyle.labelNormalColor);
        let emphasisFlag = obj.seriesStyle && (obj.seriesStyle.labelEmphasisFontSize || obj.seriesStyle.labelEmphasisFontWeight || obj.seriesStyle.labelEmphasisColor);
        if (!emphasisFlag) {
          item.emphasis.textStyle = {}
        }
        if (!normalFlag) {
          item.label.normal.textStyle = {}
        }
        if (obj.seriesStyle && obj.seriesStyle.roseType) {
          item.roseType = obj.seriesStyle && obj.seriesStyle.roseType  ? obj.seriesStyle.roseType : "radius" // 饼图的模式 radius--半径模式 area--面积模式
        }
        if (obj.seriesStyle && obj.seriesStyle.hoverOffset) {
          item.hoverOffset = obj.seriesStyle && obj.seriesStyle.hoverOffset  ? obj.seriesStyle.hoverOffset : 6 // 设置鼠标放上去图放大的比例
        }
      })
      // let total = 0; // 总和
      // for (let i = 0; i < obj.series.length ; i++) {
      //   for (let j = 0; j < obj.series[i].data.length; j++) {
      //     total += obj.series[i].data[j].value;
      //     option.series[i].data.push(
      //       { name: obj.series[i].data[j].name, value: obj.series[i].data[j].value }
      //     );
      //     option.series[i].color.push(
      //       obj.series[i].data[j].color
      //     );
      //     option.series[i].labelLine = {
      //       show: obj.series[i].labelLineShow == true ? true : false, // 是否显示提示文字的引线
      //     };
      //     option.series[i].label = { 
      //       normal: { // 静止时
      //         show: obj.series[i].labelNormalShow == true ? true : false, // 是否显示提示的文字
      //         position: obj.series[i].labelNormalPosition ? obj.series[i].labelNormalPosition : 'center', // 设置文字位置
      //         textStyle: {
      //           fontSize: obj.series[i].labelNormalFontSize ? obj.series[i].labelNormalFontSize : '20', // 设置文字大小
      //           fontWeight: obj.series[i].labelNormalFontWeight ? obj.series[i].labelNormalFontWeight : 'bold', // 设置文字加粗
      //           color: obj.series[i].labelNormalColor ? obj.series[i].labelNormalColor : "#000", // 设置文字颜色
      //         }
      //       },
      //       emphasis: { // 鼠标放上去时
      //         show: obj.series[i].labelEmphasisShow == false ? false : true, // 是否显示提示的文字
      //         // position: obj.series[i].labelEmphasisPosition ? obj.series[i].labelEmphasisPosition : 'center', // 设置文字位置
      //         textStyle: {
      //           fontSize: obj.series[i].labelEmphasisFontSize ? obj.series[i].labelEmphasisFontSize : '20', // 设置文字大小
      //           fontWeight: obj.series[i].labelEmphasisFontWeight ? obj.series[i].labelEmphasisFontWeight : 'bold', // 设置文字加粗
      //           color: obj.series[i].labelEmphasisColor ? obj.series[i].labelEmphasisColor : "#000", // 设置文字颜色
      //         }
      //       },
      //     };
      //   }
      //   // option.series[i].label.normal.formatter = '{total|' + total + '}'
      // }
      // option.title.text = total;
      if (this.showPieCharts) {
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
  .public-pei-charts {
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