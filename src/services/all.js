import gimnasioService from './gimnasio'

const allClients = {}

allClients.search = () => gimnasioService.get(`all`, {})
  .then(res => res.data)
  .catch(err => {
    swal({
      type: 'error',
      title: 'Opps algo salio mal!',
      text: `${err}`,
      timer: 2000,
      showConfirmButton: false
    })
    setTimeout(function () {
      location.reload()
    }, 1800)
  })
export default allClients
