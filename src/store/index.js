import Vue from 'vue'
import Vuex from 'vuex'

// Services.
import clients from '@/services/getClients'
import todayClients from '@/services/getTodayClients'
import lateClients from '@/services/getLateClients'
import clientByName from '@/services/getClientByName'
import getTodayPayments from '@/services/getTodayPayments'
import getAllPayments from '@/services/getAllPayments'
import getPaymentsByDates from '@/services/getPaymentsByDates'
import { clientPayment } from '@/services/clientPayment'
import { deleteClient } from '@/services/deleteClient'
import { createOrUpdateClient } from '@/services/createOrUpdateClient'
import { createOrUpdateMembership } from '@/services/createOrUpdateMembership'
import { createOrUpdateUser } from '@/services/createOrUpdateUser'

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
    setPayments (state, payments) {
      state.paymentsList = payments
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
    async updateOrCreatedClient (context, payload) {
      try {
        const client = await createOrUpdateClient(payload)
        return client
      } catch (err) {
        console.log(err)
        return new Error(err)
      }
    },
    async updateOrCreatedMembership (context, payload) {
      try {
        const membership = await createOrUpdateMembership(payload)
        return membership
      } catch (err) {
        console.log(err)
        return new Error(err)
      }
    },
    async updateOrCreatedUser (context, payload) {
      try {
        const user = await createOrUpdateUser(payload)
        return user
      } catch (err) {
        console.log(err)
        return new Error(err)
      }
    },
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
    },
    async delete (context, payload) {
      const { id } = payload
      try {
        context.commit('beforeSubmit')
        const client = await deleteClient(id)
        context.commit('isLoading', false)
        return client
      } catch (err) {
        console.log(err)
        return new Error(err)
      }
    },
    async todayPayments (context, payload) {
      try {
        context.commit('isLoading', true)
        context.commit('setPayments', [])
        const payments = await getTodayPayments()
        context.commit('isLoading', false)
        context.commit('setPayments', payments)
        return payments
      } catch (err) {
        console.log(err)
        return new Error(err)
      }
    },
    async allPayments (context) {
      try {
        context.commit('isLoading', true)
        context.commit('setPayments', [])
        const payments = await getAllPayments()
        context.commit('isLoading', false)
        context.commit('setPayments', payments)
        return payments
      } catch (err) {
        console.log(err)
        return new Error(err)
      }
    },
    async paymentsByDate (context, payload) {
      try {
        context.commit('modalState', false)
        context.commit('isLoading', true)
        context.commit('setPayments', [])
        const payments = await getPaymentsByDates(payload)
        context.commit('isLoading', false)
        context.commit('setPayments', payments)
        return payments
      } catch (err) {
        console.log(err)
        return new Error(err)
      }
    },
    editClientModal (context, payload) {
      context.commit('switchEdit')
      context.commit('clientSelect', payload.client)
    },
    profileClientModal (context, payload) {
      context.commit('switchProfile')
      context.commit('clientSelect', payload.client)
    }
  }
})

export default store
