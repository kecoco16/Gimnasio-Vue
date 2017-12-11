import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    profileModal: false,
    editClientModal: false,
    clientsList: [],
    clientSelect: {},
    pill1: false,
    pill2: false,
    pill3: false,
    paymentsList: [],
    modal: false,
    isLoading: false
  },
  mutations: {
    switchProfile (state) {
      state.profileModal = !state.profileModal
      state.clientSelect = {}
    },
    switchEdit (state) {
      state.editClientModal = !state.editClientModal
      state.clientSelect = {}
    },
    clientsList (state, clients) {
      state.clientsList = clients
    },
    clientSelect (state, client) {
      state.clientSelect = client
    },
    switchPayments (state) {
      state.profileModal = !state.profileModal
    },
    pillActive (state, currentActive) {
      state.pill1 = currentActive === 'pill1'
      state.pill2 = currentActive === 'pill2'
      state.pill3 = currentActive === 'pill3'
    },
    paymentsSelect (state, list) {
      state.paymentsList = list
    },
    switchModal (state) {
      state.modal = !state.modal
      state.clientSelect = {}
    },
    disableModal (state) {
      state.modal = false
      state.clientSelect = {}
    },
    isLoading (state, bolean) {
      state.isLoading = bolean
    }
  },
  getters: {
    pillsActive (state) {
      return [
        state.pill1,
        state.pill2,
        state.pill3
      ]
    }
  }
})

export default store
