<template>
  <div class="public-title" :style="$attrs.style">
    <slot></slot>
  </div>
</template>
<script>
export default {
  name: "publicTitle",
  data() {
    return {};
  },
  mounted() {},
  methods: {},
};
</script>
<style scoped>
.public-title {
  
}
</style>
