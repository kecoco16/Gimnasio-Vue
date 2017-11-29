import Clientes from './components/layout/Clients.vue'
import Home from './components/layout/Home.vue'
import Add from './components/layout/Add.vue'
import Login from './components/layout/login.vue'
import Payments from './components/layout/payments.vue'

const routes = [
  {path: '/clients', component: Clientes, name: 'clients'},
  {path: '/home', component: Home, name: 'home'},
  {path: '/add', component: Add, name: 'add'},
  {path: '/', component: Login, name: 'login'},
  {path: '/payments', component: Payments, name: 'payments'}
]

export default routes
