<template>
	<el-button class="public-button" v-bind="$attrs" v-on="$listeners" @click="buttonClick">
		<slot></slot>
	</el-button>
</template>
<script>
export default {
	name: "publicButton",	
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
<style scoped>
	.public-button {

	}
</style>
