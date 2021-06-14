<template>
  <div class="public-table">
    <table border="0">
      <!-- 表头背景图片 -->
      <slot name="head-img">
        <div :class="['head-img', headStyle.background]" :style="headImgStyle"></div>
      </slot>
      <thead ref="theadRef" @mouseover="mouseOverStart"  @mouseleave="mouseLeaveStart" :style="headStyle">
        <tr>
          <th v-if="isCheckbox" :style="[isCheckbox,headThStyle]">
            <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange" v-if="!isCheckbox.title"></el-checkbox>
            <span v-else>{{isCheckbox.title}}</span>
          </th>
          <th v-if="isRadiobox" :style="[isRadiobox,headThStyle]">
            <span>{{isRadiobox.title}}</span>
          </th>
          <th
            v-for="(item,index) in headDatas"
            :key="index+Math.random()"
            :style="[{ 'width': item.width,'padding': item.padding,'text-align': item.text_align_head },headThStyle]">
            <span>{{ item.title }}</span>
          </th>
          <th v-if="isScrollY" class="is-scroll-y" ></th>
        </tr>
      </thead>
      <tbody ref="tbodyRef" :style="[bodyStyle]">
        <tr
          ref="trRef"
          v-for="(value, index) in bodyDatas"
          :key="index+Math.random() * 100"
          :class="[{ 'is-scroll-y': isScrollY }, {'checkbox': isCheckbox}, {'disabled': value.checkedDisabled || value.radioDisabled}]"
          :style="[{ 'background': !bodyTrStyle.stripe ? bodyTrStyle.background : index % 2 == 0 ? bodyTrStyle.background : '' },bodyTrStyle]"
          @click="isCheckbox || isRadiobox  ? '' : itemClick(value,index)">
          <!-- 复选框 -->
          <slot name="checkbox">
            <td v-if="isCheckbox" :style="[isCheckbox,bodyTdStyle]">
              <el-checkbox v-model="value.checked" :label="value" :disabled="value.checkedDisabled" @change="handleCheckedCitiesChange(value,index)">
                <span style="display: none;"></span>
              </el-checkbox>
            </td>
          </slot>
          <!-- 单选框 -->
          <slot name="radio">
            <td v-if="isRadiobox" :style="[isRadiobox,bodyTdStyle]" @change="getRadioChange(radioValue,index)">
              <el-radio-group v-model="radioValue">
                <el-radio :label="value" :disabled="value.radioDisabled"><span style="display: none;"></span></el-radio>
              </el-radio-group>
            </td>
          </slot>
          <td  @click="isCheckbox || isRadiobox ? itemClick(value,index) : ''" v-for="(item,n) in headDatas" :key="n+Math.random() * 10" :style="[item,bodyTdStyle]">
            <!-- 普通序号或者带边框或者带背景颜色或者带背景图的序号 -->
            <div v-if="item.name == 'numbers'" class="numbers">
              <div 
                :class="['numbers-box', value.divStyle ? value.divStyle.background : '' || item.divStyle ? item.divStyle.background : '']"
                :style="[item.divStyle, value.divStyle]"
              >
                <!-- 数字补0 -->
                <span v-if="item.div_two">{{pageNumber + index + 1 > 9 ? pageNumber + index + 1 : `0${pageNumber + index + 1}`}}</span>
                <!-- 数字不补0 -->
                <span v-else>{{pageNumber + index + 1}}</span>
              </div>
            </div>

            <!-- 带作用域插槽的 -->
            <div v-else-if="item.slot" class="slot">
              <slot :name="item.name" :row="value"></slot>
            </div>
            
            <!-- 普通文本 -->
            <div v-else :style="{ 'color': item.colors == true ? value.color : '' }"
              @mouseover="mouseOverText($event,item)"
              @mouseleave="mouseLeaveText($event,item)"
            >
              <div class="tooltip-popover" v-if="isEllipsis">
                <div class="tooltip" v-if="item.ellipsis == 'tooltip'">
                  <el-tooltip placement="top">
                    <template #content><span>{{value[item.name] || value[item.name] == 0 ? value[item.name] : "--" }}</span></template>
                    <div class="ellipsis"><span @click.stop="tdClick($event,value,item)">{{value[item.name] || value[item.name] == 0 ? value[item.name] : "--" }}</span></div>
                  </el-tooltip>
                </div>
                <div class="popover" v-if="item.ellipsis == 'popover'">
                  <el-popover placement="top" trigger="hover" :content="value[item.name] || value[item.name] == 0 ? value[item.name] : '--'">
                    <div slot="reference" class="ellipsis"><span @click.stop="tdClick($event,value,item)">{{value[item.name] || value[item.name] == 0 ? value[item.name] : "--" }}</span></div>
                  </el-popover>
                </div>
                <div class="ellipsis" v-if="!item.ellipsis"><span @click.stop="tdClick($event,value,item)">{{value[item.name] || value[item.name] == 0 ? value[item.name] : "--" }}</span></div>
              </div>
              <div class="ellipsis" v-if="!isEllipsis"><span @click.stop="tdClick($event,value,item)">{{value[item.name] || value[item.name] == 0 ? value[item.name] : "--" }}</span></div>
            </div>
          </td>
        </tr>
        <p v-if="bodyDatas.length == 0">暂无数据</p>
      </tbody>
    </table>
  </div>
</template>
<script>
export default {
  name: "publicTable",
  props: {
    headData: {
      // 表头数据
      type: Array,
      default: () => {
        return [];
      },
    },
    headStyle: {
      // 表头样式
      type: Object,
      default: () => {
        return {};
      },
    },
    headThStyle: {
      // 表头单元格样式
      type: Object,
      default: () => {
        return {};
      },
    },
    headImgStyle: {
      // 表头背景图样式
      type: Object,
      default: () => {
        return {};
      },
    },
    bodyData: {
      // 列表数据
      type: Array,
      default: () => {
        return [];
      },
    },
    bodyStyle: {
      // 列表样式
      type: Object,
      default: () => {
        return {};
      },
    },
    bodyTrStyle: {
      // 行样式
      type: Object,
      default: () => {
        return {};
      },
    },
    bodyTdStyle: {
      //单元格样式
      type: Object,
      default: () => {
        return {};
      },
    },
    radioModel: {
      //单选框绑定的值
      type: undefined,
      default: () => {
        return undefined;
      },
    },
    // 分页信息
    pageInfo: {
      type: Object,
      default: () => {
        return {
          currentPage: 1,
          pageSize: 10,
        };
      },
    },
  },
  watch: {
    headData: {
      handler(newVal) {
        // 去掉有单选框或复选框的那一列
        let arr = newVal.filter(item=>{
          return item.name != "checkbox" && item.name != "radio";
        })
        this.headDatas = arr;

        // 判断是否有复选框
        let obj = newVal.find(item=>{
          return item.name == "checkbox"
        })
        this.isCheckbox = obj;
        // 判断是否有单选框
        let val = newVal.find(item=>{
          return item.name == "radio"
        })
        this.isRadiobox = val;
      },
      deep: true,
      immediate: true,
    },
    bodyData: {
      handler(newVal) {
        this.bodyDatas = newVal;
        // 判断复选框是否全选
        this.handleDefaultChecIskAll(newVal);
      },
      deep: true,
      immediate: true,
    },
    pageInfo: {
      handler(newVal) {
        // 页码递增
        this.pageNumber = newVal.pageSize * (newVal.currentPage - 1);
      },
      deep: true,
      immediate: true,
    },
    radioModel: {
      handler(newVal) {
        this.radioValue = newVal;
      },
      deep: true,
      immediate: true,
    },
  },
  data() {
    return {
      headDatas: [], // 表格表头数据
      bodyDatas: [], // 表格内容数据
      checkedCities: [], // 复选框选择到的数据
      checkAll: false, // 复选框是否全部选中
      isCheckbox: undefined, // 是否有复选框
      isRadiobox: undefined, // 是否有单选框
      radioValue: undefined, // 单选框选择到的数据
      isIndeterminate: false, // 复选框是否至少有一个被选中
      isScrollY: false, // 是否出现Y轴滚动条
      isScrollX: false, // 是否出现X轴滚动条
      scrollHeadX: false, // 鼠标是否在thead里面
      scrollBodyX: true, // 鼠标是否在tobdy里面
      isEllipsis: false, // 文字是否溢出隐藏
      pageNumber: 1, // 初始化页码递增
    };
  },
  mounted() {
    let tbody = this.$refs.tbodyRef; // 获取tbody
    let thead = this.$refs.theadRef; // 获取thead
    this.isScrollY = tbody.scrollHeight > tbody.clientHeight ? true : false; // 判断tbody是否出现了Y轴滚动条
    tbody.addEventListener("scroll", this.handleScrollBodyX, false); // 监听tbody横向滚动条滚动事件
    thead.addEventListener("scroll", this.handleScrollHeadX, false); // 监听thead横向滚动条滚动事件
  },
  updated() {
    let tbody = this.$refs.tbodyRef; // 获取tbody
    this.isScrollY = tbody.scrollHeight > tbody.clientHeight ? true : false; // 判断tbody是否出现了Y轴滚动条
  },
  methods: {
    // 鼠标移入表头操作
    mouseOverStart() {
      this.scrollHeadX = true;
      this.scrollBodyX = false;
    },
    // 鼠标移出表头操作
    mouseLeaveStart() {
      this.scrollHeadX = false;
      this.scrollBodyX = true;
    },
    // 鼠标移入单元格操作
    mouseOverText(e,item) {
      // console.log(e);
      let p_w = e.target.offsetParent.getBoundingClientRect().width.toFixed(2) - 0;
      let e_l = e.target.offsetParent.style.paddingLeft;
      let e_r = e.target.offsetParent.style.paddingRight;
      let p_l = window.getComputedStyle(e.target.offsetParent).paddingLeft;
      let p_r = window.getComputedStyle(e.target.offsetParent).paddingRight;
      let paddingLeft = e_l ? p_l.split("px")[0] : 0;
      let paddingRight = e_r ? p_r.split("px")[0] : 0;
      let tdWidth = p_w - paddingLeft - paddingRight;
      let offsetWidth = e.target.getBoundingClientRect().width.toFixed(2) - 0;
      let falg = (offsetWidth > tdWidth) && item.ellipsis;
      if (falg) {
        this.isEllipsis = true;
      } else {
        this.isEllipsis = false;
      }
    },
    // 鼠标移出单元格操作
    mouseLeaveText(e) {
      
    },
    // 监听thead横向滚动条滚动事件
    handleScrollHeadX() {
      let tbodyRef = this.$refs.tbodyRef;
      let theadRef = this.$refs.theadRef;
      if (theadRef) {
        if (theadRef.scrollLeft == 0) {
          tbodyRef.scrollLeft = 0;
        }
        let scrollX = theadRef.scrollLeft > 0 ? true : false;
        if (scrollX && this.scrollHeadX) {
          tbodyRef.scrollLeft = theadRef.scrollLeft;
        }
      }
    },
    // 监听tbody横向滚动条滚动事件
    handleScrollBodyX() {
      this.$nextTick(()=>{
        let tbodyRef = this.$refs.tbodyRef;
        let theadRef = this.$refs.theadRef;
        if (tbodyRef) {
          if (tbodyRef.scrollLeft == 0) {
            theadRef.scrollLeft = 0;
          }
          let scrollX = tbodyRef.scrollLeft > 0 ? true : false;
          if (scrollX && this.scrollBodyX) {
            theadRef.scrollLeft = tbodyRef.scrollLeft;
          }
        }
      })
    },
    // 通过ref给表格内容赋值（不常用）
    getTableData(data) {
      this.bodyDatas = data;
    },
    // 单元格文本点击
    tdClick(e,value,item) {
      let obj = { e,value,item };
      this.$emit("tdClick", obj);
    },
    // 单元格或行点击
    itemClick(value,index) {
      this.$emit("click", value,index);
      this.handleCheckedCitiesChange(value,index);
      this.getRadioChange(value,index);
    },
    // 单选框点击操作
    getRadioChange(value,index) {
      if (!value.radioDisabled) {
        this.radioValue = value;
        this.$emit("radio", value,index);
      }
    },
    // 复选框点击操作
    handleCheckedCitiesChange(value,index) {
      if (this.isCheckbox && !value.checkedDisabled) {
        let i = this.checkedCities.findIndex(item=>{
          return item == value
        })
        if (i == -1) {
          this.checkedCities.push(value);
          this.bodyDatas[index].checked = true;
        } else {
          this.checkedCities.splice(i,1);
          this.bodyDatas[index].checked = false;
        }
        this.$forceUpdate();
        let checkedCount = this.checkedCities.length;
        let bodyDataCount = this.bodyDatas.length;
        this.checkAll = checkedCount === bodyDataCount;
        this.isIndeterminate = checkedCount > 0 && checkedCount < bodyDataCount;
        this.$emit("checkbox", this.checkedCities,index);
      }
    },
    // 默认回显复选框勾选状态。或全选状态
    handleDefaultChecIskAll(newVal) {
      let flag = false;
      newVal.forEach(item => {
        if (item.checked) {
          this.isIndeterminate = true;
          flag = true;
        } else {
          flag = false;
        }
      });
      if (flag) {
        this.isIndeterminate = false
      }
      this.checkAll = flag;
      this.checkedCities = newVal.filter(item=>{
        return item.checked
      })
    },
    // 复选框全选点击
    handleCheckAllChange(val) {
      if (val) {
        let bodyDatas = [];
        this.bodyDatas.forEach(item=>{
          item.checked = true;
          bodyDatas.push(item);
        })
        this.checkedCities = bodyDatas;
        this.isIndeterminate = false;
      } else {
        this.bodyDatas.forEach(item=>{
          item.checked = false;
        })
        this.checkedCities = [];
      }
    },
  },
};
</script>
<style lang="scss" scoped>
.public-table {
  height: 100%;
  table {
    position: relative;
    border-collapse: collapse;
    height: 100%;
    display: flex;
    flex-direction: column;
    thead {
      position: relative;
      display: block;
      box-sizing: border-box;
      height: 40px;
      font-size: 13px;
      overflow-y: auto;
      border: 1px solid var(--elBorderColor06);
      color: var(--elInnerColor03);
      background: var(--elBgColor13);
      tr {
        height: 100%;
        text-align: center;
        box-sizing: border-box;
        .is-scroll-y {
          width: 7px;
          height: 100%;
        }
      }
    }
    tbody {
      display: block;
      flex: 1;
      overflow-y: auto;
      border: 1px solid var(--elBorderColor06);
      color: var(--elInnerColor13);
      tr {
        height: 40px;
        border-bottom: 1px solid var(--elBorderColor16);
      }
      tr:hover {
        background-color: var(--elBgColor13);
      }
      p {
        font-size: 14px;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        color: var(--fontColorNoData);
      }
      .is-scroll-y:last-child {
        border-bottom: none;
      }
      .checkbox {
        cursor: pointer;
      }
      .disabled {
        cursor: not-allowed;
      }
      // 序号样式
      .numbers {
        display: flex;
        justify-content: center;
        align-items: center;
        // 序号背景图
        .dtqwBg11 {
          background: var(--dtqwBg11);
        }
        .dtqwBg12 {
          background: var(--dtqwBg12);
        }
        .numbers-box {
          display: flex;
          justify-content: center;
          align-items: center;
          background-repeat: no-repeat;
          background-size: 100% 100%;
        }
      }
      .ellipsis {
        font-size: 12px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
    }
    tr {
      width: 100%;
      display: table;
      table-layout: fixed;
      text-align: center;
      box-sizing: border-box;
      th:last-child,
      td:last-child {
        border-right: none !important;
      }
      td {
        span {
          font-size: 12px;
          word-break: break-all;
          // display: block;
        }
      }
    }
    tr,
    td,
    th {
      box-sizing: border-box;
    }
    .dtqwBg31 {
      height: 40px;
      background: var(--dtqwBg31);
    }
    // 设置表头背景图片
    .head-img {
      position: absolute;
      top: 0;
      left: -0.6%;
      right: -0.6%;
      background-repeat: no-repeat;
      background-size: 100% 100%;
    }
    ::v-deep.el-checkbox {
        .el-checkbox__label {
        padding-left: 0;
      }
      .el-checkbox__input.is-disabled {
        .el-checkbox__inner {
          background: #ccc;
          border-color: #ccc;
        }
      }
      .el-checkbox__input.is-checked.is-disabled {
        .el-checkbox__inner {
          background: #ccc !important;
        }
        .el-checkbox__inner::after {
          border-color: #666;
        }
      }
    }
    ::v-deep.el-radio {
      .el-radio__label {
        padding-left: 0;
      }
      .el-radio__input.is-disabled {
        .el-radio__inner {
          background: #ccc;
          border-color: #ccc;
        }
      }
      .el-radio__input.is-checked.is-disabled {
        .el-radio__inner {
          background: #ccc !important;
        }
        .el-radio__inner::after {
          border-color: #666;
        }
      }
    }
    // 设置滚动条样式
    thead::-webkit-scrollbar {
      width: 0px;
      height: 0px;
    }
    tbody::-webkit-scrollbar {
      width: 6px;
      height: 6px;
      background-color: var(--elBgColor09);
    }
    tbody::-webkit-scrollbar-track {
      background-color: var(--elBgColor09);
    }
    tbody::-webkit-scrollbar-corner {
      background-color: var(--elBgColor09);
    }
    tbody::-webkit-scrollbar-thumb {
      background: var(--elInnerColor14);
      border-radius: 3px;
    }

    // 设置动画淡入
    @keyframes fadenum { 
      0% { opacity: 0; }
      100% { opacity: 1; }
    }
  }
}
</style>