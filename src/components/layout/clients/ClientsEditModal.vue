<template lang="pug">
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
        select.form-control(name='mensualidad', v-validate.initial="'required'", v-model='menSelect')
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
  import updateClient from '@/services/updateClient'
  import mensualidad from '@/services/mensualidades'

  export default {
    name: 'editModal',
    data () {
      return {
        id: this.$store.state.clientSelect.id_clientes,
        nombre: this.$store.state.clientSelect.nombre,
        cedula: this.$store.state.clientSelect.cedula,
        telefono: this.$store.state.clientSelect.telefono,
        correo: this.$store.state.clientSelect.correo,
        menSelect: '',
        image: '',
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
      async editar () {
        if (this.nombre && this.telefono && this.menSelect) {
          const editar = await updateClient.search(
            this.id,
            this.nombre,
            this.cedula,
            this.telefono,
            this.correo,
            this.menSelect,
            this.image
          )
          if (editar) {
            this.hide()
            this.$store.commit('pillActive', 'disable')
            this.$store.commit('clientsList', [])
            swal({
              title: 'Editado con exito!',
              timer: 1200,
              showConfirmButton: false,
              type: 'success'
            })
          }
        }
      },
      hide () {
        this.$store.commit('switchEdit')
        this.$store.commit('clientSelect', {})
        this.menSelect = ''
        this.image = ''
      },
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
      }
    }
  }
</script>

<style lang="css">
  #derecha{
    margin-right:4px;
  }
  #izquierda{
    margin-left:4px;
  }
  .swal2-container {
    z-index: 100000
  }
</style>

