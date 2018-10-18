<template lang="pug">
  main
    h1.text-center
      | Editar
    ul.nav.nav-pills.text-center
      li#pill1(@click='membership', :class="pillsState[0]")
        a Mensualidad
      li#pill2(@click='user', :class="pillsState[1]")
        a Usuario
    hr.decorate
</template>

<script>
  export default {
    name: 'EditPills',
    computed: {
      pillsState () {
        return this.$store.getters.pillsActive.map(state => state ? 'active' : '')
      }
    },
    methods: {
      async membership () {
        const isActive = document.getElementById('pill1').classList.value
        if (isActive) {
          return
        }
        this.$store.commit('pillActive', 0)
      },
      async user () {
        const isActive = document.getElementById('pill2').classList.value
        if (isActive) {
          return
        }
        this.$store.commit('pillActive', 1)
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
