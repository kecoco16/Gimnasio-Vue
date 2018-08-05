<template lang="pug">
  nav.navbar-inverse.navbar-fixed-top.animated.fadeIn
    .row.container-fluid
      .col-xs-3.col-sm-5.col-md-5
        router-link(to="/home")
          a.navbar-brand
            i.fa.fa-home.fa-fw
            strong.hidden-xs &nbsp Inicio 
      .row.centrar.col-xs-6.col-sm-2.col-md-2.text-center
        input#buscar.form-control(placeholder='Buscar aquí...', autofocus='' v-model="searchQuery", @keyup.enter="search")
      .col.col-xs-1
        button.centrar.form-group.btn.btn-default(title='Buscar', @click='search')
          i.fa.fa-search.fa-lg
      .col-xs-2.col-sm-4.col-md-4.margin-left
        router-link(to="/home")
          a.navbar-brand.navbar-right(@click='signOut')
            strong.hidden-xs.margin &nbsp Salir 
            i.fa.fa-sign-out
</template>

<script>
  import searchByName from '@/services/search'
  export default {
    name: 'ClientNavBar',
    data () {
      return {
        searchQuery: ''
      }
    },
    methods: {
      async search () {
        if (!this.searchQuery) { return }
        this.$store.commit('pillActive', 'disable')
        this.$store.commit('clientsList', [])
        this.$store.commit('isLoading', true)
        const clients = await searchByName.search(this.searchQuery)
        if (clients.length > 0) {
          this.$store.commit('isLoading', false)
          this.$store.commit('clientsList', clients)
          this.searchQuery = ''
        } else {
          this.$store.commit('isLoading', false)
          this.searchQuery = ''
          swal({
            title: `😰`,
            html: $('<div>')
              .text(`No hay resultados con ${this.searchQuery}`),
            animation: false,
            timer: 1680,
            showConfirmButton: false,
            customClass: 'animated tada'
          })
        }
      },
      signOut () {
        window.localStorage.auth = ''
        this.$router.push('/')
      }
    }
  }
</script>

<style lang="css" scoped>
  .margin-left{
    margin-left: 20px
  }
  @media screen and (max-device-width : 480px) {
    .margin-left{
      margin-left: 30px
    }
  }
</style>
