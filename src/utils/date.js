var date = {
	// 格式化日期时间
	dateFormat(value) {
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
		return { y, MM, d, h, m, s}
	},

	// 倒计时
	hh_mm_djs(endTime,starTime) {
		// let now = endTime - starTime;
		// let d = Math.floor(now/1000/60/60/24);
		// let h = Math.floor(now/1000/60/60%24);
		// let m = Math.floor(now/1000/60%60);
		// let s = Math.floor(now/1000%60);
		// let dd = d > 9 ? d : "0" + d
		// let hh = h > 9 ? h : "0" + h
		// let mm = m > 9 ? m : "0" + m
		// let ss = s > 9 ? s : "0" + s
		// return {dd, hh, mm, ss, d, h, m, s}
		let date =  new Date().getTime();
		let end_time = new Date(endTime).getTime();
		let now = end_time - date;
		let d = Math.floor(now/1000/60/60/24);
		let h = Math.floor(now/1000/60/60%24);
		let m = Math.floor(now/1000/60%60);
		let s = Math.floor(now/1000%60);
		let dd = d > 9 ? d : "0" + d
		let hh = h > 9 ? h : "0" + h
		let mm = m > 9 ? m : "0" + m
		let ss = s > 9 ? s : "0" + s
		return {dd, hh, mm, ss, d, h, m, s}
	},

	defaultDate(value) {
		let now = value ? new Date(value) : new Date();
    let start_year = now.getFullYear().toString();
    let month = now.getMonth()+1;
    let day = now.getDate();
    let startMonth = month >= 10 ? month : "0" + month;
    let thirtyOne = [1, 3, 5, 7, 8, 10, 12];
    let thirty = [4, 6, 9, 11];
    let end_day = undefined;
    if (thirtyOne.indexOf(month) !== -1) {
      end_day = "31";
    } else if (thirty.indexOf(month) !== -1) {
      end_day = "30";
    } else {
      if ((start_year % 4 == 0 && start_year % 100 != 0) || start_year % 400 == 0) {
      end_day = "29";
      } else {
      end_day = "28";
      }
    }
    let start_date = `${start_year}-${startMonth}-01`;
    let end_date = `${start_year}-${startMonth}-${end_day}`;
    return { start_date, end_date, end_day, start_year, month, day }
  },

	// 年月日时分秒 2021-03-12 03:25:11
  y_m_d_h_m_s(value) {
		let { y, MM, d, h, m, s} = this.dateFormat(value);
		return `${y}-${MM}-${d} ${h}:${m}:${s}`
  },
	// 年月日时分 2021-03-12 03:25
	y_m_d_h_m(value) {
		let { y, MM, d, h, m, s} = this.dateFormat(value);
		return `${y}-${MM}-${d} ${h}:${m}`
  },
	// 年月日 2021-03-12
	y_m_d(value) {
		let { y, MM, d, h, m, s} = this.dateFormat(value);
		return `${y}-${MM}-${d}`
  },
	// 年月 2021-03
	y_m(value) {
		let { y, MM, d, h, m, s} = this.dateFormat(value);
		return `${y}-${MM}`
  },
	// 月日 03-12
	m_d(value) {
		let { y, MM, d, h, m, s} = this.dateFormat(value);
		return `${MM}-${d}`
  },
	// 年 2021
	y(value) {
		let { y, MM, d, h, m, s} = this.dateFormat(value);
		return `${y}`
  },
	// 时分秒 03:25:11
	h_m_s(value) {
		let { y, MM, d, h, m, s} = this.dateFormat(value);
		return `${h}:${m}:${s}`
  },
	// 时分 03:25
	h_m(value) {
		let { y, MM, d, h, m, s} = this.dateFormat(value);
		return `${h}:${m}`
  },
	// 昨天 2021-03-12
  y_m_d_zt(value) {
    let date = value ? new Date(value) : new Date();
    date.setTime(date.getTime()-24*60*60*1000);
		let y = date.getFullYear()
		let MM = date.getMonth() + 1
		MM = MM < 10 ? ('0' + MM) : MM
		let d = date.getDate()
		d = d < 10 ? ('0' + d) : d
		let h = date.getHours()
		h = h < 10 ? ('0' + h) : h
		let m = date.getMinutes()
		m = m < 10 ? ('0' + m) : m
		let s = date.getSeconds()
		s = s < 10 ? ('0' + s) : s
		return `${y}-${MM}-${d}`
  },
	// 明天 2021-03-13
  y_m_d_mt(value) {
    let date = value ? new Date(value) : new Date();
    date.setTime(date.getTime()+24*60*60*1000);
		let y = date.getFullYear()
		let MM = date.getMonth() + 1
		MM = MM < 10 ? ('0' + MM) : MM
		let d = date.getDate()
		d = d < 10 ? ('0' + d) : d
		let h = date.getHours()
		h = h < 10 ? ('0' + h) : h
		let m = date.getMinutes()
		m = m < 10 ? ('0' + m) : m
		let s = date.getSeconds()
		s = s < 10 ? ('0' + s) : s
		return `${y}-${MM}-${d}`
  },
	// 2021年03月12日 15时02分28秒
	yy_mm_dd_hh_mm_ss(value) {
		let { y, MM, d, h, m, s} = this.dateFormat(value);
		return `${y}年${MM}月${d}日 ${h}时${m}分${s}秒`
  },
	// 2021年03月12日 15时02分
	yy_mm_dd_hh_mm(value) {
		let { y, MM, d, h, m, s} = this.dateFormat(value);
		return `${y}年${MM}月${d}日 ${h}时${m}分`
  },
	// 2021年03月12日
	yy_mm_dd(value) {
		let { y, MM, d, h, m, s} = this.dateFormat(value);
		return `${y}年${MM}月${d}日`
  },
	// 2021年03月
	yy_mm(value) {
		let { y, MM, d, h, m, s} = this.dateFormat(value);
		return `${y}年${MM}月`
  },
	// 03月12日
	mm_dd(value) {
		let { y, MM, d, h, m, s} = this.dateFormat(value);
		return `${MM}月${d}日`
  },
	// 2021年
	yy(value) {
		let { y, MM, d, h, m, s} = this.dateFormat(value);
		return `${y}年`
  },
	// 星期日
  ww(value) {
		let date = value ? new Date(value) : new Date();
    let str = "星期";  
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
	// 年月日时分秒 2021/03/12 03:25:11
  yyy_mmm_ddd_hhh_mmm_sss(value) {
		let { y, MM, d, h, m, s} = this.dateFormat(value);
		return `${y}/${MM}/${d} ${h}:${m}:${s}`
  },
	// 年月日时分 2021/03/12 03:25
  yyy_mmm_ddd_hhh_mmm(value) {
		let { y, MM, d, h, m, s} = this.dateFormat(value);
		return `${y}/${MM}/${d} ${h}:${m}`
  },
	// 年月日 2021/03/12
  yyy_mmm_ddd(value) {
		let { y, MM, d, h, m, s} = this.dateFormat(value);
		return `${y}/${MM}/${d}}`
  },
	// 年月 2021/03
  yyy_mmm(value) {
		let { y, MM, d, h, m, s} = this.dateFormat(value);
		return `${y}/${MM}}`
  },
	// 月日 2021/03
  mmm_ddd(value) {
		let { y, MM, d, h, m, s} = this.dateFormat(value);
		return `${MM}/${d}`
  },
}
export default date