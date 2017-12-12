import gimnasioService from './gimnasio'

const AddClient = {}

AddClient.search = async (nombre, cedula, telefono, mensualidad, correo, sexo, imagen, hoy, pago) => {
  const newClient = await gimnasioService.post('newClient', {
    nombre,
    cedula,
    telefono,
    mensualidad,
    correo,
    sexo,
    imagen,
    hoy,
    pago
  })
  if (newClient) {
    return newClient.data
  } else {
    console.log(err => err)
  }
}

export default AddClient
