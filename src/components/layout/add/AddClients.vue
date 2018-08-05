<template lang="pug">
  main
    .box-form
      form(@submit.prevent='validateBeforeSubmit')
        .form-group
          i.fa.fa-user
          label.control-label &nbsp Nombre 
          input.form-control(name='nombre', v-model='nombre', v-validate="'required|alpha_spaces'", type='text', placeholder='nombre')
          i.fa.fa-warning(v-show="errors.has('nombre')")
          span.text-danger(v-show="errors.has('nombre')") {{ errors.first('nombre') }}
        .form-group
          i.fa.fa-id-card-o
          label.control-label &nbsp Cedula
          input.form-control(name='cedula', v-model='cedula', v-validate="'required|min:9|numeric'", type='text', placeholder='cedula')
          i.fa.fa-warning(v-show="errors.has('cedula')")
          span.text-danger(v-show="errors.has('cedula')") {{ errors.first('cedula') }}
        .form-group
          i.fa.fa-phone
          label.control-label &nbsp Telefono
          input.form-control(name='telefono', v-model='telefono', v-validate="'required|min:8|numeric'", type='text', placeholder='telefono')
          i.fa.fa-warning(v-show="errors.has('telefono')")
          span.text-danger(v-show="errors.has('telefono')") {{ errors.first('telefono') }}
        .form-group
          i.fa.fa-money
          Label.control-label &nbsp Mensualidad
          select.form-control(name='mensualidad', v-validate.initial="'required'", v-model='MenSelect')
            option(value="")
            option(v-for='m in mensualidades', :value='m.id_mensualidad') {{m.tipo}} ₡{{m.mensualidad}}
        .form-group
          i.fa.fa-envelope-o
          label.control-label &nbsp Correo
          input.form-control(name='correo', v-model='correo', v-validate="'required|email'", type='text', placeholder='correo')
          i.fa.fa-warning(v-show="errors.has('correo')")
          span.text-danger(v-show="errors.has('correo')") {{ errors.first('correo') }}
        .form-group
          i.fa.fa-transgender
          label.control-label(:class="{ 'error': errors.has('sexo') }")  &nbsp Sexo &nbsp
          i.fa.fa-warning(v-show="errors.has('sexo')")
          span.text-danger(v-show="errors.has('sexo')") {{ errors.first('sexo') }}
          br
          label.radio-inline
            input(name='sexo', v-validate="'required|in:h,m'",v-model='sexo', value='h', type='radio')
            i.fa.fa-male
            |&nbsp Masculino
          label.radio-inline
            input(name='sexo', value='m', type='radio', v-model='sexo')
            i.fa.fa-female
            |&nbsp Femenino
        .form-group
          input(name='imagen', type='file', @change='onFileChange', v-validate="'image'")
          img.animated.fadeIn(:src='image', v-show='image')
        button.btn.btn-primary.btn-block(type='submit', @click='newClient') Agregar 
</template>

<script>
import mensualidad from '@/services/mensualidades'
import AddClient from '@/services/AddClient'

const editarFecha = (fecha, intervalo, dma) => {
  let arrayFecha = fecha.split('-')
  let dia = arrayFecha[2]
  let mes = arrayFecha[1]
  let anio = arrayFecha[0]
  let fechaInicial = new Date(anio, mes - 1, dia)
  let fechaFinal = fechaInicial
  fechaFinal.setMonth(fechaInicial.getMonth() + parseInt(intervalo))
  dia = fechaFinal.getDate()
  mes = fechaFinal.getMonth() + 1
  anio = fechaFinal.getFullYear()
  dia = (dia.toString().length === 1) ? '0' + dia.toString() : dia
  mes = (mes.toString().length === 1) ? '0' + mes.toString() : mes
  return anio + '-' + mes + '-' + dia
}

export default {
  name: 'app',

  data () {
    return {
      correo: '',
      nombre: '',
      cedula: '',
      telefono: '',
      sexo: '',
      image: '',
      MenSelect: '',
      mensualidades: []
    }
  },
  async created () {
    const getMensualidades = await mensualidad.search()
    if (getMensualidades) {
      this.mensualidades = getMensualidades
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
    onFileChange (e) {
      const files = e.target.files || e.dataTransfer.files
      if (!files.length) { return }
      this.createImage(files[0])
    },
    createImage (file) {
      const reader = new FileReader()
      const vm = this
      reader.onload = (e) => {
        vm.image = e.target.result
      }
      reader.readAsDataURL(file)
    },
    async newClient () {
      const hoy = new Date().toJSON().slice(0, 10)
      const pago = editarFecha(hoy, '+1', 'm')
      if (this.nombre && this.cedula && this.telefono && this.MenSelect && this.correo && this.sexo) {
        const client = AddClient.search(
          this.nombre,
          this.cedula,
          this.telefono,
          this.MenSelect,
          this.correo,
          this.sexo,
          this.image,
          hoy,
          pago
        )
        if (client) {
          swal({
            title: 'Agregado con exito!',
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
<style lang='css' scoped>
img{
  width: 50%;
  margin: auto;
  display: block;
  margin-top: 20px;
  border-radius:5%;
}
</style>