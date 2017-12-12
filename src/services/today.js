import gimnasioService from './gimnasio'

const todayClients = {}

todayClients.search = async () => {
  const today = await gimnasioService.get(`today`, {})
  if (today) {
    return today.data
  } else {
    swal({
      type: 'error',
      title: 'Opps algo salio mal!',
      text: `${err}`,
      timer: 2000,
      showConfirmButton: false
    })
    setTimeout(() => {
      location.reload()
    }, 1800)
  }
}

export default todayClients
