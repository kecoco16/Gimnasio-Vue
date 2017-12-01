<template lang="pug">
  main
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
      },
      pill2 () {
        const pill2 = document.getElementById('pill2')
        if (pill2.classList.value === 'active') { return }
        disableAll()
        pill2.classList.add('active')
        this.$store.commit('pill2Active')
      },
      pill3 () {
        const pill3 = document.getElementById('pill3')
        if (pill3.classList.value === 'active') { return }
        disableAll()
        pill3.classList.add('active')
        this.$store.commit('pill3Active')
      }
    }
}
</script> 