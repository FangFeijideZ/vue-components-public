const state = {
  cameraList: [],
  policeList: [],
  keepAlives: [],
  cacheList: [],
}

const mutations = {
  SET_CAMERA(state, data) {
    state.cameraList = data
  },
  SET_POLICE: (state, data) => {
    state.policeList = data
  },
  SET_KEEP_ALIVE: (state, data) => {
    state.keepAlives.push(data);
  },
  DET_KEEP_ALIVE: (state, data) => {
    let i = state.keepAlives.indexOf(data);
    if (i != -1) {
      state.keepAlives.splice(i, 1);
    }
  },
  SET_CACHE_LIST: (state, data) => {
    state.cacheList.push(data);
  },
}

// 计算属性
const getters = {
  keepAlives: (state) => { 
    return state.keepAlives
  },
  cacheList: (state) => {
    return state.cacheList
  },
}

// 异步方法
const actions = {
  // 获取所有摄像机列表
  getCameraList({commit},data) {
    return new Promise((resolve, reject) => {
      commit('SET_CAMERA', data);
      resolve(data)
    })
    // return new Promise((resolve, reject) => {
    //   let { orgid,property1 } = data;
    //   let data = {
    //     pageIndex: 1,
    //     pageSize: 99999,
    //   }
    //   this.$api.requestCameraGetPage(data).then((res) => {
    //     if (res.success && res.data && res.data.data && res.data.data.length>0) {
    //       commit('SET_CAMERA', res.data.data)
    //     } else {
    //       commit('SET_CAMERA', false)
    //     }
    //     resolve(res)
    //   }).catch((err) => {
    //     reject(err)
    //   })
    // })
  },
  // 获取所有警员列表
  getPoliceList({commit},data) {
    return new Promise((resolve, reject) => {
      commit('SET_POLICE', data);
      resolve(data)
    })
  },
}

const modules = {}

export default {
  state,
  getters,
  mutations,
  actions,
  modules,
}
