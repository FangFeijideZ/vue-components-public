<template>
  <div class="hello-world">
    <el-button @click="alertsClick">alert</el-button>
    <el-button @click="getFormRules">表单验证</el-button>
    <public-button icon="el-icon-search">搜索<i class="el-icon-upload el-icon--right"></i></public-button>
    <public-title style="background: var(--publicBg01); background-size: 100% 100%;">标题</public-title>
    <public-form ref="publicForm">
      <public-input
        v-model="inputValue1"
        label-width="80px"
        label="二次封装"
        prop
        clearable
        placeholder="请选择所属单位1"
        @input="getInputValue1"
      >
        <public-select
          v-model="selectValue1"
          prop
          clearable
          slot="append"
          placeholder="请选择所属单位1"
          @select="getSelectValue1"
        ></public-select>
        <!-- <i slot="prefix" class="el-input__icon el-icon-date"></i> -->
        <i slot="suffix" class="el-input__icon el-icon-search"></i>
      </public-input>
      <public-input
        v-model="inputValue2"
        label-width="80px"
        label="二次封装"
        prop
        clearable
        suffix-icon="el-icon-date"
        placeholder="请选择所属单位2"
        @input="getInputValue2"
      ></public-input>
      <public-select
        v-model="selectValue2"
        label-width="80px"
        label="二次封装"
        prop
        clearable
        :options="options"
        placeholder="请选择所属单位1"
        @select="getSelectValue2"
      >
        <!-- <template slot-scope="{row}">
          {{row}}
        </template> -->
      </public-select>
      <public-date
        v-model="dateValue1"
        label-width="80px"
        label="二次封装"
        prop
        clearable
        format="yyyy-MM-dd"
        value-format="yyyy-MM-dd"
        :picker-options="getPickerOptions"
        placeholder="请选择日期"
        @change="getDateValue1"
      ></public-date>
      <public-time
        v-model="timeValue1"
        label-width="80px"
        label="二次封装"
        prop
        clearable
        format="hh:mm:ss"
        value-format="hh:mm:ss"
        placeholder="请选择时间"
        @change="getTimeValue1"
      ></public-time>
      <public-pagination
        :total="pageInfo.total"
        :small="pageInfo.small"
        :disabled="pageInfo.disabled"
        :layout="pageInfo.layout"
        :background="true"
        :pager-count="pageInfo.pagerCount"
        :page-size.sync="pageInfo.pageSize"
        :page-sizes.sync="pageInfo.pageSizes"
        :current-page.sync="pageInfo.currentPage"
        :hide-on-single-page="pageInfo.hideOnSinglePage"
        :pagination-obj="pageInfo" 
        @change="handlePageChange"
      ></public-pagination>
      <public-table
        stripe
        border
        :row-class-name="tableRowClassName"
        @selection-change="handleSelectionChange"
        :data="tableData"
        :title="tableTitle"
      >
        <template slot="operation" slot-scope="scope">{{scope.row.name}}</template>
        <template slot="xxx" slot-scope="scope">
          <el-button type="danger" size="mini" round>删除</el-button>
          <!-- {{scope}} -->
          <!-- <public-input
            v-model="inputValue2"
            label-width="80px"
            label="二次封装"
            prop
            clearable
            suffix-icon="el-icon-date"
            placeholder="请选择所属单位2"
            @input="getInputValue2"
          ></public-input> -->
        </template>
      </public-table>
    </public-form>

    <!-- <ul class="img-group flex" ref='ulRef'>
      <li :class="['img-box', {active: index == 2}]" draggable v-for="(item,index) in dragstartList" :key="index" 
        @dragstart="getDragstart($event,item)"
        @drag="getDrag($event,item)"
        @dragenter="getDragenter($event,item)"
        @dragover="getDragover($event,item)"
        @dragleave="getDragleave($event,item)"
        @drop="getDrop($event,item)"
        @dragend="getDragend($event,item)"
      >
      {{item.code}}--{{item.label}}
      </li>
    </ul> -->
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
      dateValue1: "",
      timeValue1: "",
      inputValue1: "",
      inputValue2: "",
      selectValue1: "",
      selectValue2: "",
      pageInfo: {
        pageSize: 10,
        pageSizes: [10, 30, 50, 100],
        currentPage: 1,
        pagerCount: 5,
        total: 100,
        hideOnSinglePage: false,
        disabled: false,
        small: false,
        layout: "prev, pager, next, sizes, jumper",
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

      tableTitle: [
        {
          type: "selection",
        },
        {
          type: "index",
        },
        {
          id: 1,
          prop: "date",
          label: "日期",
          sortable: true,
        },
        {
          id: 2,
          prop: "name",
          label: "姓名",
        },
        {
          id: 3,
          prop: "address",
          label: "地址",
        },
        {
          id: 4,
          // prop: "name",
          label: "xxx",
          slots: 'xxx',
          // type: "expand",
        },
        {
          id: 10,
          label: "操作",
          slots: 'operation',
        },
      ],
      tableData: [{
        date: '2016-05-02',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-04',
        name: '王1虎',
        address: '上海市普陀区金沙江路 1517 弄'
      }, 
      {
        date: '2016-05-01',
        name: '王2虎',
        address: '上海市普陀区金沙江路 1519 弄'
      }, 
      {
        date: '2016-05-01',
        name: '王3虎',
        address: '上海市普陀区金沙江路 1519 弄'
      }, 
      {
        date: '2016-05-01',
        name: '王5虎',
        address: '上海市普陀区金沙江路 1519 弄'
      }, 
      {
        date: '2016-05-01',
        name: '王4虎',
        address: '上海市普陀区金沙江路 1519 弄'
      }, 
      {
        date: '2016-05-03',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1516 弄'
      }],
      
      dragstartList: [
        { code: 1, label: "我是第一个，拖动我试试" },
        { code: 2, label: "我是第二个，拖动我试试" },
        { code: 3, label: "我是第三个，拖动我试试" },
        { code: 4, label: "我是第四个，拖动我试试" },
        { code: 5, label: "我是第五个，拖动我试试" },
      ],
      options: [{
        value: '选项1',
        label: '黄金糕'
      }, {
        value: '选项2',
        label: '双皮奶'
      }, {
        value: '选项3',
        label: '蚵仔煎'
      }, {
        value: '选项4',
        label: '龙须面'
      }, {
        value: '选项5',
        label: '北京烤鸭'
      }],
      moveDom: '',
      changeDom: '',
      startY: 0,
      startX: 0,
      endY: 0,
      endX: 0,
    }
  },
  mounted() {
    
  },
  computed: {
    getPickerOptions() {
      return { disabledDate: (time) => {
          return time.getTime() < this.$date.getDateTime(this.$date.y_m_d_zt());
        }
      }
    }
  },
  methods: {
    // 需要注意的是,drag系列事件不能跟mousemove共存，只能取其一。
    // 对于Safari，还必须要在CSS中对能拖拽的元素如下设置： *[draggable = true] { -khtml-user-drag: element; }
    getDragstart(e,item) {
      // console.log(e,"==============事件主体是被拖放元素，在开始拖放被拖放元素时触发（开始拖放）。");
      this.moveDom = e.currentTarget;
      this.startX = e.clientX;
      this.startY = e.clientY;
      e.dataTransfer.setData('text',"<span>22</span>");
    },
    getDrag(e,item) {
      // console.log(e,"==============事件主体是被拖放元素，在正在拖放被拖放元素时触发。");
    },
    getDragenter(e,item) {
      // console.log(e,"==============事件主体是目标元素，在被拖放元素进入某元素时触发。");
    },
    getDragover(e,item) {
      // console.log(e,"==============事件主体是目标元素，在被拖放在某元素内移动时触发。");
      e.preventDefault() // 如果不阻止默认事件，drop事件将不会触发。
      e.dataTransfer.dropEffect = 'move'

      //   this.changeDom = e.currentTarget;
      //   this.endY = e.clientY;
      //   this.endX = e.clientX;
      //   if (this.endY - this.startY >= 0) {
      //     // console.log('下')
      //     this.$refs.ulRef.insertBefore(this.moveDom, this.changeDom.nextSibling)
      //   } else {
      //     // console.log('上')
      //     this.$refs.ulRef.insertBefore(this.moveDom, this.changeDom)
      //   }
      //   if (this.endX - this.startX >= 0) {
      //     // console.log('左')
      //     this.$refs.ulRef.insertBefore(this.moveDom, this.changeDom.nextSibling)
      //   } else {
      //     // console.log('右')
      //     this.$refs.ulRef.insertBefore(this.moveDom, this.changeDom)
      //   }
    },
    getDragleave(e,item) {
      // console.log(e,"==============事件主体是目标元素，在被拖放元素移出目标元素时触发。");
    },
    getDrop(e,item) {
      // console.log(e,"==============事件主体是目标元素，在目标元素完全接受被拖放元素时触发（正在拖放）。");
      e.preventDefault(); // 如果不阻止默认事件，drop事件将不会触发。
      // console.log(e.dataTransfer.getData('text'));
      // console.log(e.dataTransfer.types);
      this.changeDom = e.currentTarget;
      this.endY = e.clientY;
      this.endX = e.clientX;
      if (this.endY - this.startY >= 0) {
        // console.log('下')
        this.$refs.ulRef.insertBefore(this.moveDom, this.changeDom.nextSibling)
      } else {
        // console.log('上')
        this.$refs.ulRef.insertBefore(this.moveDom, this.changeDom)
      }
      if (this.endX - this.startX >= 0) {
        // console.log('左')
        this.$refs.ulRef.insertBefore(this.moveDom, this.changeDom.nextSibling)
      } else {
        // console.log('右')
        this.$refs.ulRef.insertBefore(this.moveDom, this.changeDom)
      }
    },
    getDragend(e,item) {
      // console.log(e,"==============事件主体是被拖放元素，在整个拖放操作结束时触发（结束拖放）。");
    },

    getInputValue1(val) {
      console.log(val);
    },
    getInputValue2(val) {
      console.log(val);
    },
    getSelectValue1(val) {
      console.log(val);
    },
    getSelectValue2(val) {
      console.log(val);
    },
    getDateValue1(val) {
      console.log(val);
    },
    getTimeValue1(val) {
      console.log(val);
    },
    handlePageChange(val) {
      console.log(val);
    },
    handleSelectionChange(val) {
      console.log(val);
    },
    tableRowClassName({row, rowIndex}) {
      if (rowIndex === 1) {
        return 'warning-row';
      } else if (rowIndex === 3) {
        return 'success-row';
      }
      return '';
    },
    getFormRules() {
      // let res = this.$refs.publicForm.resetFields();
      let res = this.$refs.publicForm.validate();
      console.log(res);
    },
    alertsClick() {
      this.$alerts('自定义','<span style="color: red">123</span>',{
        dangerouslyUseHTMLString: true
      }).then(res=>{
        console.log('confirm');
      }).catch(err=>{
        console.log('cancel');
      })
    },
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
    .img-group {
      .img-box {
        width: 200px;
        height: 200px;
        margin-right: 10px;
        margin-bottom: 10px;
        background-color: skyblue;
      }
      .active {
        background-color: pink;
      }
    }
  }
</style>
