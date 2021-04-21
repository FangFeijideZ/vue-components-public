<template>
  <div class="public-input">
    <el-input 
      v-model="input" 
      :placeholder="placeholder" 
      :type="type" 
      :size="size" 
      :show-password="showPassword" 
      :show-word-limit="showWordLimit" 
      :disabled="disabled" 
      :maxlength="maxlength"
      :clearable="clearable" 
      @input="getInputValue"
    ></el-input>
    <!-- {{inputValue}} -->
    <!-- {{placeholder}} -->
    {{clearable}}
    {{disabled}}
    {{showPassword}}
    {{type}}
    {{size}}
    {{maxlength}}
    {{showWordLimit}}
  </div>
</template>

<script>
export default {
  name: "publicInput",
  props: {
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
    showPassword: {
      type: Boolean,
      default: () => {},
    },
    showWordLimit: {
      type: Boolean,
      default: () => {},
    },
    maxlength: {
      type: [String,Number],
      default: () => {},
    },
  },
  model: {
    prop: 'inputValue',
    // event: 'returnBack'
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
