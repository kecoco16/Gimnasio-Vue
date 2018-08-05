<template lang="pug">
  .animated.fadeIn
    .navbar-inverse.navbar-fixed-top.navbar-brand
    .login-modal-mask
      .login-modal-wrapper.animated.bounceIn
        .login-modal-container.text-center.col-xs-11.col-sm-6.col-md-6.col-lg-4
          h1.login-tittle Iniciar sesión
          form(@submit.prevent='auth', autocomplete='off')
            .form-group.text-left
              input.form-control(
                name='nombre',
                v-model='name',
                v-validate="'required|alpha'",
                type='text',
                placeholder='nombre de usuario',
                autocomplete='off'
              )
              i.fa.fa-warning(v-show="errors.has('nombre')")
              span.text-danger(v-show="errors.has('nombre')") {{ ` ${errors.first('nombre')}` }}
            .form-group.text-left
              input.form-control(
                name='contraseña',
                v-model='password',
                v-validate="'required'",
                type='password',
                placeholder='contraseña',
                autocomplete='off'
              )
              i.fa.fa-warning(v-show="errors.has('contraseña')")
              span.text-danger(v-show="errors.has('contraseña')") {{ ` ${errors.first('contraseña')}` }}
            button.login-bottom.btn.btn-primary.btn-block(@click="auth") Iniciar sesion 
    gym-footer.login-footer
</template>

<script>
  // Services.
  import login from '@/services/login'
  import { loginError } from '@/services/errorMessages'

  // Components.
  import GymFooter from '@/components/shared/Footer.vue'

  export default {
    name: 'login',
    components: { GymFooter },
    data () {
      return {
        name: '',
        password: ''
      }
    },
    methods: {
      async auth () {
        const validate = await this.$validator.validateAll()
        if (!validate) {
          return
        }

        const user = await login(this.name, this.password)
        if (!user) {
          return loginError()
        }

        window.localStorage.auth = user.token
        this.$router.push('/home')
      }
    }
  }
</script>
