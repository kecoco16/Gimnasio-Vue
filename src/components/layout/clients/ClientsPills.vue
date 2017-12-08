<template lang="pug">
  main
    h1.text-center
      | Listado de Clientes
    ul.nav.nav-pills
      li#pill1(@click='pill1')
        a Todos
      li#pill2(@click='pill2')
        a Hoy
      li#pill3(@click='pill3')
        a Atrasados
    hr.style-line
</template>

<script>
  import allClients from '@/services/all'
  import todayClients from '@/services/today'
  import lateClients from '@/services/late'

  const disableAll = () => {
    const li = document.getElementsByTagName('li')
    li[0].classList.remove('active')
    li[1].classList.remove('active')
    li[2].classList.remove('active')
  }

  export default {
    name: 'AddPills',
    methods: {
      pill1 () {
        const pill1 = document.getElementById('pill1')
        if (pill1.classList.value === 'active') { return }
        disableAll()
        this.$store.commit('clientsList', [])
        pill1.classList.add('active')
        this.$store.commit('pillActive', 'pill1')
        allClients.search()
          .then(res => {
            this.$store.commit('clientsList', res)
          })
      },
      pill2 () {
        const pill2 = document.getElementById('pill2')
        if (pill2.classList.value === 'active') { return }
        disableAll()
        this.$store.commit('clientsList', [])
        pill2.classList.add('active')
        this.$store.commit('pillActive', 'pill2')
        todayClients.search()
          .then(res => {
            this.$store.commit('clientsList', res)
          })
      },
      pill3 () {
        const pill3 = document.getElementById('pill3')
        if (pill3.classList.value === 'active') { return }
        disableAll()
        this.$store.commit('clientsList', [])
        pill3.classList.add('active')
        this.$store.commit('pillActive', 'pill3')
        lateClients.search()
          .then(res => {
            this.$store.commit('clientsList', res)
          })
      }
    }
}
</script> 