<template lang="pug">
  main
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
      button#izquierda.btn.btn-default.col-xs-4.col-sm-4.col-md-4(@click='closeModal') Cancelar
</template>

<script>
import PaymentsFilter from '@/services/PaymentsFilter'

export default {
  name: 'modalDateFilters',
  data () {
    return {
      desde: '',
      hasta: ''
    }
  },
  methods: {
    validateBeforeSubmit () {
      this.$validator.validateAll()
    },
    async buscar () {
      if (this.desde && this.hasta) {
        this.$store.commit('modalState', false)
        this.$store.commit('isLoading', true)
        const payments = await PaymentsFilter.search(this.desde, this.hasta)
        if (payments) {
          this.$store.commit('isLoading', false)
          this.$store.commit('paymentsSelect', payments.reverse())
          this.desde = ''
          this.hasta = ''
        }
      }
    },
    closeModal () {
      this.$store.commit('modalState', false)
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
</style>