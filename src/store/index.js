import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    snackbar: {}
  },
  mutations: {
    setSnackbar(state, snackbar) {
      state.snackbar = snackbar;
    }
  },
  actions: {
    setSnackbar({ commit }, snackbar) {
      snackbar.showing = true;
      commit('setSnackbar', snackbar);
    }
  },
  getters: {}
});
