// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import VeeValidate from 'vee-validate';
import Resource from 'vue-resource'
import SweetAlert from 'vue-sweetalert'
import VueSocketio from 'vue-socket.io'
import VueHead from 'vue-head'
import socketio from 'socket.io-client'

import App from './App'
import router from './router'
import sockets from './sockets'
import store from './store'

Vue.use(require('vue-moment'));
Vue.use(VeeValidate);
Vue.use(Resource);
Vue.use(SweetAlert);
Vue.use(VueSocketio, socketio('localhost:3000'))
Vue.use(VueHead)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App },
  sockets,
  store,
})
