<template lang="pug">
  nav.navbar-inverse.navbar-fixed-top.animated.fadeIn
    .row.container-fluid
      .col-xs-10.col-sm-6.col-md-6
        router-link(to="/home")
          a.navbar-brand
            i.fa.fa-home.fa-fw
            strong.hidden-xs &nbsp Inicio 
      .col-xs-2.col-sm-6.col-md-6
        router-link(to="/home")
          a.navbar-brand.navbar-right(@click='signOut')
            strong.hidden-xs.margin &nbsp Salir 
            i.fa.fa-sign-out.margin-right
</template>

<script>
export default {
  methods: {
    signOut () {
      window.localStorage.auth = ''
      this.$router.push('/')
    }
  }
}
</script>

<style lang="css">
  .margin {
    margin: 8px;
  }

  .margin-right {
    margin-right: 10px;
  }
</style>
