// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import router from './router';
import VueToasted from './config/vueToasted';
import vueDialog from './config/vueDialog';
import store from './store';
import api from './services/api';

Vue.config.productionTip = false;
Vue.prototype.$http = api;
/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  toasted: VueToasted,
  dialog: vueDialog,
  router,
  components: { App },
  template: '<App/>',
});
