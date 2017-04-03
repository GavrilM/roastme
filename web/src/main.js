// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import VeeValidate from 'vee-validate';
import Resource from 'vue-resource'
import SweetAlert from 'vue-sweetalert'
import VueSocketio from 'vue-socket.io'

import App from './App'
import router from './router'
import sockets from './sockets'

Vue.use(VeeValidate);
Vue.use(Resource);
Vue.use(SweetAlert);
// Vue.use(VueSocketio, 'localhost:3000')

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App },
  sockets: sockets
})
