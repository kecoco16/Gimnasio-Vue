<template lang="pug">
  main
    gym-header.animated.fadeIn
    .box-principal
      .animated.bounceInDown
        gym-add-pills(:info = {title: 'Listado de Pagos', pill1: 'Hoy', pill2: 'Filtrar', pill3: 'Todos'})
      gym-loader(v-show='this.$store.state.isLoading')
      gym-payment-list
    gym-footer
</template>

<script>
import GymAddPills from '@/components/layout/PaymentsPills.vue'
import GymFooter from '@/components/shared/Footer.vue'
import GymHeader from '@/components/shared/Header.vue'
import GymLoader from '@/components/shared/Loader.vue'
import GymPaymentList from '@/components/layout/PaymentList.vue'

export default {
  name: 'payments',
  components: {GymAddPills, GymPaymentList, GymFooter, GymHeader, GymLoader},
  created () {
    this.$store.commit('pillActive', 'disable')
    this.$store.commit('disableModal')
  }
}
</script>
