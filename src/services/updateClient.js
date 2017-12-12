import gimnasioService from './gimnasio'

const updateClient = {}

updateClient.search = async (id, nombre, cedula, telefono, correo, mensualidad, imagen) => {
  const update = await gimnasioService.put(`update/${id}`, {
    nombre,
    cedula,
    telefono,
    correo,
    mensualidad,
    imagen
  })
  if (update) {
    return update.data
  } else {
    console.log(err => err)
  }
}

export default updateClient
