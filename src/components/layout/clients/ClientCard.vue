<template lang="pug">
  .card-deck
    .card.col-md-3.col-xs-12.col-sm-6
      .card-block
        img.card-img-top.img-circle.center-block(src='../../../assets/logo.png', alt='Card image cap')
        h3.card-title.text-center
          | test
        p.list-group-item
          strong.text-success Fecha de pago: 
          | 28/12/95
        p.list-group-item
          strong.text-success Mensualidad: 
          | test
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
    name: 'ClientCard'
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