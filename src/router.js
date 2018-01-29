import Vue from 'vue'
import VueRouter from 'vue-router'

import Clientes from './components/layout/clients/Clients.vue'
import Home from './components/layout/Home.vue'
import Add from './components/layout/add/Add.vue'
import Login from './components/layout/login.vue'
import Payments from './components/layout/payments/Payments.vue'
import Edit from './components/layout/edit/edit.vue'

const routes = [
  {
    path: '/clients',
    component: Clientes,
    name: 'clients',
    meta: { isPublic: false }
  },
  {
    path: '/home',
    component: Home,
    name: 'home',
    meta: { isPublic: false }
  },
  {
    path: '/add',
    component: Add,
    name: 'add',
    meta: { isPublic: false }
  },
  {
    path: '/',
    component: Login,
    name: 'login',
    meta: { isPublic: true }
  },
  {
    path: '/payments',
    component: Payments,
    name: 'payments',
    meta: { isPublic: false }
  },
  {
    path: '/edit',
    component: Edit,
    name: 'edit',
    meta: { isPublic: false }
  }
]

Vue.use(VueRouter)

const router = new VueRouter({
  routes,
  mode: 'history'
})

const isAuth = () => {
  return window.localStorage.auth
}

router.beforeEach((to, from, next) => {
  if (!to.meta.isPublic && !isAuth()) {
    return next({ path: '/' })
  }

  if (to.name === 'login' && isAuth()) {
    return next({ path: '/home' })
  }
  return next()
})

export default router
