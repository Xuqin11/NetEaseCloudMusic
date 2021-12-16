import Vue from 'vue';
import store from './store'
import router from './router'

import App from './App.vue';

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import 'mediaelement/full';
import 'mediaelement/build/mediaelementplayer.min.css';

import "assets/js/iconfont.js"

Vue.config.productionTip = false

Vue.use(ElementUI);
// Vue.forceUpdate();
// Vue.forceUpdate();

new Vue({
  el: '#app',
  store,
  router,
  render: h => h(App)
});
