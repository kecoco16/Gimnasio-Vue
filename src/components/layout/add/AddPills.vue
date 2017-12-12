<template lang="pug">
  main
    h1.text-center
      | Agregar
    ul.nav.nav-pills
      li#pill1(@click='pill1', :class='pillsState[0]')
        a Cliente
      li#pill2(@click='pill2', :class='pillsState[1]')
        a Mensualidad
      li#pill3(@click='pill3', :class='pillsState[2]')
        a Usuario
    hr.style-line
</template>

<script>
  export default {
    name: 'AddPills',
    computed: {
      pillsState () {
        return this.$store.getters.pillsActive.map((state) => state ? 'active' : '')
      }
    },
    methods: {
      pill1 () {
        const pill1 = document.getElementById('pill1')
        if (pill1.classList.value === 'active') { return }
        this.$store.commit('pillActive', 'pill1')
      },
      pill2 () {
        const pill2 = document.getElementById('pill2')
        if (pill2.classList.value === 'active') { return }
        this.$store.commit('pillActive', 'pill2')
      },
      pill3 () {
        const pill3 = document.getElementById('pill3')
        if (pill3.classList.value === 'active') { return }
        this.$store.commit('pillActive', 'pill3')
      }
    }
}
</script> 