<template lang="pug">
  main
    gym-header
    .box-principal.animated.bounceInDown
      gym-add-pills(:info = {title: 'Agregar', pill1: 'Cliente', pill2: 'Mensualidad', pill3: 'Usuario'})
    .box-form
      gym-add-clients.animated.fadeIn(v-show='this.$store.state.pill1')
      gym-add-mensualidad.animated.fadeIn(v-show='this.$store.state.pill2')
      gym-add-users.animated.fadeIn(v-show='this.$store.state.pill3')
    gym-footer
</template>

<script>
import GymFooter from '@/components/shared/Footer.vue'
import GymHeader from '@/components/shared/Header.vue'
import GymAddPills from '@/components/layout/AddPills.vue'
import GymAddClients from '@/components/layout/AddClients.vue'
import GymAddMensualidad from '@/components/layout/AddMensualidad.vue'
import GymAddUsers from '@/components/layout/AddUsers.vue'

export default {
  name: 'add',
  components: {GymAddPills, GymFooter, GymHeader, GymAddClients, GymAddMensualidad, GymAddUsers},
  created () {
    this.$store.commit('disablePills')
  }
}
</script> 

<style lang="scss" scoped>
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