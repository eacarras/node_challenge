import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    rol: undefined
  },
  mutations: {
    SET_ROL_STATE(state, rol) {
      state.login = rol;
    }
  },
  getters: {
    getRol(state) {
      return state.login;
    }
  }
});
