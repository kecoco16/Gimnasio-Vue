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
    async newMensualidad () {
      if (this.nombre && this.mensualidad) {
        const mensualidad = await AddMensualidad.search(this.nombre, this.mensualidad)
        if (mensualidad) {
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