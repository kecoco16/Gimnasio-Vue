import gimnasioService from './gimnasio'

const searchByName = {}

searchByName.search = q => gimnasioService.get(`clients/${q}`, {})
  .then(res => res.data)
  .catch(err => {
    swal({
      title: 'Oops..Algo salio mal!',
      text: `${err}`,
      type: 'error',
      confirmButtonColor: '#3085d6',
      confirmButtonText: 'Aceptar!'
    }).then(function () {
      location.reload()
    })
  })

export default searchByName
