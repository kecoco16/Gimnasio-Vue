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
            button.btn.btn-primary.btn-block.login-bottom(@click="auth") Iniciar sesion 
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

<style lang="scss" scoped>
  .login-modal-mask {
    position: fixed;
    z-index: 9999;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, .5);
    display: table;
  }

  .login-modal-wrapper {
    display: table-cell;
    vertical-align: middle;
  }

  .login-modal-container {
    float: none;
    margin: 0px auto;
    padding: 30px;
    background-color: #fff;
    border-radius: 6px;
  }

  .login-tittle {
    margin-top: 0px;
    margin-bottom: 20px;
  }

  .login-footer {
    min-height: 40px;
    width: 100%;
    position: fixed;
    bottom: 0;
  }

  .login-bottom {
    border-radius: 4px;
    letter-spacing: 0.5px;
    border: 1px solid;
  }
  
  .login-bottom:focus {
    outline: none;
  }

  // Large devices (desktops, 992px and up)
  @media (min-width: 992px) {
    .login-bottom:hover {
      background: #044a90;
    }
  }

</style>