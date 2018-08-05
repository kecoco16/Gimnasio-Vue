<template lang="pug">
  main.col
    img.img-responsive.img-circle(:src='this.$store.state.clientSelect.ruta_imagen')
    .text-center
      h3 {{ this.$store.state.clientSelect.nombre }}
    .row.padding.list-group-item(title="Cedula")
      i.fa.fa-id-card.fa-lg.col-md-1.col-xs-1.col-sm-1
      p.col-md-10.col-xs-10.col-sm-10
        | {{ this.$store.state.clientSelect.cedula }}
    .row.padding.list-group-item(title="Correo")
      i.fa.fa-envelope-o.fa-lg.col-md-1.col-xs-1.col-sm-1
      p.col-md-10.col-xs-10.col-sm-10
        | {{ this.$store.state.clientSelect.correo }}
    .row.padding.list-group-item(title="Telefono")
      i.fa.fa-phone.fa-lg.col-md-1.col-xs-1.col-sm-1
      p.col-md-10.col-xs-10.col-sm-10
        | {{ this.$store.state.clientSelect.telefono }}
    .row.padding.list-group-item(title="mensualidad")
      i.fa.fa-money.fa-lg.col-md-1.col-xs-1.col-sm-1
      p.col-md-10.col-xs-10.col-sm-10
        | {{ this.$store.state.clientSelect.mensualidad }}
    .row.padding.list-group-item(title="Fecha de inicio")
      i.fa.fa-calendar.fa-lg.col-md-1.col-xs-1.col-sm-1
      p.col-md-10.col-xs-10.col-sm-10
        | {{ this.$store.state.clientSelect.fecha_inicio | dateFormat }}
    .row.padding.list-group-item.last(title="Fecha de pago")
      i.fa.fa-calendar.fa-lg.col-md-1.col-xs-1.col-sm-1
      p.col-md-10.col-xs-10.col-sm-10
        | {{ this.$store.state.clientSelect.fecha_pago | dateFormat }}  
    button.btn.btn-primary.btn-sm.btn-block(@click='hide') Cerrar
</template>

<script>
export default {
  methods: {
    hide () {
      this.$store.commit('switchProfile')
    }
  }
}
</script>

<style lang="css" scoped>
  img{
    width: 200px;
    margin: 0 auto;
  }

  .padding{
    padding-bottom:0px;
  }

  .last {
    margin-bottom:10px;
  }

  @media screen and (max-device-width : 480px) {
    img{
      width: 160px;
      padding: 0 auto;
    }
  }
</style>