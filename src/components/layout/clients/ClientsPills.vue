<template lang="pug">
  main
    h1.text-center
      | Listado de Clientes
    ul.nav.nav-pills.text-center
      li#pill1(@click='getAll', :class="pillsState[0]")
        a Todos
      li#pill2(@click='getToday', :class="pillsState[1]")
        a Hoy
      li#pill3(@click='getLate', :class="pillsState[2]")
        a Atrasados
    hr.decorate
</template>

<script>
  // Services.
  import { requestError } from '@/services/errorMessages'
  
  export default {
    name: 'AddPills',
    computed: {
      pillsState () {
        return this.$store.getters.pillsActive.map(state => state ? 'active' : '')
      }
    },
    methods: {
      async getAll () {
        const isActive = document.getElementById('pill1').classList.value
        if (isActive) {
          return
        }
        this.$store.commit('pillActive', 0)
        const clients = await this.$store.dispatch('getClients')

        if (clients.message) {
          this.$store.commit('pillActive', null)
          return requestError()
        }
      },
      async getToday () {
        const isActive = document.getElementById('pill2').classList.value
        if (isActive) {
          return
        }
        this.$store.commit('pillActive', 1)
        const clients = await this.$store.dispatch('getTodayClients')

        if (clients.message) {
          this.$store.commit('pillActive', null)
          return requestError()
        }
      },
      async getLate () {
        const isActive = document.getElementById('pill3').classList.value
        if (isActive) {
          return
        }
        this.$store.commit('pillActive', 2)
        const clients = await this.$store.dispatch('getLateClients')

        if (clients.message) {
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
