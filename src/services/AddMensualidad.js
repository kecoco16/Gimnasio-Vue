import gimnasioService from './gimnasio'

const AddMensualidad = {}

AddMensualidad.search = async (nombre, mensualidad) => {
  const newMensualidad = await gimnasioService.post('newMensualidad', {
    'nombre': nombre,
    'mensualidad': mensualidad
  })
  if (mensualidad) {
    return newMensualidad.data
  } else {
    console.log(err => err)
  }
}

export default AddMensualidad
