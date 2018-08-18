import Vue from 'vue'
import Vuex from 'vuex'

// Services.
import clients from '@/services/getClients'
import todayClients from '@/services/getTodayClients'
import lateClients from '@/services/getLateClients'
import clientByName from '@/services/getClientByName'
import { clientPayment } from '@/services/clientPayment'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    profileModal: false,
    editClientModal: false,
    modal: false,
    clientsList: [],
    paymentsList: [],
    clientSelect: {},
    isLoading: false,
    pills: [
      false,
      false,
      false
    ]
  },
  mutations: {
    beforeSubmit (state) {
      state.isLoading = true
      state.pills = state.pills.map(() => false)
      state.clientsList = []
    },
    setClients (state, clients) {
      state.clientsList = clients
    },
    switchProfile (state) {
      state.profileModal = !state.profileModal
      state.clientSelect = {}
    },
    switchPayments (state) {
      state.profileModal = !state.profileModal
    },
    switchEdit (state) {
      state.editClientModal = !state.editClientModal
      state.clientSelect = {}
    },
    modalState (state, status) {
      state.modal = status
      state.clientSelect = {}
    },
    clientsList (state, clients) {
      state.clientsList = clients
    },
    clientSelect (state, client) {
      state.clientSelect = client
    },
    pillActive (state, currentActive) {
      state.pills = state.pills.map((value, i) => i === currentActive)
    },
    paymentsSelect (state, list) {
      state.paymentsList = list
    },
    isLoading (state, bolean) {
      state.isLoading = bolean
    }
  },
  getters: {
    pillsActive (state) {
      return state.pills
    }
  },
  actions: {
    async getClients (context) {
      try {
        context.commit('isLoading', true)
        context.commit('setClients', [])
        const Clients = await clients()
        context.commit('isLoading', false)
        context.commit('setClients', Clients)
        return Clients
      } catch (err) {
        console.log(err)
        return new Error(err)
      }
    },
    async getTodayClients (context) {
      try {
        context.commit('isLoading', true)
        context.commit('setClients', [])
        const clients = await todayClients()
        context.commit('isLoading', false)
        context.commit('setClients', clients)
        return clients
      } catch (err) {
        console.log(err)
        return new Error(err)
      }
    },
    async getLateClients (context) {
      try {
        context.commit('isLoading', true)
        context.commit('setClients', [])
        const clients = await lateClients()
        context.commit('isLoading', false)
        context.commit('setClients', clients)
        return clients
      } catch (err) {
        console.log(err)
        return new Error(err)
      }
    },
    async getClientsByName (context, payload) {
      try {
        context.commit('beforeSubmit')
        const clients = await clientByName(payload.name)
        context.commit('isLoading', false)
        context.commit('setClients', clients)
        return clients
      } catch (err) {
        console.log(err)
        return new Error(err)
      }
    },
    async payment (context, payload) {
      const {
        amount,
        clientId,
        userId
      } = payload
      try {
        context.commit('beforeSubmit')
        const payment = await clientPayment(
          amount,
          clientId,
          userId
        )
        context.commit('isLoading', false)
        return payment
      } catch (err) {
        console.log(err)
        return new Error(err)
      }
    }
  }
})

export default store
