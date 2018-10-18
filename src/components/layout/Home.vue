<template lang="pug">
  .animated.fadeIn
    gym-header
    .row.box-principal.animated.bounceInDown
      router-link(
        v-for='(value, key) in options',
        :key='key',
        :to='value.route'
      )
        .home-box.col-md-4.col-sm-6.col-xs-12
          .home-image
            i.home-icon.fa(:class='value.icon')
          .home-option
            h3.home-title {{ value.tittle }}
    gym-footer
</template>

<script>
  // Components.
  import GymHeader from '@/components/shared/Header.vue'
  import GymFooter from '@/components/shared/Footer.vue'

  export default {
    name: 'home',
    components: { GymHeader, GymFooter },
    data () {
      return {
        options: [
          {
            route: '/clients',
            icon: 'fa-users',
            tittle: 'Clientes'
          },
          {
            route: '/add',
            icon: 'fa-plus',
            tittle: 'Agregar'
          },
          {
            route: '/payments',
            icon: 'fa-university',
            tittle: 'Pagos'
          },
          {
            route: '/edit',
            icon: 'fa-pencil',
            tittle: 'Editar'
          }
        ]
      }
    }
  }
</script>
