import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    profileModal: false,
    editProfileModal: false,
    clientSelect: {}
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
    }
  }
})

export default store
