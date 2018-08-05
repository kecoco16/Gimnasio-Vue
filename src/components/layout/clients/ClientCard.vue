<template lang="pug">
  .card-deck
    .card.col-md-3.col-xs-12.col-sm-6(v-for="c in clients")
      .card-block
        img.card-img-top.img-circle.center-block(@click='profileModal(c)', :src='c.ruta_imagen', alt='Card image cap')
        h3.card-title.text-center
          | {{c.nombre}}
        p.list-group-item
          strong.text-success Fecha de pago: 
          | {{c.fecha_pago | dateFormat}}
        p.list-group-item
          strong.text-success Mensualidad: 
          | {{c.mensualidad}}
        .options.text-center
          a(title='Realizar pago', @click='pago(c)')
            i.fa.fa-credit-card-alt.fa-2x
          a(title='Editar', @click='editar(c)')
            i.fa.fa-pencil.fa-2x(style='padding-left:10px;')
          a(title='Eliminar', @click='eliminar(c)')
            i.fa.fa-trash.fa-2x(style='padding-left:10px;')    
</template>

<script>
  import payClients from '@/services/pay'
  import deleteClients from '@/services/delete'

  const editarFecha = (fecha, intervalo, dma) => {
    let arrayFecha = fecha.split('-')
    let dia = arrayFecha[2]
    let mes = arrayFecha[1]
    let anio = arrayFecha[0]
    let fechaInicial = new Date(anio, mes - 1, dia)
    let fechaFinal = fechaInicial
    fechaFinal.setMonth(fechaInicial.getMonth() + parseInt(intervalo))
    dia = fechaFinal.getDate()
    mes = fechaFinal.getMonth() + 1
    anio = fechaFinal.getFullYear()
    dia = (dia.toString().length === 1) ? '0' + dia.toString() : dia
    mes = (mes.toString().length === 1) ? '0' + mes.toString() : mes
    return anio + '-' + mes + '-' + dia
  }
  export default {
    name: 'ClientCard',
    computed: {
      clients () {
        return this.$store.state.clientsList
      }
    },
    methods: {
      async pago (c) {
        const newDate = editarFecha(c.fecha_pago, '+1', 'm')
        const hoy = new Date().toJSON().slice(0, 10)
        const pago = await swal({
          title: '¿Esta seguro(a)?',
          text: 'Confirmar pago',
          type: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#04498d',
          confirmButtonText: 'Confirmar!',
          cancelButtonText: 'Cancelar',
          allowOutsideClick: false
        })
        if (pago) {
          payClients.search(c.id_clientes, newDate, hoy, c.mensualidad, c.nombre)
          this.$store.commit('pillActive', 'disable')
          this.$store.commit('clientsList', [])
          swal({
            title: 'Pago realizado con exito!',
            timer: 1200,
            showConfirmButton: false,
            type: 'success'
          })
        }
      },
      async eliminar (c) {
        const eliminar = await swal({
          title: '¿Esta seguro(a)?',
          text: 'El cliente sera eliminaro(a)',
          type: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#DD6B55',
          confirmButtonText: 'Si, eliminar!',
          cancelButtonText: 'Cancelar',
          allowOutsideClick: false
        })
        if (eliminar) {
          deleteClients.search(c.id_clientes)
          this.$store.commit('pillActive', 'disable')
          this.$store.commit('clientsList', [])
          swal({
            title: 'Eliminado con exito!',
            timer: 1200,
            showConfirmButton: false,
            type: 'success'
          })
        }
      },
      editar (c) {
        this.$store.commit('switchEdit')
        this.$store.commit('clientSelect', c)
      },
      profileModal (c) {
        this.$store.commit('clientSelect', c)
        this.$store.commit('switchPayments')
      }
    }
  }
</script>

<style lang="css">
img{
  width: 40%;
  margin: auto;
  display: block;
  margin-top: 20px;
  border-radius:5%;
}
</style>