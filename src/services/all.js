import gimnasioService from './gimnasio'

const allClients = {}

allClients.search = async () => {
  const clients = await gimnasioService.get(`all`, {})
  if (clients) {
    return clients.data
  } else {
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
  }
}
export default allClients
