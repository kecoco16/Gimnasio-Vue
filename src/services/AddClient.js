import gimnasioService from './gimnasio'

const AddClient = {}

AddClient.search = (nombre, cedula, telefono, mensualidad, correo, sexo, imagen, hoy, pago) => {
  return gimnasioService.post('newClient', { 'nombre': nombre, 'cedula': cedula, 'telefono': telefono, 'mensualidad': mensualidad, 'correo': correo, 'sexo': sexo, 'imagen': imagen, 'hoy': hoy, 'pago': pago })
    .then(res => res.data)
    .catch(err => err)
}

export default AddClient
