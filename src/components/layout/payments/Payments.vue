<template lang="pug">
  main
    gym-header
    .box-principal.animated.bounceInDown
      gym-add-pills
      gym-loader(v-show='this.$store.state.isLoading')
      gym-payment-list
    .modal-mask(v-if='this.$store.state.modal')
      .modal-wrapper.animated.bounceIn
        .modal-container-date
          gym-filter-modal
    gym-footer
</template>

<script>
import GymAddPills from './PaymentsPills.vue'
import GymPaymentList from './PaymentList.vue'
import GymFooter from '@/components/shared/Footer.vue'
import GymHeader from '@/components/shared/Header.vue'
import GymLoader from '@/components/shared/Loader.vue'
import GymFilterModal from './PaymentsModalDateFilter.vue'

export default {
  name: 'payments',
  components: {GymAddPills, GymPaymentList, GymFooter, GymHeader, GymLoader, GymFilterModal},
  created () {
    this.$store.commit('pillActive', 'disable')
    this.$store.commit('modalState', false)
    this.$store.commit('paymentsSelect', [])
  }
}
</script>

<style lang="css" scoped>
  .box-form{
    margin-left: auto;
    margin-right: auto;
    width: 35%;
  }

  .modal-container-date {
    width: 420px;
    height: auto;
    margin: 0px auto;
    padding: 20px 30px;
    background-color: #fff;
    border-radius: 6px;
  }

  @media screen and (max-device-width : 480px) {
    .modal-container-date {
      width: auto;
      margin:15px !important;
      height: auto;
      margin: 0px auto;
      padding: 20px 30px;
      background-color: #fff;
      border-radius: 6px;
    }
  }
  @media screen and (max-device-width : 480px) {
    .box-form{
      margin-left: auto;
      margin-right: auto;
      width: 70%;
    }
  } 
</style>
