<template lang="pug">
  nav.navbar-inverse.navbar-fixed-top.animated.fadeIn
    .row.container-fluid
      .col-xs-3.col-sm-5
        router-link(to="/home")
          a.navbar-brand
            i.fa.fa-home.fa-fw
            strong.hidden-xs &nbsp Inicio 
      .row.centrar.col-xs-6.col-sm-2.client-navbar-padding
        input#buscar.form-control(
          placeholder='Buscar aquí...',
          autofocus=''
          v-model="name",
          @keyup.enter="search"
        )
      .col-xs-1.client-navbar-padding
        button.centrar.form-group.btn.btn-default(
          title='Buscar',
          @click='search'
        )
          i.fa.fa-search.fa-lg
      .col-xs-1.col-sm-4.margin-left
        router-link(to="/home")
          a.navbar-brand.navbar-right(@click='signOut')
            strong.hidden-xs.margin &nbsp Salir 
            i.fa.fa-sign-out
</template>

<script>
  // Services.
  import { getByNameError, requestError } from '@/services/errorMessages'

  export default {
    name: 'ClientNavBar',
    data () {
      return {
        name: ''
      }
    },
    methods: {
      async search () {
        if (!this.name) {
          return
        }

        const clients = await this.$store.dispatch(
          'getClientsByName',
          { name: this.name }
        )

        if (clients.message) {
          return requestError()
        }

        if (clients.length === 0) {
          return getByNameError(this.name)
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
    margin-left: 25px
  }
</style>
