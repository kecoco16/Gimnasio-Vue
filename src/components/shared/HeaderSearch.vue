<template lang="pug">
  nav.navbar-inverse.navbar-fixed-top.animated.fadeIn
    .row.container-fluid
      .col-xs-3.col-sm-4.col-md-5
      router-link(to="/home")
        a.navbar-brand(@click='inicio')
        i.fa.fa-home.fa-fw(@click='inicio')
        strong.hidden-xs &nbsp Inicio 
      .row.centrar.col-xs-6.col-sm-4.col-md-2.text-center
      input#buscar.form-control(placeholder='Buscar aquí...', autofocus='' v-model="searchQuery", @keyup.enter="search")
      .col.col-xs-1
      button.centrar.form-group.btn.btn-default(title='Buscar', @click='search')
        i.fa.fa-search.fa-lg
</template>  

<script>
  export default {
    name: 'view',
    data() {
      return {}
    },
    computed: {},
    mounted() {},
    methods: {}
  }
</script>


<style>

</style>