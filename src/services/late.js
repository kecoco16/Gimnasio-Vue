import gimnasioService from './gimnasio'

const lateClients = {}

lateClients.search = async () => {
  const late = await gimnasioService.get(`late`, {})
  if (late) {
    return late.data
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

export default lateClients
