import Vue from 'vue'
import VueRouter from 'vue-router'

import Clientes from './components/layout/clients/Clients.vue'
import Home from './components/layout/Home.vue'
import Add from './components/layout/add/Add.vue'
import Login from './components/layout/login.vue'
import Payments from './components/layout/payments/Payments.vue'

const routes = [
  {path: '/clients', component: Clientes, name: 'clients'},
  {path: '/home', component: Home, name: 'home'},
  {path: '/add', component: Add, name: 'add'},
  {path: '/', component: Login, name: 'login', meta: { isPublic: true }},
  {path: '/payments', component: Payments, name: 'payments'}
]

Vue.use(VueRouter)

const router = new VueRouter({
  routes,
  mode: 'history'
})

// const isAuth = () => {
//   return window.localStorage.auth
// }

// router.beforeEach((to, from, next) => {
//   if (!to.meta.isPublic && !isAuth()) {
//     return next('/')
//   }

//   if (to.name === 'login' && isAuth()) {
//     return next('/home')
//   }
//   return next
// })

export default router
