<template lang="pug">
  main
    .box-form  
      form(@submit.prevent='validateBeforeSubmit')
        .form-group
          i.fa.fa-id-card-o
          label.control-label &nbsp Nombre
          input.form-control(name='nombre', v-model='name', v-validate="'required|alpha_spaces'", type='text', placeholder='nombre')
          i.fa.fa-warning(v-show="errors.has('nombre')")
          span.text-danger(v-show="errors.has('nombre')") {{ errors.first('nombre') }}
        .form-group
          i.fa.fa-money
          label.control-label &nbsp Monto mensualidad
          input.form-control(name='mensualidad', v-model='membership', v-validate="'required|numeric'", type='text', placeholder='0')
          i.fa.fa-warning(v-show="errors.has('mensualidad')")
          span.text-danger(v-show="errors.has('mensualidad')") {{ errors.first('mensualidad') }}
        button.btn.btn-primary.btn-block(type='submit', @click='newMemberhip') Agregar 
</template>

<script>
import { confirmModal, successModal } from '@/services/createOrUpdateMembership'
import { requestError } from '@/services/errorMessages'

export default {
  name: 'app',
  data () {
    return {
      name: '',
      membership: ''
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
    async newMemberhip () {
      if (this.name && this.membership) {
        const response = await confirmModal()
        if (!response) {
          return
        }

        const payload = {
          name: this.name,
          amount: this.membership
        }

        const membership = await this.$store.dispatch(
          'updateOrCreatedMembership',
          payload
        )

        if (membership.message) {
          return requestError()
        }

        return successModal()
      }
    }
  }
}
</script> 