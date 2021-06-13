<template>
  <div class="public-table">
    <table border="0">
      <!-- 表头背景图片 -->
      <div 
        :class="['bg-img', headStyle.img]" 
        :style="[
          { 'left': headStyle.img_left }, 
          { 'right': headStyle.img_right },
          { 'height': headStyle.img_height },
        ]"
      ></div>
      <thead ref="theadRef"
        @mouseover="mouseOverStart"
        @mouseleave="mouseLeaveStart"
        :style="[
          { 'color': headStyle.color },
          { 'margin': headStyle.margin },
          { 'height': headStyle.height },
          { 'font-size': headStyle.font_size },
          { 'border-bottom': !headStyle.margin ? 'none' : headStyle.border ? headStyle.border : headStyle.border_bottom },
          { 'border-top': headStyle.border ? headStyle.border : headStyle.border_top },
          { 'border-left': headStyle.border ? headStyle.border : headStyle.border_left },
          { 'border-right': headStyle.border ? headStyle.border : headStyle.border_right },
          { 'background': headStyle.background },
          { 'opacity': headStyle.opacity },
        ]"
      >
        <tr id="theadBox">
          <th
            v-if="checkbox"
            :style="[
              { 'width': '50px' },
              { 'border-right': headStyle.border ? headStyle.border : headStyle.border_right },
            ]"
          >
            <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange"></el-checkbox>
          </th>
          <th
            v-for="(item,index) in headDatas"
            :key="index+Math.random()"
            :style="[
              { 'width': item.width || headStyle.width },
              { 'padding': item.padding || headStyle.padding },
              { 'text-align': item.text_align_head || headStyle.text_align },
              { 'border-right': headStyle.border ? headStyle.border : headStyle.border_right },
            ]"
          >
            {{ item.title }}
          </th>
          <th v-if="isScrollY" class="is-scroll-y" ></th>
        </tr>
      </thead>
      <tbody ref="tbodyRef"
        :style="[
          { 'border-top': bodyStyle.border ? bodyStyle.border : bodyStyle.border_top },
          { 'border-left': bodyStyle.border ? bodyStyle.border : bodyStyle.border_left },
          { 'border-bottom': bodyStyle.border ? bodyStyle.border : bodyStyle.border_bottom },
          { 'border-right': bodyStyle.border ? bodyStyle.border : bodyStyle.border_right },
        ]">
        <tr
          v-for="(value, index) in bodyDatas"
          ref="trRef"
          :key="index+Math.random() * 100"
          :class="[{ 'is-scroll-y': isScrollY }, {'checkbox': checkbox}, {'disabled': value.checkedDisabled}]"
          :style="[
            { 'cursor': bodyTrStyle.cursor },
            { 'color': bodyTrStyle.color },
            { 'padding': bodyTrStyle.padding },
            { 'border-bottom': bodyTrStyle.border },
            { 'text-align': bodyTrStyle.text_align },
            { 'font-weight': bodyTrStyle.font_weight },
            { 'font-size': bodyTrStyle.font_size },
            { 'height': bodyTrStyle.height },
            { 'background': !bodyTrStyle.stripe ? bodyTrStyle.background : index % 2 == 0 ? bodyTrStyle.background : '' },
          ]"
          @click="checkbox ? '' : itemClick(value,index)"
        >
          <td
            v-if="checkbox"
            :style="[
              { 'width': '50px' },
              { 'border-right': bodyTdStyle.border ? bodyTdStyle.border : bodyTdStyle.border_right },
            ]"
          >
          {{value.checked}}
          <!-- <el-checkbox-group v-model="bodyDatas" @change="handleCheckedCitiesChange">
            <el-checkbox v-for="(checkedItem, cities) in checkedCities" :key="cities" :label="checkedItem" :checked="checkedItem.checked"  :disabled="checkedItem.checkedDisabled">
            <el-checkbox :disabled="value.checkedDisabled" >
              <span style="display: none;"></span>
            </el-checkbox>
          </el-checkbox-group> -->
          </td>
          <td
            @click="checkbox ? itemClick(value,index) : ''"
            v-for="(item,n) in headDatas"
            :key="n+Math.random() * 10"
            :style="[
              { 'width': item.width || bodyTdStyle.width },
              { 'height': item.height || bodyTdStyle.height },
              { 'color': item.color|| bodyTdStyle.color },
              { 'text-align': item.text_align || bodyTdStyle.text_align },
              { 'font-weight': item.font_weight || bodyTdStyle.font_weight },
              { 'background': item.background || bodyTdStyle.background },
              { 'padding': item.padding || bodyTdStyle.padding },
              { 'border-right': item.border || bodyTdStyle.border },
            ]"
          >
            <!-- 普通序号或者带边框或者带背景颜色或者带背景图的序号 -->
            <div v-if="item.name == 'numbers'" class="numbers">
              <div 
                :class="['numbers-box', value.div_background || item.div_background]"
                :style="[
                  { 'width': item.div_width },
                  { 'height': item.div_height },
                  { 'border-radius': item.div_radius },
                  { 'font-family': item.div_font_family },
                  { 'background': item.div_background },
                  { 'color': item.div_color || value.div_color },
                  { 'border': item.div_border || value.div_border },
                ]"
              >
                <!-- 数字补0 -->
                <span v-if="item.div_two">{{pageNumber + index + 1 > 9 ? pageNumber + index + 1 : `0${pageNumber + index + 1}`}}</span>
                <!-- 数字不补0 -->
                <span v-else>{{pageNumber + index + 1}}</span>
              </div>
            </div>

            <!-- 带popover气泡可点击的 -->
            <el-popover
              v-else-if="value[item.name] && item.ellipsis == 'popover'"
              placement="top"
              trigger="hover"
            >
              <ul class="file-list">
                <li
                  @click="getViewFilesUrl(file)"
                  v-for="file in value[item.name]"
                  :key="file.file_id"
                >
                  <span>{{ file.file_realname || file.file_name}}</span>
                  <span>{{ `（${file.file_time}）` }}</span>
                </li>
              </ul>
              <span
                class="ellipsis"
                slot="reference"
                v-if="value[item.name] && value[item.name].length > 0"
                >{{value[item.name][0].file_realname ||value[item.name][0].file_name }}</span
              >
            </el-popover>

            <!-- 带icon图标的 -->
            <div v-else-if="item.name == 'operations' || item.name == 'operation'" class="operation">
              <div class="operation-box" :style="[{ 'justify-content': item.justify_content }]">
                <!-- 值为operation时代表每条数据的图标都一样，为operations时代表每条数据的图标都不一样-->
                <div
                  v-for="icon in item.name == 'operation' ? item.operation: value.operations"
                  :key="icon.code"
                  class="operation-item"
                  @click="iconClick(value, icon)"
                  :style="{ 
                    'cursor': icon.cursor,
                    'width': icon.div_width,
                    'margin': icon.div_margin,
                    'justify-content': icon.justify_content,
                  }"
                >
                  <!-- 文本在左侧，图标在右侧 -->
                  <div v-if="icon.right && icon.title_show" class="left-title" :style="{ color: icon.color }">{{ icon.title || icon.title == 0 ? icon.title : "--" }}</div>
                  <div
                    v-if="icon.icon_show"
                    :title="icon.title"
                    :class="['icon', icon.icon_font, icon.icon, {'icon-margin': icon.right }]"
                    :style="{ 
                      'width': icon.width,
                      'color': icon.color,
                      'height': icon.height,
                      'margin': icon.margin,
                      'font-size': icon.font_size,
                    }"
                  ></div>
                  <!-- 文本在右侧，图标在左侧 -->
                  <div v-if="!icon.right && icon.title_show" class="right-title" :style="{ color: icon.color }">{{ icon.title || icon.title == 0 ? icon.title : "--" }}</div>
                </div>
              </div>
            </div>
            
            <!-- 带按钮的 -->
            <div v-else-if="item.name == 'buttoms' || item.name == 'buttom'" class="operation">
              <div class="operation-box" :style="[{ 'justify-content': item.justify_content }]">
                <!-- 值为buttom时代表每条数据的按钮都一样，为buttoms时代表每条数据的按钮都不一样-->
                <el-button
                  v-for="buttom in item.name == 'buttom' ? item.buttom : value.buttoms"
                  @click="iconClick(value, buttom)"
                  class="operation-item"
                  :key="buttom.code"
                  :type="buttom.button_type"
                  :size="buttom.button_size ? icon.button_size : 'mini'"
                  :style="{
                    'cursor': buttom.buttom_cursor,
                    'width': buttom.buttom_width,
                    'height': buttom.buttom_height,
                    'margin': buttom.buttom_margin,
                    'padding': buttom.buttom_padding,
                    'justify-content': buttom.justify_content
                  }"
                >
                  <div class="buttom-box">
                    <!-- 文本在左侧，图标在右侧 -->
                    <div v-if="buttom.right && buttom.title_show" class="left-title" :style="{ color: buttom.color }">{{ buttom.title }}</div>
                    <div
                      v-if="buttom.icon_show"
                      :title="buttom.title"
                      :class="['icon', buttom.icon_font, buttom.icon, {'icon-margin': buttom.right }]"
                      :style="{ 
                        'width': buttom.width,
                        'color': buttom.color,
                        'height': buttom.height,
                        'margin': buttom.margin,
                        'font-size': buttom.font_size,
                      }"
                    ></div>
                    <!-- 文本在右侧，图标在左侧 -->
                    <div v-if="!buttom.right && buttom.title_show" class="right-title" :style="{ color: buttom.color }">{{ buttom.title }}</div>
                  </div>
                </el-button>
              </div>
            </div>

            <!-- 带作用域插槽的 -->
            <div v-else-if="item.slot" class="slot">
              <slot :name="item.name" :row="value"></slot>
            </div>
            
            <!-- 普通文本 -->
            <div v-else :class="{'ellipsis': item.ellipsis}" 
              :style="{ 'color': item.colors == true ? value.color : '' }"
              @mouseover="mouseOverText($event,item)"
              @mouseleave="mouseLeaveText($event,item)"
            >
              <el-tooltip placement="top" v-if="ellipsis">
                <template #content><span>{{value[item.name] || value[item.name] == 0 ? value[item.name] : "--" }}</span></template>
                <div class="ellipsis"><span @click.stop="tdClick($event,value,item)">{{value[item.name] || value[item.name] == 0 ? value[item.name] : "--" }}</span></div>
              </el-tooltip>
              <div class="ellipsis" v-if="!ellipsis"><span @click.stop="tdClick($event,value,item)">{{value[item.name] || value[item.name] == 0 ? value[item.name] : "--" }}</span></div>
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
    checkbox: {
      // 复选框
      type: Boolean,
      default: () => {
        return false;
      },
    }
  },
  watch: {
    headData: {
      handler(newVal) {
        this.headDatas = newVal;
      },
      deep: true,
      immediate: true,
    },
    bodyData: {
      handler(newVal) {
        this.bodyDatas = newVal;

        // 判断复选框是否全选
        let flag = true;
        newVal.forEach(item => {
          if (item.checked) {
            this.isIndeterminate = true
          } else {
            flag = false;
          }
        });
        if (flag) {
          this.isIndeterminate = false
        }
        this.checkAll = flag;
      },
      deep: true,
      immediate: true,
    },
    pageInfo: {
      handler(newVal) {
        let { currentPage, pageSize } = newVal;
        this.pageNumber = pageSize * (currentPage - 1);
      },
      deep: true,
      immediate: true,
    },
  },
  data() {
    return {
      headDatas: [],
      bodyDatas: [],
      checkedCities: [
        {id: 5, description: '123', spotName: '123333222', details: false, del: true, edit: true, sort: 7, checked: true},
      ],
      checkedCitiesList: [],
      checkAll: false,
      isIndeterminate: false,
      isScrollY: false, // 是否出现Y轴滚动条
      isScrollX: false, // 是否出现X轴滚动条
      scrollHeadX: false,
      scrollBodyX: true,
      pageNumber: 1,
      ellipsis: false,
      ellipsisText: "",
    };
  },
  mounted() {
    // console.log(this.checkedCities);
    // this.checkedCitiesList = this.checkedCities;
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
    // 鼠标移入
    mouseOverStart() {
      this.scrollHeadX = true;
      this.scrollBodyX = false;
    },
    // 鼠标移出
    mouseLeaveStart() {
      this.scrollHeadX = false;
      this.scrollBodyX = true;
    },
    // 鼠标移入
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
        this.ellipsis = true;
        this.ellipsisText = e.target.innerText;
      } else {
        this.ellipsis = false;
        this.ellipsisText = ""
        // console.log(this.ellipsisText);
      }
    },
    // 鼠标移出
    mouseLeaveText(e) {
      // this.ellipsis = false;
      // this.ellipsisText = ""
      // console.log(e.target.className,'===============');
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
    getTableData(data) {
      this.bodyDatas = data;
    },
    getViewFilesUrl() {
      
    },
    iconClick(value,icon) {
      this.$emit("iconClick", value,icon);
    },
    tdClick(e,value,item) {
      let obj = { e,value,item };
      console.log(obj);
      this.$emit("tdClick", obj);
    },
    itemClick(value,index) {
      console.log(456);
      this.$emit("click", value,index);

      
      // if (this.checkbox && !value.checkedDisabled) {
      //   let i = this.checkedCities.findIndex(item=>{
      //     return item.id == value.id
      //   })
      //   if (i == -1) {
      //     this.checkedCities.push(value);
      //   } else {
      //     this.checkedCities.splice(i,1);
      //   }
      //   let checkedCount = this.checkedCities.length;
      //   let bodyDataCount = this.bodyDatas.length;
      //   this.checkAll = checkedCount === bodyDataCount;
      //   this.isIndeterminate = checkedCount > 0 && checkedCount < bodyDataCount
      // }
    },

    handleCheckAllChange(val) {
      let bodyDatas = [];
      this.bodyDatas.forEach(item=>{
        bodyDatas.push(item);
      })
      this.checkedCities = val ? bodyDatas : [];
      this.isIndeterminate = false;
    },
    handleCheckedCitiesChange(val) {
      console.log(val);
      let checkedCount = val.length;
      let bodyDataCount = this.bodyDatas.length;
      this.checkAll = checkedCount === bodyDataCount;
      this.isIndeterminate = checkedCount > 0 && checkedCount < bodyDataCount
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
        .numbers-box {
          display: flex;
          justify-content: center;
          align-items: center;
          // width: 23px;
          height: 23px;
          border-radius: 50%;
          font-size: 14px;
          // font-family: "shuma";
          // border: 1px solid var(--bgColor11);
          // background: var(--bgColor11);
          // color: var(--fontColor01);
        }
        // 序号背景图
        .dtqwBg11 {
          background: var(--dtqwBg11);
          background-repeat: no-repeat;
          background-size: 100% 100%;
        }
        .dtqwBg12 {
          background: var(--dtqwBg12);
          background-repeat: no-repeat;
          background-size: 100% 100%;
        }
      }
      // 操作列样式
      .operation {
        .operation-box {
          display: flex;
          .operation-item {
            display: flex;
            align-items: center;
            margin-right: 5px;
            .buttom-box {
              display: flex;
              align-items: center;
            }
            .icon {
              margin-right: 5px;
              font-size: 12px;
            }
            .icon:last-child {
              margin-right: 0px;
            }
            .icon-margin {
              margin-left: 5px;
              margin-right: 0px;
            }
            .left-title,
            .right-title {
              font-size: 12px;
            }
            .dtqwBg74 {
              background: var(--dtqwBg74);
              background-repeat: no-repeat;
              background-size: 100% 100%;
            }
          }
          .operation-item:last-child {
            margin-right: 0px;
          }
        }
      }
      .file-list {
        padding: 0;
        margin: 0;
        li {
          height: 40px;
          line-height: 40px;
          list-style: none;
        }
        li:hover {
          background-color: var(--hoveBgColor01);
          color: var(--elInnerColor13);
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
    // 设置表头背景图片
    .bg-img {
      position: absolute;
      top: 0;
      left: -0.6%;
      right: -0.6%;
    }
    .dtqwBg31 {
      height: 40px;
      background: var(--dtqwBg31);
      background-repeat: no-repeat;
      background-size: 100% 100%;
    }
    ::v-deep.el-checkbox-group {
      .el-checkbox {
         .el-checkbox__label {
          padding-left: 0;
        }
        .el-checkbox__input.is-disabled {
          .el-checkbox__inner {
            background: #555;
            border-color: #555;
          }
        }
        .el-checkbox__input.is-checked.is-disabled {
          .el-checkbox__inner {
            background: #555 !important;
          }
          .el-checkbox__inner::after {
            border-color: #999;
          }
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
    // // 设置字体
    // @font-face {
    //   font-family: "shuma";
    //   src: url("./font/accidental_presidency.ttf");
    // }
    // @font-face {
    //   font-family: "shuma1";
    //   src: url("./font/digital-7.ttf");
    // }
    // @font-face {
    //   font-family: "shuma2";
    //   src: url("./font/LESLIE.ttf");
    // }
  }
}
</style>