<template>
  <div class="public-input">
    <slot name="left" class="left"></slot>
    <slot name="item" v-for="scope in inputObj.typeOptions" :row="scope"></slot>
    <el-input
      v-model="input" 
      :placeholder="placeholder" 
      :type="type" 
      :size="size" 
      :disabled="disabled" 
      :clearable="clearable" 
      @input="getInputValue"
    ></el-input>
  </div>
</template>

<script>
export default {
  name: "publicInput",
  props: {
    inputObj: {
      type: Object,
      default: () => {},
    },
    inputValue: {
      type: String,
      default: () => {},
    },
    placeholder: {
      type: String,
      default: () => {},
    },
    type: {
      type: String,
      default: () => {},
    },
    size: {
      type: String,
      default: () => {},
    },
    clearable: {
      type: Boolean,
      default: () => {},
    },
    disabled: {
      type: Boolean,
      default: () => {},
    },
  },
  model: {
    prop: 'inputValue',
    event: 'change'
  },
  watch: {
    inputObj: {
      handler(newVal, onload) {
        if (newVal) {
          // console.log(newVal);
        }
      },
      deep: true,
      // immediate: true,
    },
  },
  data() {
    return {
      input: ""
    };
  },
  mounted() {
    
  },
  methods: {
    // 输入事件
    getInputValue(val) {
      this.$emit("input", val);
    },
    // 清空内容
    clearValue() {
      this.$emit("clear", null);
    },
  },
};
</script>

<style lang="scss" scoped>
.public-input {
  width: 100%;
  font-size: 13px;
}
</style>
