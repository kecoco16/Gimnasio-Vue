<template lang='pug'>
  .card-deck
    .card.col-md-3.col-xs-12.col-sm-6(v-for='c in clients')
      .card-block
        img.clientImgProfile.card-img-top.img-circle.center-block(
          @click='profileModal(c)',
          :src="'src/img/'+c.profileImageRoute"
        )
        h3.text-center
          | {{c.name}}
        .list-group-item
          strong.text-success Fecha de pago: 
          | {{c.payDay}}
        .list-group-item
          strong.text-success Mensualidad: 
          | {{c['membership.amount']}}
        .clientOptions.text-center
          a(title='Realizar pago', @click='payment(c)')
            i.fa.fa-credit-card-alt.fa-2x
          a(title='Editar', @click='editar(c)')
            i.fa.fa-pencil.fa-2x(style='padding-left:10px;')
          a(title='Eliminar', @click='eliminar(c)')
            i.fa.fa-trash.fa-2x(style='padding-left:10px;')    
</template>

<script>
  import { confirmModal, successModal } from '@/services/clientPayment'
  import { requestError } from '@/services/errorMessages'

  export default {
    name: 'ClientCard',
    computed: {
      clients () {
        return this.$store.state.clientsList
      }
    },
    methods: {
      async payment (c) {
        const response = await confirmModal()
        if (!response) {
          return
        }

        const payload = {
          'amount': c['membership.amount'],
          'clientId': c.id,
          'userId': 1
        }

        const payment = await this.$store.dispatch(
          'payment',
          payload
        )

        if (payment.message) {
          return requestError()
        }

        return successModal()
      },
      async eliminar (c) {
        // const eliminar = await swal({
        //   title: '¿Esta seguro(a)?',
        //   text: 'El cliente sera eliminaro(a)',
        //   type: 'warning',
        //   showCancelButton: true,
        //   confirmButtonColor: '#DD6B55',
        //   confirmButtonText: 'Si, eliminar!',
        //   cancelButtonText: 'Cancelar',
        //   allowOutsideClick: false
        // })
        // if (eliminar) {
        //   deleteClients.search(c.id_clientes)
        //   this.$store.commit('pillActive', 'disable')
        //   this.$store.commit('clientsList', [])
        //   swal({
        //     title: 'Eliminado con exito!',
        //     timer: 1200,
        //     showConfirmButton: false,
        //     type: 'success'
        //   })
        // }
      },
      editar (c) {
        // this.$store.commit('switchEdit')
        // this.$store.commit('clientSelect', c)
      },
      profileModal (c) {
        // this.$store.commit('clientSelect', c)
        // this.$store.commit('switchPayments')
      }
    }
  }
</script>
