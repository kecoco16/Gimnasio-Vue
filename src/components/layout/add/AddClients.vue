<template lang="pug">
  main
    .box-form
      form(@submit.prevent='validateBeforeSubmit')
        .form-group
          i.fa.fa-user
          label.control-label &nbsp Nombre 
          input.form-control(name='nombre', v-model='name', v-validate="'required|alpha_spaces'", type='text', placeholder='nombre')
          i.fa.fa-warning(v-show="errors.has('nombre')")
          span.text-danger(v-show="errors.has('nombre')") {{ errors.first('nombre') }}
        .form-group
          i.fa.fa-id-card-o
          label.control-label &nbsp Cedula
          input.form-control(name='cedula', v-model='idNumber', v-validate="'required|min:9|numeric'", type='text', placeholder='cedula')
          i.fa.fa-warning(v-show="errors.has('cedula')")
          span.text-danger(v-show="errors.has('cedula')") {{ errors.first('cedula') }}
        .form-group
          i.fa.fa-phone
          label.control-label &nbsp Telefono
          input.form-control(name='telefono', v-model='phone', v-validate="'required|min:8|numeric'", type='text', placeholder='telefono')
          i.fa.fa-warning(v-show="errors.has('telefono')")
          span.text-danger(v-show="errors.has('telefono')") {{ errors.first('telefono') }}
        .form-group
          i.fa.fa-money
          Label.control-label &nbsp Mensualidad
          select.form-control(name='mensualidad', v-validate.initial="'required'", v-model='membershipId')
            option(value="")
            option(v-for='m in memberships', :value='m.id') {{m.name}} ₡{{m.amount}}
        .form-group
          i.fa.fa-envelope-o
          label.control-label &nbsp Correo
          input.form-control(name='correo', v-model='email', v-validate="'required|email'", type='text', placeholder='correo')
          i.fa.fa-warning(v-show="errors.has('correo')")
          span.text-danger(v-show="errors.has('correo')") {{ errors.first('correo') }}
        .form-group
          i.fa.fa-transgender
          label.control-label(:class="{ 'error': errors.has('sexo') }")  &nbsp Sexo &nbsp
          i.fa.fa-warning(v-show="errors.has('sexo')")
          span.text-danger(v-show="errors.has('sexo')") {{ errors.first('sexo') }}
          br
          label.radio-inline
            input(name='sexo', v-validate="'required|in:M,W'",v-model='gender', value='M', type='radio')
            i.fa.fa-male
            |&nbsp Masculino
          label.radio-inline
            input(name='sexo', value='W', type='radio', v-model='gender')
            i.fa.fa-female
            |&nbsp Femenino
        .form-group
          input(name='imagen', type='file', @change='onFileChange', v-validate="'image'")
          img.animated.fadeIn(:src='image', v-show='image')
        button.btn.btn-primary.btn-block(type='submit', @click='newClient') Agregar 
</template>

<script>
import { confirmModal, successModal } from '@/services/createOrUpdateClient'
import memberships from '@/services/getMemberships'
import { requestError } from '@/services/errorMessages'
import Swal from 'sweetalert2'
import moment from 'moment'

export default {
  name: 'app',

  data () {
    return {
      idNumber: '',
      name: '',
      gender: '',
      phone: '',
      email: '',
      membershipId: '',
      memberships: [],
      image: ''
    }
  },
  async created () {
    const getMemberships = await memberships()
    if (getMemberships) {
      this.memberships = getMemberships
    }
  },
  methods: {
    async validateBeforeSubmit () {
      const validate = await this.$validator.validateAll()
      if (!validate) {
        swal({
          type: 'error',
          html: $('<div>')
            .addClass('.animated.fadeIn')
            .text('Error! Faltan o hay datos incorrectos'),
          animation: false,
          timer: 1500,
          showConfirmButton: false
        }).catch(Swal.noop)
      }
    },
    onFileChange (e) {
      const files = e.target.files || e.dataTransfer.files
      if (!files.length) { return }
      this.createImage(files[0])
    },
    createImage (file) {
      const reader = new FileReader()
      const vm = this
      reader.onload = (e) => {
        vm.image = e.target.result
      }
      reader.readAsDataURL(file)
    },
    async newClient () {
      const response = await confirmModal()
      if (!response) {
        return
      }
      const payload = {
        idNumber: this.idNumber,
        name: this.name,
        gender: this.gender,
        phone: this.phone,
        email: this.email,
        profileImageRoute: 'profile.png',
        payDay: moment().add(1, 'month'),
        membershipId: this.membershipId.toString()
      }

      const client = await this.$store.dispatch(
        'updateOrCreatedClient',
        payload
      )

      if (client.message) {
        return requestError()
      }

      return successModal()
    }
  }
}
</script>
<style lang='css' scoped>
  img{
    width: 50%;
    margin: auto;
    display: block;
    margin-top: 20px;
    border-radius:5%;
  }
</style>
