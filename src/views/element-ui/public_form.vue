<template>
  <div class="public-form">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: "publicForm",
  data() {
    return {

    }
  },
  mounted() {
    
  },
  methods: {
    // 对整个表单进行校验的方法，参数为一个回调函数。该回调函数会在校验结束后被调用，并传入两个参数：是否校验成功和未通过校验的字段。若不传入回调函数，则会返回一个 promise	
    validate() {
      let refs = this.$children;
      let flagList = [];
      refs.forEach(item=>{
        item.validate && flagList.push(item.validate())
      })
      let validate = flagList.some(item => {return !item});
      return !validate
    },
    // 对整个表单进行重置，将所有字段值重置为初始值并移除校验结果
    resetFields() {
      let refs = this.$children;
      refs.forEach(item=>{
        item.resetFields && item.resetFields()
      })
    },
    // 移除表单项的校验结果。传入待移除的表单项的 prop 属性或者 prop 组成的数组，如不传则移除整个表单的校验结果	
    clearValidate() {
      let refs = this.$children;
      refs.forEach(item=>{
        item.clearValidate && item.clearValidate()
      })
    }
  }
}
</script>

<style lang="scss" scoped>

</style>