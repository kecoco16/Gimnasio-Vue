<template lang="pug">
  main
    h2.text-center Filtrar fechas de busqueda
    .box-form.row
      form(@submit.prevent='validateBeforeSubmit')
        .form-group.col-xs-6.col-sm-6.col-md-6
          h6 Desde
          input#desde.form-control(name='desde', type='date', v-validate="'required'", v-model="minDate")
          i.fa.fa-warning(v-show="errors.has('desde')")
          span.text-danger(v-show="errors.has('desde')") {{ errors.first('desde') }}
        .form-group.col-xs-6.col-sm-6.col-md-6
          h6 Hasta
          input#hasta.form-control(name='hasta', type='date', v-validate="'required'", v-model="maxDate")
          i.fa.fa-warning(v-show="errors.has('hasta')")
          span.text-danger(v-show="errors.has('hasta')") {{ errors.first('hasta') }}  
        button#derecha.btn.btn-primary.col-xs-offset-2.col-xs-4.col-sm-4.col-md-4(@click='filter',type='submit') Buscar Pagos
      button#izquierda.btn.btn-default.col-xs-4.col-sm-4.col-md-4(@click='closeModal') Cancelar
</template>

<script>
import { requestError } from '@/services/errorMessages'

export default {
  name: 'modalDateFilters',
  data () {
    return {
      minDate: '',
      maxDate: ''
    }
  },
  methods: {
    validateBeforeSubmit () {
      this.$validator.validateAll()
    },
    async filter () {
      if (this.minDate && this.maxDate) {
        const payload = {
          minDate: this.minDate,
          maxDate: this.maxDate
        }
        console.log(payload)
        const payments = await this.$store.dispatch('paymentsByDate', payload)

        if (payments.message) {
          this.$store.commit('pillActive', null)
          return requestError()
        }
      }
    },
    closeModal () {
      this.$store.commit('modalState', false)
    }
  }
}
</script>


<style lang="css" scoped>
  #derecha{
    margin-right:4px;
  }
  #izquierda{
    margin-left:4px;
  }
</style>
