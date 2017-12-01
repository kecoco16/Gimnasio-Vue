import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    profileModal: false,
    editProfileModal: false,
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
      state.editProfileModal = !state.editProfileModal
      state.clientSelect = {}
    },
    clientSelect (state, client) {
      state.clientSelect = client
    },
    switchPayments (state) {
      state.profileModal = !state.profileModal
    },
    pill1Active (state) {
      state.pill1 = true
      state.pill2 = false
      state.pill3 = false
    },
    pill2Active (state) {
      state.pill1 = false
      state.pill2 = true
      state.pill3 = false
    },
    pill3Active (state) {
      state.pill1 = false
      state.pill2 = false
      state.pill3 = true
    },
    disablePills (state) {
      state.pill1 = false
      state.pill2 = false
      state.pill3 = false
    },
    paymentsSelect (state, list) {
      state.paymentsList = list
    },
    cleanPaymentList (state) {
      state.paymentsList = []
    },
    switchModal (state) {
      state.modal = !state.modal
      state.clientSelect = {}
    },
    switchIsLoading (state) {
      state.isLoading = !state.isLoading
    }
  }
})

export default store
