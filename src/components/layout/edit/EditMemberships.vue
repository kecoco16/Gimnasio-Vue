<template lang="pug">
  main
    .box-payments.row(v-if='list.length > 0')
      paginate.paginate-list(name='list', :list='list', :per="10", ref="paginator")
      .row
        strong.item.col-sm-1.col-xs-1.col-md-1  #
        strong.item.col-sm-5.col-xs-8.col-md-5 Nombre
        strong.item.col-sm-3.col-xs-1.col-md-2 Monto
      .row.sombra(v-for="(m,i) in paginated('list')")
        p.item.col-sm-1.col-xs-1.col-md-1 {{i+1}}
        a.item.col-sm-5.col-xs-8.col-md-5(@click="searchMembreshipt(m.id)") {{m.name}}
        p.item.col-sm-3.col-xs-1.col-md-2 {{m.amount}}
      .col-md-4.col-md-offset-8.col-xs-12.col-sm-12
        paginate-links(for='list',v-if="list.length > 10" :simple="{next: 'Siguiente',prev: 'Anterior'}", :classes="{'ul': 'pager','li': 'col-xs-6'}")
</template>

<script>
import memberships from '@/services/getMemberships'

export default {
  data () {
    return {
      paginate: ['list'],
      memberships: []
    }
  },
  async created () {
    const getMemberships = await memberships()
    if (getMemberships) {
      this.memberships = getMemberships
    }
  },
  computed: {
    list () {
      this.goToFirstPage()
      return this.memberships
    }
  },
  methods: {
    async searchMembreshipt (id) {
      console.log(id)
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
