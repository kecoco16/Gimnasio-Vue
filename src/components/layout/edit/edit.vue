<template lang="pug">
  main
    gym-nav-bar
    .box-principal.animated.bounceInDown
      gym-edit-pills
      gym-edit-memberships.animated.fadeIn(v-show='this.$store.state.pills[0]')
      gym-edit-users.animated.fadeIn(v-show='this.$store.state.pills[1]')
      gym-loader(v-show='isLoading')
    gym-footer(v-show='!isLoading')
</template>

<script>
import GymLoader from '@/components/shared/Loader.vue'
import GymFooter from '@/components/shared/Footer.vue'
import GymEditPills from './EditPills.vue'
import GymNavBar from '@/components/shared/Header.vue'
import GymEditMemberships from './EditMemberships.vue'
import GymEditUsers from './EditUsers.vue'

export default {
  name: 'clients',

  components: {GymLoader, GymFooter, GymEditPills, GymNavBar, GymEditMemberships, GymEditUsers},

  created () {
    this.$store.commit('clientsList', [])
    this.$store.commit('pillActive', 'disable')
  },
  computed: {
    isLoading () {
      return this.$store.state.isLoading
    }
  }
}
</script>
<style lang="css">
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