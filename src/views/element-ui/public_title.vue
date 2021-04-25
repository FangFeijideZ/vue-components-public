<template>
  <div :class="['public-title', 'flex-align-center', img]" :style="[{ 'width': width }, { 'height': height }]">
    <div v-if="showIcon" :class="['icon', icon]" :style="[{ 'width': iconWidth }, { 'height': iconHeight }, { 'padding': iconPadding }, { 'margin': iconMargin }]"></div>
    <div class="title" :style="[{ color: color }, { 'padding': padding }, { 'font-size': fontSize }, { 'margin': margin }]">{{ title }}</div>
  </div>
</template>
<script>
export default {
  name: "publicTitle",
  props: {
    // 图标
    icon: {
      type: String,
      default: () => {
        return "";
      },
    },
    // 图标宽度
    iconWidth: {
      type: String,
      default: () => {
        return "1.2rem";
      },
    },
    // 图标高度
    iconHeight: {
      type: String,
      default: () => {
        return "1.2rem";
      },
    },
    // 图标内边距
    iconPadding: {
      type: String,
      default: () => {
        return "";
      },
    },
    // 图标外边距
    iconMargin: {
      type: String,
      default: () => {
        return "";
      },
    },
    // 是否显示图标
    showIcon: {
      type: Boolean,
      default: () => {
        return false;
      },
    },
    // 背景图
    img: {
      type: String,
      default: () => {
        return "";
      },
    },
    // 标题
    title: {
      type: String,
      default: () => {
        return "";
      },
    },
    // 字体大小
    fontSize: {
      type: String,
      default: () => {
        return "16px";
      },
    },
    // 整体高度
    height: {
      type: String,
      default: () => {
        return "5%";
      },
    },
    // 整体宽度
    width: {
      type: String,
      default: () => {
        return "";
      },
    },
    // 标题外边距
    margin: {
      type: String,
      default: () => {
        return "";
      },
    },
    // 标题内边距
    padding: {
      type: String,
      default: () => {
        return "";
      },
    },
    // 标题颜色
    color: {
      type: String,
      default: () => {
        return "var(--fontColor01)";
      },
    },
  },
  data() {
    return {};
  },
  mounted() {},
  methods: {},
};
</script>
<style lang="scss" scoped>
.public-title {
  height: 100%;
  width: 100%;
  box-sizing: border-box;
  .icon {
    margin-right: 5px;
    background-repeat: no-repeat;
    background-size: 100% 100%;
  }
}
.dtqwBg76 {
  background: var(--dtqwBg76);
  background-size: 100% 100%;
}
.dtqwBg02 {
  background: var(--dtqwBg02);
  background-repeat: no-repeat;
  background-size: 100% 100%;
}
</style>
