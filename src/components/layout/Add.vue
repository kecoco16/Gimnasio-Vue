<template lang="pug">
  main
    gym-header
    .box-principal.animated.bounceInDown
      h1.text-center
        | Agregar
      ul.nav.nav-pills
        li#cliente(@click='cliente')
          a Cliente
        li#mensualidad(@click='mensualidad')
          a Mensualidad
        li#usuario(@click='usuario')
          a Usuario
      hr.style-line
    .box-form
      gym-add-clients.animated.fadeIn(v-show='isClients')
      gym-add-mensualidad.animated.fadeIn(v-show='isMensualidad')
      gym-add-users.animated.fadeIn(v-show='isUsers')
    gym-footer
</template>

<script>
import GymFooter from '@/components/shared/Footer.vue'
import GymHeader from '@/components/shared/Header.vue'
import GymAddClients from '@/components/layout/AddClients.vue'
import GymAddMensualidad from '@/components/layout/AddMensualidad.vue'
import GymAddUsers from '@/components/layout/AddUsers.vue'

const disableAll = () => {
  let li = document.getElementsByTagName('li')
  li[0].classList.remove('active')
  li[1].classList.remove('active')
  li[2].classList.remove('active')
}

export default {
  name: 'add',

  components: {GymFooter, GymHeader, GymAddClients, GymAddMensualidad, GymAddUsers},

  data () {
    return {
      isLoading: false,
      correo: '',
      nombre: '',
      telefono: '',
      sexo: '',
      isClients: false,
      isMensualidad: false,
      isUsers: false
    }
  },
  methods: {
    cliente () {
      let cliente = document.getElementById('cliente')
      if (cliente.classList.value === 'active') { return }
      disableAll()
      this.isLoading = true
      cliente.classList.add('active')
      this.isClients = true
      this.isMensualidad = false
      this.isUsers = false
    },
    mensualidad () {
      let mensualidad = document.getElementById('mensualidad')
      if (mensualidad.classList.value === 'active') { return }
      disableAll()
      this.isLoading = true
      mensualidad.classList.add('active')
      this.isClients = false
      this.isMensualidad = true
      this.isUsers = false
    },
    usuario () {
      let usuario = document.getElementById('usuario')
      if (usuario.classList.value === 'active') { return }
      disableAll()
      this.isLoading = true
      usuario.classList.add('active')
      this.isClients = false
      this.isMensualidad = false
      this.isUsers = true
    }
  }
}
</script> 
<style lang="scss" scoped>
.box-form{
  margin-left: auto;
  margin-right: auto;
  width: 35%;
}
@media screen and (max-device-width : 480px) {
  .box-form{
    margin-left: auto;
    margin-right: auto;
    width: 70%;
  }
} 

</style>