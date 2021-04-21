<template>
	<el-button class="public-button" :style="[{'background-color': backgroundColor}, {'border': border}]" :type="type" :disabled="disabled" :size="size" @click="buttonClick">
		<i v-if="showIcon" :class="icon" :style="[{ 'width': iconWidth }, { 'height': iconHeight }, {'margin': iconMargin}]"></i>
		<span :style="[{'font-size': fontSize}, {'color': color}]">{{ title }}</span>
	</el-button>
</template>
<script>
export default {
	name: "publicButton",	
	props: {
		// 按钮背景颜色
		backgroundColor: { 
			type: String,
			default: () => {
				return ''
			}
		},
		// 按钮边框
		border: { 
			type: String,
			default: () => {
				return undefined
			}
		},
		// 尺寸
		size: {
			type: String,
			default: () => {
				return 'medium'
			}
		},
		// 标题颜色
		color: {
			type: String,
			default: () => {
				return ''
			}
		},
		// 字体大小
		fontSize: {
			type: String,
			default: () => {
				return '14px'
			}
		},
		// 标题
		title: { 
			type: String,
			default: () => {
				return ''
			}
		},
		// 图标
		icon: { 
			type: String,
			default: () => {
				return ''
			}
		},
		// 图标宽度
    iconWidth: {
      type: String,
      default: () => {
        return "1rem";
      },
    },
    // 图标高度
    iconHeight: {
      type: String,
      default: () => {
        return "1rem";
      },
    },
		// 图标外边距
    iconMargin: {
      type: String,
      default: () => {
        return "";
      },
    },
		// 按钮类型
		type: {
			type: String,
			default: () => {
				return undefined
			}
		},
		// 是否禁用
		disabled: {
      type: Boolean,
      default: () => {
        return false;
      },
		},
		// 是否显示图标
		showIcon: {
      type: Boolean,
      default: () => {
        return true;
      },
    },
	},
  data() {
    return {};
  },
  mounted() {},
  methods: {
		// 按钮点击事件
		buttonClick() {
			this.$emit("click")
		}
	}
};
</script>
<style lang="scss" scoped>
	.public-button {
		padding: 10px 6.5%;
		i {
			display: inline-block;
			margin-right: 5px;
			vertical-align: top;
			background-repeat: no-repeat;
			background-size: 100% 100%;
		}
	}
	.dtqwBg76 {
		background: var(--dtqwBg76);
		background-size: 100% 100%;
	}
</style>
