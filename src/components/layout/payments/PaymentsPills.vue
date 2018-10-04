<template lang="pug">
  main
    h1.text-center
      | Listado de Pagos
    ul.nav.nav-pills.text-center
      li#pill1(@click='today', :class="pillsState[0]")
        a Hoy
      li#pill2(@click='filter', :class="pillsState[1]")
        a Filtrar
      li#pill3(@click='all', :class="pillsState[2]")
        a Todos
    hr.decorate
</template>

<script>
  import GymFilterModal from './PaymentsModalDateFilter.vue'
  import { requestError } from '@/services/errorMessages'

  export default {
    name: 'AddPills',
    components: {GymFilterModal},
    computed: {
      pillsState () {
        return this.$store.getters.pillsActive.map((state) => state ? 'active' : '')
      }
    },
    methods: {
      async today () {
        const isActive = document.getElementById('pill1').classList.value
        if (isActive) {
          return
        }

        this.$store.commit('pillActive', 0)
        const payments = await this.$store.dispatch('todayPayments')

        if (payments.message) {
          this.$store.commit('pillActive', null)
          return requestError()
        }
      },
      filter () {
        const isActive = document.getElementById('pill2').classList.value
        if (isActive) {
          return
        }

        this.$store.commit('pillActive', 1)
        this.$store.commit('modalState', true)
      },
      async all () {
        const isActive = document.getElementById('pill3').classList.value
        if (isActive) {
          return
        }

        this.$store.commit('pillActive', 2)
        const payments = await this.$store.dispatch('allPayments')

        if (payments.message) {
          this.$store.commit('pillActive', null)
          return requestError()
        }
      }
    }
}
</script> 


<style lang="css" scoped>
  li {
    float:none;
    display:inline-block;
  }
  .decorate {
    overflow: visible;
    height: 30px;
    border-style: solid;
    border-color:	#D0D0D0;
    border-width: 1px 0 0 0;
    border-radius: 20px;
  }
  .decorate:before {
    display: block;
    content: "";
    height: 30px;
    margin-top: -31px;
    border-style: solid;
    border-color: #D0D0D0;
    border-width: 0 0 1px 0;
    border-radius: 20px;
  }
</style>
