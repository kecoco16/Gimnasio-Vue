import gimnasioService from './gimnasio'

const AddMensualidad = {}

AddMensualidad.search = (nombre, mensualidad) => gimnasioService.post('newMensualidad', { 'nombre': nombre, 'mensualidad': mensualidad })
  .then(res => res.data)
  .catch(err => err)

export default AddMensualidad
