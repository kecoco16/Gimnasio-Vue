import Vue from 'vue'
import VueRouter from 'vue-router'
import App from './App.vue'
import store from './store.js'

import routes from './routes'
import dateFormat from './filters/dateFormat'
import VeeValidate, { Validator } from 'vee-validate'
import languaje from 'vee-validate/dist/locale/es'
import VuePaginate from 'vue-paginate'

Validator.addLocale(languaje)

const config = {
  locale: 'es'
}

Vue.use(VeeValidate, config)
Vue.use(VueRouter)
Vue.use(dateFormat)
Vue.use(VeeValidate, config)
Vue.use(VuePaginate)

const router = new VueRouter({
  routes,
  mode: 'history'
})

new Vue({
  el: '#app',
  render: h => h(App),
  router,
  store
})
