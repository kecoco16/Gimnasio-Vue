import gimnasioService from './gimnasio'

const mensualidades = {}

mensualidades.search = () => gimnasioService.get(`mensualidades`, {})
  .then(res => res.data)
  .catch(err => err)

export default mensualidades
