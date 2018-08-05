<template lang="pug">
  main
    gym-header
    .box-principal.animated.bounceInDown
      gym-add-pills
    .box-form
      gym-add-clients.animated.fadeIn(v-show='this.$store.state.pill1')
      gym-add-mensualidad.animated.fadeIn(v-show='this.$store.state.pill2')
      gym-add-users.animated.fadeIn(v-show='this.$store.state.pill3')
    gym-footer
</template>

<script>
import GymFooter from '@/components/shared/Footer.vue'
import GymHeader from '@/components/shared/Header.vue'
import GymAddPills from './AddPills.vue'
import GymAddClients from './AddClients.vue'
import GymAddMensualidad from './AddMensualidad.vue'
import GymAddUsers from './AddUsers.vue'

export default {
  name: 'add',
  components: {GymAddPills, GymFooter, GymHeader, GymAddClients, GymAddMensualidad, GymAddUsers},
  created () {
    this.$store.commit('pillActive', 'disable')
  }
}
</script> 

<style lang="css" scoped>
.box-form{
  margin-left: auto;
  margin-right: auto;
  width: 35%;
}
@media screen and (max-device-width : 480px) {
  .box-form{
    margin-left: auto;
    margin-right: auto;
    width: 70%;
  }
} 
</style>