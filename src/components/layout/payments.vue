<template lang="pug">
  main
    gym-header.animated.fadeIn
    .box-principal
      .animated.bounceInDown
        h1.text-center
          | Listado de Pagos
        ul.nav.nav-pills
          li#hoy(@click='hoy')
            a Hoy
          li#filtrar(@click='filtrar')
            a Filtrar
          li#todos(@click='todos')
            a Todos
        hr.style-line
      gym-loader(v-show='isLoading')
      .box-payments.row(v-show='Load')
        paginate.paginate-list(name='payments', :list='payments', :per="10")
        .row
          strong.item.col-sm-1.col-xs-1.col-md-1  #
          strong.item.col-sm-5.col-xs-8.col-md-5 Nombre
          strong.item.col-sm-3.col-xs-2.col-md-3.hidden-xs Fecha
          strong.item.col-sm-3.col-xs-1.col-md-2 Monto
        .row.sombra(v-for="(p,i) in paginated('payments')")
          p.item.col-sm-1.col-xs-1.col-md-1 {{i+1}}
          a.item.col-sm-5.col-xs-8.col-md-5(@click="searchClient(p.id_clientes)") {{p.nombre}}
          p.item.col-sm-3.col-xs-2.col-md-3.hidden-xs {{p.fecha | dateFormat}}
          p.item.col-sm-3.col-xs-1.col-md-2 {{p.pago}}
        .col-md-4.col-md-offset-8.col-xs-12.col-sm-12
          paginate-links(for='payments',v-if="count > 10" :simple="{next: 'Siguiente',prev: 'Anterior'}", :classes="{'ul': 'pager','li': 'col-xs-6'}")
    .modal-mask(v-if='Profile')
      .modal-wrapper.animated.bounceIn
        .modal-container
          profile-modal
    .modal-mask(name='modal', v-if='showModal')
      .modal-wrapper.animated.bounceIn
        .modal-container-date
          h2.text-center Filtrar fechas de busqueda
          .box-form.row
            form(@submit.prevent='validateBeforeSubmit')
              .form-group.col-xs-6.col-sm-6.col-md-6
                h6 Desde
                input#desde.form-control(name='desde', type='date', v-validate="'required'", v-model="desde")
                i.fa.fa-warning(v-show="errors.has('desde')")
                span.text-danger(v-show="errors.has('desde')") {{ errors.first('desde') }}
              .form-group.col-xs-6.col-sm-6.col-md-6
                h6 Hasta
                input#hasta.form-control(name='hasta', type='date', v-validate="'required'", v-model="hasta")
                i.fa.fa-warning(v-show="errors.has('hasta')")
                span.text-danger(v-show="errors.has('hasta')") {{ errors.first('hasta') }}  
              button#derecha.btn.btn-primary.col-xs-offset-2.col-xs-4.col-sm-4.col-md-4(@click='buscar',type='submit') Buscar Pagos
            button#izquierda.btn.btn-default.col-xs-4.col-sm-4.col-md-4(@click='showModal = false; hasta = ""; desde = "";') Cancelar  


    gym-footer
</template>

<script>
import GymFooter from '@/components/shared/Footer.vue'
import GymHeader from '@/components/shared/Header.vue'
import AllPayments from '@/services/allPayments'
import TodayPayments from '@/services/todayPayments'
import PaymentsFilter from '@/services/PaymentsFilter'
import GymLoader from '@/components/shared/Loader.vue'
import ProfileModal from '@/components/layout/profile.vue'
import SearchById from '@/services/ClientById'

function disableAll () {
  let li = document.getElementsByTagName('li')
  li[0].classList.remove('active')
  li[1].classList.remove('active')
  li[2].classList.remove('active')
}

export default {
  name: 'payments',

  components: {GymFooter, GymHeader, AllPayments, TodayPayments, PaymentsFilter, GymLoader, ProfileModal, SearchById},

  data () {
    return {
      showModal: false,
      payments: [],
      isLoading: false,
      Load: false,
      client: {},
      paginate: ['payments'],
      desde: '',
      hasta: '',
      count: ''
    }
  },
  computed: {
    Profile () {
      return this.$store.state.profileModal
    }
  },
  methods: {
    validateBeforeSubmit () {
      this.$validator.validateAll().then(result => { })
    },
    todos () {
      let todos = document.getElementById('todos')
      if (todos.classList.value === 'active') { return }
      disableAll()
      todos.classList.add('active')
      this.isLoading = true
      AllPayments.search()
        .then(res => {
          this.payments = res
          this.count = res.length
          this.isLoading = false
          this.Load = true
          this.payments.reverse()
        })
    },
    filtrar () {
      this.showModal = true
      this.Load = false
      let filtrar = document.getElementById('filtrar')
      disableAll()
      filtrar.classList.add('active')
    },
    hoy () {
      this.Load = false
      let hoy = document.getElementById('hoy')
      if (hoy.classList.value === 'active') { return }
      disableAll()
      hoy.classList.add('active')
      this.isLoading = true
      TodayPayments.search()
        .then(res => {
          this.payments = res
          this.count = res.length
          this.isLoading = false
          this.Load = true
          this.payments.reverse()
        })
    },
    inicio () {
      disableAll()
      this.clients = []
      this.Load = false
    },
    buscar () {
      this.Load = false
      if (this.desde && this.hasta) {
        PaymentsFilter.search(this.desde, this.hasta)
          .then(res => {
            this.payments = res
            this.count = res.length
            this.isLoading = false
            this.Load = true
            this.payments.reverse()
            this.showModal = false
            this.desde = ''
            this.hasta = ''
          })
      }
    },
    searchClient (id) {
      SearchById.search(id)
        .then(res => {
          if (!res[0]) {
            swal({
              title: `😰`,
              html: $('<div>')
                .text(`Cliente no encontrado`),
              animation: false,
              timer: 1680,
              showConfirmButton: false,
              customClass: 'animated tada'
            }).then(
              function () {},
              function () {}
            )
          } else {
            this.$store.commit('clientSelect', res[0])
            this.$store.commit('switchPayments')
          }
        })
    }
  }
}
</script>

<style lang="scss" scoped>

#derecha{
  margin-right:4px;
}
#izquierda{
  margin-left:4px;
}
.box-payments{
  margin-left: auto;
  margin-right: auto;
  width: 65%;
}
.item{
  margin-bottom:10px;
  margin-top:10px;
}
.sombra{
  box-shadow: inset 0 0 1px rgba(0,0,0,.2);
}
.row.sombra:nth-child(2n+1){
  background:#FAFAFA;
}
.row.sombra:hover { 
  background:#f5f5f5;
}

.modal-container-date {
  width: 400px;
  height: auto;
  margin: 0px auto;
  padding: 20px 30px;
  background-color: #fff;
  border-radius: 6px;
}

@media screen and (max-device-width : 480px) {
  .modal-container-date {
    width: auto;
    margin:15px !important;
    height: auto;
    margin: 0px auto;
    padding: 20px 30px;
    background-color: #fff;
    border-radius: 6px;
  }
  .modal-container{
    width: auto;
    margin:15px !important;
    height: auto;
    margin: 0px auto;
    padding: 20px 30px;
    background-color: #fff;
    border-radius: 6px;
  }
  .box-payments{
    margin-left: auto;
    margin-right: auto;
    width: 95%;
  }
}



</style>