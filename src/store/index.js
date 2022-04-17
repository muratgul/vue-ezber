import { createStore } from 'vuex'
import createPersistedState from 'vuex-persistedstate';

export default createStore({
  state: {
    YKArray: null,
    TKArray: null,
    aaa: "nmrra"
  },
  mutations: {
    SetYabanciKelime (state, value){
      state.YKArray = value
    },
    SetTurkceKelime (state, value){
      state.TKArray = value
    },

  },
  getters: {
    getYKArray: state => { return state.YKArray },
    getTKArray: state => { return state.TKArray }
  },
  actions: {
  },
  modules: {
  },
  plugins:[createPersistedState()]
})
