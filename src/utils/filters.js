import Vue from 'vue'
// import filters from "./date"; // 格式化日期
const filters = {
	// 月份的第几周
	getMonthWeek(value) {
		let date = value ? new Date(value) : new Date();
		let { y, MM, d, h, m, s} = this.dateFormat(date);
		let now = new Date(y, MM-1, d);
		let ww = date.getDay();
		let dd = date.getDate();
	  if(ww == 0){
			ww = 7;
	  }
		let	week = Math.ceil((dd + 6 - ww) / 7);
	  return `${MM-0}月 第${week}周`;
	},
	// 年月日时分秒 2021-03-12 03:25:11
  y_m_d_h_m_s(value) {
		let date = value ? new Date(value) : new Date();
		let y = date.getFullYear();
		let MM = date.getMonth() + 1;
		MM = MM < 10 ? ('0' + MM) : MM;
		let d = date.getDate();
		d = d < 10 ? ('0' + d) : d;
		let h = date.getHours();
		h = h < 10 ? ('0' + h) : h;
		let m = date.getMinutes();
		m = m < 10 ? ('0' + m) : m;
		let s = date.getSeconds();
		s = s < 10 ? ('0' + s) : s;
		return `${y}-${MM}-${d} ${h}:${m}:${s}`
  },
	// 年月日时分 2021-03-12 03:25
	y_m_d_h_m(value) {
		let date = value ? new Date(value) : new Date();
		let y = date.getFullYear();
		let MM = date.getMonth() + 1;
		MM = MM < 10 ? ('0' + MM) : MM;
		let d = date.getDate();
		d = d < 10 ? ('0' + d) : d;
		let h = date.getHours();
		h = h < 10 ? ('0' + h) : h;
		let m = date.getMinutes();
		m = m < 10 ? ('0' + m) : m;
		let s = date.getSeconds();
		s = s < 10 ? ('0' + s) : s;
		return `${y}-${MM}-${d} ${h}:${m}`
  },
	// 年月日 2021-03-12
	y_m_d(value) {
		let date = value ? new Date(value) : new Date();
		let y = date.getFullYear();
		let MM = date.getMonth() + 1;
		MM = MM < 10 ? ('0' + MM) : MM;
		let d = date.getDate();
		d = d < 10 ? ('0' + d) : d;
		let h = date.getHours();
		h = h < 10 ? ('0' + h) : h;
		let m = date.getMinutes();
		m = m < 10 ? ('0' + m) : m;
		let s = date.getSeconds();
		s = s < 10 ? ('0' + s) : s;
		return `${y}-${MM}-${d}`
  },
	// 年月 2021-03
	y_m(value) {
		let date = value ? new Date(value) : new Date();
		let y = date.getFullYear();
		let MM = date.getMonth() + 1;
		MM = MM < 10 ? ('0' + MM) : MM;
		let d = date.getDate();
		d = d < 10 ? ('0' + d) : d;
		let h = date.getHours();
		h = h < 10 ? ('0' + h) : h;
		let m = date.getMinutes();
		m = m < 10 ? ('0' + m) : m;
		let s = date.getSeconds();
		s = s < 10 ? ('0' + s) : s;
		return `${y}-${MM}`
  },
	// 月日 03-12
	m_d(value) {
		let date = value ? new Date(value) : new Date();
		let y = date.getFullYear();
		let MM = date.getMonth() + 1;
		MM = MM < 10 ? ('0' + MM) : MM;
		let d = date.getDate();
		d = d < 10 ? ('0' + d) : d;
		let h = date.getHours();
		h = h < 10 ? ('0' + h) : h;
		let m = date.getMinutes();
		m = m < 10 ? ('0' + m) : m;
		let s = date.getSeconds();
		s = s < 10 ? ('0' + s) : s;
		return `${MM}-${d}`
  },
	// 年 2021
	y(value) {
		let date = value ? new Date(value) : new Date();
		let y = date.getFullYear();
		let MM = date.getMonth() + 1;
		MM = MM < 10 ? ('0' + MM) : MM;
		let d = date.getDate();
		d = d < 10 ? ('0' + d) : d;
		let h = date.getHours();
		h = h < 10 ? ('0' + h) : h;
		let m = date.getMinutes();
		m = m < 10 ? ('0' + m) : m;
		let s = date.getSeconds();
		s = s < 10 ? ('0' + s) : s;
		return `${y}`
  },
	// 时分秒 03:25:11
	h_m_s(value) {
		let date = value ? new Date(value) : new Date();
		let y = date.getFullYear();
		let MM = date.getMonth() + 1;
		MM = MM < 10 ? ('0' + MM) : MM;
		let d = date.getDate();
		d = d < 10 ? ('0' + d) : d;
		let h = date.getHours();
		h = h < 10 ? ('0' + h) : h;
		let m = date.getMinutes();
		m = m < 10 ? ('0' + m) : m;
		let s = date.getSeconds();
		s = s < 10 ? ('0' + s) : s;
		return `${h}:${m}:${s}`
  },
	// 时分 03:25
	h_m(value) {
		let date = value ? new Date(value) : new Date();
		let y = date.getFullYear();
		let MM = date.getMonth() + 1;
		MM = MM < 10 ? ('0' + MM) : MM;
		let d = date.getDate();
		d = d < 10 ? ('0' + d) : d;
		let h = date.getHours();
		h = h < 10 ? ('0' + h) : h;
		let m = date.getMinutes();
		m = m < 10 ? ('0' + m) : m;
		let s = date.getSeconds();
		s = s < 10 ? ('0' + s) : s;
		return `${h}:${m}`
  },
	// 昨天 2021-03-12
  y_m_d_zt(value) {
    let date = value ? new Date(value) : new Date();
    date.setTime(date.getTime()-24*60*60*1000);
		let { y, MM, d, h, m, s} = this.dateFormat(date);
		return `${y}-${MM}-${d}`
  },
	// 明天 2021-03-13
  y_m_d_mt(value) {
    let date = value ? new Date(value) : new Date();
    date.setTime(date.getTime()+24*60*60*1000);
		let { y, MM, d, h, m, s} = this.dateFormat(date);
		return `${y}-${MM}-${d}`
  },
	// 2021年03月12日 15时02分28秒
	yy_mm_dd_hh_mm_ss(value) {
		let date = value ? new Date(value) : new Date();
		let y = date.getFullYear();
		let MM = date.getMonth() + 1;
		MM = MM < 10 ? ('0' + MM) : MM;
		let d = date.getDate();
		d = d < 10 ? ('0' + d) : d;
		let h = date.getHours();
		h = h < 10 ? ('0' + h) : h;
		let m = date.getMinutes();
		m = m < 10 ? ('0' + m) : m;
		let s = date.getSeconds();
		s = s < 10 ? ('0' + s) : s;
		return `${y}年${MM}月${d}日 ${h}时${m}分${s}秒`
  },
	// 2021年03月12日 15时02分
	yy_mm_dd_hh_mm(value) {
		let date = value ? new Date(value) : new Date();
		let y = date.getFullYear();
		let MM = date.getMonth() + 1;
		MM = MM < 10 ? ('0' + MM) : MM;
		let d = date.getDate();
		d = d < 10 ? ('0' + d) : d;
		let h = date.getHours();
		h = h < 10 ? ('0' + h) : h;
		let m = date.getMinutes();
		m = m < 10 ? ('0' + m) : m;
		let s = date.getSeconds();
		s = s < 10 ? ('0' + s) : s;
		return `${y}年${MM}月${d}日 ${h}时${m}分`
  },
	// 2021年03月12日
	yy_mm_dd(value) {
		let date = value ? new Date(value) : new Date();
		let y = date.getFullYear();
		let MM = date.getMonth() + 1;
		MM = MM < 10 ? ('0' + MM) : MM;
		let d = date.getDate();
		d = d < 10 ? ('0' + d) : d;
		let h = date.getHours();
		h = h < 10 ? ('0' + h) : h;
		let m = date.getMinutes();
		m = m < 10 ? ('0' + m) : m;
		let s = date.getSeconds();
		s = s < 10 ? ('0' + s) : s;
		return `${y}年${MM}月${d}日`
  },
	// 2021年03月
	yy_mm(value) {
		let date = value ? new Date(value) : new Date();
		let y = date.getFullYear();
		let MM = date.getMonth() + 1;
		MM = MM < 10 ? ('0' + MM) : MM;
		let d = date.getDate();
		d = d < 10 ? ('0' + d) : d;
		let h = date.getHours();
		h = h < 10 ? ('0' + h) : h;
		let m = date.getMinutes();
		m = m < 10 ? ('0' + m) : m;
		let s = date.getSeconds();
		s = s < 10 ? ('0' + s) : s;
		return `${y}年${MM}月`
  },
	// 03月12日
	mm_dd(value) {
		let date = value ? new Date(value) : new Date();
		let y = date.getFullYear();
		let MM = date.getMonth() + 1;
		MM = MM < 10 ? ('0' + MM) : MM;
		let d = date.getDate();
		d = d < 10 ? ('0' + d) : d;
		let h = date.getHours();
		h = h < 10 ? ('0' + h) : h;
		let m = date.getMinutes();
		m = m < 10 ? ('0' + m) : m;
		let s = date.getSeconds();
		s = s < 10 ? ('0' + s) : s;
		return `${MM}月${d}日`
  },
	// 2021年
	yy(value) {
		let date = value ? new Date(value) : new Date();
		let y = date.getFullYear();
		let MM = date.getMonth() + 1;
		MM = MM < 10 ? ('0' + MM) : MM;
		let d = date.getDate();
		d = d < 10 ? ('0' + d) : d;
		let h = date.getHours();
		h = h < 10 ? ('0' + h) : h;
		let m = date.getMinutes();
		m = m < 10 ? ('0' + m) : m;
		let s = date.getSeconds();
		s = s < 10 ? ('0' + s) : s;
		return `${y}年`
  },
	// 年月日时分秒 2021/03/12 03:25:11
  yyy_mmm_ddd_hhh_mmm_sss(value) {
		let date = value ? new Date(value) : new Date();
		let y = date.getFullYear();
		let MM = date.getMonth() + 1;
		MM = MM < 10 ? ('0' + MM) : MM;
		let d = date.getDate();
		d = d < 10 ? ('0' + d) : d;
		let h = date.getHours();
		h = h < 10 ? ('0' + h) : h;
		let m = date.getMinutes();
		m = m < 10 ? ('0' + m) : m;
		let s = date.getSeconds();
		s = s < 10 ? ('0' + s) : s;
		return `${y}/${MM}/${d} ${h}:${m}:${s}`
  },
	// 年月日时分 2021/03/12 03:25
  yyy_mmm_ddd_hhh_mmm(value) {
		let date = value ? new Date(value) : new Date();
		let y = date.getFullYear();
		let MM = date.getMonth() + 1;
		MM = MM < 10 ? ('0' + MM) : MM;
		let d = date.getDate();
		d = d < 10 ? ('0' + d) : d;
		let h = date.getHours();
		h = h < 10 ? ('0' + h) : h;
		let m = date.getMinutes();
		m = m < 10 ? ('0' + m) : m;
		let s = date.getSeconds();
		s = s < 10 ? ('0' + s) : s;
		return `${y}/${MM}/${d} ${h}:${m}`
  },
	// 年月日 2021/03/12
  yyy_mmm_ddd(value) {
		let date = value ? new Date(value) : new Date();
		let y = date.getFullYear();
		let MM = date.getMonth() + 1;
		MM = MM < 10 ? ('0' + MM) : MM;
		let d = date.getDate();
		d = d < 10 ? ('0' + d) : d;
		let h = date.getHours();
		h = h < 10 ? ('0' + h) : h;
		let m = date.getMinutes();
		m = m < 10 ? ('0' + m) : m;
		let s = date.getSeconds();
		s = s < 10 ? ('0' + s) : s;
		return `${y}/${MM}/${d}}`
  },
	// 年月 2021/03
  yyy_mmm(value) {
		let date = value ? new Date(value) : new Date();
		let y = date.getFullYear();
		let MM = date.getMonth() + 1;
		MM = MM < 10 ? ('0' + MM) : MM;
		let d = date.getDate();
		d = d < 10 ? ('0' + d) : d;
		let h = date.getHours();
		h = h < 10 ? ('0' + h) : h;
		let m = date.getMinutes();
		m = m < 10 ? ('0' + m) : m;
		let s = date.getSeconds();
		s = s < 10 ? ('0' + s) : s;
		return `${y}/${MM}}`
  },
	// 月日 2021/03
  mmm_ddd(value) {
		let date = value ? new Date(value) : new Date();
		let y = date.getFullYear();
		let MM = date.getMonth() + 1;
		MM = MM < 10 ? ('0' + MM) : MM;
		let d = date.getDate();
		d = d < 10 ? ('0' + d) : d;
		let h = date.getHours();
		h = h < 10 ? ('0' + h) : h;
		let m = date.getMinutes();
		m = m < 10 ? ('0' + m) : m;
		let s = date.getSeconds();
		s = s < 10 ? ('0' + s) : s;
		return `${MM}/${d}`
  },
	// 星期日or周
	ww(value, name) {
		let date = value ? new Date(value) : new Date();
		let str = name ? name : "";
		let week = date.getDay();
		switch (week) {  
			case 0 :  
				str += "日";  
				break;  
			case 1 :  
				str += "一";  
				break;  
			case 2 :  
				str += "二";  
				break;  
			case 3 :  
				str += "三";  
				break;  
			case 4 :  
				str += "四";  
				break;  
			case 5 :  
				str += "五";  
				break;  
			case 6 :  
				str += "六";  
				break;  
		}  
		return str
	},
}

Object.keys(filters).forEach((key) => {
  Vue.filter(key, filters[key])
})
export default filters