<template lang='pug'>
  .card-deck
    .card.col-md-3.col-xs-12.col-sm-6(v-for='c in clients')
      .card-block
        img.clientImgProfile.card-img-top.img-circle.center-block(
          @click='profileModal(c)',
          :src='baseUrl+c.profileImageRoute'
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
          a(title='Editar', @click='editClient(c)')
            i.fa.fa-pencil.fa-2x(style='padding-left:10px;')
          a(title='Eliminar', @click='deleteClient(c)')
            i.fa.fa-trash.fa-2x(style='padding-left:10px;')
</template>

<script>
  import { confirmModal, successModal } from '@/services/clientPayment'
  import { confirm, success } from '@/services/deleteClient'
  import { requestError } from '@/services/errorMessages'
  import { constants } from '../../../services/config'

  export default {
    name: 'ClientCard',
    computed: {
      clients () {
        return this.$store.state.clientsList
      },
      baseUrl () {
        return constants.baseUploadsURL
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
      async deleteClient (c) {
        const response = await confirm()
        if (!response) {
          return
        }

        const payload = {
          id: c.id
        }

        const client = await this.$store.dispatch(
          'delete',
          payload
        )

        if (client) {
          return requestError()
        }

        return success()
      },
      editClient (client) {
        this.$store.dispatch(
          'editClientModal',
          { client }
        )
      },
      profileModal (client) {
        this.$store.dispatch(
          'profileClientModal',
          { client }
        )
      }
    }
  }
</script>
