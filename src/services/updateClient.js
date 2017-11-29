import gimnasioService from './gimnasio'

const updateClient = {}

updateClient.search = (id, nombre, cedula, telefono, correo, mensualidad, imagen) => {
  return gimnasioService.put(`update/${id}`, { 'nombre': nombre, 'cedula': cedula, 'telefono': telefono, 'correo': correo, 'mensualidad': mensualidad, 'imagen': imagen })
    .then(res => res.data)
    .catch(err => err)
}

export default updateClient
