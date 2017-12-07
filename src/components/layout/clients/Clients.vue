<template lang="pug">
  main
    nav.navbar-inverse.navbar-fixed-top.animated.fadeIn
      .row.container-fluid
        .col-xs-3.col-sm-4.col-md-5
          router-link(to="/home")
            a.navbar-brand(@click='inicio')
              i.fa.fa-home.fa-fw(@click='inicio')
              strong.hidden-xs &nbsp Inicio 
        .row.centrar.col-xs-6.col-sm-4.col-md-2.text-center
          input#buscar.form-control(placeholder='Buscar aquí...', autofocus='' v-model="searchQuery", @keyup.enter="search")
        .col.col-xs-1
          button.centrar.form-group.btn.btn-default(title='Buscar', @click='search')
            i.fa.fa-search.fa-lg
    .box-principal
      .animated.bounceInDown
        h1.text-center
          | Listado de Clientes
        ul.nav.nav-pills
          li#todos(@click='todos')
            a Todos
          li#hoy(@click='hoy')
            a Hoy
          li#atrasados(@click='atrasados')
            a Atrasados
        hr.style-line
      gym-loader(v-show='isLoading')
      div.row(v-show='load')
        small.text-left.col-xs-6.col-sm-6.col-md-6 {{searchMessage}} 
        a.text-right.col-xs-6.col-sm-6.col-md-6(title='Generar PDF')
          i.fa.fa-file-pdf-o
      .card-deck.animated.fadeIn(v-show='!isLoading')
        .card.col-md-3.col-xs-12.col-sm-6(v-for="c in clients")
          img.card-img-top.img-circle.center-block(:src='c.ruta_imagen', alt='Card image cap', @click='setClient(c)')
          .card-block
            h3.card-title.text-center
              | {{c.nombre}}
            p.list-group-item
              strong.text-success Fecha de pago: 
              | {{c.fecha_pago | dateFormat}}
            p.list-group-item
              strong.text-success Mensualidad: 
              | {{c.mensualidad}}
            .options.text-center
              a(title='Realizar pago', @click='pago(c)')
                i.fa.fa-credit-card-alt.fa-2x
              a(title='Editar', @click='showModal = true')
                i.fa.fa-pencil.fa-2x(style='padding-left:10px;', @click='id = c.id_clientes; cedula = c.cedula; nombre = c.nombre; telefono = c.telefono; correo = c.correo;')
              a(title='Eliminar', @click='eliminar(c)')
                i.fa.fa-trash.fa-2x(style='padding-left:10px;')
    .modal-mask(v-if='Profile')
      .modal-wrapper.animated.bounceIn
        .modal-container
          profile-modal
    .modal-mask(name='modal', v-if='showModal')
      .modal-wrapper.animated.bounceIn
        .modal-container
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
            button#izquierda.btn.btn-default.col-xs-4.col-sm-4.col-md-4(@click='showModal = false; MenSelect = ""; image = "";') Cancelar  
    gym-footer(v-show='!isLoading')
</template>

<script>
import searchByName from '@/services/search'
import allClients from '@/services/all'
import todayClients from '@/services/today'
import lateClients from '@/services/late'
import deleteClients from '@/services/delete'
import updateClient from '@/services/updateClient'
import payClients from '@/services/pay'
import GymLoader from '@/components/shared/Loader.vue'
import GymFooter from '@/components/shared/Footer.vue'
import ProfileModal from '@/components/shared/ModalProfile.vue'
import mensualidad from '@/services/mensualidades'

const disableAll = () => {
  let li = document.getElementsByTagName('li')
  li[0].classList.remove('active')
  li[1].classList.remove('active')
  li[2].classList.remove('active')
}

const editarFecha = (fecha, intervalo, dma) => {
  var arrayFecha = fecha.split('-')
  var dia = arrayFecha[2]
  var mes = arrayFecha[1]
  var anio = arrayFecha[0]
  var fechaInicial = new Date(anio, mes - 1, dia)
  var fechaFinal = fechaInicial
  fechaFinal.setMonth(fechaInicial.getMonth() + parseInt(intervalo))
  dia = fechaFinal.getDate()
  mes = fechaFinal.getMonth() + 1
  anio = fechaFinal.getFullYear()
  dia = (dia.toString().length === 1) ? '0' + dia.toString() : dia
  mes = (mes.toString().length === 1) ? '0' + mes.toString() : mes
  return anio + '-' + mes + '-' + dia
}

export default {
  name: 'clients',

  components: {GymLoader, GymFooter, ProfileModal},

  data () {
    return {
      searchQuery: '',
      clients: [],
      isLoading: false,
      load: false,
      id: '',
      fecha: '',
      nombre: '',
      mensualidad: '',
      telefono: '',
      correo: '',
      mensualidades: [],
      showModal: false,
      MenSelect: '',
      image: '',
      cedula: '',
      prueba: '',
      SelectClient: {}
    }
  },
  computed: {
    searchMessage () {
      return `Encontrados ${this.clients.length}`
    },
    Profile () {
      return this.$store.state.profileModal
    }
  },
  created () {
    mensualidad.search()
      .then(res => {
        this.mensualidades = res
      })
  },
  methods: {
    setClient (c) {
      this.switch()
      this.clientSelect(c)
    },
    switch () {
      this.$store.commit('switchProfile')
    },
    clientSelect (cliente) {
      this.$store.commit('clientSelect', cliente)
    },
    search () {
      disableAll()
      if (!this.searchQuery) { return }
      this.isLoading = true
      this.load = false
      searchByName.search(this.searchQuery)
        .then(res => {
          this.clients = res
          this.isLoading = false
          this.load = true
          if (this.clients.length === 0) {
            swal({
              title: `😰`,
              html: $('<div>')
                .text(`No hay resultados con ${this.searchQuery}`),
              animation: false,
              timer: 1680,
              showConfirmButton: false,
              customClass: 'animated tada'
            }).then(
              function () {},
              function () {}
            )
          }
        })
    },
    todos () {
      let todos = document.getElementById('todos')
      if (todos.classList.value === 'active') { return }
      disableAll()
      this.isLoading = true
      this.load = false
      todos.classList.add('active')
      allClients.search()
        .then(res => {
          this.clients = res
          this.isLoading = false
          this.load = true
        })
    },
    hoy () {
      let hoy = document.getElementById('hoy')
      if (hoy.classList.value === 'active') { return }
      disableAll()
      this.isLoading = true
      this.load = false
      hoy.classList.add('active')
      todayClients.search()
        .then(res => {
          this.clients = res
          this.isLoading = false
          this.load = true
        })
    },
    atrasados () {
      let atrasados = document.getElementById('atrasados')
      if (atrasados.classList.value === 'active') { return }
      disableAll()
      this.isLoading = true
      this.load = false
      atrasados.classList.add('active')
      lateClients.search()
        .then(res => {
          this.clients = res
          this.isLoading = false
          this.load = true
        })
    },
    inicio () {
      disableAll()
      this.clients = []
      this.load = false
    },
    eliminar (c) {
      let self = this
      swal({
        title: '¿Esta seguro(a)?',
        text: 'El cliente sera eliminaro(a)',
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#DD6B55',
        confirmButtonText: 'Si, eliminar!',
        cancelButtonText: 'Cancelar',
        allowOutsideClick: false
      }).then(function () {
        deleteClients.search(c.id_clientes)
          .then(res => {
            swal({
              title: 'Eliminado con exito!',
              timer: 1200,
              showConfirmButton: false,
              type: 'success'
            }).then(
              function () {},
              function (dismiss) {
                if (dismiss === 'timer') {
                  self.clients = []
                  disableAll()
                }
              }
            )
          }).catch(err => err)
      },
      function (dismiss) {})
    },
    pago (c) {
      let newDate = editarFecha(c.fecha_pago, '+1', 'm')
      const hoy = new Date().toJSON().slice(0, 10)
      let self = this
      swal({
        title: '¿Esta seguro(a)?',
        text: 'Confirmar pago',
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#04498d',
        confirmButtonText: 'Confirmar!',
        cancelButtonText: 'Cancelar',
        allowOutsideClick: false
      }).then(function () {
        payClients.search(c.id_clientes, newDate, hoy, c.mensualidad, c.nombre)
          .then(res => {
            swal({
              title: 'Pago realizado con exito!',
              timer: 1200,
              showConfirmButton: false,
              type: 'success'
            }).then(
              function () {},
              function (dismiss) {
                if (dismiss === 'timer') {
                  self.clients = []
                  disableAll()
                }
              }
            )
          }).catch(err => err)
      },
      function (dismiss) {})
    },
    editar () {
      let self = this
      if (this.nombre && this.telefono && this.MenSelect) {
        updateClient.search(this.id, this.nombre, this.cedula, this.telefono, this.correo, this.MenSelect, this.image)
          .then(res => {
            self.showModal = false
            disableAll()
            swal({
              title: 'Editado con exito!',
              timer: 1200,
              showConfirmButton: false,
              type: 'success'
            }).then(
              function () {},
              function (dismiss) {
                if (dismiss === 'timer') {
                  self.clients = []
                  self.image = ''
                  self.MenSelect = ''
                  disableAll()
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
<style lang="scss">
img{
  width: 40%;
  margin: auto;
  display: block;
  margin-top: 20px;
  border-radius:5%;
}
#derecha{
  margin-right:4px;
}
#izquierda{
  margin-left:4px;
}

@media screen and (max-device-width : 480px) {
  .modal-container{
    width: auto;
    margin:15px !important;
    height: 0px auto;
    margin: 0px auto;
    padding: 20px 30px;
    background-color: #fff;
    border-radius: 6px;
  }
}
</style>