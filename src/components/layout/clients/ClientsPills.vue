<template lang="pug">
  main
    h1.text-center
      | Listado de Clientes
    ul.nav.nav-pills
      li#pill1(@click='pill1', :class="pillsState[0]")
        a Todos
      li#pill2(@click='pill2', :class="pillsState[1]")
        a Hoy
      li#pill3(@click='pill3', :class="pillsState[2]")
        a Atrasados
    hr.style-line
</template>

<script>
  import allClients from '@/services/all'
  import todayClients from '@/services/today'
  import lateClients from '@/services/late'

  export default {
    name: 'AddPills',
    computed: {
      pillsState () {
        return this.$store.getters.pillsActive.map((state) => state ? 'active' : '')
      }
    },
    methods: {
      async pill1 () {
        const pill1 = document.getElementById('pill1')
        if (pill1.classList.value === 'active') { return }
        this.$store.commit('isLoading', true)
        this.$store.commit('clientsList', [])
        this.$store.commit('pillActive', 'pill1')
        const clients = await allClients.search()
        if (clients) {
          this.$store.commit('isLoading', false)
          this.$store.commit('clientsList', clients)
        }
      },
      async pill2 () {
        const pill2 = document.getElementById('pill2')
        if (pill2.classList.value === 'active') { return }
        this.$store.commit('isLoading', true)
        this.$store.commit('clientsList', [])
        this.$store.commit('pillActive', 'pill2')
        const clients = await todayClients.search()
        if (clients) {
          this.$store.commit('isLoading', false)
          this.$store.commit('clientsList', clients)
        }
      },
      async pill3 () {
        const pill3 = document.getElementById('pill3')
        if (pill3.classList.value === 'active') { return }
        this.$store.commit('isLoading', true)
        this.$store.commit('clientsList', [])
        this.$store.commit('pillActive', 'pill3')
        const clients = await lateClients.search()
        if (clients) {
          this.$store.commit('isLoading', false)
          this.$store.commit('clientsList', clients)
        }
      }
    }
}
</script> 