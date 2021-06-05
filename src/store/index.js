import Vue from 'vue'
import Vuex from 'vuex'
import monitor from './modules/monitor.js'
import test from './modules/test.js'

Vue.use(Vuex)

const state = {

}
const mutations = {
  
}
const actions = {
  
}
const getters = {
  
}
const modules = {
  monitor,
  test,
}
const store = new Vuex.Store({
  state,
  mutations,
  actions,
  getters,
  modules
})
export default store