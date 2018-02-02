<template lang="pug">
  main
    gym-nav-bar
    .box-principal
      .animated.bounceInDown
        gym-add-pills
      gym-loader(v-show='isLoading')
      div.row(v-show='!isLoading')
    gym-footer(v-show='!isLoading')
</template>

<script>
import GymLoader from '@/components/shared/Loader.vue'
import GymFooter from '@/components/shared/Footer.vue'
import GymAddPills from './editPills.vue'
import GymNavBar from '@/components/shared/Header.vue'

export default {
  name: 'clients',

  components: {GymLoader, GymFooter, GymAddPills, GymNavBar},

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