<template lang="pug">
  main
    gym-header.animated.fadeIn
    .box-principal
      .animated.bounceInDown
        gym-add-pills
      gym-loader(v-show='this.$store.state.isLoading')
      gym-payment-list
    gym-footer
</template>

<script>
import GymAddPills from './PaymentsPills.vue'
import GymPaymentList from './PaymentList.vue'
import GymFooter from '@/components/shared/Footer.vue'
import GymHeader from '@/components/shared/Header.vue'
import GymLoader from '@/components/shared/Loader.vue'

export default {
  name: 'payments',
  components: {GymAddPills, GymPaymentList, GymFooter, GymHeader, GymLoader},
  created () {
    this.$store.commit('pillActive', 'disable')
    this.$store.commit('disableModal')
    this.$store.commit('paymentsSelect', [])
  }
}
</script>
