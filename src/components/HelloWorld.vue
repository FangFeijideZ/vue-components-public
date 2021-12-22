<template>
  <div class="hello-world">
    <el-button @click="alertsClick">alert</el-button>
    <el-button @click="getFormRules">表单验证</el-button>
    <public-form ref="publicForm">
      <!-- <template slot="item">
        <el-select v-model="inputValue1" slot="prepend" placeholder="请选择">
          <el-option label="餐厅名" value="1"></el-option>
          <el-option label="订单号" value="2"></el-option>
          <el-option label="用户电话" value="3"></el-option>
        </el-select>
        <el-button slot="append" icon="el-icon-search"></el-button>
      </template> -->
      <public-input
        v-model="inputValue1"
        label-width="80px"
        label="二次封装"
        prop
        clearable
        placeholder="请选择所属单位1"
        @input="getInputValue"
      >
        <public-select
          v-model="selectValue1"
          prop
          clearable
          slot="append"
          placeholder="请选择所属单位1"
          @select="getInputValue"
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
        @input="getInputValue"
      ></public-input>
      <public-select
        v-model="selectValue1"
        label-width="80px"
        label="二次封装"
        prop
        clearable
        :options="options"
        placeholder="请选择所属单位1"
        @select="getInputValue"
      >
        <!-- <template slot-scope="{row}">
          {{row}}
        </template> -->
      </public-select>
      <public-date
        v-model="inputValue2"
        label-width="80px"
        label="二次封装"
        prop
        clearable
        :picker-options="getPickerOptions"
        placeholder="请选择日期"
        @input="getInputValue"
      ></public-date>
      <public-time
        v-model="inputValue2"
        label-width="80px"
        label="二次封装"
        prop
        clearable
        placeholder="请选择时间"
        @input="getInputValue"
      ></public-time>
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
      inputValue1: "",
      inputValue2: "",
      selectValue1: "",
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
          { required: true, message: '请输入活动名称', validator: this.$validator.checkPhone, trigger: 'blur' },
        ],
      },
      
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
    },

    getInputValue(val) {
      console.log(val);
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
    getFormRules() {
      // let res = this.$refs.publicForm.resetFields();
      let res = this.$refs.publicForm.validate();
      console.log(res);
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
