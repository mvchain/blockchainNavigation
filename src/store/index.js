import Vue from 'vue';
import Vuex from 'vuex';
import Home from './modules/Home';
import getters from './getters';

Vue.use(Vuex);

const store = new Vuex.Store({
  modules: {
    Home
  },
  getters
});

export default store;
