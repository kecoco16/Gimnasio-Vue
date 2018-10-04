<template lang="pug">
  main
    .box-payments.row(v-if='list.length > 0')
      paginate.paginate-list(name='list', :list='list', :per="10", ref="paginator")
      .row
        strong.item.col-sm-1.col-xs-1.col-md-1  #
        strong.item.col-sm-5.col-xs-8.col-md-5 Nombre
        strong.item.col-sm-3.col-xs-2.col-md-3.hidden-xs Fecha
        strong.item.col-sm-3.col-xs-1.col-md-2 Monto
      .row.sombra(v-for="(p,i) in paginated('list')")
        p.item.col-sm-1.col-xs-1.col-md-1 {{i+1}}
        a.item.col-sm-5.col-xs-8.col-md-5(@click="searchClient(p.id_clientes)") {{p['client.name']}}
        p.item.col-sm-3.col-xs-2.col-md-3.hidden-xs {{p.date}}
        p.item.col-sm-3.col-xs-1.col-md-2 {{p.amount}}
      .col-md-4.col-md-offset-8.col-xs-12.col-sm-12
        paginate-links(for='list',v-if="list.length > 10" :simple="{next: 'Siguiente',prev: 'Anterior'}", :classes="{'ul': 'pager','li': 'col-xs-6'}")  
    .modal-mask(v-if='Profile')
      .modal-wrapper.animated.bounceIn
        .modal-container
          profile-modal
</template>

<script>
import ProfileModal from '@/components/shared/ModalProfile.vue'
import SearchById from '@/services/ClientById'

export default {
  components: {ProfileModal},

  data () {
    return {
      paginate: ['list']
    }
  },
  created () {
    this.$store.commit('paymentsSelect', [])
  },
  computed: {
    Profile () {
      return this.$store.state.profileModal
    },
    list () {
      this.goToFirstPage()
      return this.$store.state.paymentsList
    }
  },
  methods: {
    async searchClient (id) {
      const search = await SearchById.search(id)
      if (!search[0]) {
        swal({
          title: `😰`,
          html: $('<div>')
            .text(`Cliente no encontrado`),
          animation: false,
          timer: 1680,
          showConfirmButton: false,
          customClass: 'animated tada'
        })
      } else {
        this.$store.commit('clientSelect', search[0])
        this.$store.commit('switchPayments')
      }
    },
    goToFirstPage () {
      if (this.$refs.paginator) {
        this.$refs.paginator.goToPage(1)
      }
    }
  }
}
</script>

<style lang="css" scoped>
.box-payments{
  margin-left: auto;
  margin-right: auto;
  width: 70%;
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

@media screen and (max-device-width : 480px) {
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
