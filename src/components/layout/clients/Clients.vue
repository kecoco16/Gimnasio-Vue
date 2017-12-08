<template lang="pug">
  main
    gym-nav-bar
    .box-principal
      .animated.bounceInDown
        gym-add-pills
      gym-loader(v-show='isLoading')
      div.row(v-show='load')
        small.text-left.col-xs-6.col-sm-6.col-md-6 {{searchMessage}} 
        a.text-right.col-xs-6.col-sm-6.col-md-6(title='Generar PDF')
          i.fa.fa-file-pdf-o
      gym-client-card
    .modal-mask(v-if='Profile')
      .modal-wrapper.animated.bounceIn
        .modal-container
          profile-modal
    .modal-mask(name='modal', v-if='showModal')
      .modal-wrapper.animated.bounceIn
        .modal-container
          .box-form.row
            form(@submit.prevent='validateBeforeSubmit')
              .form-group
                label.control-label Nombre
                input.form-control(name='nombre', v-model='nombre', v-validate="'required|alpha_spaces'", type='text', placeholder='nombre')
                i.fa.fa-warning(v-show="errors.has('nombre')")
                span.text-danger(v-show="errors.has('nombre')") {{ errors.first('nombre') }}
              .form-group
                label.control-label Telefono
                input.form-control(name='telefono', v-model='telefono', v-validate="'required|min:8|numeric'", type='text', placeholder='telefono')
                i.fa.fa-warning(v-show="errors.has('telefono')")
                span.text-danger(v-show="errors.has('telefono')") {{ errors.first('telefono') }}
              .form-group
                Label.control-label Mensualidad
                select.form-control(name='mensualidad', v-validate.initial="'required'", v-model='MenSelect')
                  option(value="")
                  option(v-for='m in mensualidades', :value='m.id_mensualidad') {{m.tipo}} ₡{{m.mensualidad}}
              .form-group
                label.control-label Correo
                input.form-control(name='correo', v-model='correo', v-validate="'required|email'", type='text', placeholder='correo')
                i.fa.fa-warning(v-show="errors.has('correo')")
                span.text-danger(v-show="errors.has('correo')") {{ errors.first('correo') }}
              .form-group
                input(name='imagen', type='file', @change='onFileChange', v-validate="'image'")
                img.animated.fadeIn(:src='image', v-show='image')
              button#derecha.btn.btn-primary.col-xs-offset-2.col-xs-4.col-sm-4.col-md-4(type='submit', @click='editar') Editar 
            button#izquierda.btn.btn-default.col-xs-4.col-sm-4.col-md-4(@click='showModal = false; MenSelect = ""; image = "";') Cancelar  
    gym-footer(v-show='!isLoading')
</template>

<script>
import GymLoader from '@/components/shared/Loader.vue'
import GymFooter from '@/components/shared/Footer.vue'
import ProfileModal from '@/components/shared/ModalProfile.vue'
import GymAddPills from './ClientsPills.vue'
import GymNavBar from './ClientNavBar.vue'
import GymClientCard from './ClientCard.vue'

export default {
  name: 'clients',

  components: {GymLoader, GymFooter, ProfileModal, GymAddPills, GymNavBar, GymClientCard},

  data () {
    return {
      isLoading: false,
      load: false,
      searchMessage: '',
      Profile: false,
      showModal: false
    }
  },
  methods: {
  }
}
</script>
<style lang="scss">
@media screen and (max-device-width : 480px) {
  .modal-container{
    width: auto;
    margin:15px !important;
    height: 0px auto;
    margin: 0px auto;
    padding: 20px 30px;
    background-color: #fff;
    border-radius: 6px;
  }
}
</style>