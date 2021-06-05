import Vue from 'vue'
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

	// 获取当前日期的周起始日期和结束日期之间所有的日期
	getWeekDates(value) {
		let date = value ? new Date(value) : new Date();
    let timesStamp = date.getTime();
    let currenDay = date.getDay();
    let dates = [];
    for (let i = 0; i < 7; i++) {
			let now = new Date(timesStamp + 24 * 60 * 60 * 1000 * (i - (currenDay + 6) % 7));
			let yy = this.dateFormat(now).y;
			let MMM = this.dateFormat(now).MM;
			let dd = this.dateFormat(now).d;
			let HH = this.dateFormat(now).h;
			let MMMM = this.dateFormat(now).m;
			let SS = this.dateFormat(now).s;
			dates.push({'m_d': `${MMM}-${dd}`, 'y_m_d': `${yy}-${MMM}-${dd}`, 'h_m_s': `${HH}:${MMMM}:${SS}`, 'y_m_d_h_m_s': `${yy}-${MMM}-${dd} ${HH}:${MMMM}:${SS}`,});
    }
		let week_start_date = dates[0];
		let week_end_date = dates[dates.length - 1];
    return {dates, week_start_date, week_end_date}
	},

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

	// 年月日转化为 2021-01-25
	ymd_yymmdd(value) {
		let i = value.indexOf("年");
		let j = value.indexOf("月");
		let k = value.indexOf("日");
		let o = value.indexOf("时");
		let p = value.indexOf("分");
		let q = value.indexOf("秒");
		let y = i !== -1 ? value.slice(0,i) : '';
		let m = i !== -1 || j !== -1 ? value.slice(i+1,j) : '';
		let d = j !== -1 || k !== -1 ? value.slice(j+1,k) : '';
		let hh = k !== -1 || o !== -1 ? value.slice(k+1,o) : '';
		let mm = o !== -1 || p !== -1 ? value.slice(o+1,p) : '';
		let ss = p !== -1 || q !== -1 ? value.slice(p+1,q) : '';
		m = !m ? '' : m-0 > 9 ? m : "0" + (m-0);
		d = !d ? '' : d-0 > 9 ? d : "0" + (d-0);
		hh = !hh ? '' : hh-0 > 9 ? hh : "0" + (hh-0);
		mm = !mm ? '' : mm-0 > 9 ? mm : "0" + (mm-0);
		ss = !ss ? '' : ss-0 > 9 ? ss : "0" + (ss-0);
		let y_m = y && m ? `${y}-${m}` : '';
		let y_m_d = y && m && d ? `${y}-${m}-${d}` : '';
		let m_s = mm && ss ? `${mm}:${ss}`.trim() : '';
		let h_m_s = hh && mm && ss ? `${hh}:${mm}:${ss}`.trim() : '';
		let y_m_d_h_m_s = y && m && d && hh && mm && ss ? `${y}-${m}-${d} ${h_m_s}` : '';
		return { y_m_d_h_m_s, y, y_m_d, y_m, m_s, h_m_s }
	},

	//根据当前年月日 获取上个本月和下个月的年月日
	defaultDate(value) {
		let { y, MM, d, h, m, s} = this.dateFormat(value);
		let days = new Date(y, MM, 0);
		days = days.getDate(); //获取当前日期中的月最后一天的天数
		let MMM = (MM - 0) + 1; //获取下个月的月份
		let MMMM = MM - 1; //获取上个月的月份
		let yy = y - 0;
		let yyy = y - 0;
		if (MMM == 13) {
			yy = y + 1;
			MMM = 1;
		}
		if (MMMM == 0) {
			yyy = y - 1;
			MMMM = 12;
		}
		let up_days = new Date(yy, MMM, 0);
		let down_days = new Date(yy, MMMM, 0);
		up_days = up_days.getDate(); //获取下个月最后一天的天数
		down_days = down_days.getDate(); //获取上个月最后一天的天数
		MMM = MMM > 9 ? MMM : '0' + MMM;
		MMMM = MMMM > 9 ? MMMM : '0' + MMMM;
		let start_date = `${y}-${MM}-01`;
		let end_date = `${y}-${MM}-${days}`;
		let up_start_date = `${yy}-${MMM}-01`;
		let up_end_date = `${yy}-${MMM}-${up_days}`;
		let down_start_date = `${yyy}-${MMMM}-01`;
		let down_end_date = `${yyy}-${MMMM}-${down_days}`;
		return { start_date, end_date, down_start_date, down_end_date, up_start_date, up_end_date, up_days, down_days, days, y, yy, yyy , MM, MMM, MMMM }
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

	// defaultDate(value) {
	// 	let now = value ? new Date(value) : new Date();
  //   let start_year = now.getFullYear().toString();
  //   let month = now.getMonth()+1;
  //   let day = now.getDate();
  //   let startMonth = month >= 10 ? month : "0" + month;
  //   let thirtyOne = [1, 3, 5, 7, 8, 10, 12];
  //   let thirty = [4, 6, 9, 11];
  //   let end_day = undefined;
  //   if (thirtyOne.indexOf(month) !== -1) {
  //     end_day = "31";
  //   } else if (thirty.indexOf(month) !== -1) {
  //     end_day = "30";
  //   } else {
  //     if ((start_year % 4 == 0 && start_year % 100 != 0) || start_year % 400 == 0) {
  //     end_day = "29";
  //     } else {
  //     end_day = "28";
  //     }
  //   }
  //   let start_date = `${start_year}-${startMonth}-01`;
  //   let end_date = `${start_year}-${startMonth}-${end_day}`;
  //   return { start_date, end_date, end_day, start_year, month, day }
  // },

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

Vue.prototype.$date = date; // 注册时间戳转日期
export default date