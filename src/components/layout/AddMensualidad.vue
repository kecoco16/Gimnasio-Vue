<template lang="pug">
  main
    .box-form  
      form(@submit.prevent='validateBeforeSubmit')
        .form-group
          i.fa.fa-id-card-o
          label.control-label &nbsp Nombre
          input.form-control(name='nombre', v-model='nombre', v-validate="'required|alpha_spaces'", type='text', placeholder='nombre')
          i.fa.fa-warning(v-show="errors.has('nombre')")
          span.text-danger(v-show="errors.has('nombre')") {{ errors.first('nombre') }}
        .form-group
          i.fa.fa-money
          label.control-label &nbsp Monto mensualidad
          input.form-control(name='mensualidad', v-model='mensualidad', v-validate="'required|numeric'", type='text', placeholder='0')
          i.fa.fa-warning(v-show="errors.has('mensualidad')")
          span.text-danger(v-show="errors.has('mensualidad')") {{ errors.first('mensualidad') }}
        button.btn.btn-primary.btn-block(type='submit', @click='newMensualidad') Agregar 
</template>

<script>
import AddMensualidad from '@/services/AddMensualidad'

export default {
  name: 'app',

  data () {
    return {
      nombre: '',
      mensualidad: ''
    }
  },
  methods: {
    validateBeforeSubmit () {
      this.$validator.validateAll().then(result => {
        if (!result) {
          swal({
            type: 'error',
            html: $('<div>')
              .addClass('.animated.fadeIn')
              .text('Error! Faltan o hay datos incorrectos'),
            animation: false,
            customClass: 'animated tada',
            timer: 1900,
            showConfirmButton: false
          }).then(
            function () {},
            function () {}
          )
        }
      })
    },
    newMensualidad () {
      let _self = this
      if (this.nombre && this.mensualidad) {
        AddMensualidad.search(this.nombre, this.mensualidad)
          .then(res => {
            setTimeout(function () {
              _self.$router.push('/home')
            }, 1200)
            swal({
              title: 'Agregada con exito!',
              timer: 1200,
              showConfirmButton: false,
              type: 'success'
            })
          }).catch(err => err)
      }
    }
  }
}
</script> 