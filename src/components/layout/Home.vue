<template lang="pug">
  main.animated.fadeIn
    gym-header
    .box-principal.row.animated.bounceInDown
      router-link(to='/clients')
        .box.col-md-4.col-xs-12.col-sm-6
          .icon
            .image
              i.fa.fa-users
            .info
              h3.title Clientes
        .space
      router-link(to='/add')
        .box.col-md-4.col-xs-12.col-sm-6
          .icon
            .image
              i.fa.fa-plus
            .info
              h3.title Agregar
        .space
      router-link(to='/payments')
        .box.col-md-4.col-xs-12.col-sm-6
          .icon
            .image
              i.fa.fa-university
            .info
              h3.title Registro de pagos
        .space
    gym-footer
</template>

<script>
import GymFooter from '@/components/shared/Footer.vue'
import GymHeader from '@/components/shared/Header.vue'

export default {
  name: 'home',

  components: {GymFooter, GymHeader}
}
</script>

<style lang="scss" scoped>
  .box > .icon { text-align: center; position: relative; }
  .box > .icon > .image { position: relative; z-index: 2; margin: auto; width: 88px; height: 88px; border: 8px solid white; line-height: 88px; border-radius: 50%; background: #63B76C; vertical-align: middle; }
  .box > .icon:hover > .image { background: #054d93; }
  .box > .icon > .image > i { font-size: 36px !important; color: #fff !important; }
  .box > .icon:hover > .image > i { color: white !important; }
  .box > .icon > .info { margin-top: -24px; background: rgba(0, 0, 0, 0.04); border: 1px solid #e0e0e0; padding: 15px 0 10px 0; }
  .box > .icon:hover > .info { background: rgba(0, 0, 0, 0.04); border-color: #e0e0e0; color: white; }
  .box > .icon > .info > h3.title { font-family: "Roboto",sans-serif !important; font-size: 16px; color: #222; font-weight: 500; }
  .box > .icon:hover > .info > h3.title, .box > .icon:hover > .info > p, .box > .icon:hover > .info > .more > a { color: #222; }
  .box .space { height: 30px; }
</style>