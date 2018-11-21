import Vue from 'vue'
import App from './App.vue'
import store from '../src/store/'

import router from './router'
import VeeValidate, { Validator } from 'vee-validate'
import veeConfig from './config/veeValidate'
import VuePaginate from 'vue-paginate'

Validator.localize(veeConfig.lenguaje)

Vue.use(VeeValidate, veeConfig.config)
Vue.use(VuePaginate)

new Vue({
  el: '#app',
  render: h => h(App),
  router,
  store
})
