// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import 'element-ui/lib/theme-chalk/index.css';
import ElementUI from 'element-ui';
import store from './store';
import * as filters from './filters'; // 全局filter
Vue.config.productionTip = false;
Vue.use(ElementUI);
/* eslint-disable no-new */
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key]);
});
new Vue({
  el: '#app',
  store,
  components: { App },
  template: '<App/>'
});
