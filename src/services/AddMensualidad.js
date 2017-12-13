import gimnasioService from './gimnasio'

const AddMensualidad = {}

AddMensualidad.search = async (nombre, mensualidad) => {
  const newMensualidad = await gimnasioService.post('newMensualidad', {
    nombre,
    mensualidad
  })
  if (newMensualidad) {
    return newMensualidad.data
  } else {
    console.log(err => err)
  }
}

export default AddMensualidad
