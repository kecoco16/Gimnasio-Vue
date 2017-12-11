<template lang="pug">
  main
    .container
      h1.text-center
        | Listado de Pagos
      ul.nav.nav-pills
        li#pill1(@click='pill1', :class="pillsState[0]")
          a Hoy
        li#pill2(@click='pill2', :class="pillsState[1]")
          a Filtrar
        li#pill3(@click='pill3', :class="pillsState[2]")
          a Todos
      hr.style-line
    .modal-mask(v-if='this.$store.state.modal')
      .modal-wrapper.animated.bounceIn
        .modal-container-date
          gym-filter-modal
</template>

<script>
  import AllPayments from '@/services/allPayments'
  import TodayPayments from '@/services/todayPayments'
  import GymFilterModal from './PaymentsModalDateFilter.vue'

  export default {
    name: 'AddPills',
    components: {GymFilterModal},
    computed: {
      pillsState () {
        return this.$store.getters.pillsActive.map((state) => state ? 'active' : '')
      }
    },
    methods: {
      async pill1 () {
        const pill1 = document.getElementById('pill1')
        if (pill1.classList.value === 'active') { return }
        this.$store.commit('pillActive', 'pill1')
        this.$store.commit('paymentsSelect', [])
        const payments = await TodayPayments.search()
        if (payments) {
          this.$store.commit('paymentsSelect', payments.reverse())
        }
      },
      pill2 () {
        this.$store.commit('paymentsSelect', [])
        this.$store.commit('pillActive', 'pill2')
        this.$store.commit('switchModal')
      },
      async pill3 () {
        const pill3 = document.getElementById('pill3')
        if (pill3.classList.value === 'active') { return }
        this.$store.commit('paymentsSelect', [])
        this.$store.commit('pillActive', 'pill3')
        const payments = await AllPayments.search()
        if (payments) {
          this.$store.commit('paymentsSelect', payments.reverse())
        }
      }
    }
}
</script> 


<style lang="scss" scoped>
.modal-container-date {
  width: 400px;
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
  .modal-container{
    width: auto;
    margin:15px !important;
    height: auto;
    margin: 0px auto;
    padding: 20px 30px;
    background-color: #fff;
    border-radius: 6px;
  }
}
</style>