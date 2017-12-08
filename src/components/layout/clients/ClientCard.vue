<template lang="pug">
  .card-deck
    .card.col-md-3.col-xs-12.col-sm-6(v-for="c in clients")
      .card-block
        img.card-img-top.img-circle.center-block(:src='c.ruta_imagen', alt='Card image cap')
        h3.card-title.text-center
          | {{c.nombre}}
        p.list-group-item
          strong.text-success Fecha de pago: 
          | {{c.fecha_pago | dateFormat}}
        p.list-group-item
          strong.text-success Mensualidad: 
          | {{c.mensualidad}}
        .options.text-center
          a(title='Realizar pago')
            i.fa.fa-credit-card-alt.fa-2x
          a(title='Editar')
            i.fa.fa-pencil.fa-2x(style='padding-left:10px;')
          a(title='Eliminar')
            i.fa.fa-trash.fa-2x(style='padding-left:10px;')    
</template>

<script>
  export default {
    name: 'ClientCard',
    computed: {
      clients () {
        return this.$store.state.clientsList
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
</style>