<template lang="pug">
  main.animated.fadeIn
    nav.navbar-inverse.navbar-fixed-top
      .row.container-fluid
        .col-xs-12.col-sm-12
            a.navbar-brand
    .modal-mask
      .modal-wrapper.animated.bounceIn
        .modal-container
          .box-form
            h1.text-center Iniciar sesión
            form(@submit.prevent='validateBeforeSubmit', autocomplete='off')
              .form-group
                input.form-control(name='nombre', v-model='nombre', v-validate="'required|alpha'", type='text', placeholder='nombre de usuario', autocomplete='off')
                i.fa.fa-warning(v-show="errors.has('nombre')")
                span.text-danger(v-show="errors.has('nombre')") {{ errors.first('nombre') }}
              .form-group
                input.form-control(name='contraseña', v-model='password', v-validate="'required|min:6'", type='password', placeholder='contraseña', autocomplete='off')
                i.fa.fa-warning(v-show="errors.has('contraseña')")
                span.text-danger(v-show="errors.has('contraseña')") {{ errors.first('contraseña') }}
              router-link(to='/home')
                button.btn.btn-primary.btn-block Iniciar sesion 
    gym-footer
</template>

<script>
import GymFooter from '@/components/shared/Footer.vue'
import GymHeader from '@/components/shared/Header.vue'

export default {
  name: 'login',

  components: {GymFooter, GymHeader},

  data () {
    return {
      nombre: '',
      password: ''
    }
  },
  methods: {
    async validateBeforeSubmit () {
      const validate = await this.$validator.validateAll()
      if (!validate) {
        swal({
          type: 'error',
          html: $('<div>')
            .addClass('.animated.fadeIn')
            .text('Error! Faltan o hay datos incorrectos'),
          animation: false,
          timer: 1500,
          showConfirmButton: false
        })
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.modal-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, .5);
  display: table;
}

.modal-wrapper {
  display: table-cell;
  vertical-align: middle;
}

.modal-container {
  width: 350px;
  height: auto;
  margin: 0px auto;
  padding: 25px 30px 30px 30px;
  background-color: #fff;
  border-radius: 6px;
}
h1{
  margin-top: 0px;
  margin-bottom: 20px;
}
footer {
  min-height: 70px;
  width: 100%;
  position: fixed;
  bottom: 0;
}
</style>