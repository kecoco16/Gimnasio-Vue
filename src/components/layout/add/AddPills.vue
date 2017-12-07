<template lang="pug">
  main
    h1.text-center
      | Agregar
    ul.nav.nav-pills
      li#pill1(@click='pill1')
        a Cliente
      li#pill2(@click='pill2')
        a Mensualidad
      li#pill3(@click='pill3')
        a Usuario
    hr.style-line
</template>

<script>
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
        pill1.classList.add('active')
        this.$store.commit('pillActive', 'pill1')
      },
      pill2 () {
        const pill2 = document.getElementById('pill2')
        if (pill2.classList.value === 'active') { return }
        disableAll()
        pill2.classList.add('active')
        this.$store.commit('pillActive', 'pill2')
      },
      pill3 () {
        const pill3 = document.getElementById('pill3')
        if (pill3.classList.value === 'active') { return }
        disableAll()
        pill3.classList.add('active')
        this.$store.commit('pillActive', 'pill3')
      }
    }
}
</script> 