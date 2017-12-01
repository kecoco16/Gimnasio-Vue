<template lang="pug">
  main
    .container
      h1.text-center
        | {{info.title}}
      ul.nav.nav-pills
        li#pill1(@click='pill1')
          a {{info.pill1}}
        li#pill2(@click='pill2')
          a {{info.pill2}}
        li#pill3(@click='pill3')
          a {{info.pill3}}
      hr.style-line
    .modal-mask(v-if='this.$store.state.modal')
      .modal-wrapper.animated.bounceIn
        .modal-container-date
          gym-filter-modal
</template>

<script>
  import AllPayments from '@/services/allPayments'
  import TodayPayments from '@/services/todayPayments'
  import GymFilterModal from '@/components/layout/PaymentsModalDateFilter.vue'

  const disableAll = () => {
    const li = document.getElementsByTagName('li')
    li[0].classList.remove('active')
    li[1].classList.remove('active')
    li[2].classList.remove('active')
  }

  export default {
    name: 'AddPills',
    components: {GymFilterModal},
    props: {
      info: Object
    },
    methods: {
      pill1 () {
        const pill1 = document.getElementById('pill1')
        if (pill1.classList.value === 'active') { return }
        disableAll()
        pill1.classList.add('active')
        this.$store.commit('pill1Active')
        this.$store.commit('cleanPaymentList')
        this.$store.commit('switchIsLoading')
        TodayPayments.search()
          .then(res => {
            this.$store.commit('paymentsSelect', res.reverse())
            this.$store.commit('switchIsLoading')
          })
      },
      pill2 () {
        const pill2 = document.getElementById('pill2')
        disableAll()
        pill2.classList.add('active')
        this.$store.commit('cleanPaymentList')
        this.$store.commit('pill2Active')
        this.$store.commit('switchModal')
      },
      pill3 () {
        const pill3 = document.getElementById('pill3')
        if (pill3.classList.value === 'active') { return }
        disableAll()
        pill3.classList.add('active')
        this.$store.commit('switchIsLoading')
        this.$store.commit('cleanPaymentList')
        this.$store.commit('pill3Active')
        AllPayments.search()
          .then(res => {
            this.$store.commit('paymentsSelect', res.reverse())
            this.$store.commit('switchIsLoading')
          })
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