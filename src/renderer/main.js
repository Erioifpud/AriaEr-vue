import Vue from 'vue'
import axios from 'axios'

import App from './App'
import router from './router'
import store from './store'

const Storage = require('electron-store')

if (!process.env.IS_WEB) Vue.use(require('vue-electron'))
Vue.http = Vue.prototype.$http = axios
Vue.config.productionTip = false

var storage = new Storage({
  encryptionKey: 'aes-256-cbc'
})
window.storage = storage

/* eslint-disable no-new */
new Vue({
  components: { App },
  router,
  store,
  template: '<App/>'
}).$mount('#app')
