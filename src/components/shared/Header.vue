<template lang="pug">
  nav.navbar-inverse.navbar-fixed-top.animated.fadeIn
      .row.container-fluid
        .col-xs-3.col-sm-4.col-md-5
          router-link(to="/home")
            a.navbar-brand
              i.fa.fa-home.fa-fw
              strong.hidden-xs &nbsp Inicio 
</template>