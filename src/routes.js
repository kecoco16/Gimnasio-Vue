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

export default routes
