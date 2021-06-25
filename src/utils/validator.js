import Vue from 'vue'
let validator = {
  checkPhone(rule,value,callback) {
    const reg = /^1[3456789]\d{9}$/;
    if(reg.test(value)){
      callback();
    } else {
      callback(new Error('请输入正确的电话号码'));
    }
  },

  checkPwdLimitSix(rule,value,callback) {
    const reg = /^[A-Za-z0-9]{6,16}$/;
    if(reg.test(value)){
      callback();
    } else {
      callback(new Error('密码应为6-16个字符'));
    }
  },

  checkPwd(rule,value,callback) {
    const reg = /^[A-Za-z0-9]{8,16}$/;
    if(reg.test(value)){
      callback();
    } else {
      callback(new Error('密码应为8-16个字符'));
    }
  },

  checkIdCard(rule,value,callback) {
    const reg = /^[1-9]\d{5}(18|19|20)\d{2}((0[1-9])|(1[0-2]))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/;
    if(reg.test(value)){
      callback();
    } else {
      callback(new Error('请输入正确的身份证号码'));
    }
  },

  checkMid(rule,value,callback) {
    const reg = /^[a-zA-Z]{1}[\w]{3,19}$/;
    if(reg.test(value)){
      callback();
    } else {
      callback(new Error('由字母开头，4-20位的字符串'));
    }
  },

  checkName(rule,value,callback) {
    const reg = /^[\u4e00-\u9fa5\uFE30-\uFFA0\w]{4,20}$/;
    if(reg.test(value)){
        callback();
    } else {
        callback(new Error('由4-20位汉字，字母，数字，中文符号和下划线组成'));
    }
  },

  checkTel(rule,value,callback) {
    // 座机电话号码
    const reg = /^\d{7,11}$/;
    if(reg.test(value)){
      callback();
    } else {
      callback(new Error('电话号码必须为7到11位的数字！'));
    }
  },

  checkMac(rule,value,callback) {
    const reg = /^[D|d][A-Fa-f0-9]{11}$/;
    if(reg.test(value)){
      callback();
    }  else {
      callback(new Error('请输入正确格式的mac值'));
    }
  },

  checkFireMac(rule,value,callback) {
    const reg = /1\w{11}$|^df0f\w{8}$|^d50f15\w{6}$|^d50f1202\w{4}$/;
    if(reg.test(value)){
      callback();
    }  else {
      callback(new Error('请输入正确格式的mac值'));
    }
  },
  
  checkImei(rule,value,callback) {
    const reg = /^[0-9]{15}$/;
    if(reg.test(value)){
      callback();
    } else {
      callback(new Error('请输入正确格式的imei值'));
    }
  },
}
Vue.prototype.$validator = validator; // 注册全局方法
export default validator
