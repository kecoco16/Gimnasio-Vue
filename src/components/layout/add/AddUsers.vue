<template lang="pug">
  main
    .box-form  
      form(@submit.prevent='validateBeforeSubmit')
        .form-group
          i.fa.fa-user
          label.control-label &nbsp Nombre de Usuario
          input.form-control(name='nombre', v-model='name', v-validate="'required|alpha'", type='text', placeholder='nombre de usuario')
          i.fa.fa-warning(v-show="errors.has('nombre')")
          span.text-danger(v-show="errors.has('nombre')") {{ errors.first('nombre') }}
        .form-group
          i.fa.fa-key
          label.control-label &nbsp Contraseña
          input.form-control(name='contraseña', v-model='pass', v-validate="'required|min:6'", type='password', placeholder='contraseña')
          i.fa.fa-warning(v-show="errors.has('contraseña')")
          span.text-danger(v-show="errors.has('contraseña')") {{ errors.first('contraseña') }}
        button.btn.btn-primary.btn-block(type='submit', @click='newUser') Agregar
</template>

<script>
import addUser from '@/services/addUser'
export default {
  name: 'app',

  data () {
    return {
      name: '',
      pass: ''
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
    },
    async newUser () {
      if (this.name && this.pass) {
        const user = await addUser.search(this.name, this.pass)
        if (user) {
          swal({
            title: 'Agregada con exito!',
            timer: 1200,
            showConfirmButton: false,
            type: 'success'
          })
          setTimeout(() => {
            this.$router.push('/home')
          }, 1200)
        }
      }
    }
  }
}
</script> 