<template lang="pug">
  main
    gym-nav-bar
    .box-principal
      .animated.bounceInDown
        gym-add-pills
      gym-loader(v-show='isLoading')
      div.row(v-show='!isLoading')
        small.text-left.col-xs-6.col-sm-6.col-md-6 {{total}} 
        a.text-right.col-xs-6.col-sm-6.col-md-6(title='Generar PDF')
          i.fa.fa-file-pdf-o
      gym-client-card
    .modal-mask(v-if='profileModal')
      .modal-wrapper.animated.bounceIn
        .modal-container
          gym-profile-modal
    .modal-mask(v-if='editModal')
      .modal-wrapper.animated.bounceIn
        .modal-container
          gym-edit-modal
    gym-footer(v-show='!isLoading')
</template>

<script>
import GymLoader from '@/components/shared/Loader.vue'
import GymFooter from '@/components/shared/Footer.vue'
import GymProfileModal from '@/components/shared/ModalProfile.vue'
import GymAddPills from './ClientsPills.vue'
import GymNavBar from './ClientNavBar.vue'
import GymClientCard from './ClientCard.vue'
import GymEditModal from './ClientsEditModal.vue'

export default {
  name: 'clients',

  components: {GymLoader, GymFooter, GymProfileModal, GymAddPills, GymNavBar, GymClientCard, GymEditModal},

  created () {
    this.$store.commit('clientsList', [])
    this.$store.commit('pillActive', 'disable')
  },
  computed: {
    editModal () {
      return this.$store.state.editClientModal
    },
    profileModal () {
      return this.$store.state.profileModal
    },
    isLoading () {
      return this.$store.state.isLoading
    },
    total () {
      return `Encontrados ${this.$store.state.clientsList.length}`
    }
  },
  methods: {
  }
}
</script>
<style lang="scss">
@media screen and (max-device-width : 480px) {
  .modal-container{
    width: auto;
    margin:15px !important;
    height: 0px auto;
    margin: 0px auto;
    padding: 20px 30px;
    background-color: #fff;
    border-radius: 6px;
  }
}
</style>