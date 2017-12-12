import gimnasioService from './gimnasio'

const searchByName = {}

searchByName.search = async q => {
  const search = await gimnasioService.get(`clients/${q}`, {})
  if (search) {
    return search.data
  } else {
    swal({
      title: 'Oops..Algo salio mal!',
      text: `${err}`,
      type: 'error',
      confirmButtonColor: '#3085d6',
      confirmButtonText: 'Aceptar!'
    })
    setTimeout(() => {
      location.reload()
    }, 1800)
  }
}

export default searchByName
