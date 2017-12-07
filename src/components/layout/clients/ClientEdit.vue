<template lang="pug">
  main
    .box-form.row
      form(@submit.prevent='validateBeforeSubmit')
        .form-group
          label.control-label Nombre
          input.form-control(name='nombre', v-model='nombre', v-validate="'required|alpha_spaces'", type='text', placeholder='nombre') 
          i.fa.fa-warning(v-show="errors.has('nombre')")
          span.text-danger(v-show="errors.has('nombre')") {{ errors.first('nombre') }}
        .form-group
          label.control-label Telefono
          input.form-control(name='telefono', v-model='telefono', v-validate="'required|min:8|numeric'", type='text', placeholder='telefono') 
          i.fa.fa-warning(v-show="errors.has('telefono')")
          span.text-danger(v-show="errors.has('telefono')") {{ errors.first('telefono') }}
        .form-group
          Label.control-label Mensualidad
          select.form-control(name='mensualidad', v-validate.initial="'required'", v-model='MenSelect')
            option(value="")
            option(v-for='m in mensualidades', :value='m.id_mensualidad') {{m.tipo}} ₡{{m.mensualidad}}
        .form-group
          label.control-label Correo
          input.form-control(name='correo', v-model='correo', v-validate="'required|email'", type='text', placeholder='correo') 
          i.fa.fa-warning(v-show="errors.has('correo')")
          span.text-danger(v-show="errors.has('correo')") {{ errors.first('correo') }}
        .form-group
          input(name='imagen', type='file', @change='onFileChange', v-validate="'image'")
          img.animated.fadeIn(:src='image', v-show='image')
        button#derecha.btn.btn-primary.col-xs-offset-2.col-xs-4.col-sm-4.col-md-4(type='submit', @click='editar') Editar 
      button#izquierda.btn.btn-default.col-xs-4.col-sm-4.col-md-4(@click='hide') Cancelar  
</template>

<script>
import mensualidad from '@/services/mensualidades'
import updateClient from '@/services/updateClient'

export default {
  data () {
    return {
      nombre: this.$store.state.clientSelect.nombre,
      mensualidad: this.$store.state.clientSelect.mensualidad,
      telefono: this.$store.state.clientSelect.telefono,
      cedula: this.$store.state.clientSelect.cedula,
      correo: this.$store.state.clientSelect.correo,
      MenSelect: '',
      image: '',
      id: this.$store.state.clientSelect.id_clientes,
      mensualidades: []
    }
  },
  created () {
    mensualidad.search()
      .then(res => {
        this.mensualidades = res
        console.log(res)
      })
  },
  computed: {
    Client () {
      this.clientes = this.$store.state.clientSelect
    }
  },
  methods: {
    hide () {
      this.$store.commit('switchEdit')
    },
    editar () {
      let self = this
      if (this.nombre && this.telefono && this.MenSelect) {
        updateClient.search(this.id, this.nombre, this.cedula, this.telefono, this.correo, this.MenSelect, this.image)
          .then(res => {
            self.hide()
            swal({
              title: 'Editado con exito!',
              timer: 1200,
              showConfirmButton: false,
              type: 'success'
            }).then(
              function () {},
              function (dismiss) {
                if (dismiss === 'timer') {
                  console.log('ok')
                }
              }
            )
          })
      }
    },
    validateBeforeSubmit () {
      this.$validator.validateAll().then(result => {
        if (result) {
          return
        }
        swal({
          type: 'error',
          html: $('<div>')
            .addClass('.animated.fadeIn')
            .text('Error! Faltan o hay datos incorrectos'),
          animation: false,
          timer: 1900,
          showConfirmButton: false
        }).then(
          function () {},
          function () {}
        )
      })
    },
    onFileChange (e) {
      var files = e.target.files || e.dataTransfer.files
      if (!files.length) {
        return
      }
      this.createImage(files[0])
    },
    createImage (file) {
      var reader = new FileReader()
      var vm = this

      reader.onload = (e) => {
        vm.image = e.target.result
      }
      reader.readAsDataURL(file)
    }
  }
}
</script>

<style lang="scss" scoped>


</style>