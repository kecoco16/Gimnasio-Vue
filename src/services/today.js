import gimnasioService from './gimnasio'

const todayClients = {}

todayClients.search = () => gimnasioService.get(`today`, {})
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

export default todayClients
