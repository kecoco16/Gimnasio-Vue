import gimnasioService from './gimnasio'

const mensualidades = {}

mensualidades.search = async () => {
  const getMensualidades = await gimnasioService.get(`mensualidades`, {})
  if (getMensualidades) {
    return getMensualidades.data
  } else {
    console.log(err => err)
  }
}

export default mensualidades
