import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    address: '',
    balance: '',
    provider: null,
    connected: false,
    chain: ''
  },
  mutations: {
    changeAddress (state, payload) {
      state.address = payload
    },
    changeBalance (state, payload) {
      state.balance = payload
    },
    changeChain (state, payload) {
      state.chain = payload
    },
    setConnected (state, payload) {
      state.connected = payload
    },
    changeProvider (state, payload) {
      state.provider = payload
    }
  },
  getters: {
    connected (state) {
      return state.connected
    },
    getAddress (state) {
      return state.address
    },
    getBalance (state) {
      return state.balance
    },
    getChain (state) {
      return state.chain
    },
    getProvider (state) {
      return state.provider
    }
  }
})

export default store
