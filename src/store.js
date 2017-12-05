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
    pillActive (state, currentActive) {
      state.pill1 = (currentActive === 'pill1')
      state.pill2 = (currentActive === 'pill2')
      state.pill3 = (currentActive === 'pill3')
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
    switchIsLoading (state) {
      state.isLoading = !state.isLoading
    }
  }
})

export default store
