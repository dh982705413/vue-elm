import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

// * types
const types = {
  SET_LOCATION: 'SET_LOCATION',
  SET_ADDRESS: 'SET_ADDRESS'
}
// * state
const state = {
  location: {},
  address: ''
}
// * getters
const getters = {
  location: state => state.location,
  address: state => state.address,
  city: state =>
    state.location.addressComponent.city ||
    state.location.addressComponent.province
}
// * mutations
const mutations = {
  [types.SET_LOCATION](state, location) {
    if (location) {
      state.location = location
    } else {
      state.location = null
    }
  },
  [types.SET_ADDRESS](state, address) {
    if (location) {
      state.address = address
    } else {
      state.address = ''
    }
  }
}
// * actions
const actions = {
  setLocation({ commit }, location) {
    commit(types.SET_LOCATION, location)
  },
  setAddress({ commit }, address) {
    commit(types.SET_ADDRESS, address)
  }
}

export default new Vuex.Store({
  state,
  getters,
  mutations,
  actions
})
