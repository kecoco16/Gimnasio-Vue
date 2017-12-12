import gimnasioService from './gimnasio'

const searchById = {}

searchById.search = async (q) => {
  const client = await gimnasioService.get(`client/${q}`, {})
  if (client) {
    return client.data
  } else {
    swal({
      title: 'Oops..Algo salio mal!',
      text: `${err}`,
      type: 'error',
      confirmButtonColor: '#3085d6',
      confirmButtonText: 'Aceptar!'
    })
    location.reload()
  }
}

export default searchById
